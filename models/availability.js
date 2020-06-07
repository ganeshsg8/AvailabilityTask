/**
 * @author Ganesh Sharma
 * @description collection declartaion for the availabilities
 * 
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, require: true }
}, { strict: true })

module.exports = mongoose.model('availabilities', availabilitySchema, 'availabilities');