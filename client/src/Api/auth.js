//Save user to database

export const saveUser = (user) => {
  const currentUser = {
    email: user.email,
  };
  fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

//Become a host

export const becomeHost = async (email) => {
  const currentUser = {
    role: `host`,
  };
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  });
  return await res.json();
};

//Get user specific role

export const getRole = async (email) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${email}`,
    {
      method: "GET",
    }
  );
  const user = await response.json();
  return user?.role;
};
