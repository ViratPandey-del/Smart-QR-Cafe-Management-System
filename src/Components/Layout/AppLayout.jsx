import { Footer } from "../UI/Footer"
import { Outlet } from "react-router-dom"
import { Header } from "../UI/Header"


export const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

