const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const addPlantRoute = require('./routes/addPlant'); 
const getPlantsRoute = require('./routes/getPlants'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use('/', addPlantRoute);
app.use('/', getPlantsRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
