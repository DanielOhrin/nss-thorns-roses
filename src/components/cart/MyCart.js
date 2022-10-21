import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllRetailers } from "../ApiManager"
import { CartItem } from "./CartItem"
import "./MyCart.css"

export const MyCart = () => {
    const [items, setItems] = useState([]),
        [retailers, setRetailers] = useState([]),
        { customerId } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/carts?customerId=${customerId}&_expand=flower`)
            .then(res => res.json())
            .then(data => setItems(data))

        getAllRetailers(`?_expand=distributor`)
            .then(data => setRetailers(data))
    }, [customerId])

    return (
        <article id="cart-article">
            <h2>My Cart</h2>
            <table id="cart-table">
                <thead id="cart-headers">
                    <tr>
                        <th>Flower</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody id="cart-body">
                    {
                        items.map(item => {
                            return <CartItem key={`item--${item.id}`} item={item} retailers={retailers} />
                        })
                    }
                </tbody>
            </table>
        </article>
    )
}