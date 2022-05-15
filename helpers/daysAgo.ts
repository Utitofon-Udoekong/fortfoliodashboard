
const daysAgo = (days: number, date) => {
    return new Date(date.setDate(date.getDate() + days)).toISOString();
}

const daysAhead = (days: number, date) => {
    return new Date(date.setDate(date.getDate() + days)).toISOString();
}

export {daysAgo, daysAhead}