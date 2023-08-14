import { Link, redirect, useSubmit } from "react-router-dom"
import { fetchData, formatMoney, getDataById, setData } from "../../utils/helpers"
import { IconContext } from "react-icons"
import { FaRegTrashCan } from "react-icons/fa6"
import Navigate from "../Navigate/Navigate"

export function tableAction({ params }) {
    const expenses = fetchData("Expenses")
    try {
        const newExpenses = expenses.filter(exp => exp.id !== params.id)
        setData("Expenses", newExpenses)
        return redirect('/')
    } catch (e) {
        throw new Error(e.message || "Error deleting an expense")
    }
}

export default function Table({ heading, trackers, expenses, linkExpenses, linkNavigation }) {
    const submit = useSubmit()
    expenses.sort((a, b) => b.createdAt - a.createdAt)

    return (
        <>
            {
                expenses?.length > 0 ? (
                    <>
                        <h2>
                            {heading} {linkNavigation ? (
                                <small
                                    style={{ fontWeight: '100', fontSize: '0.5em' }}>
                                    ({expenses.length}) total
                                </small>
                            ) : null}
                        </h2>
                        <table>
                            <thead>
                                <tr className="th">
                                    {["Name", "Cost", "Date", "Budget", null].map(row => (
                                        <td key={row}>{row}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map(exp => (
                                    <tr key={exp.id}>
                                        <td>{exp.name}</td>
                                        <td><span className="colorize">{formatMoney(exp.expense)}</span></td>
                                        <td>{new Date(exp.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {
                                                <>
                                                    <Link
                                                        to={`/expense/${exp.labelId}`}
                                                        className="btn bullet tableBtn"
                                                        style={{ '--accent-color': getDataById(trackers, exp.labelId)?.color }}>
                                                        {getDataById(trackers, exp.labelId)?.label}
                                                    </Link>
                                                </>
                                            }
                                        </td>
                                        <td>
                                            <button
                                                className="btn dlt-outline"
                                                onClick={() => submit(null, { method: "post", action: `/delete/expense/${exp.id}` })}>
                                                <IconContext.Provider value={{ className: "icon sm" }}>
                                                    <FaRegTrashCan />
                                                </IconContext.Provider>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                {(expenses.length > 4 && linkExpenses) && (
                                    <tr>
                                        <td>
                                            <Link to="expenses" className="btn night">see all expenses</Link>
                                        </td>
                                    </tr>
                                )}
                            </tfoot>
                        </table>
                        {linkNavigation && (
                            <div className="table nav-buttons">
                                <Navigate />
                            </div>
                        )}
                    </>
                ) : null
            }
        </>
    )
}