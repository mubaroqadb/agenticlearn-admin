/**
 * User Management Module for AgenticLearn Admin Portal
 * Comprehensive user management for students, educators, and admins
 */

import UIComponents from '../core/ui-components.js';

class UserManagementModule {
    constructor(apiClient) {
        this.api = apiClient;
        this.users = [];
        this.isLoading = false;
    }

    /**
     * Render the user management interface
     */
    async render() {
        try {
            console.log('👥 Rendering User Management module...');
            
            const container = document.getElementById('users-content');
            if (!container) {
                console.error('❌ User Management container not found');
                return;
            }

            // Show loading state
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <h3>👥 Loading User Management...</h3>
                    <p>Fetching user data and permissions</p>
                </div>
            `;

            // Load user data
            await this.loadUserData();

            // Render user management interface
            this.renderUserInterface(container);

            console.log('✅ User Management module rendered successfully');

        } catch (error) {
            console.error('❌ Failed to render user management:', error);
            
            const container = document.getElementById('users-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-state">
                        <div class="error-icon">❌</div>
                        <h3>Failed to Load User Management</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.users.retry()">
                            🔄 Retry
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Load user data from backend
     */
    async loadUserData() {
        try {
            console.log('👥 Loading user data from backend...');
            this.isLoading = true;

            const usersResponse = await this.api.getUsers();
            if (usersResponse.success) {
                this.users = usersResponse.data;
                console.log('✅ User data loaded from backend');
            } else {
                // Use mock data for demo
                this.users = this.getMockUserData();
                console.log('⚠️ Using mock user data');
            }

        } catch (error) {
            console.error('❌ Failed to load user data:', error);
            this.users = this.getMockUserData();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get comprehensive mock user data
     */
    getMockUserData() {
        return [
            {
                id: 'user_001',
                name: 'Sarah Johnson',
                email: 'sarah.johnson@email.com',
                role: 'Student',
                status: 'Active',
                lastLogin: '2025-06-28T10:30:00Z',
                joinDate: '2025-06-01T00:00:00Z',
                avatar: 'SJ',
                courses: 3,
                completedAssignments: 12,
                gpa: 3.8,
                location: 'New York, USA'
            },
            {
                id: 'user_002',
                name: 'Dr. Michael Chen',
                email: 'michael.chen@agenticlearn.com',
                role: 'Educator',
                status: 'Active',
                lastLogin: '2025-06-28T09:15:00Z',
                joinDate: '2025-05-15T00:00:00Z',
                avatar: 'MC',
                courses: 5,
                students: 89,
                rating: 4.9,
                location: 'California, USA'
            },
            {
                id: 'user_003',
                name: 'Admin User',
                email: 'admin@agenticlearn.com',
                role: 'Administrator',
                status: 'Active',
                lastLogin: '2025-06-28T11:00:00Z',
                joinDate: '2025-01-01T00:00:00Z',
                avatar: 'AU',
                permissions: ['all'],
                location: 'System'
            },
            {
                id: 'user_004',
                name: 'Emma Wilson',
                email: 'emma.wilson@email.com',
                role: 'Student',
                status: 'Active',
                lastLogin: '2025-06-28T08:45:00Z',
                joinDate: '2025-05-20T00:00:00Z',
                avatar: 'EW',
                courses: 2,
                completedAssignments: 8,
                gpa: 3.6,
                location: 'London, UK'
            },
            {
                id: 'user_005',
                name: 'Prof. David Kim',
                email: 'david.kim@agenticlearn.com',
                role: 'Educator',
                status: 'Active',
                lastLogin: '2025-06-28T07:20:00Z',
                joinDate: '2025-04-10T00:00:00Z',
                avatar: 'DK',
                courses: 3,
                students: 67,
                rating: 4.7,
                location: 'Seoul, Korea'
            },
            {
                id: 'user_006',
                name: 'Alex Rodriguez',
                email: 'alex.rodriguez@email.com',
                role: 'Student',
                status: 'Inactive',
                lastLogin: '2025-06-25T14:30:00Z',
                joinDate: '2025-05-05T00:00:00Z',
                avatar: 'AR',
                courses: 1,
                completedAssignments: 3,
                gpa: 2.9,
                location: 'Madrid, Spain'
            },
            {
                id: 'user_007',
                name: 'Lisa Zhang',
                email: 'lisa.zhang@email.com',
                role: 'Student',
                status: 'Active',
                lastLogin: '2025-06-28T12:15:00Z',
                joinDate: '2025-06-10T00:00:00Z',
                avatar: 'LZ',
                courses: 4,
                completedAssignments: 15,
                gpa: 4.0,
                location: 'Singapore'
            },
            {
                id: 'user_008',
                name: 'Dr. Maria Santos',
                email: 'maria.santos@agenticlearn.com',
                role: 'Educator',
                status: 'Active',
                lastLogin: '2025-06-28T11:45:00Z',
                joinDate: '2025-03-15T00:00:00Z',
                avatar: 'MS',
                courses: 4,
                students: 112,
                rating: 4.8,
                location: 'São Paulo, Brazil'
            }
        ];
    }

    /**
     * Render comprehensive user management interface
     */
    renderUserInterface(container) {
        const students = this.users.filter(u => u.role === 'Student');
        const educators = this.users.filter(u => u.role === 'Educator');
        const admins = this.users.filter(u => u.role === 'Administrator');
        const activeUsers = this.users.filter(u => u.status === 'Active');

        container.innerHTML = `
            <div class="user-management-header">
                <div class="page-header">
                    <h2 class="page-title">👥 User Management</h2>
                    <p class="page-subtitle">Comprehensive user management for students, educators, and administrators</p>
                </div>

                <div class="user-actions">
                    <button class="btn btn-secondary" onclick="window.adminPortal.modules.users.exportUsers()">
                        📊 Export Users
                    </button>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.users.addUser()">
                        ➕ Add User
                    </button>
                </div>
            </div>

            <!-- User Statistics -->
            <div class="user-stats-grid">
                ${UIComponents.createStatsCard('Total Students', students.length, '🎓', null, 'primary')}
                ${UIComponents.createStatsCard('Total Educators', educators.length, '👨‍🏫', null, 'success')}
                ${UIComponents.createStatsCard('Administrators', admins.length, '👑', null, 'warning')}
                ${UIComponents.createStatsCard('Active Users', activeUsers.length, '🟢', null, 'info')}
            </div>

            <!-- User Filters -->
            <div class="user-filters">
                <div class="filter-section">
                    <label class="filter-label">Filter by Role:</label>
                    <select class="filter-select" id="role-filter" onchange="window.adminPortal.modules.users.filterUsers()">
                        <option value="all">All Roles</option>
                        <option value="Student">Students</option>
                        <option value="Educator">Educators</option>
                        <option value="Administrator">Administrators</option>
                    </select>
                </div>

                <div class="filter-section">
                    <label class="filter-label">Filter by Status:</label>
                    <select class="filter-select" id="status-filter" onchange="window.adminPortal.modules.users.filterUsers()">
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div class="filter-section">
                    <label class="filter-label">Search Users:</label>
                    <input type="text" class="filter-input" id="user-search" placeholder="Search by name or email..."
                           oninput="window.adminPortal.modules.users.searchUsers(this.value)">
                </div>
            </div>

            <!-- User Cards Grid -->
            <div class="users-grid" id="users-grid">
                ${this.renderUserCards()}
            </div>

            <!-- User Table (Alternative View) -->
            <div class="view-toggle">
                <button class="btn btn-secondary" onclick="window.adminPortal.modules.users.toggleView('cards')" id="cards-view">
                    🔲 Card View
                </button>
                <button class="btn btn-secondary" onclick="window.adminPortal.modules.users.toggleView('table')" id="table-view">
                    📋 Table View
                </button>
            </div>

            <div class="user-table-container" id="user-table" style="display: none;">
                ${this.renderUserTable()}
            </div>
        `;

        // Add user management styles
        this.addUserManagementStyles();
    }

    /**
     * Render user cards
     */
    renderUserCards() {
        return this.users.map(user => `
            <div class="user-card" data-role="${user.role}" data-status="${user.status}">
                <div class="user-card-header">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-status-indicator status-${user.status.toLowerCase()}"></div>
                </div>

                <div class="user-card-content">
                    <h3 class="user-name">${user.name}</h3>
                    <p class="user-email">${user.email}</p>
                    <div class="user-role-badge">
                        ${UIComponents.createBadge(user.role, user.role.toLowerCase())}
                    </div>

                    <div class="user-details">
                        ${this.renderUserStats(user)}
                    </div>

                    <div class="user-meta">
                        <div class="meta-item">
                            <span class="meta-label">Last Login:</span>
                            <span class="meta-value">${UIComponents.formatDate(user.lastLogin, 'short')}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Location:</span>
                            <span class="meta-value">${user.location}</span>
                        </div>
                    </div>
                </div>

                <div class="user-card-actions">
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.users.viewUser('${user.id}')">
                        👁️ View
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.users.editUser('${user.id}')">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.users.deleteUser('${user.id}')">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render user-specific stats
     */
    renderUserStats(user) {
        switch (user.role) {
            case 'Student':
                return `
                    <div class="stat-item">
                        <span class="stat-label">Courses:</span>
                        <span class="stat-value">${user.courses}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Assignments:</span>
                        <span class="stat-value">${user.completedAssignments}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">GPA:</span>
                        <span class="stat-value">${user.gpa}</span>
                    </div>
                `;
            case 'Educator':
                return `
                    <div class="stat-item">
                        <span class="stat-label">Courses:</span>
                        <span class="stat-value">${user.courses}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Students:</span>
                        <span class="stat-value">${user.students}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rating:</span>
                        <span class="stat-value">⭐ ${user.rating}</span>
                    </div>
                `;
            case 'Administrator':
                return `
                    <div class="stat-item">
                        <span class="stat-label">Permissions:</span>
                        <span class="stat-value">${user.permissions ? user.permissions.join(', ') : 'Limited'}</span>
                    </div>
                `;
            default:
                return '';
        }
    }

    /**
     * Render user table
     */
    renderUserTable() {
        const headers = [
            { key: 'avatar', label: '' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
            { key: 'status', label: 'Status' },
            { key: 'lastLogin', label: 'Last Login' },
            { key: 'actions', label: 'Actions' }
        ];

        const rows = this.users.map(user => ({
            avatar: `<div class="table-avatar">${user.avatar}</div>`,
            name: user.name,
            email: user.email,
            role: UIComponents.createBadge(user.role, user.role.toLowerCase()),
            status: UIComponents.createBadge(user.status, user.status.toLowerCase()),
            lastLogin: UIComponents.formatDate(user.lastLogin, 'short'),
            actions: `
                <div class="table-actions">
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.users.viewUser('${user.id}')">View</button>
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.users.editUser('${user.id}')">Edit</button>
                </div>
            `
        }));

        return UIComponents.createDataTable(headers, rows, {
            searchable: false, // We have custom search
            sortable: true,
            pagination: true
        });
    }

    /**
     * Filter users by role and status
     */
    filterUsers() {
        const roleFilter = document.getElementById('role-filter').value;
        const statusFilter = document.getElementById('status-filter').value;

        const userCards = document.querySelectorAll('.user-card');

        userCards.forEach(card => {
            const userRole = card.dataset.role;
            const userStatus = card.dataset.status;

            const roleMatch = roleFilter === 'all' || userRole === roleFilter;
            const statusMatch = statusFilter === 'all' || userStatus === statusFilter;

            if (roleMatch && statusMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Search users by name or email
     */
    searchUsers(query) {
        const searchTerm = query.toLowerCase();
        const userCards = document.querySelectorAll('.user-card');

        userCards.forEach(card => {
            const userName = card.querySelector('.user-name').textContent.toLowerCase();
            const userEmail = card.querySelector('.user-email').textContent.toLowerCase();

            if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Toggle between card and table view
     */
    toggleView(viewType) {
        const cardsGrid = document.getElementById('users-grid');
        const tableContainer = document.getElementById('user-table');
        const cardsBtn = document.getElementById('cards-view');
        const tableBtn = document.getElementById('table-view');

        if (viewType === 'cards') {
            cardsGrid.style.display = 'grid';
            tableContainer.style.display = 'none';
            cardsBtn.classList.add('active');
            tableBtn.classList.remove('active');
        } else {
            cardsGrid.style.display = 'none';
            tableContainer.style.display = 'block';
            cardsBtn.classList.remove('active');
            tableBtn.classList.add('active');
        }
    }

    /**
     * View user details
     */
    viewUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modalContent = `
            <div class="user-detail-modal">
                <div class="user-detail-header">
                    <div class="user-avatar-large">${user.avatar}</div>
                    <div class="user-detail-info">
                        <h2>${user.name}</h2>
                        <p>${user.email}</p>
                        <div class="user-badges">
                            ${UIComponents.createBadge(user.role, user.role.toLowerCase())}
                            ${UIComponents.createBadge(user.status, user.status.toLowerCase())}
                        </div>
                    </div>
                </div>

                <div class="user-detail-content">
                    <div class="detail-section">
                        <h3>Account Information</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>User ID:</label>
                                <span>${user.id}</span>
                            </div>
                            <div class="detail-item">
                                <label>Join Date:</label>
                                <span>${UIComponents.formatDate(user.joinDate, 'long')}</span>
                            </div>
                            <div class="detail-item">
                                <label>Last Login:</label>
                                <span>${UIComponents.formatDate(user.lastLogin, 'long')}</span>
                            </div>
                            <div class="detail-item">
                                <label>Location:</label>
                                <span>${user.location}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Performance Metrics</h3>
                        <div class="metrics-grid">
                            ${this.renderUserStats(user)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.createModal(`User Details - ${user.name}`, modalContent, {
            size: 'large',
            actions: [
                { label: 'Edit User', type: 'primary', onclick: `window.adminPortal.modules.users.editUser('${userId}'); this.closest('.modal').remove();` },
                { label: 'Close', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Edit user
     */
    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modalContent = `
            <form class="user-edit-form" onsubmit="window.adminPortal.modules.users.saveUser(event, '${userId}')">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="edit-name">Full Name</label>
                        <input type="text" id="edit-name" value="${user.name}" required>
                    </div>

                    <div class="form-group">
                        <label for="edit-email">Email Address</label>
                        <input type="email" id="edit-email" value="${user.email}" required>
                    </div>

                    <div class="form-group">
                        <label for="edit-role">Role</label>
                        <select id="edit-role" required>
                            <option value="Student" ${user.role === 'Student' ? 'selected' : ''}>Student</option>
                            <option value="Educator" ${user.role === 'Educator' ? 'selected' : ''}>Educator</option>
                            <option value="Administrator" ${user.role === 'Administrator' ? 'selected' : ''}>Administrator</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit-status">Status</label>
                        <select id="edit-status" required>
                            <option value="Active" ${user.status === 'Active' ? 'selected' : ''}>Active</option>
                            <option value="Inactive" ${user.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit-location">Location</label>
                        <input type="text" id="edit-location" value="${user.location}">
                    </div>
                </div>
            </form>
        `;

        UIComponents.createModal(`Edit User - ${user.name}`, modalContent, {
            size: 'medium',
            actions: [
                { label: 'Save Changes', type: 'primary', onclick: `window.adminPortal.modules.users.saveUser(null, '${userId}')` },
                { label: 'Cancel', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Save user changes
     */
    saveUser(event, userId) {
        if (event) event.preventDefault();

        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const role = document.getElementById('edit-role').value;
        const status = document.getElementById('edit-status').value;
        const location = document.getElementById('edit-location').value;

        // Update user in local data (in real app, this would call API)
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                ...this.users[userIndex],
                name,
                email,
                role,
                status,
                location
            };
        }

        // Close modal and refresh view
        document.querySelector('.modal').remove();
        this.refreshUserDisplay();

        UIComponents.showNotification(`User ${name} updated successfully`, 'success');
    }

    /**
     * Delete user
     */
    deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const confirmContent = `
            <div class="delete-confirmation">
                <div class="warning-icon">⚠️</div>
                <h3>Delete User</h3>
                <p>Are you sure you want to delete <strong>${user.name}</strong>?</p>
                <p class="warning-text">This action cannot be undone.</p>
            </div>
        `;

        UIComponents.createModal('Confirm Deletion', confirmContent, {
            size: 'small',
            actions: [
                { label: 'Delete User', type: 'error', onclick: `window.adminPortal.modules.users.confirmDelete('${userId}')` },
                { label: 'Cancel', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Confirm user deletion
     */
    confirmDelete(userId) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            const userName = this.users[userIndex].name;
            this.users.splice(userIndex, 1);

            // Close modal and refresh view
            document.querySelector('.modal').remove();
            this.refreshUserDisplay();

            UIComponents.showNotification(`User ${userName} deleted successfully`, 'success');
        }
    }

    /**
     * Add new user
     */
    addUser() {
        const modalContent = `
            <form class="user-add-form" onsubmit="window.adminPortal.modules.users.createUser(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="new-name">Full Name</label>
                        <input type="text" id="new-name" required>
                    </div>

                    <div class="form-group">
                        <label for="new-email">Email Address</label>
                        <input type="email" id="new-email" required>
                    </div>

                    <div class="form-group">
                        <label for="new-role">Role</label>
                        <select id="new-role" required>
                            <option value="">Select Role</option>
                            <option value="Student">Student</option>
                            <option value="Educator">Educator</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="new-location">Location</label>
                        <input type="text" id="new-location">
                    </div>
                </div>
            </form>
        `;

        UIComponents.createModal('Add New User', modalContent, {
            size: 'medium',
            actions: [
                { label: 'Create User', type: 'primary', onclick: 'window.adminPortal.modules.users.createUser()' },
                { label: 'Cancel', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Create new user
     */
    createUser(event) {
        if (event) event.preventDefault();

        const name = document.getElementById('new-name').value;
        const email = document.getElementById('new-email').value;
        const role = document.getElementById('new-role').value;
        const location = document.getElementById('new-location').value;

        if (!name || !email || !role) {
            UIComponents.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Create new user object
        const newUser = {
            id: `user_${Date.now()}`,
            name,
            email,
            role,
            status: 'Active',
            lastLogin: new Date().toISOString(),
            joinDate: new Date().toISOString(),
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
            location: location || 'Unknown',
            courses: 0,
            completedAssignments: 0,
            gpa: 0,
            students: 0,
            rating: 0,
            permissions: role === 'Administrator' ? ['all'] : []
        };

        // Add to users array
        this.users.push(newUser);

        // Close modal and refresh view
        document.querySelector('.modal').remove();
        this.refreshUserDisplay();

        UIComponents.showNotification(`User ${name} created successfully`, 'success');
    }

    /**
     * Export users data
     */
    async exportUsers() {
        try {
            UIComponents.showNotification('Exporting user data...', 'info');

            // In real app, this would call the API
            const exportResponse = await this.api.exportData('users', 'csv');

            if (exportResponse.success) {
                UIComponents.showNotification('User data exported successfully', 'success');
                // Download would happen here
            } else {
                throw new Error('Export failed');
            }
        } catch (error) {
            console.error('❌ Failed to export users:', error);
            UIComponents.showNotification('Export functionality coming soon', 'info');
        }
    }

    /**
     * Refresh user display
     */
    refreshUserDisplay() {
        const container = document.getElementById('users-content');
        if (container) {
            this.renderUserInterface(container);
        }
    }

    /**
     * Add user management specific styles
     */
    addUserManagementStyles() {
        if (document.getElementById('user-management-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'user-management-styles';
        styles.textContent = `
            .user-management-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .user-actions {
                display: flex;
                gap: 0.5rem;
            }

            .user-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .user-filters {
                display: flex;
                gap: 2rem;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                flex-wrap: wrap;
            }

            .filter-section {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                min-width: 200px;
            }

            .filter-label {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--gray-700);
            }

            .filter-select, .filter-input {
                padding: 0.5rem;
                border: 1px solid var(--gray-300);
                border-radius: 6px;
                font-size: 0.875rem;
            }

            .filter-select:focus, .filter-input:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(102, 123, 104, 0.1);
            }

            .users-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .user-card {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                overflow: hidden;
                transition: var(--transition);
                box-shadow: var(--shadow-sm);
            }

            .user-card:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-md);
            }

            .user-card-header {
                position: relative;
                padding: 1.5rem;
                background: var(--accent);
                text-align: center;
            }

            .user-avatar {
                width: 60px;
                height: 60px;
                background: var(--primary);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0 auto;
            }

            .user-status-indicator {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid white;
            }

            .status-active {
                background: var(--success);
            }

            .status-inactive {
                background: var(--gray-400);
            }

            .user-card-content {
                padding: 1.5rem;
            }

            .user-name {
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: 0.25rem;
                text-align: center;
            }

            .user-email {
                font-size: 0.875rem;
                color: var(--gray-600);
                text-align: center;
                margin-bottom: 1rem;
            }

            .user-role-badge {
                text-align: center;
                margin-bottom: 1rem;
            }

            .user-details {
                margin-bottom: 1rem;
            }

            .stat-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--gray-100);
            }

            .stat-item:last-child {
                border-bottom: none;
            }

            .stat-label {
                font-size: 0.75rem;
                color: var(--gray-500);
                font-weight: 500;
            }

            .stat-value {
                font-size: 0.875rem;
                color: var(--gray-900);
                font-weight: 600;
            }

            .user-meta {
                margin-bottom: 1rem;
            }

            .meta-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.25rem 0;
            }

            .meta-label {
                font-size: 0.75rem;
                color: var(--gray-500);
            }

            .meta-value {
                font-size: 0.75rem;
                color: var(--gray-700);
            }

            .user-card-actions {
                display: flex;
                gap: 0.5rem;
                padding: 1rem 1.5rem;
                background: var(--gray-50);
                border-top: 1px solid var(--gray-200);
            }

            .user-card-actions .btn {
                flex: 1;
                font-size: 0.75rem;
                padding: 0.5rem;
            }

            .view-toggle {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
                justify-content: center;
            }

            .view-toggle .btn.active {
                background: var(--primary);
                color: white;
            }

            .user-detail-modal {
                max-width: 600px;
            }

            .user-detail-header {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--gray-200);
            }

            .user-avatar-large {
                width: 80px;
                height: 80px;
                background: var(--primary);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: 600;
            }

            .user-detail-info h2 {
                margin-bottom: 0.5rem;
                color: var(--gray-900);
            }

            .user-detail-info p {
                color: var(--gray-600);
                margin-bottom: 1rem;
            }

            .user-badges {
                display: flex;
                gap: 0.5rem;
            }

            .detail-section {
                margin-bottom: 2rem;
            }

            .detail-section h3 {
                margin-bottom: 1rem;
                color: var(--gray-900);
                font-size: 1.125rem;
            }

            .detail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }

            .detail-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .detail-item label {
                font-size: 0.75rem;
                color: var(--gray-500);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .detail-item span {
                font-size: 0.875rem;
                color: var(--gray-900);
            }

            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
            }

            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .form-group label {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--gray-700);
            }

            .form-group input,
            .form-group select {
                padding: 0.75rem;
                border: 1px solid var(--gray-300);
                border-radius: 6px;
                font-size: 0.875rem;
            }

            .form-group input:focus,
            .form-group select:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(102, 123, 104, 0.1);
            }

            .delete-confirmation {
                text-align: center;
                padding: 1rem;
            }

            .warning-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            .delete-confirmation h3 {
                margin-bottom: 1rem;
                color: var(--gray-900);
            }

            .delete-confirmation p {
                margin-bottom: 0.5rem;
                color: var(--gray-600);
            }

            .warning-text {
                color: var(--error);
                font-weight: 500;
            }

            .table-avatar {
                width: 32px;
                height: 32px;
                background: var(--primary);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.875rem;
                font-weight: 600;
            }

            .table-actions {
                display: flex;
                gap: 0.25rem;
            }

            .table-actions .btn {
                font-size: 0.75rem;
                padding: 0.25rem 0.5rem;
            }

            @media (max-width: 768px) {
                .user-management-header {
                    flex-direction: column;
                    align-items: stretch;
                }

                .user-filters {
                    flex-direction: column;
                    gap: 1rem;
                }

                .filter-section {
                    min-width: auto;
                }

                .users-grid {
                    grid-template-columns: 1fr;
                }

                .user-stats-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Retry loading users
     */
    async retry() {
        await this.render();
    }
}

export default UserManagementModule;
