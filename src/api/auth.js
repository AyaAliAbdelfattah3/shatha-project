// this file for orders from server

  import api from "./axios"




export const register = (name,email,password)=>{
    return api.post ("/auth/register", {name,email,password})
}

export const login = (email,password)=>{
   return api.post ("/auth/login", {email,password})

}

//ترسل طلب للسيرفر للتاكد من صلاحيه التوكن 
export const meData =() => {
  return  api.get("/auth/me")
}

//ترسل طلب للسيرفر بان المستخدم سجل خروج ليقوم بتنظيف ال سيشن
export const logout =() =>{
   return  api.post("/auth/logout")
}
// 1. تحديث البيانات الشخصية
export const updateUserProfile = (data) => api.put("/auth/profile", data);

// 2. تحديث الباسورد
export const updateUserPassword = (data) => api.put("/auth/password", data);

// 3. تحديث الصورة الشخصية (لازم FormData عشان الصورة)
export const updateUserAvatar = (formData) => api.put("/auth/avatar", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});