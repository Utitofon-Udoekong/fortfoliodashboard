
const daysAgo = (days: number, date) => {
    // let daysAgo = date.setDate(date.getDate() - days);
    // return new Date(daysAgo).toISOString();
    return new Date(date.setDate(date.getDate() + days));
}

const daysAhead = (days: number, date) => {
    // let daysAgo = date.setDate(date.getDate() + days);
    // return new Date(daysAgo).toISOString();
    return new Date(date.setDate(date.getDate() + days));
}

export {daysAgo, daysAhead}