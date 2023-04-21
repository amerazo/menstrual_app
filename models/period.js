const { mongoose } = require('../db/connection');
const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema(
    {
        Date: { type: Date, required: true },
        FlowLevel: { type: String, required: true },
        Feelings: { type: String, required: true },
        PhysicalSymptoms: { type: String, required: true },
        Discharge: { type: String, required: true },
        BodyTemp: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }
);
const Period = mongoose.model('Period', periodSchema);
module.exports = Period;

