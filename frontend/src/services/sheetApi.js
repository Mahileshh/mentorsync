        import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const sheetApi = {
  // Fetch ALL departments from MongoDB
  getAllDepartments: async () => {
    const response = await axios.get(`${API_BASE_URL}/departments/all`);
    return response.data.data;
  },

  // Fetch single department from MongoDB
  getDepartment: async (deptName) => {
    const response = await axios.get(`${API_BASE_URL}/departments/${deptName}`);
    return response.data;
  },

  // Get metadata from MongoDB
  getMetadata: async () => {
    const response = await axios.get(`${API_BASE_URL}/metadata`);
    return response.data.metadata;
  },

  // Get all raw data from MongoDB
  getAllData: async () => {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data.data;
  },

  // Add new document to MongoDB
  addDocument: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/data`, data);
    return response.data;
  },

  // Update document in MongoDB
  updateDocument: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/data/${id}`, data);
    return response.data;
  },

  // Delete document from MongoDB
  deleteDocument: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/data/${id}`);
    return response.data;
  }
};