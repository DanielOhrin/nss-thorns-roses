import { Navigate } from "react-router-dom"

export const Authorized = ({ children }) => {

    if (localStorage.getItem("thorns_user")) {
        return children
    }
    else {
        return <Navigate
            to="/login"
            replace />
    }
}