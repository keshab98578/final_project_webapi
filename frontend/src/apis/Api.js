import axios from "axios";

//creating backend configuration

const Api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//make a config for token
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//Test Api
export const testApi = () => Api.get("/test");

// Register API
export const registerUserApi = (data) => Api.post("/api/user/create", data);

//Login API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

// create product API
export const createProductApi = (data) => Api.post("/api/product/create", data);

//get all products api
export const getAllProductsApi = () => Api.get("/api/product/get_all_products", config);
 

// get single product api
export const getSingleProductApi = (id) =>  Api.get(`/api/product/get_single_product/${id}`, config);


// delete product api
export const deleteProductApi = (id) =>  Api.delete(`/api/product/delete_product/${id}`,config);


// update product api
export const updateProductApi = (id, data) =>  Api.put(`/api/product/update_product/${id}`, data,config);
 



//http://localhost:5500/test