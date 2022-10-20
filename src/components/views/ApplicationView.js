import { Outlet, Route, Routes } from "react-router-dom"
import { DistributorList } from "../distributors/DistributorList"
import { NurseryList } from "../nurseries/NurseryList"
import { RetailerList } from "../retailers/RetailerList"

export const ApplicationView = () => {
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
            <Route path="retailers" element={<RetailerList />} />
        </Route>
    </Routes>
}