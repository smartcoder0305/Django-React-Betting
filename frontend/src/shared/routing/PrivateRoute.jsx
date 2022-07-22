import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'

export const PrivateRoute = ({ component: Component }) => {
  const auth = useContext(AuthContext)
  console.log(auth.token)
  if(auth.token) {
    return <Component />
  } else {
    return <Navigate to="/login" />
  }
}