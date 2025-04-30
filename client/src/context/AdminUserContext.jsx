import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (config) => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    const token = adminData?.token;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

export const getAllUsers = async () => {
  try {
    const { data } = await API.get("/admin/users");
    return data;
  } catch (err) {
    console.error("Fetch users failed", err);
    return null;
  }
};

export const deleteUserById = async (id) => {
  try {
    await API.delete(`/admin/users/${id}`);
    return true;
  } catch (err) {
    console.error("Delete failed", err);
    return false;
  }
};

export const getUserDetails = async (id) => {
  try {
    const { data } = await API.get(`/admin/users/${id}`);
    return data;
  } catch (err) {
    console.error("Fetch user details failed", err);
    return null;
  }
};
