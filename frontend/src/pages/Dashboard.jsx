import { useState, useEffect } from 'react'
import { userAPI } from '../api/apiClient'
import { Button, ConfirmDialog, LoadingSpinner, Pagination } from '../components/ui'
import { showSuccess, showError, getErrorMessage, formatDate } from '../utils/validation'

export const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
    action: null,
    userName: null,
  })
  const [actionLoading, setActionLoading] = useState(false)

  const fetchUsers = async (page = 1) => {
    setLoading(true)
    try {
      const response = await userAPI.getAllUsers(page, 10)
      setUsers(response.data.users)
      setCurrentPage(response.data.pagination.page)
      setTotalPages(response.data.pagination.pages)
    } catch (error) {
      showError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(1)
  }, [])

  const handlePageChange = (page) => {
    fetchUsers(page)
  }

  const openConfirmDialog = (userId, action, userName) => {
    setConfirmDialog({
      isOpen: true,
      userId,
      action,
      userName,
    })
  }

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      userId: null,
      action: null,
      userName: null,
    })
  }

  const handleConfirmAction = async () => {
    const { userId, action } = confirmDialog
    setActionLoading(true)

    try {
      await userAPI.updateUserStatus(userId, action)
      showSuccess(
        `User ${action === 'active' ? 'activated' : 'deactivated'} successfully`
      )
      fetchUsers(currentPage)
      closeConfirmDialog()
    } catch (error) {
      showError(getErrorMessage(error))
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div>
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Joined
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Last Login
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{user.full_name}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                            user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                        >
                        {user.role === 'admin' ? (
                            <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                            </svg>
                            Admin
                            </>
                        ) : (
                            <>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16" 
                                    fill="currentColor" 
                                    viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                             User
                            </>
                        )}
                        </span>

                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.last_login ? formatDate(user.last_login) : 'Never'}
                  </td>
                  <td className="px-4 py-3 text-sm space-x-2">
                    {user.status === 'active' ? (
                      <Button
                        variant="danger"
                        className="px-3 py-1 text-xs"
                        onClick={() =>
                          openConfirmDialog(user.id, 'inactive', user.full_name)
                        }
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="px-3 py-1 text-xs"
                        onClick={() =>
                          openConfirmDialog(user.id, 'active', user.full_name)
                        }
                      >
                        Activate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found</p>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.action === 'active'
            ? `Activate ${confirmDialog.userName}?`
            : `Deactivate ${confirmDialog.userName}?`
        }
        message={`Are you sure you want to ${
          confirmDialog.action === 'active' ? 'activate' : 'deactivate'
        } this user account?`}
        confirmText={confirmDialog.action === 'active' ? 'Activate' : 'Deactivate'}
        variant={confirmDialog.action === 'active' ? 'success' : 'danger'}
        isLoading={actionLoading}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmDialog}
      />
    </div>
  )
}

export default Dashboard
