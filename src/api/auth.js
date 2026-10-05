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
