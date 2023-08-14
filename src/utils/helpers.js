//////******** interval
export function wait() {
    return new Promise(res => setTimeout(res, Math.random() * 2000))
}

////// Dataset
export function fetchData(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}
export function removeData(key) {
    return localStorage.removeItem(key)
}
export function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

///////******* generator
export function generateKey() {
    return Date.now().toString()
}
export function generateUid(base = 36) {
    return Math.random().toString(base).substring(2)
}
export function generateColor() {
    const fetchTrackers = fetchData("Trackers") || []
    return `${fetchTrackers?.length * 34} 64% 50%`
}

///***** constructor of number
export function formatMoney(number) {
    return parseFloat(number).toLocaleString("en-US", {
        style: "currency", 
        currency: "BDT",
        maximumFractionDigits: 0
    })
}
export function spentByTotalExpense(budgetId) {
    const expenses = fetchData("Expenses")
    
    return expenses.reduce((acc, expense) => {
        if(expense.labelId !== budgetId) return acc

        return acc += parseFloat(expense.expense)
    }, 0)
}
export function formatPercentage(number) {
    return parseFloat(number).toLocaleString(undefined, {
        style: "percent", 
        minimumFractionDigits: 0
    })
}

///***** query dataset
export function getDataById(data, id) {
    return data.find(item => item.id === id)
}

export function getAllExpensesByTrackerId(trackerId) {
    const allExpenses = fetchData("Expenses")

    return allExpenses.filter(exp => exp.labelId === trackerId)
}