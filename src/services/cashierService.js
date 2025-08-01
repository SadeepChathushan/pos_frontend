// src/services/authService.js
import api from "../api/axios";

export const cashierService = {
  getitem: async () => {
    return api.get("/api/v1/cashier/get-items").then((res) => res.data);
  },
  insertBilldata: async (billData) => {
    return api
      .post("/api/v1/cashier/invoices", billData)
      .then((res) => res.data);
  },
  updateItemtotal: async (updateData) => {
    return api
      .put("/api/v1/cashier/bulk-update", updateData)
      .then((res) => res.data);
  },
  insertPayment: async (paymentData) => {
    return api
      .post("/api/v1/cashier/payment", paymentData)
      .then((res) => res.data);
  },
};
