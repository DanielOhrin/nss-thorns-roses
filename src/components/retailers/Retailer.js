import { useState, useEffect } from "react"
import { getNurseryDistributors, getNurseryFlowers } from "../ApiManager"

export const Retailer = ({ retailer, distributor, updateCartLength, cartLength }) => {
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

    // Function for adding items to cart
    const addToCart = (event) => {
        fetch(`http://localhost:8088/carts?userId=${JSON.parse(localStorage.getItem("thorns_user")).id}&flowerId=${parseInt(event.target.id)}&retailerId=${retailer.id}`)
            .then(res => res.json())
            .then(res => {
                if (!res.length > 0) {
                    // Do a POST
                    fetch(`http://localhost:8088/carts`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            customerId: JSON.parse(localStorage.getItem("thorns_user")).id,
                            retailerId: retailer.id,
                            flowerId: parseInt(event.target.id),
                            amount: 1
                        })
                    })
                } else {
                    // Do a PUT
                    fetch(`http://localhost:8088/carts/${res[0].id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            customerId: res[0].customerId,
                            retailerId: res[0].retailerId,
                            flowerId: res[0].flowerId,
                            amount: res[0].amount + 1
                        })
                    })
                }
            })
            updateCartLength(cartLength + 1)
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
                                        ${calculateMarkup(flower).toFixed(2)} {flower.species} | {flower.color} <button onClick={addToCart} id={`${flower.id}`} className="purchase-btn">Add 1 to Cart</button>
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