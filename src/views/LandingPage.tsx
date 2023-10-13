import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const LandingPage = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default LandingPage
