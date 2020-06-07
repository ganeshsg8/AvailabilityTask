/**
 * @author Ganesh Sharma
 * @description business logic for availability 
 * 
*/
const model = require('../models/availability');
const {
    convertToDate
} = require('./helper.js');

exports.saveAvailability = async function (data) {
    try {
        data.startTime = convertToDate(data.startTime);
        data.endTime = convertToDate(data.endTime);
        const document = new model(data);
        let saved = await document.save()
        return saved._id;
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getDateWiseRecordsFromDb(userId) {
    return await model.aggregate([{
        $project: {
            year: {
                $year: "$startTime"
            },
            month: {
                $month: "$startTime"
            },
            day: {
                $dayOfMonth: "$startTime"
            },
            startTime: "$startTime",
            endTime: "$endTime",
            userId: "$userId",
        }
    }, {
        $group: {
            _id: {
                year: "$year",
                month: "$month",
                day: "$day"
            },
            data: {
                $push: {
                    startTime: "$startTime",
                    endTime: "$endTime",
                    userId: "$userId",
                }
            }
        }
    }])
}

exports.getAvailability = async function (userId) {
    try {
        let records = await getDateWiseRecordsFromDb(userId);

        for (let i = 0; i < records.length; i++) {
            records[i].date = new Date(records[i]._id.year, records[i]._id.month - 1, records[i]._id.day);
            delete records[i]._id;
            for (let j = 0; j < records[i].data.length; j++) {
                for (let k = 0; k < records[i].data.length; k++) {
                    if (j === k) continue;
                    if ((records[i].data[j].startTime.getTime() <= records[i].data[k].startTime.getTime()) &&
                        (records[i].data[j].endTime.getTime() >= records[i].data[k].startTime.getTime())) {
                        records[i].data[j].endTime = records[i].data[k].endTime;
                        records[i].data.splice(k, 1);
                        j--;
                        break;
                    }
                }
            }
        }
        return records;
    } catch (error) {
        throw error
    }
}