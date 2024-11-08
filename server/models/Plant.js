const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    days: { type: String, required: true },
    jsData: { type: String }, // the plant data in string
    prediction: { type: String }
});

module.exports = mongoose.model("Plant", plantSchema);
