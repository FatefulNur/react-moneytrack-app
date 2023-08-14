import { useEffect } from "react";

export default function ScrollPosition() {
    useEffect(() => {
        const posY = sessionStorage.getItem(location.pathname) ?? 0
        window.scroll(0, posY)
    }, [location.pathname])
}