import { Form, useNavigation } from "react-router-dom"
import { FaUserPlus } from "react-icons/fa6"
import { IconContext } from "react-icons"
import loginBg from "../../assets/images/bar_.png"

export default function Login() {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <div className="Login">
            <div>
            <div className="intro">
                <h2>Account Your <font style={{ color: "var(--pr-btn-bg)" }}>Transaction</font></h2>   
                <p>Create your own author, explore and account your business. Investment is the way to get financial assessment.</p>
            </div>
            <Form method="post">
                <input type="hidden" name="_action" value="login" />
                <input 
                    type="text" 
                    aria-label="Your Name"
                    name="userName"
                    id="userName"
                    placeholder="What is your name?"
                    autoComplete="given-name"
                    pattern="[a-zA-Z]{3,}"
                    required />
                <button className="btn prm" type="submit" disabled={isSubmitting}>
                    {
                        isSubmitting ? "Creating..." : (
                            <>
                                Create Account <IconContext.Provider value={{ className: "icon sm" }}>
                                    <FaUserPlus />
                                </IconContext.Provider>
                            </>
                        )
                    }
                </button>
            </Form>
            </div>
            <div>
                <img src={loginBg} alt="login" />
            </div>
        </div>
    )
}