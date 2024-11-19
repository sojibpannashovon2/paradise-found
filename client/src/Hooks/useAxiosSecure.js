import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

// ALL OPERARTION WILL BE DONE BY THIS AXIOS SECURE
const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    //Intercept Request(client ----- to ----server)
    axiosSecure.interceptors.request.use((config) => {
      const token = `Bearer ${localStorage.getItem("access-token")}`;
      if (token) {
        //Headers add to the every
        config.headers.Authorization = token;
      }
      return config;
    });
    //Intercept Response(server ---- to ---- client)
    axiosSecure.interceptors.response.use(
      (response) => response,

      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
