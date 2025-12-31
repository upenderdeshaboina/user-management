import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui'

export const Navbar = () => {
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
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">User Management System</h1>
            <div className="hidden md:flex gap-4">
              {user?.role === 'admin' && (
                <a
                  href="/dashboard"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                >
                  Dashboard
                </a>
              )}
              <a
                href="/profile"
                className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
              >
                Profile
              </a>
            </div>
          </div>
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
      </div>
    </nav>
  )
}

export default Navbar
