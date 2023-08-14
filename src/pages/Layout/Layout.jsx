import { Outlet, useLoaderData } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import { fetchData } from "../../utils/helpers";
import footerImg from "../../assets/images/Wave.svg";
import { useEffect } from "react";

export function layoutLoader() {
    const { authKey } = fetchData("Auth")
    return { authKey }
}

export default function Layout() {
    const { authKey } = useLoaderData()

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY && ["/"].includes(location.pathname)) {
                sessionStorage.setItem(location.pathname, window.scrollY)
            }
        }
        addEventListener("scroll", handleScroll)

        return () => removeEventListener("scroll", handleScroll)
    }, [location.pathname])

    return (
        <div className="Wrapper">
            <Navigation authKey={authKey} />
            <main style={{ minHeight: "60vh" }}>
                <Outlet />
            </main>
            <footer style={{ background: `url(${footerImg}) no-repeat bottom`, minHeight: "200px" }}></footer>
        </div>
    )
} 