import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, UserCog, Search } from "lucide-react";
import { toast } from "sonner";
import "./UsersManagment.css";
import Spinner from "../../../Spinner/Spinner";
import DeleteModal from "../../DeleteModal/DeleteModal";
import { deleteUser, getUsers, updateUserRole } from "../../../../api/userApi";


const UsersManagment = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");


    const [pagination, setPagination] = useState({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10
    });


    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        user: null
    });


    useEffect(() => {
          
        
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);


    useEffect(() => {
        fetchUsers(pagination.currentPage, pagination.pageSize, debouncedSearch);
    }, [pagination.currentPage, pagination.pageSize, debouncedSearch]);

    const fetchUsers = async (page, size, search) => {
        setLoading(true);
        try {
            const result = await getUsers(page, size, search);



            setUsers(result.content);
            setPagination(prev => ({
                ...prev,
                currentPage: result.number,
                totalPages: result.totalPages,
                totalElements: result.totalElements,
                pageSize: result.size
            }));
            console.log(result.totalElements)
        } catch (error) {
            toast.error("Failed to load users");
            console.error(error);
        } finally {
            console.log(users)
            // console.log(pagination)
            setLoading(false);
        }
    };

    const handlePageSizeChange = (newSize) => {
        setPagination(prev => ({ ...prev, pageSize: newSize, currentPage: 0 }));
    };

    const handleDeleteClick = (user) => {
        setDeleteModal({ isOpen: true, user });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteModal.user) return;

        try {
            await deleteUser(deleteModal.user.id);
            toast.success(`User ${deleteModal.user.username} deleted successfully`);


            fetchUsers(pagination.currentPage, pagination.pageSize, debouncedSearch);
        } catch (error) {
            toast.error("Failed to delete user");
            console.error(error);
        } finally {
            setDeleteModal({ isOpen: false, user: null });
        }
    };

    const handleRoleChangeClick = async (user, newRole) => {
        try {
            const updatedUser = await updateUserRole(user.id, newRole);

            setUsers(prev => prev.map(u =>
                u.id === updatedUser.id ? updatedUser : u
            ));

            toast.success(`${user.username} role updated to ${newRole}`);
        } catch (error) {
            toast.error("Failed to update user role");
            console.error(error);
        }
    };

    return (
        <div className="manage-users-page">
            <div className="manage-users-container">
                <Link to="/admin/ControlPanel" className="manage-users-back-link">
                    <ArrowLeft className="manage-users-back-icon" />
                    Back to Control Panel
                </Link>

                <div className="manage-users-header">
                    <h1 className="manage-users-title">Manage Users</h1>
                    <p className="manage-users-subtitle">View and manage user accounts and roles</p>
                </div>

                {loading ? (
                    <div className="manage-users-loading-container">
                        <Spinner size="lg" />
                        <p className="manage-users-loading-text">Loading users...</p>
                    </div>
                ) : (
                    <>

                        <div className="manage-users-search-container">
                            <Search className="manage-users-search-icon" />
                            <input
                                type="text"
                                placeholder="Search by username or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="manage-users-search-input"
                            />
                        </div>


                        <div className="manage-users-table-container">
                            <table className="manage-users-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="manage-users-empty-state">
                                                {debouncedSearch ? "No users found matching your search" : "No users found"}
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span className={`manage-users-role-badge manage-users-role-${user.role.toLowerCase()}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="manage-users-action-buttons">
                                                        {user.role === 'USER' && (
                                                            <button
                                                                onClick={() => handleRoleChangeClick(user, 'ADMIN')}
                                                                className="btn btn-outline btn-sm"
                                                                title="Promote to Admin"
                                                            >
                                                                <UserCog className="manage-users-action-icon" />
                                                                Promote
                                                            </button>
                                                        )}
                                                        {user.role === 'ADMIN' && (
                                                            <button
                                                                onClick={() => handleRoleChangeClick(user, 'USER')}
                                                                className="btn btn-outline btn-sm"
                                                                title="Demote to User"
                                                            >
                                                                <UserCog className="manage-users-action-icon" />
                                                                Demote
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="btn btn-outline btn-sm manage-users-btn-delete"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="manage-users-action-icon" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>


                        {users.length > 0 && (
                            <div className="manage-users-pagination-container">
                                <div className="manage-users-pagination-info">
                                    <span>
                                        Page {pagination.currentPage + 1} of {pagination.totalPages}
                                        ({pagination.totalElements} total users)
                                    </span>
                                </div>

                                <div className="manage-users-pagination-controls">
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                                        disabled={pagination.currentPage === 0}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                                        disabled={pagination.currentPage === pagination.totalPages - 1}
                                        className="btn btn-outline btn-sm"
                                    >
                                        Next
                                    </button>
                                </div>

                                <div className="manage-users-page-size-container">
                                    <label htmlFor="pageSize">Show:</label>
                                    <select
                                        id="pageSize"
                                        value={pagination.pageSize}
                                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                        className="manage-users-page-size-select"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>


            <DeleteModal
                isOpen={deleteModal.isOpen}
                itemName={deleteModal.user?.username || ''}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteModal({ isOpen: false, user: null })}
            />
        </div>
    );
};

export default UsersManagment;