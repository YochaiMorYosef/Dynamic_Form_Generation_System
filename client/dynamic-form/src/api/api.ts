import axios from "axios";
import { log } from "console";

const API_URL = "http://127.0.0.1:8000";

export const getSchema = async () => {
  const response = await axios.get(`${API_URL}/schema`);
  return response.data;
};

export const submitForm = async (data: any) => {
  const response = await axios.post(`${API_URL}/submissions`, { data });
  return response;
};

export const getSubmissions = async () => {
  const response = await axios.get(`${API_URL}/submissions`);
  return response.data;
};

export const getTotalSubmissions = async () => {
  const response = await axios.get(`${API_URL}/totalsubmissions`);
  return response.data;
};

// export const deleteSubmissions = async (data: any) => {
//   const response = await axios.delete(`${API_URL}/submissions`);
//   return response.data;
// };
