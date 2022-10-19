import { useEffect, useState } from "react"
import { getNurseryFlowers } from "../ApiManager"
// Make an array of nurseryIds to query with 
export const Distributor = ({ id, businessName, markup, retailer, nurseryDistributors }) => {
    const [flowers, setFlowers] = useState([]),
        [nurseryFlowers, setNurseryFlowers] = useState([])

    useEffect(() => {
        // Define an empty array to hold the nurseryIds
        const nurseryIds = []

        // Grab all of those Ids from the nurseryDistributors
        nurseryDistributors.forEach(nD => {
            nurseryIds.push(nD.nurseryId)
        })

        // Use the nurseryIds with a .join to create a custom path to grab our flowers
        getNurseryFlowers(`?nurseryId=${nurseryIds.join("&nurseryId=")}&_expand=flower`)
            .then(
                (nurseryFlowers) => {
                    const newFlowers = nurseryFlowers.reduce((flowerArr, currentFlower) => {
                        // Check if the flower has already been added
                        const flowerExists = flowerArr.find(flower => flower.id === currentFlower.flower.id)

                        // Push the flowers into the array 
                        return flowerExists
                            ? [...flowerArr]
                            : [...flowerArr, currentFlower.flower]

                    }, [])

                    // Set the state to contain the flowers
                    setFlowers(newFlowers)
                    // Set the state to contain the prices
                    setNurseryFlowers(nurseryFlowers)
                })


    }, [nurseryDistributors])

    return (
        <section className="distributor">
            <h3>{businessName}</h3>
            <div className="distributor-info">
                <div className="info-child">
                    <h4>Flowers</h4>
                    <ul>
                        {
                            flowers.map(flower => {
                                return (
                                    <li key={`flower--${flower.id}`}>
                                        ${(nurseryFlowers.find(nF => nF.flowerId === flower.id).price + nurseryFlowers.find(nF => nF.flowerId === flower.id).price * (markup / 100)).toFixed(2)} {flower.species} | {flower.color}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="info-child">
                    <h4>Retailer | {retailer.businessName}</h4>
                    <img className="logo" src={retailer.logo} alt="Company Logo" />
                </div>
            </div>
        </section>
    )
}