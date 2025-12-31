import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui'

export const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="bg-blue-600 text-white shadow-lg">
      
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{user?.full_name}</p>
              <p className="text-sm capitalize text-blue-100">{user?.role}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout} className="ml-4">
              Logout
            </Button>
          </div>
    </div>
  )
}

export default Profile
