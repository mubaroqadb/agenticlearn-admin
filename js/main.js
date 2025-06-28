/**
 * AgenticLearn Admin Portal - Main Application
 * Professional admin interface with modular architecture
 */

// Import core modules
import APIClient from './core/api-client.js';
import UIComponents from './core/ui-components.js';

// Import admin modules
import DashboardModule from './modules/dashboard.js';
import UserManagementModule from './modules/user-management.js';
import CourseManagementModule from './modules/course-management.js';
import AnalyticsModule from './modules/analytics.js';
import AIManagementModule from './modules/ai-management.js';
import AdministrationModule from './modules/administration.js';

/**
 * Main Admin Portal Application Class
 */
class AdminPortal {
    constructor() {
        this.state = {
            currentPage: 'dashboard',
            admin: null,
            systemStatus: 'loading',
            modules: {},
            sidebarCollapsed: false
        };
        
        this.api = null;
        this.modules = {};
    }

    /**
     * Initialize the admin portal
     */
    async initialize() {
        try {
            console.log('🚀 Initializing AgenticLearn Admin Portal...');
            
            // 1. Initialize API client
            this.api = new APIClient();
            
            // 2. Load admin profile and system status
            await this.loadAdminData();
            
            // 3. Initialize UI
            this.renderHeader();
            this.setupNavigation();
            this.setupEventListeners();
            
            // 4. Initialize modules
            this.initializeModules();
            
            // 5. Load initial page
            await this.navigateToPage('dashboard');
            
            // 6. Hide loading screen and show app
            this.showApplication();
            
            console.log('✅ Admin Portal initialized successfully');

        } catch (error) {
            console.error('❌ Admin Portal initialization failed:', error);
            this.showError('Failed to initialize admin portal: ' + error.message);
        }
    }

    /**
     * Load admin profile and system data
     */
    async loadAdminData() {
        try {
            console.log('👤 Loading admin profile...');
            
            // Load admin profile
            const profileResponse = await this.api.getAdminProfile();
            if (profileResponse.success) {
                this.state.admin = profileResponse.data;
                console.log('✅ Admin profile loaded:', this.state.admin.name);
            } else {
                // Fallback admin data
                this.state.admin = {
                    name: 'System Administrator',
                    email: 'admin@agenticlearn.com',
                    role: 'Super Admin',
                    avatar: 'A',
                    permissions: ['all']
                };
                console.log('⚠️ Using fallback admin profile');
            }

            // Load system status
            const statusResponse = await this.api.getSystemStatus();
            if (statusResponse.success) {
                this.state.systemStatus = statusResponse.data.status;
                console.log('✅ System status loaded:', this.state.systemStatus);
            } else {
                this.state.systemStatus = 'operational';
                console.log('⚠️ Using fallback system status');
            }

        } catch (error) {
            console.error('❌ Failed to load admin data:', error);
            // Use fallback data
            this.state.admin = {
                name: 'System Administrator',
                email: 'admin@agenticlearn.com',
                role: 'Super Admin',
                avatar: 'A'
            };
            this.state.systemStatus = 'operational';
        }
    }

    /**
     * Initialize all admin modules
     */
    initializeModules() {
        console.log('📦 Initializing admin modules...');
        
        this.modules = {
            dashboard: new DashboardModule(this.api),
            users: new UserManagementModule(this.api),
            courses: new CourseManagementModule(this.api),
            analytics: new AnalyticsModule(this.api),
            'ai-management': new AIManagementModule(this.api),
            administration: new AdministrationModule(this.api)
        };

        console.log('✅ Admin modules initialized:', Object.keys(this.modules));
    }

    /**
     * Render header with admin information
     */
    renderHeader() {
        // Update admin name
        const adminNameElement = document.getElementById('admin-name');
        if (adminNameElement && this.state.admin?.name) {
            adminNameElement.textContent = this.state.admin.name;
        }

        // Update admin avatar
        const adminAvatarElement = document.getElementById('admin-avatar');
        if (adminAvatarElement && this.state.admin?.avatar) {
            adminAvatarElement.textContent = this.state.admin.avatar;
        }

        // Update system status
        const systemStatusElement = document.getElementById('system-status');
        if (systemStatusElement) {
            systemStatusElement.className = `stat-value status-indicator ${this.state.systemStatus}`;
            systemStatusElement.textContent = this.state.systemStatus === 'operational' ? '●' : '⚠';
        }

        console.log('✅ Header rendered with admin info');
    }

    /**
     * Setup navigation functionality
     */
    setupNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const page = item.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            });
        });

        console.log('✅ Navigation setup complete');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        console.log('✅ Event listeners setup complete');
    }

    /**
     * Navigate to a specific page
     */
    async navigateToPage(page) {
        try {
            console.log(`🧭 Navigating to page: ${page}`);
            
            // Update active menu item
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.page === page) {
                    item.classList.add('active');
                }
            });

            // Hide all pages
            document.querySelectorAll('.page-content').forEach(pageElement => {
                pageElement.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(`page-${page}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Load module content
            if (this.modules[page]) {
                await this.modules[page].render();
            }

            this.state.currentPage = page;
            console.log(`✅ Navigation to ${page} complete`);

        } catch (error) {
            console.error(`❌ Navigation to ${page} failed:`, error);
            UIComponents.showNotification(`Failed to load ${page}: ${error.message}`, 'error');
        }
    }

    /**
     * Toggle sidebar collapse
     */
    toggleSidebar() {
        const app = document.getElementById('app');
        const sidebar = document.getElementById('sidebar');
        
        this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
        
        if (this.state.sidebarCollapsed) {
            app.classList.add('sidebar-collapsed');
        } else {
            app.classList.remove('sidebar-collapsed');
        }

        // On mobile, toggle sidebar visibility
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const sidebar = document.getElementById('sidebar');
        
        if (window.innerWidth <= 768) {
            // Mobile: close sidebar
            sidebar.classList.remove('open');
        } else {
            // Desktop: ensure sidebar is visible
            sidebar.classList.remove('open');
        }
    }

    /**
     * Show the main application
     */
    showApplication() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            app.style.display = 'grid';
            
            // Trigger fade-in animation
            setTimeout(() => {
                app.style.opacity = '1';
            }, 50);
        }, 1000);
    }

    /**
     * Show error message
     */
    showError(message) {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingContent = loadingScreen.querySelector('.loading-content');
        
        loadingContent.innerHTML = `
            <div class="loading-logo">❌</div>
            <h2>Initialization Failed</h2>
            <p>${message}</p>
            <button onclick="location.reload()" style="
                background: white;
                color: var(--primary);
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 1rem;
            ">Retry</button>
        `;
    }

    /**
     * Update system metrics in real-time
     */
    updateSystemMetrics() {
        // This would be called periodically to update real-time metrics
        // Implementation depends on backend API
    }
}

// Initialize admin portal when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        window.adminPortal = new AdminPortal();
        await window.adminPortal.initialize();
    } catch (error) {
        console.error('💥 Critical error during startup:', error);
    }
});
