import { useState, useEffect } from "react"
import { getAllDistributors } from "../ApiManager"
import { Distributor } from "./Distributor.js"
import "./Distributors.css"

export const DistributorList = () => {
    const [distributors, setDistributors] = useState([])

    useEffect(() => {
        getAllDistributors("?_embed=nurseryDistributors&_embed=retailers")
            .then(
                (data) => {
                    setDistributors(data)
                }
            )
    }, [])

    return (
        <article id="parent">
            <h2>Distributors</h2>
            {
                distributors.map(distributor => <Distributor key={`distributor--${distributor.id}`}
                    id={distributor.id}
                    businessName={distributor.businessName}
                    markup={distributor.markup}
                    retailer={distributor.retailers[0]}
                    nurseryDistributors={distributor.nurseryDistributors}/>)
            }
        </article>
    )
}