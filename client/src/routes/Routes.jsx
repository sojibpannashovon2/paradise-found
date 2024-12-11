import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/Signup";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddRoom from "../Pages/Dashboard/AddRoom";

import MyBookings from "../Pages/Dashboard/MyBookings";
import MyListings from "../Pages/Dashboard/MyListings";
import ManageBookings from "../Pages/Dashboard/ManageBookings";
import { getRoom } from "../Api/rooms";
import WriteReviews from "../component/RoomDetails/WriteReviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => getRoom(params.id),
      },
    ],
  },

  {
    path: "/room/review",
    element: <WriteReviews />,
  },

  //This section is Authentication part

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },

  //This section is Dashboard option

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/add-room",
        element: <AddRoom />,
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/my-listings",
        element: <MyListings></MyListings>,
      },
      {
        path: "/dashboard/manage-bookings",
        element: <ManageBookings />,
      },
    ],
  },
]);
