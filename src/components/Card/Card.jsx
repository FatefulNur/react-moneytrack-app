import { IconContext } from "react-icons";
import { NavLink, redirect, useSubmit } from "react-router-dom";
import { FaRegTrashCan, FaShareFromSquare } from "react-icons/fa6"
import { fetchData, formatMoney, formatPercentage, setData, spentByTotalExpense } from "../../utils/helpers";

export function cardAction({ params }) {
    const trackers = fetchData("Trackers")
    const expenses = fetchData("Expenses")
    try {
        const newTrackers = trackers.filter(trck => trck.id !== params.id)
        const newExpenses = expenses.filter(exp => exp.labelId !== params.id)
        setData("Trackers", newTrackers)
        setData("Expenses", newExpenses)
        return redirect('/')
    } catch (e) {
        throw new Error(e.message || "Error deleting a tracker")
    }
}

export default function Card({ tracker, deleteable }) {
    const submit = useSubmit()
    const spend = spentByTotalExpense(tracker.id)

    return (
        <div className="Card" style={{ "--accent-color": tracker.color }}>
            <div className="card-inner">
                <div className="heading">
                    <span className="card-color">{tracker.label}</span>
                    <div>Budgeted <span className="card-color">{formatMoney(tracker.total)}</span></div>
                </div>
                <div className="content">
                    <div className="progress">
                        <progress
                            aria-label="content loading..."
                            max="100"
                            value={(spend / tracker.total) * 100}>
                            {formatPercentage(spend / tracker.total)}
                        </progress>
                    </div>
                    <div className="estimate">
                        <span className="spend">
                            Spend <span className="card-color">{formatMoney(spend)}</span>
                        </span>
                        <span
                            className="remain">
                            <span className="card-color">{formatMoney(tracker.total - spend)}</span> remaining
                        </span>
                    </div>
                </div>
                <div className={`button ${deleteable ? 'deletable' : ''}`}>
                    {deleteable ? (
                        <button
                            className="btn dlt"
                            onClick={() => submit(null, { method: "post", action: `/delete/tracker/${tracker.id}` })}>
                            <IconContext.Provider value={{ className: "icon sm" }}>
                                <FaRegTrashCan />
                            </IconContext.Provider> Delete
                        </button>
                    ) : (
                        <NavLink to={`expense/${tracker.id}`} className="btn">
                            <IconContext.Provider value={{ className: "icon sm" }}>
                                <FaShareFromSquare />
                            </IconContext.Provider> View Details
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}