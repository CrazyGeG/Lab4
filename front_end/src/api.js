// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Relative path since both are served from the same domain
  });

// API Functions
export const getStudents = () => api.get('/students');
export const addStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const patchStudent = (id, partialData) => api.patch(`/students/${id}`, partialData);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;