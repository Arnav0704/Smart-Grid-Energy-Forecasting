from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import pandas as pd
import statsmodels.api as sm
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.statespace.sarimax import SARIMAX
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.metrics import mean_squared_error
from datetime import date as dt
from pmdarima.arima import ARIMA
import json
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by default

# Define folder for temporary storage of uploaded files
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def csv_to_json_pandas(csv_file_path):
    df = pd.read_csv(csv_file_path)
    json_data = df.to_json(orient='records', lines=False)
    json_data = json_data.replace('}{', '},{')
    # Prepend with 'const data = ' and append with 'export default data'
    js_data = json_data
    return js_data

def predict_future(PERIOD, csv_file_path):
    """
        ensure that the dates are written as Date
        and the energy as Energy_values
    """
    df = pd.read_csv(csv_file_path)
    # df.set_index(['Date'],inplace=True)
    # Model - 1 AIC - 1251.748 time ~ 10s overall best
    p_value = 6
    d_value = 1
    q_value = 0
    P_value = 3  # Seasonal AR order
    D_value = 1  # Seasonal differencing order
    Q_value = 0  # Seasonal MA order
    m = 12       # Seasonal cycle length

    # # Model - 2 AIC - 1304.302 time ~ 6s faster but not so good preds
    # p_value = 6
    # d_value = 1
    # q_value = 0
    # P_value = 2  # Seasonal AR order
    # D_value = 1  # Seasonal differencing order
    # Q_value = 0  # Seasonal MA order
    # m = 12       # Seasonal cycle length
    
    # # Model 3  AIC - 1314.778 time - 5s really fast and some good preds
    # p_value = 3
    # d_value = 1
    # q_value = 0
    # P_value = 3  # Seasonal AR order
    # D_value = 1  # Seasonal differencing order
    # Q_value = 0  # Seasonal MA order
    # m = 12       # Seasonal cycle length
    if len(df.columns) == 2:
        sarimax_model = ARIMA(
            order=(p_value, d_value, q_value),
            seasonal_order=(P_value, D_value, Q_value, m),
            suppress_warnings=True
        )
        # ENERGY PREDICTION
        sarimax_model.fit(df['Energy_values'])
        # fitted_values = sarimax_model.predict_in_sample() 
        ENERGY_FORECAST = sarimax_model.predict(n_periods=int(PERIOD))
        # Get the last date and convert it to a datetime object
        start_date = pd.to_datetime(df['Date'].iloc[-1]) + timedelta(days=1)

        # Generate the next 30 dates
        dates = [start_date + timedelta(days=i) for i in range(int(PERIOD))]

        # Create a DataFrame with the new dates and energy values
        new_data = pd.DataFrame({
            'Date': dates,
            'Energy_values': ENERGY_FORECAST.tolist()
        })

        # Convert to JSON format
        JSON_ENERGY_FORECAST = new_data.to_json(orient='records', date_format='iso')
        
        return JSON_ENERGY_FORECAST
    else:
        correlation_columns = [column for column in df.columns if column != 'Date' and column != 'Energy_values']
        correlations = df[correlation_columns + ['Energy_values']].corr()['Energy_values'].drop('Energy_values')

        # Get the top 3 most influencing factors
        top_factors = correlations.abs().nlargest(min(3,len(df.columns)-2))
        # Access the names of the top 3 influencing factors
        top_factors_names = top_factors.index.tolist()
        top_factors_names
        #scaling
        scaler = MinMaxScaler()
        weather_scaled = scaler.fit_transform(df[top_factors_names])
        kmeans = KMeans(n_clusters=len(top_factors), max_iter=1000, algorithm = 'lloyd')
        kmeans.fit(weather_scaled)
        df['weather_cluster'] = kmeans.labels_
        
        sarimax_model = ARIMA(
            order=(p_value, d_value, q_value),
            seasonal_order=(P_value, D_value, Q_value, m),
            exogenous=df[['weather_cluster']],
            suppress_warnings=True
        )
        # WEATHER PREDICTION
        sarimax_model.fit(df['weather_cluster'])
        # fitted_values = sarimax_model.predict_in_sample() 
        WEATHER_FORECAST = sarimax_model.predict(n_periods=int(PERIOD))
        
        # NORMALIZING DATA
        for i in range(len(WEATHER_FORECAST.values)):
            if WEATHER_FORECAST.values[i] >= 1:
                WEATHER_FORECAST.values[i] = 1
            else: 
                WEATHER_FORECAST.values[i] = 0
        
        # ENERGY PREDICTION
        sarimax_model.fit(df['Energy_values'])
        # fitted_values = sarimax_model.predict_in_sample() 
        ENERGY_FORECAST = sarimax_model.predict(n_periods=int(PERIOD))
        
        # Get the last date and convert it to a datetime object
        start_date = pd.to_datetime(df['Date'].iloc[-1]) + timedelta(days=1)

        # Generate the next 30 dates
        dates = [start_date + timedelta(days=i) for i in range(int(PERIOD))]

        # Create a DataFrame with the new dates and energy values
        new_data = pd.DataFrame({
            'Date': dates,
            'Energy_values': ENERGY_FORECAST.tolist()
        })

        # Convert to JSON format
        JSON_ENERGY_FORECAST = new_data.to_json(orient='records', date_format='iso')

        return JSON_ENERGY_FORECAST

        
        

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'csvFile' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    csv_file = request.files['csvFile']
    name = request.form.get("name")
    type_ = request.form.get("type")
    location = request.form.get("location")
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    days = request.form.get("days")
    
    # Check if any required fields are missing
    if not (csv_file and name and type_ and location):
        return jsonify({"error": "Missing required data"}), 400
    
    
    if csv_file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Save the file to the upload directory
    filename = secure_filename(csv_file.filename)
    csv_file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    csv_file.save(csv_file_path)

    # Convert CSV to .js JSON format
    js_data = csv_to_json_pandas(csv_file_path)
    
    # add all the dates and then send the response
    ENERGY_FORECAST = predict_future(days, csv_file_path)
    
    # Delete the uploaded CSV file if not needed after conversion
    os.remove(csv_file_path)
    # Return the JS data directly
    return jsonify(
        {
            "message" : "File uploaded successfully",
            "jsData": js_data,
            "name": name,
            "type" : type_,
            "location" : location,
            "latitude" : latitude,
            "longitude" : longitude,
            "days" : days,
            "prediction": ENERGY_FORECAST
        }
    ), 200

# @app.route('/predict', method=[])

if __name__ == '__main__':
    app.run(debug=True)
