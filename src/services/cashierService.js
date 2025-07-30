// src/services/authService.js
import api from "../api/axios";

export const cashierService = {
  getitem: async () => {
    return api.get("/api/v1/cashier/get-items").then((res) => res.data);
  },
};
