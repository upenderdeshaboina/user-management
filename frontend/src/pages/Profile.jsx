import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { userAPI } from '../api/apiClient'
import { Button, Input } from '../components/ui'
import { showSuccess, showError, getErrorMessage } from '../utils/validation'
import { formatDate } from '../utils/validation'

export const Profile = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)

  // Profile form
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  })
  const [profileErrors, setProfileErrors] = useState({})

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const validateProfileForm = () => {
    const newErrors = {}
    if (!profileData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required'
    }
    setProfileErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors = {}
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters'
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setPasswordErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    if (!validateProfileForm()) return

    setLoading(true)
    try {
      await userAPI.updateProfile(profileData)
      showSuccess('Profile updated successfully')
    } catch (error) {
      showError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (!validatePasswordForm()) return

    setLoading(true)
    try {
      await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      showSuccess('Password changed successfully')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      showError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div>
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 px-4 border-b-2 font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-2 px-4 border-b-2 font-semibold transition-colors ${
              activeTab === 'password'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Change Password
          </button>
        </div>

        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="mt-6">
            <div className="grid gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Account Details</h3>
                <div className="bg-gray-50 p-4 rounded space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Role:</span> {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Status:</span>{' '}
                    <span className={`${user?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {user?.status === 'active' ? ' Active' : ' Inactive'}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Member since:</span> {formatDate(user?.created_at)}
                  </p>
                </div>
              </div>

              <Input
                label="Full Name"
                value={profileData.full_name}
                onChange={handleProfileChange}
                name="full_name"
                error={profileErrors.full_name}
              />

              <Input
                label="Email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                name="email"
                error={profileErrors.email}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="primary" loading={loading}>
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setProfileData({
                    full_name: user?.full_name || '',
                    email: user?.email || '',
                  })
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {activeTab === 'password' && (
          <form onSubmit={handleChangePassword} className="mt-6 max-w-md">
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              name="currentPassword"
              error={passwordErrors.currentPassword}
            />

            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              name="newPassword"
              error={passwordErrors.newPassword}
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              name="confirmPassword"
              error={passwordErrors.confirmPassword}
            />

            <div className="flex gap-4 mt-4">
              <Button type="submit" variant="primary" loading={loading}>
                Change Password
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile
