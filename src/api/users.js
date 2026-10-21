import api from "./axios"; 

// 1. Get All Users (Admin)
export const getAllUsers = () => api.get("/users");

// 2. Update User Role (Admin)

export const updateUserRole = (userId, role) => api.patch(`/users/${userId}/role`, { role });

// 3. Delete User (Admin)
export const deleteUser = (userId) => api.delete(`/users/${userId}`);