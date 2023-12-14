//post booking information to database 

import { id } from "date-fns/locale";

export const addBooking = async bookingData => {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
            method: "POST",
            headers: {
                  "content-type": "application/json",
            },
            body: JSON.stringify(bookingData),
      })

      const data = await response.json()
      return data;
}

//update room status

export const updateStatus = async (id, status) => {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/status/${id}`, {
            method: "PATCH",
            headers: {
                  'content-type': 'application/json'
            },
            body: JSON.stringify({ status })
      })

      const data = await response.json()
      return data

}

// Get all booking information(user & host can see the information)

export const getAllBookings = async (email) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${email}`)
      const data = await response.json()
      return data;
}
// Get all booking information( host can see the information)

export const getHostBookings = async (email) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/host?email=${email}`)
      const data = await response.json()
      return data;
}

export const deleteBookings = async (id) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
            method: "DELETE",
            headers: {
                  "content-type": "application/json"
            }
      })
      const data = await response.json();
      return data;
}

//payment related

export const addPayment = async (price) => {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                  "content-type": "application/json",
            },
            body: JSON.stringify(price),
      })

      const data = await response.json()
      return data;
}
