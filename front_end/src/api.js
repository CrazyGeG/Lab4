// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://3.136.25.8:9000', 
  });

// API Functions
export const getStudents = () => api.get('/students');
export const addStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const patchStudent = (id, partialData) => api.patch(`/students/${id}`, partialData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;
