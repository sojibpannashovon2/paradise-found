//post booking information to database 

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

// Get all booking information

export const getAllBookings = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`)
      const data = await response.json()
      return data;
}
