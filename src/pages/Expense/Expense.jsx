import { useParams } from "react-router-dom";
import { fetchData, getAllExpensesByTrackerId, getDataById } from "../../utils/helpers";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CreateExpense from "../../components/CreateExpense/CreateExpense";

export default function Expense() {
    const { id } = useParams()
    const expenses = getAllExpensesByTrackerId(id)
    const trackers = fetchData("Trackers")
    const tracker = getDataById(trackers, id)

    return (
        <>
            <h2 className="Heading"><span className="colorize">{tracker?.label}</span> Overview</h2>
            <div className="CardArea MoneyTracker" style={{ alignItems: 'flex-start' }}>
                <Card tracker={tracker} deleteable />
                <CreateExpense trackers={[tracker]} />
            </div>
            <div className="Expenses Table">
                {expenses?.length > 0 ? <Table 
                    expenses={expenses} 
                    trackers={trackers} 
                    heading={(
                        <>
                            <span className="colorize">{tracker?.label}</span> Expenses
                        </>
                    )} /> : (
                        <font size="5">Please create new expense :)</font>
                    )
                }
            </div>
        </>
    )
}