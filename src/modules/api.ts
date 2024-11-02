import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
});

export const getProducts = async () => {
  try {
    const response = await api.get("products?skip=30&limit=150");
    return response.data.products;
  } catch (error: any) {
    console.error(
      `Error fetching products: ${error.response?.status} - ${error.response?.statusText}`
    );
    throw new Error(
      `Failed to fetch products: ${error.response?.statusText || error.message}`
    );
  }
};

export const getProductById = async (id: string | number) => {
  try {
    const response = await api.get(`products/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching product by ID: ${error.response?.status} - ${error.response?.statusText}`
    );
    throw new Error(
      `Failed to fetch product: ${error.response?.statusText || error.message}`
    );
  }
};
