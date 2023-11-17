import axios from "axios";

export const rootURL: string = import.meta.env.VITE_BASE_URL;

// configuring axios on initial load with the authorization token from localstorage it exists

const instance = axios.create({
  baseURL: rootURL,
  timeout: 10000,
  headers: {
    Authorization:
      sessionStorage.getItem("token") || localStorage.getItem("token")
        ? `Bearer ${
            sessionStorage.getItem("token") || localStorage.getItem("token")
          }`
        : "",
    accept: "*/*",
  },
});

// update authorization token from instance if exists or remove if not exists
export const updateInstanceAuthorization = () => {
  instance.interceptors.request.use((req: any) => {
    req.headers["Authorization"] =
      sessionStorage.getItem("token") || localStorage.getItem("token")
        ? `Bearer ${
            sessionStorage.getItem("token") || localStorage.getItem("token")
          }`
        : "";
    return req;
  });
};

export default instance;
