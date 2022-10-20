import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Nav } from "./components/navbar/Nav"
import { ApplicationView } from "./components/views/ApplicationView"
import { Authorized } from "./components/views/Authorized"

export const ThornsRoses = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={
            <Authorized>
                <Nav />
                <ApplicationView />
            </Authorized>
        } />
    </Routes>
}