/**
 * User Management Module for AgenticLearn Admin Portal
 * Comprehensive user management for students, educators, and admins
 */

import { UIComponents } from '../core/ui-components.js';

export class UserManagementModule {
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
     * Get mock user data
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
                joinDate: '2025-06-01T00:00:00Z'
            },
            {
                id: 'user_002',
                name: 'Dr. Michael Chen',
                email: 'michael.chen@agenticlearn.com',
                role: 'Educator',
                status: 'Active',
                lastLogin: '2025-06-28T09:15:00Z',
                joinDate: '2025-05-15T00:00:00Z'
            },
            {
                id: 'user_003',
                name: 'Admin User',
                email: 'admin@agenticlearn.com',
                role: 'Administrator',
                status: 'Active',
                lastLogin: '2025-06-28T11:00:00Z',
                joinDate: '2025-01-01T00:00:00Z'
            }
        ];
    }

    /**
     * Render user management interface
     */
    renderUserInterface(container) {
        container.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">👥 User Management</h2>
                <p class="page-subtitle">Manage students, educators, and administrators</p>
            </div>

            <div class="user-stats">
                <div class="stat-card">
                    <div class="stat-value">${this.users.filter(u => u.role === 'Student').length}</div>
                    <div class="stat-label">Students</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${this.users.filter(u => u.role === 'Educator').length}</div>
                    <div class="stat-label">Educators</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${this.users.filter(u => u.role === 'Administrator').length}</div>
                    <div class="stat-label">Administrators</div>
                </div>
            </div>

            <div class="user-table-container">
                ${UIComponents.createDataTable(
                    [
                        { key: 'name', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'role', label: 'Role' },
                        { key: 'status', label: 'Status' },
                        { key: 'lastLogin', label: 'Last Login' }
                    ],
                    this.users.map(user => ({
                        ...user,
                        lastLogin: UIComponents.formatDate(user.lastLogin, 'time'),
                        status: UIComponents.createBadge(user.status, user.status.toLowerCase())
                    })),
                    {
                        searchable: true,
                        sortable: true,
                        actions: [
                            { label: 'Add User', type: 'primary', icon: '➕', onclick: 'window.adminPortal.modules.users.addUser()' }
                        ]
                    }
                )}
            </div>
        `;
    }

    /**
     * Add new user
     */
    addUser() {
        UIComponents.showNotification('Add User functionality coming soon', 'info');
    }

    /**
     * Retry loading users
     */
    async retry() {
        await this.render();
    }
}

export default UserManagementModule;
