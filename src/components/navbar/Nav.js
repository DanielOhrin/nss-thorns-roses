import { Link } from "react-router-dom"
import "./Nav.css"

export const Nav = () => {
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
        </ul>
    )
}