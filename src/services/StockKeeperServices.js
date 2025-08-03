
import api from "../api/axios";  // ← Adjust path if your folder structure differs

// All endpoints under this base path:
const BASE_PATH = "/api/v1/stokkeeper";

/**
 * Add a new stock item
 * @param {Object} itemData  – payload matching your backend DTO
 * @returns {Promise<Object>}  the server’s JSON response
 */
export const addItem = async (itemData) => {
  // console.log("itemdata" ,itemData);
  try {
    // because api.baseURL = VITE_API_BASE_URL (e.g. http://localhost:8082)
    // this fires a POST to http://localhost:8082/api/v1/stockkeeper/add-item
    const { data } = await api.post(
      `${BASE_PATH}/add-item`,
      itemData
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error adding item (status):", err.response?.status);
    console.error("Error adding item (body):", err.response?.data);
    throw new Error("Failed to add item");
  }
};


// Fetch all items 

export const fetchAllItems = async () => {
  try {

    const res = await api.get(`${BASE_PATH}/item/name-id`);
    return res.data.data.map(str => {
      const [id, ...nameParts] = str.split(" - ");
      return { id: Number(id.trim()), name: nameParts.join(" - ").trim() };
    });

  } catch (err) {
    throw new Error ("Failed to fetch item");
  }

};


// Submit Order

export const submitOrder = async (orders) => {
  try {

    const { data} = await api.post(`${BASE_PATH}/add-order`, { orders });
    console.log(data);
    return data;

  } catch {

    throw new Error ("Failed to add order");

  }
};



// get items with batches

export const fetchItemsWithBatches = async () => {
  try{

    const { data } = await api.get(`${BASE_PATH}/items-with-batches`);

    return data.data || [] ;

  } catch (err) {
    throw new Error (" Failed to fetch items with batches");
  }
  
};