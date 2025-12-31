import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Input} from '../components/ui'
import {
  showError,
  validateEmail,
  validatePassword,
  getPasswordStrength,
  getErrorMessage,
} from '../utils/validation'

export const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(null)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 6 characters with uppercase, lowercase, and number'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      await signup(formData.full_name, formData.email, formData.password)
      navigate('/profile')
    } catch (error) {
      showError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white-600 via-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Create Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              label="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              name="full_name"
              error={errors.full_name}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              error={errors.email}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              error={errors.password}
              placeholder="Enter password"
              showPasswordToggle={true}
            />
            
          </div>

          <div>
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              error={errors.confirmPassword}
              placeholder="Re-enter password"
              showPasswordToggle={true}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full mb-4"
          >
            Create Account
          </Button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
