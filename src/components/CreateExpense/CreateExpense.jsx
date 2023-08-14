import { useEffect, useRef, useState } from "react"
import { IconContext } from "react-icons"
import { FaFolderMinus } from "react-icons/fa6"
import { useFetcher } from "react-router-dom"
import { getDataById, spentByTotalExpense } from "../../utils/helpers"

export default function CreateExpense({ trackers }) {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting" 
    const [isWithinBudget, setIsWithinBudget] = useState(true)
    const formRef = useRef(null)
    const inputRef = useRef(null)

    const changeTracker = (event) => {
        const remainingBudget = getDataById(trackers, event.target.value).total - spentByTotalExpense(event.target.value)
        const spentExceeded = (spentByTotalExpense(event.target.value) >= getDataById(trackers, event.target.value).total || (parseFloat(formRef.current.expense.value) > remainingBudget))
        setIsWithinBudget(!spentExceeded)
    }

    const changeExpense = (event) => {
        const remainingBudget = getDataById(trackers, formRef.current.labelId.value).total - spentByTotalExpense(formRef.current.labelId.value)
        const spentExceeded = parseFloat(event.target.value) > remainingBudget
        setIsWithinBudget(!spentExceeded)
    }

    useEffect(() => {
        if(!isSubmitting){
           formRef.current.reset()
           inputRef.current.focus() 
        } 
    }, [isSubmitting])

    return (
        <div className="ExpenseForm">
            <h3>Add a new <span className="colorize">Expense</span></h3>
            <fetcher.Form method="post" ref={formRef}>
                <input type="hidden" name="_action" value="expense" />
                <input
                    ref={inputRef}
                    type="text"
                    aria-label="Expense Name"
                    name="name"
                    id="name"
                    placeholder="Set a name"
                    pattern="[a-zA-Z]{3,}"
                    required />
                <select
                    hidden={trackers.length === 1}
                    aria-label="Set Expense Total"
                    name="labelId"
                    id="labelId"
                    onChange={changeTracker}
                    required>
                        {trackers.map(trks => (
                            <option key={trks.id} value={trks.id}>{trks.label}</option>
                        ))}
                    </select>
                <input
                    type="number"
                    aria-label="Set Expense Total"
                    name="expense"
                    id="expense"
                    inputMode="decimal"
                    min="0"
                    placeholder="Expense price"
                    required
                    onChange={changeExpense} />
                <button className="btn night" type="submit" disabled={isSubmitting || !isWithinBudget}>
                    {isSubmitting ? "Creating..." : (
                        <>
                            {isWithinBudget ? "Create Expense" : "Budget Exceeded"} <IconContext.Provider value={{ className: "icon sm" }}>
                                <FaFolderMinus />
                            </IconContext.Provider>
                        </>
                    )}
                </button>
            </fetcher.Form>
        </div>
    )
}