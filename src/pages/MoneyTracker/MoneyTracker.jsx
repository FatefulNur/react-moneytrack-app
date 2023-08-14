import { redirect, useLoaderData } from "react-router-dom"
import Card from "../../components/Card/Card"
import CreateExpense from "../../components/CreateExpense/CreateExpense"
import CreateTracker from "../../components/CreateTracker/CreateTracker"
import Login from "../../components/Login/Login"
import Table from "../../components/Table/Table"
import { fetchData, generateColor, generateKey, generateUid, setData, wait } from "../../utils/helpers"
import ScrollPosition from "../../components/ScrollPosition/ScrollPosition"

export function moneyTrackerLoader() {
    const { userName, authKey } = fetchData("Auth")
    const trackers = fetchData("Trackers")
    const expenses = fetchData("Expenses")

    return { userName, authKey, trackers, expenses }
}

export async function moneyTrackerAction({ request }) {
    await wait()

    const data = await request.formData()
    const { _action, ...formData } = Object.fromEntries(data)
    try {
        if (_action === "login") {
            setData("Auth", { userName: formData.userName, authKey: generateKey() })
            return redirect("/") // Will fixed later InshaAllah
        } else if (_action === "tracker") {
            const trackers = fetchData("Trackers")
            const newData = {
                ...formData,
                id: generateUid(),
                userId: fetchData("Auth").authKey,
                createdAt: Date.now(),
                color: generateColor()
            }
            if (trackers.some(trck => trck.label.toLowerCase() === newData.label.toLowerCase())) {
                throw new Error(`${newData.label} already Exist`)
            }

            setData("Trackers", [...trackers, newData])
            return null // Will fixed later InshaAllah
        } else if (_action === "expense") {
            const expenses = fetchData("Expenses")
            const newData = {
                ...formData,
                id: generateUid(),
                createdAt: Date.now()
            }

            setData("Expenses", [...expenses, newData])
            return null // Will fixed later InshaAllah
        }
    } catch (e) {
        throw new Error(e.message || "Money Tracking isnt resilience")
    }
}

export default function MoneyTracker() {
    const { userName, authKey, trackers, expenses } = useLoaderData()
    trackers.sort((a, b) => b.createdAt - a.createdAt)

    return (
        <div className="Root">
            {authKey ? (
                <>
                    <div className="Welcome">
                        <h1>Welcome Back, <span className="colorize">{userName}</span></h1>
                        <p>Daily life expenses can be unpredictable, but with a well-planned budget, we can handle unexpected costs more effectively, reducing financial stress and increasing financial resilience.</p>
                    </div>
                    <div className="MoneyTracker">
                        <CreateTracker />
                        {
                            trackers?.length >= 1 && (<CreateExpense trackers={trackers} />)
                        }
                    </div>
                    <div className="CardArea">
                        {
                            trackers?.length >= 1 && trackers.map(trck => (
                                <Card key={trck.id} tracker={trck} />
                            ))
                        }
                    </div>
                    <div className="Expenses Table">
                        <Table expenses={expenses.slice(-5)} trackers={trackers} heading="Recent Expenses" linkExpenses />
                    </div>
                </>
            ) : <Login />}
            <ScrollPosition />
        </div>
    )
} 