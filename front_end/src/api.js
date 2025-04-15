// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.136.25.8:9000', 
});

// API Functions (prepend /api to all routes)
export const getStudents = () => api.get('/api/students');
export const addStudent = (student) => api.post('/api/students', student);
export const updateStudent = (id, student) => api.put(`/api/students/${id}`, student);
export const patchStudent = (id, partialData) => api.patch(`/api/students/${id}`, partialData);
export const deleteStudent = (id) => api.delete(`/api/students/${id}`);

export default api;

