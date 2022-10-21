import { Link } from "react-router-dom"
import "./Nav.css"

export const Nav = ({cartLength}) => {
    return (
        <ul id="navbar">
            <li className="nav__item">
                <Link className="nav__link" to="/nurseries">Nurseries</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/distributors">Distributors</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/retailers">Retailers</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to={`/cart/${JSON.parse(localStorage.getItem("thorns_user")).id}`}>My Cart ({cartLength})</Link>
            </li>
        </ul>
    )
}