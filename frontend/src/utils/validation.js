import toast from 'react-hot-toast'

export const showSuccess = (message) => toast.success(message)
export const showError = (message) => toast.error(message)
export const showInfo = (message) => toast(message)

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
  return regex.test(password)
}

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, text: 'No password' }
  if (password.length < 6) return { score: 1, text: 'Very weak' }
  if (!/[A-Z]/.test(password)) return { score: 2, text: 'Weak' }
  if (!/[0-9]/.test(password)) return { score: 3, text: 'Fair' }
  if (password.length < 12) return { score: 4, text: 'Good' }
  return { score: 5, text: 'Strong' }
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.response?.data?.errors) {
    return error.response.data.errors[0]?.msg || 'An error occurred'
  }
  return error.message || 'An error occurred'
}
