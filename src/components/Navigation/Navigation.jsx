import { Link, NavLink, redirect, useSubmit } from "react-router-dom"
import { FaHouseChimney, FaRegTrashCan } from "react-icons/fa6"
import { IconContext } from "react-icons"
import { fetchData, removeData } from "../../utils/helpers"

export async function navigationAction({ request }) {
    const data = await request.formData()
    const { _action } = Object.fromEntries(data)
    try {
        if(!confirm("Really ? Hope you complete your estimation.")) return redirect("/")

        if(_action === 'logout') {
            const Auth = fetchData("Auth")
            if(Auth) {
                removeData("Auth")
                removeData("Trackers")
                removeData("Expenses")
                return redirect("/")
            }
        }
    } catch (e) {
        throw new Error(e.message || "Error navigation a route")
    }
}

export default function Navigation({ authKey }) {
    const submit = useSubmit()
    const style = ({ isActive }, type) => (isActive ? `btn ${type} bullet active` : `btn ${type} bullet`)

    return (
        <nav>
            <div className="Logo">
                <IconContext.Provider value={{ className: "home icon" }}>
                    <NavLink to="/"><FaHouseChimney /> MT</NavLink>
                </IconContext.Provider>
            </div>
            <div className="Navigation">

                {authKey && (
                    <>
                        <span className="item">
                            <NavLink className={({ isActive }) => style({ isActive }, 'prm-outline')} to="expenses">
                                Expenses
                            </NavLink>
                        </span>
                        <span className="item" onClick={() => submit({ _action: 'logout' }, { method: 'post', action: 'logout' })}>
                            <Link className="btn dlt-outline bullet">
                                <IconContext.Provider value={{ className: "icon sm" }}>
                                    <FaRegTrashCan />
                                </IconContext.Provider> Delete User
                            </Link>
                        </span>
                    </>
                )}
            </div>
        </nav>
    )
}