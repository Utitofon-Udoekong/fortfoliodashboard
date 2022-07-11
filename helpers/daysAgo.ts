
const daysAgo = (days: number, date) => {
    return new Date(date.setDate(date.getDate() + days)).toISOString();
}

const daysAhead = (days: number, date) => {
    return new Date(date.setDate(date.getDate() + days)).toISOString();
}

const daysBetween = (date) => {
    const dueDate = new Date(date * 1000)
    const now = new Date()
    const timeDifference = dueDate.getTime() - now.getTime()
    const dayDifference = timeDifference / (1000 * 3600 *24)
    return dayDifference
}

export {daysAgo, daysAhead, daysBetween}