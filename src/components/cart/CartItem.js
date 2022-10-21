import { useState, useEffect } from "react"
import { getNurseryDistributors, getNurseryFlowers } from "../ApiManager"

export const CartItem = ({ item, retailers }) => {
    const [retailer, setRetailer] = useState({}),
        [nurseries, setNurseries] = useState([]),
        [nurseryFlowers, setNurseryFlowers] = useState([])

    useEffect(() => {
        const matchingRetailer = retailers.find(retailer => retailer.id === item.retailerId)

        setRetailer(matchingRetailer)
    }, [item, retailers])

    useEffect(() => {
        getNurseryDistributors(`?distributorId=${retailer.distributorId}`)
            .then(data => {
                const nurseryIds = data.map(nD => nD.nurseryId)
                setNurseries(nurseryIds)
            })
    }, [retailer?.distributorId])

    useEffect(() => {
        getNurseryFlowers(`?nurseryId=${nurseries.join("&nurseryId=")}&_expand=flower`)
            .then(data => setNurseryFlowers(data))
    }, [nurseries])

    const calculateTotalPrice = (item) => {
        const basePrice = nurseryFlowers.find(nF => nF.flowerId === item.flowerId)?.price * item.amount

        let total = basePrice + (basePrice * (retailer?.distributor?.markup / 100))
        return total + (total * (retailer?.markup / 100))
    }

    return (
        <tr className="cart-items">
            <td>{item.flower.species}</td>
            <td>{item.amount}</td>
            <td>${calculateTotalPrice(item).toFixed(2)}</td>
        </tr>
    )
}