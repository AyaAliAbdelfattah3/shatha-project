import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectAdminRoutes = () => {
  const { user, initializing } = useSelector((state) => state.auth)

  if (initializing) return null

  // التثبت من وجود المستخدم + امتلاكه صلاحية الأدمن
  const isAdmin = user && (user.role === 'admin' || user.isAdmin === true)

  return (
    isAdmin ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default ProtectAdminRoutes