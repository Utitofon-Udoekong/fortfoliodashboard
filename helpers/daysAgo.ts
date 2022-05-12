import moment from "moment";

export const daysAgo = (days: number, date) => {
    // let daysAgo = date.setDate(date.getDate() - days);
    // return new Date(daysAgo).toISOString();
    return moment(date).subtract(days,'days').startOf('day').toISOString()
}

export const daysAhead = (days: number, date) => {
    // let daysAgo = date.setDate(date.getDate() + days);
    // return new Date(daysAgo).toISOString();
    return moment(date).add(days,'days').startOf('day').toISOString()
}