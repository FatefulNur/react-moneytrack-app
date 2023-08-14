import { useRouteError } from "react-router-dom";
import Navigate from "../Navigate/Navigate";

export default function Error() {
    const { message, statusText } = useRouteError()
    
    return (
        <div className="Error">
            <div className="intro">
                <h2>O'ops 😫. Went wrong</h2>   
                <p>{ message || statusText }</p>
            </div>
            <div className="nav-buttons">
                <Navigate />
            </div>
        </div>
    )
}