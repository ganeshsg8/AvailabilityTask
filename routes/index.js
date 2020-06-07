/**
 * @author Ganesh Sharma
 * @description routing implementation and validation 
 * 
 */
const router = require('express').Router();
const {
    saveAvailability,
    getAvailability
} = require('../controller');

const {
    validateAvailability,
    validateMongoId
} = require('../middleware');



router.post('/availability', validateAvailability, async function (req, res, next) {
    try {
        let savedId = await saveAvailability(req.body);
        res.status(201).json({
            message: 'success',
            id: savedId
        });
    } catch (error) {
        res.status(500).json({
            message: "error",
            error: error
        });
    }
})

router.get('/availability', validateMongoId, async function (req, res) {
    try {
        let data = await getAvailability(req.query.userId)
        res.status(200).json({
            message: "success",
            records: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error",
            error: error
        });
    }

})


module.exports = router;