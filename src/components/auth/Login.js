import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    }),
        navigate = useNavigate()

    const handleUserInput = (evt) => {
        const copy = { ...loginDetails }

        copy[evt.target.name] = evt.target.value.replace(" ", "")
        setLoginDetails(copy)
    }

    const handleSaveButton = (event) => {
        event.preventDefault()
        document.getElementById("login-btn").disabled = true

        if (!Object.values(loginDetails).includes("")) {
            fetch(`http://localhost:8088/customers?email=${loginDetails.email}`)
                .then(res => res.json())
                .then(res => {
                    if (res.length > 0) {
                        if (res[0].password === loginDetails.password) {
                            localStorage.setItem("thorns_user", JSON.stringify({ id: res[0].id }))
                            navigate("/", {replace: true})
                        } else {
                            window.alert(`Username and Password do not match.`)
                            document.getElementById("login-btn").disabled = false
                        }
                    } else {
                        window.alert(`Account with that email does not exist.`)
                        document.getElementById("login-btn").disabled = false
                    }
                })
        } else {
            window.alert(`Please fill out entire form.`)
            document.getElementById("login-btn").disabled = false
        }
    }

    return (
        <article id="login-component">
            <form>
                <h1>Login</h1>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleUserInput} type="text" name="email" value={loginDetails.email} />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleUserInput} type="text" name="password" value={loginDetails.password} />
                </fieldset>
                <div id="btn-container">
                    <button onClick={handleSaveButton} id="login-btn">Login</button>
                    <Link id="register-link" to="/register">Register</Link>
                </div>
            </form>
        </article>
    )
}