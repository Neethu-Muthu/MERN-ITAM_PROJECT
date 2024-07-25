// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: { type: String, unique:true, required: true },
    assetId: { type: String, unique:true,required: true },
    assignmentDate: { type: Date, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
