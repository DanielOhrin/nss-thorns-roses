import { useState, useEffect } from "react"
import { getNurseryDistributors, getNurseryFlowers } from "../ApiManager"

export const Retailer = ({ retailer, distributor }) => {
    const [nurseryDistributors, setNurseryDistributors] = useState([]),
        [nurseryFlowers, setNurseryFlowers] = useState([]),
        [flowers, setFlowers] = useState([])

    useEffect(() => {
        getNurseryDistributors(`?distributorId=${distributor.id}`)
            .then(data => setNurseryDistributors(data))
    }, [distributor])

    useEffect(() => {
        // Define an empty array to hold the nurseryIds
        const nurseryIds = nurseryDistributors.map(nD => nD.nurseryId)

        // Use the nurseryIds with a .join to create a custom path to grab our flowers
        getNurseryFlowers(`?nurseryId=${nurseryIds.join("&nurseryId=")}&_expand=flower`)
            .then(
                (data) => {
                    const newFlowers = data.reduce((flowerArr, currentFlower) => {
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
                    setNurseryFlowers(data)
                })


    }, [nurseryDistributors])

    // Function that calculates markup to reduce clutter in the JSX
    const calculateMarkup = (flower) => {
        const basePrice = nurseryFlowers.find(nF => nF.flowerId === flower.id).price
       
        let total = basePrice + (basePrice * (distributor.markup / 100))

        return total + (total * (retailer.markup / 100))
    }
    return (
        <section className="retailer">
            <h3>{retailer.businessName}</h3>
            <div className="retailer-info">
                <div className="info-child">
                    <h4>Flowers</h4>
                    <ul>
                        {
                            flowers.map(flower => {
                                return (
                                    <li key={`${retailer.id}--${flower.id}`}>
                                        ${calculateMarkup(flower).toFixed(2)} {flower.species} | {flower.color}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="info-child">
                    <h4>Distributor | {distributor.businessName}</h4>
                    <img className="logo" src={distributor.logo} alt="Company Logo" />
                </div>
            </div>
            <footer><strong>Address: </strong>{retailer.address}</footer>
        </section>
    )
}