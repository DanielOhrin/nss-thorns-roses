import { useState, useEffect } from "react"
import { getNurseryDistributors, getNurseryFlowers } from "../ApiManager"

export const Nursery = ({ id, businessName }) => {
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [nurseryDistributors, setNurseryDistributors] = useState([])

    useEffect(() => {
        getNurseryFlowers(`?nurseryId=${id}&_expand=flower`)
            .then(data => setNurseryFlowers(data))

        getNurseryDistributors(`?nurseryId=${id}&_expand=distributor`)
            .then(data => setNurseryDistributors(data))
    }, [id])

    return (
        <section className="nursery">
            <h3>{businessName}</h3>
            <div className="nursery-info">
                <div className="info-child">
                    <h4>Flowers</h4>
                    <ul>
                        {
                            nurseryFlowers.map(nF => {
                                return (
                                    <li key={`flower--${nF.id}`}>
                                        ${nF.price} {nF.flower?.species} | {nF.flower?.color}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="info-child">
                    <h4>Distributors</h4>
                    <ul>
                        {
                            nurseryDistributors.map(nD => {
                                return (
                                    <li key={`distributor--${nD.id}`}>
                                        {nD.distributor?.businessName}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}