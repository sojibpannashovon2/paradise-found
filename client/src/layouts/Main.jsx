import { Outlet } from "react-router-dom"
import Navbar from "../component/Shared/Navbar/Navbar"

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Main
