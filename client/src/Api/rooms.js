//Add a room to database

export const addRoom = async (roomData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(roomData),
  });

  const data = await response.json();
  return data;
};

// Get all rooms data

// export const getAllRooms = async () => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);
//   const data = await response.json();
//   return data;
// };

export const getAllRooms = async (search = "") => {
  const query = search ? `?search=${encodeURIComponent(search)}` : ""; // Add search query if provided
  const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms${query}`);
  const data = await response.json();
  return data;
};

// Get filtered  rooms for host

// export const getHostsRooms = async (email) => {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${email}`, {
//             headers: {
//                   authorization: `Bearer ${localStorage.getItem("access-token")}`
//             },
//       })
//       const data = await response.json()
//       return data;
// }
// delete host rooms data

export const deleteHostsRooms = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Get A Single rooms data

export const getRoom = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/room/${id}`);
  const data = await response.json();
  return data;
};
