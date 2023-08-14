import { useEffect, useRef } from "react"
import { IconContext } from "react-icons"
import { FaFolderPlus } from "react-icons/fa6"
import { useFetcher } from "react-router-dom"

export default function CreateTracker() {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting" 
    const formRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if(!isSubmitting){
           formRef.current.reset()
           inputRef.current.focus() 
        } 
    }, [isSubmitting])

    return (
        <div className="TrackerForm">
            <h3>Define a Budget</h3>
            <fetcher.Form method="post" ref={formRef}>
                <input type="hidden" name="_action" value="tracker" />
                <input
                    ref={inputRef}
                    type="text"
                    aria-label="Tracker Label"
                    name="label"
                    id="label"
                    placeholder="Set a label"
                    pattern="[a-zA-z]{3,}"
                    required />
                <input
                    type="number"
                    aria-label="Set Total"
                    name="total"
                    id="total"
                    inputMode="decimal"
                    min="0"
                    placeholder="Total price"
                    required />
                <button className="btn prm" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : (
                        <>
                            Create Budget <IconContext.Provider value={{ className: "icon sm" }}>
                                <FaFolderPlus />
                            </IconContext.Provider>
                        </>
                    )}
                </button>
            </fetcher.Form>
        </div>
    )
}