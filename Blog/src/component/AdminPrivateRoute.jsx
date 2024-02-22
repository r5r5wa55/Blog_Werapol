import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"




export default function AdminPrivateRoute() {

    const {currenUser} = useSelector(state => state.user)
  return currenUser.isAdmin ? < Outlet /> : <Navigate to='/sign-in' />
}
