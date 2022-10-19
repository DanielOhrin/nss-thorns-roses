import { useState, useEffect } from "react"
import { getAllNurseries } from "../ApiManager"
import { Nursery } from "./Nursery"
import "./Nurseries.css"

export const NurseryList = () => {
    const [nurseries, setNurseries] = useState([])

    useEffect(() => {
        getAllNurseries()
            .then(
                (data) => {
                    setNurseries(data)
                }
            )
    }, [])

    return (
        <article id="parent">
            <h2>Nurseries</h2>
            {
                nurseries.map(nursery => <Nursery key={`nursery--${nursery.id}`}
                    id={nursery.id}
                    businessName={nursery.businessName} />)
            }
        </article>
    )
}