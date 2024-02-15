import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { ROLES } from '../config/roles'
import { selectCurrentToken } from '../features/auth/authSlice'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isManager = false
  let isAdmin = false
  let status = ROLES.Employee

  if (token) {
    const decoded = jwtDecode(token)
    const { username, roles } = decoded.UserInfo

    isManager = roles.includes(ROLES.Manager)
    isAdmin = roles.includes(ROLES.Admin)

    if (isManager) status = ROLES.Manager
    if (isAdmin) status = ROLES.Admin

    return { username, roles, isManager, isAdmin, status }
  }

  return { username: '', roles: [], isManager, isAdmin, status }
}

export default useAuth
