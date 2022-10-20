import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createNewCustomer } from "../ApiManager"
import "./Login.css"

export const Register = () => {
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        businessName: "",
        email: "",
        password: ""
    }),
        navigate = useNavigate()

    const handleUserInput = (evt) => {
        const copy = { ...newCustomer }

        copy[evt.target.name] = evt.target.value
        setNewCustomer(copy)
    }

    const handleSaveButton = (event) => {
        event.preventDefault()
        // If statement that checks if a valid email was passed && all values are defined.
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newCustomer.email) && !Object.values(newCustomer).includes("")) {
            document.getElementById("save-btn").disabled = true

            // Check if the email is already registered
            fetch(`http://localhost:8088/customers?email=${newCustomer.email}`)
                .then(res => res.json())
                .then(res => {
                    if (!res.length > 0) {
                        createNewCustomer(newCustomer)
                            .then(res => res.json())
                            .then(createdCustomer => {
                                if (createdCustomer.hasOwnProperty("id")) {
                                    localStorage.setItem("thorns_user", JSON.stringify({ id: createdCustomer.id }))

                                    navigate("/") 
                                } else {
                                    window.alert(`Failed to create new user.`)
                                    document.getElementById("save-btn").disabled = false
                                }
                            })
                    } else {
                        window.alert(`An account with that email already exists.`)
                        document.getElementById("save-btn").disabled = false
                    }
                })


        } else {
            window.alert("Something went wrong. Invalid user input.")
        }
    }

    return (
        <article id="register-component">
            <form>
                <h1>Register</h1>
                <fieldset>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleUserInput} type="text" name="name" value={newCustomer.name} />
                </fieldset>
                <fieldset>
                    <label htmlFor="businessName">Business Name</label>
                    <input onChange={handleUserInput} type="text" name="businessName" value={newCustomer.businessName} />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleUserInput} type="text" name="email" value={newCustomer.email} />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleUserInput} type="text" name="password" value={newCustomer.password} />
                </fieldset>
                <div id="btn-container">
                    <button onClick={handleSaveButton} id="save-btn">Create</button>
                    <Link id="login-link" to="/login">Have an account?</Link>
                </div>
            </form>
        </article>
    )
}