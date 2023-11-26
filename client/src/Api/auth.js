//Save user to database
import { json } from "react-router-dom"
export const saveUser = (user) => {
      const currentUser = {
            email: user.email,
      }
      fetch(`http://localhost:12000/users/${user?.email}`, {
            method: "PUT",
            headers: {
                  "content-type": "application/json",
            },
            body: JSON.stringify(currentUser)
      })

}