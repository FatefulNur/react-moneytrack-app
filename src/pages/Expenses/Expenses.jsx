import { fetchData } from "../../utils/helpers";
import Table from "../../components/Table/Table";
import Navigate from "../../components/Navigate/Navigate";

export default function Expenses() {
    const expenses = fetchData("Expenses")
    const trackers = fetchData("Trackers")

    return (
        <div className="Expenses Table">
            {expenses?.length ? <Table
                expenses={expenses}
                trackers={trackers}
                heading="Expense Lists"
                linkNavigation /> : (
                <>
                    <font size="6" color="#555">Not Available. Go create some new expense</font>
                    <div className="table nav-buttons">
                        <Navigate />
                    </div>
                </>
            )
            }
        </div>
    )
}