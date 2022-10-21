import { Outlet, Route, Routes } from "react-router-dom"
import { MyCart } from "../cart/MyCart"
import { DistributorList } from "../distributors/DistributorList"
import { NurseryList } from "../nurseries/NurseryList"
import { RetailerList } from "../retailers/RetailerList"

export const ApplicationView = ({ updateCartLength, cartLength }) => {
    return <Routes>
        <Route path="/" element={
            <>
                <h1 id="main-h1">Thorns & Roses</h1>
                <h4 id="main-h4">Ouch!</h4>

                <Outlet />
            </>
        }>
            <Route path="nurseries" element={<NurseryList />} />
            <Route path="distributors" element={<DistributorList />} />
            <Route path="retailers" element={<RetailerList cartLength={cartLength} updateCartLength={updateCartLength} />} />
            <Route path="cart/:customerId" element={<MyCart />} />
        </Route>
    </Routes>
}