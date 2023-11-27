//Save user to database

export const saveUser = (user) => {
      const currentUser = {
            email: user.email,
      }
      fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
            method: "PUT",
            headers: {
                  "content-type": "application/json",
            },
            body: JSON.stringify(currentUser)
      })

}

//Become a host


export const becomeHost = (email) => {
      const currentUser = {
            role: `host`,
      }
      fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
            method: "PUT",
            headers: {
                  "content-type": "application/json",
            },
            body: JSON.stringify(currentUser)
      })

}