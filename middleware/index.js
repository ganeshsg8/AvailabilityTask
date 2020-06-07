/**
 * @author Ganesh Sharma
 * @description implementation of middleware functionality
 * 
 */
const mongoose = require('mongoose');


exports.validateAvailability = (req, res, next) => {
    console.log(req.body);
    if (!req.body.startTime) {
        return res.status(400).json({
            message: 'Parameter "startTime" not found'
        })
    }
    if (!req.body.endTime) {
        return res.status(400).json({
            message: 'Parameter "endTime" not found'
        })
    }
    if (!req.body.userId) {
        return res.status(400).json({
            message: 'Parameter "userId" not found'
        })
    }
    next()
}

exports.validateMongoId = (req, res, next) => {
    if (!req.query.userId) {
        return res.status(400).json({
            message: 'Query parameter "userId" not found'
        });
    }
    if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({
            message: 'Query parameter "userId" invalid'
        });
    }
    next();
}