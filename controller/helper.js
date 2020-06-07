/**
 * @author Ganesh Sharma
 * @description Common function declaration for controller
 * 
*/
exports.convertToDate = function (dateStr) {
    dateStr = dateStr.split(" ");
    date = dateStr[0].split('/');
    time = dateStr[1].split(':');
    pa = (dateStr[2] === 'PM') ? 12 : 0 // post addition;
    return new Date(parseInt(date[2]), parseInt(date[1]) - 1, date[0], (parseInt(time[0]) + pa), parseInt(time[1]))
}