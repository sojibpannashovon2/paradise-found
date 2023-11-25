import { Outlet } from "react-router-dom"
import Navbar from "../component/Shared/Navbar/Navbar"
import Footer from "../component/Shared/Footer/Footer"

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer />
    </div>
  )
}

export default Main
