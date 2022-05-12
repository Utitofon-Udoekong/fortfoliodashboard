import moment from "moment";

const getDateRange = (startDate, endDate, dateFormat) => {
    var dates = [],
        end = moment(endDate),
        diff = endDate.diff(startDate, 'days');

    if(!startDate.isValid() || !endDate.isValid() || diff <= 0) {
        return;
    }

    for(var i = 0; i < diff; i++) {
        dates.push(end.subtract(1,'d').format(dateFormat));
    }

    return dates;
}
export default getDateRange