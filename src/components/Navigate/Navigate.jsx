import { IconContext } from "react-icons"
import { FaCircleArrowLeft, FaHouseChimneyUser } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

export default function Navigate() {
    const navigate = useNavigate()

    return (
        <>
            <button type="button" className="btn night bullet" onClick={() => navigate(-1)}>
                <IconContext.Provider value={{ className: "icon sm" }}>
                    <FaCircleArrowLeft />
                </IconContext.Provider> Return
            </button>
            <button type="button" className="btn night-outline bullet" onClick={() => navigate("/")}>
                <IconContext.Provider value={{ className: "icon sm" }}>
                    <FaHouseChimneyUser />
                </IconContext.Provider> Home
            </button>
        </>
    )
}