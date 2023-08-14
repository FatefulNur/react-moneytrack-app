import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { cardAction } from "./components/Card/Card"
import Error from "./components/Error/Error"
import { navigationAction } from "./components/Navigation/Navigation"
import { tableAction } from "./components/Table/Table"
import Expense from "./pages/Expense/Expense"
import Expenses from "./pages/Expenses/Expenses"
import Layout, { layoutLoader } from "./pages/Layout/Layout"
import MoneyTracker, { moneyTrackerAction, moneyTrackerLoader } from "./pages/MoneyTracker/MoneyTracker"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <MoneyTracker />,
        errorElement: <Error />,
        action: moneyTrackerAction,
        loader: moneyTrackerLoader
      },
      {
        path: "expenses",
        element: <Expenses />,
        errorElement: <Error />
      },
      {
        path: "expense/:id",
        element: <Expense />,
        errorElement: <Error />,
        action: moneyTrackerAction
      },
      {
        path: "delete/expense/:id",
        element: null,
        errorElement: <Error />,
        action: tableAction
      },
      {
        path: "delete/tracker/:id",
        element: null,
        errorElement: <Error />,
        action: cardAction
      },
      {
        path: "logout",
        element: null,
        action: navigationAction
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
