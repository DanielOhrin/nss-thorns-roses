import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Nav } from "./components/navbar/Nav"
import { ApplicationView } from "./components/views/ApplicationView"
import { Authorized } from "./components/views/Authorized"

export const ThornsRoses = () => {
    const [cartLength, updateCartLength] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:8088/carts?customerId=${JSON.parse(localStorage.getItem("thorns_user")).id}`)
            .then(res => res.json())
            .then(data => {
                let int = 0

                data.forEach(obj => {
                    int += obj.amount
                })

                updateCartLength(int)
            })
    }, [])

    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <Nav cartLength={cartLength} />
                <ApplicationView cartLength={cartLength} updateCartLength={updateCartLength}/>
            </Authorized>
        } />
    </Routes>
}