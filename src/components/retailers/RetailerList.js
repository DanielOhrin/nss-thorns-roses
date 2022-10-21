import { useState, useEffect} from "react"
import { getAllRetailers } from "../ApiManager"
import { Retailer } from "./Retailer"
import "./Retailers.css"

export const RetailerList = ({updateCartLength, cartLength}) => {
    const [retailers, setRetailers] = useState([])

    useEffect(() => {
        getAllRetailers(`?_expand=distributor`)
            .then(
                (data) => {
                    setRetailers(data)
                }
            )
    }, [])

    return (
        <article id="parent">
            <h2>Retailers</h2>
                {
                    retailers.map(retailer => <Retailer key={`retailer--${retailer.id}`}
                        retailer={retailer}
                        distributor={retailer.distributor} 
                        updateCartLength={updateCartLength}
                        cartLength={cartLength} />)
                }
        </article>
    )
}