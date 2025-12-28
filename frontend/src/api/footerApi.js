import api from "./apiClient.js";

export const fetchFooter = async () => {
  const response = await api.get("/constants/footer"); // no token needed
  return response.data;
};
