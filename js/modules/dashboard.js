/**
 * Dashboard Module for AgenticLearn Admin Portal
 * System overview, metrics, and real-time monitoring
 */

import { UIComponents } from '../core/ui-components.js';

export class DashboardModule {
    constructor(apiClient) {
        this.api = apiClient;
        this.dashboardData = null;
        this.realtimeInterval = null;
        this.isLoading = false;
    }

    /**
     * Render the dashboard interface
     */
    async render() {
        try {
            console.log('📊 Rendering Dashboard module...');
            
            const container = document.getElementById('dashboard-content');
            if (!container) {
                console.error('❌ Dashboard container not found');
                return;
            }

            // Show loading state
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <h3>📊 Loading Dashboard...</h3>
                    <p>Fetching system metrics and analytics</p>
                </div>
            `;

            // Load dashboard data
            await this.loadDashboardData();

            // Render dashboard interface
            this.renderDashboardInterface(container);

            // Start real-time updates
            this.startRealtimeUpdates();

            console.log('✅ Dashboard module rendered successfully');

        } catch (error) {
            console.error('❌ Failed to render dashboard:', error);
            
            const container = document.getElementById('dashboard-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-state">
                        <div class="error-icon">❌</div>
                        <h3>Failed to Load Dashboard</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.dashboard.retry()">
                            🔄 Retry
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Load dashboard data from backend
     */
    async loadDashboardData() {
        try {
            console.log('📊 Loading dashboard data from backend...');
            this.isLoading = true;

            // Load dashboard overview data
            const dashboardResponse = await this.api.getDashboardData();
            if (dashboardResponse.success) {
                this.dashboardData = dashboardResponse.data;
                console.log('✅ Dashboard data loaded from backend');
            } else {
                // Use comprehensive mock data for demo
                this.dashboardData = this.getMockDashboardData();
                console.log('⚠️ Using mock dashboard data');
            }

        } catch (error) {
            console.error('❌ Failed to load dashboard data:', error);
            // Use mock data as fallback
            this.dashboardData = this.getMockDashboardData();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get comprehensive mock dashboard data
     */
    getMockDashboardData() {
        return {
            overview: {
                totalUsers: 2847,
                activeUsers: 1523,
                totalCourses: 156,
                activeCourses: 89,
                totalAssignments: 1247,
                completedAssignments: 8934,
                systemUptime: '99.8%',
                carbonFootprint: '0.245g CO2'
            },
            trends: {
                userGrowth: { value: '+12.5%', direction: 'up' },
                engagement: { value: '+8.3%', direction: 'up' },
                performance: { value: '+5.1%', direction: 'up' },
                efficiency: { value: '+15.2%', direction: 'up' }
            },
            recentActivity: [
                {
                    type: 'user_registration',
                    message: 'New student registered: Sarah Johnson',
                    timestamp: '2 minutes ago',
                    icon: '👤'
                },
                {
                    type: 'course_completion',
                    message: 'Course completed: JavaScript Fundamentals',
                    timestamp: '5 minutes ago',
                    icon: '🎓'
                },
                {
                    type: 'system_backup',
                    message: 'Automated system backup completed',
                    timestamp: '15 minutes ago',
                    icon: '💾'
                },
                {
                    type: 'ai_interaction',
                    message: 'AI tutor session: 45 interactions',
                    timestamp: '23 minutes ago',
                    icon: '🤖'
                },
                {
                    type: 'assignment_submission',
                    message: '12 new assignment submissions',
                    timestamp: '1 hour ago',
                    icon: '📝'
                }
            ],
            systemHealth: {
                cpu: { value: 45, status: 'good' },
                memory: { value: 67, status: 'warning' },
                storage: { value: 23, status: 'good' },
                network: { value: 89, status: 'excellent' }
            },
            topCourses: [
                { name: 'JavaScript Fundamentals', students: 234, completion: 87 },
                { name: 'Digital Literacy Basics', students: 189, completion: 92 },
                { name: 'Green Computing Principles', students: 156, completion: 78 },
                { name: 'Web Development Intro', students: 145, completion: 83 },
                { name: 'AI Ethics & Safety', students: 123, completion: 95 }
            ],
            alerts: [
                {
                    type: 'warning',
                    title: 'High Memory Usage',
                    message: 'System memory usage is at 67%. Consider optimization.',
                    timestamp: '10 minutes ago'
                },
                {
                    type: 'info',
                    title: 'Scheduled Maintenance',
                    message: 'System maintenance scheduled for tonight at 2 AM.',
                    timestamp: '2 hours ago'
                }
            ]
        };
    }

    /**
     * Render dashboard interface
     */
    renderDashboardInterface(container) {
        container.innerHTML = `
            <div class="dashboard-header">
                <div class="page-header">
                    <h2 class="page-title">📊 System Dashboard</h2>
                    <p class="page-subtitle">Real-time overview of system performance and metrics</p>
                </div>
                
                <div class="dashboard-actions">
                    <button class="btn btn-secondary" onclick="window.adminPortal.modules.dashboard.refreshData()">
                        🔄 Refresh
                    </button>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.dashboard.exportReport()">
                        📊 Export Report
                    </button>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="metrics-grid">
                ${this.renderMetricsCards()}
            </div>

            <!-- Main Dashboard Content -->
            <div class="dashboard-grid">
                <!-- System Health -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3 class="card-title">🔧 System Health</h3>
                        <span class="card-status status-good">Operational</span>
                    </div>
                    <div class="card-content">
                        ${this.renderSystemHealth()}
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3 class="card-title">📋 Recent Activity</h3>
                        <button class="btn btn-sm btn-secondary">View All</button>
                    </div>
                    <div class="card-content">
                        ${this.renderRecentActivity()}
                    </div>
                </div>

                <!-- Top Courses -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3 class="card-title">📚 Top Courses</h3>
                        <button class="btn btn-sm btn-secondary">Manage</button>
                    </div>
                    <div class="card-content">
                        ${this.renderTopCourses()}
                    </div>
                </div>

                <!-- System Alerts -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3 class="card-title">⚠️ System Alerts</h3>
                        <span class="alert-count">${this.dashboardData.alerts.length}</span>
                    </div>
                    <div class="card-content">
                        ${this.renderSystemAlerts()}
                    </div>
                </div>
            </div>
        `;

        // Add dashboard-specific styles
        this.addDashboardStyles();
    }

    /**
     * Render metrics cards
     */
    renderMetricsCards() {
        const metrics = [
            {
                title: 'Total Users',
                value: UIComponents.formatNumber(this.dashboardData.overview.totalUsers),
                icon: '👥',
                trend: this.dashboardData.trends.userGrowth,
                color: 'primary'
            },
            {
                title: 'Active Users',
                value: UIComponents.formatNumber(this.dashboardData.overview.activeUsers),
                icon: '🟢',
                trend: this.dashboardData.trends.engagement,
                color: 'success'
            },
            {
                title: 'Total Courses',
                value: this.dashboardData.overview.totalCourses,
                icon: '📚',
                trend: this.dashboardData.trends.performance,
                color: 'info'
            },
            {
                title: 'System Uptime',
                value: this.dashboardData.overview.systemUptime,
                icon: '⚡',
                trend: this.dashboardData.trends.efficiency,
                color: 'warning'
            }
        ];

        return metrics.map(metric => 
            UIComponents.createStatsCard(
                metric.title,
                metric.value,
                metric.icon,
                metric.trend,
                metric.color
            )
        ).join('');
    }

    /**
     * Render system health indicators
     */
    renderSystemHealth() {
        const health = this.dashboardData.systemHealth;
        
        return Object.entries(health).map(([key, data]) => `
            <div class="health-item">
                <div class="health-label">${key.toUpperCase()}</div>
                <div class="health-bar">
                    <div class="health-fill health-${data.status}" style="width: ${data.value}%"></div>
                </div>
                <div class="health-value">${data.value}%</div>
            </div>
        `).join('');
    }

    /**
     * Render recent activity feed
     */
    renderRecentActivity() {
        return this.dashboardData.recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-message">${activity.message}</div>
                    <div class="activity-time">${activity.timestamp}</div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render top courses list
     */
    renderTopCourses() {
        return this.dashboardData.topCourses.map(course => `
            <div class="course-item">
                <div class="course-info">
                    <div class="course-name">${course.name}</div>
                    <div class="course-stats">${course.students} students</div>
                </div>
                <div class="course-progress">
                    ${UIComponents.createProgressBar(course.completion, 100, { 
                        size: 'small', 
                        showValue: true 
                    })}
                </div>
            </div>
        `).join('');
    }

    /**
     * Render system alerts
     */
    renderSystemAlerts() {
        if (this.dashboardData.alerts.length === 0) {
            return '<div class="no-alerts">✅ No active alerts</div>';
        }

        return this.dashboardData.alerts.map(alert => `
            <div class="alert-item alert-${alert.type}">
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-message">${alert.message}</div>
                    <div class="alert-time">${alert.timestamp}</div>
                </div>
                <button class="alert-dismiss">×</button>
            </div>
        `).join('');
    }

    /**
     * Start real-time updates
     */
    startRealtimeUpdates() {
        // Update every 30 seconds
        this.realtimeInterval = setInterval(() => {
            this.updateRealtimeData();
        }, 30000);
    }

    /**
     * Update real-time data
     */
    async updateRealtimeData() {
        try {
            const realtimeResponse = await this.api.getRealtimeStats();
            if (realtimeResponse.success) {
                // Update specific elements with new data
                this.updateMetrics(realtimeResponse.data);
            }
        } catch (error) {
            console.error('❌ Failed to update real-time data:', error);
        }
    }

    /**
     * Update metrics display
     */
    updateMetrics(newData) {
        // Update active users count
        const activeUsersElement = document.querySelector('[data-metric="active-users"]');
        if (activeUsersElement && newData.activeUsers) {
            activeUsersElement.textContent = UIComponents.formatNumber(newData.activeUsers);
        }

        // Update system status
        const systemStatusElement = document.getElementById('system-status');
        if (systemStatusElement && newData.systemStatus) {
            systemStatusElement.className = `stat-value status-indicator ${newData.systemStatus}`;
        }
    }

    /**
     * Refresh dashboard data
     */
    async refreshData() {
        UIComponents.showNotification('Refreshing dashboard data...', 'info');
        await this.loadDashboardData();
        
        const container = document.getElementById('dashboard-content');
        if (container) {
            this.renderDashboardInterface(container);
        }
        
        UIComponents.showNotification('Dashboard data refreshed', 'success');
    }

    /**
     * Export dashboard report
     */
    async exportReport() {
        try {
            UIComponents.showNotification('Generating dashboard report...', 'info');
            
            // This would call the backend to generate a report
            const reportResponse = await this.api.exportData('dashboard', 'pdf');
            
            if (reportResponse.success) {
                UIComponents.showNotification('Dashboard report exported successfully', 'success');
                // Download the report
                window.open(reportResponse.data.downloadUrl, '_blank');
            } else {
                throw new Error(reportResponse.error || 'Export failed');
            }
        } catch (error) {
            console.error('❌ Failed to export report:', error);
            UIComponents.showNotification('Failed to export report: ' + error.message, 'error');
        }
    }

    /**
     * Retry loading dashboard
     */
    async retry() {
        try {
            console.log('🔄 Retrying dashboard load...');
            await this.render();
        } catch (error) {
            console.error('❌ Retry failed:', error);
            UIComponents.showNotification('Retry failed: ' + error.message, 'error');
        }
    }

    /**
     * Add dashboard-specific styles
     */
    addDashboardStyles() {
        if (document.getElementById('dashboard-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'dashboard-styles';
        styles.textContent = `
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .dashboard-actions {
                display: flex;
                gap: 0.5rem;
            }
            
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .dashboard-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 1.5rem;
            }
            
            .dashboard-card {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                overflow: hidden;
                box-shadow: var(--shadow-sm);
            }
            
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--gray-200);
                background: var(--gray-50);
            }
            
            .card-title {
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--gray-900);
                margin: 0;
            }
            
            .card-status {
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .status-good {
                background: var(--success);
                color: white;
            }
            
            .card-content {
                padding: 1.5rem;
            }
            
            .health-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .health-label {
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--gray-600);
                min-width: 60px;
            }
            
            .health-bar {
                flex: 1;
                height: 8px;
                background: var(--gray-200);
                border-radius: 4px;
                overflow: hidden;
            }
            
            .health-fill {
                height: 100%;
                transition: width 0.3s ease;
            }
            
            .health-good { background: var(--success); }
            .health-warning { background: var(--warning); }
            .health-excellent { background: var(--primary); }
            
            .health-value {
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--gray-700);
                min-width: 40px;
                text-align: right;
            }
            
            .activity-item {
                display: flex;
                gap: 0.75rem;
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--gray-100);
            }
            
            .activity-item:last-child {
                border-bottom: none;
            }
            
            .activity-icon {
                font-size: 1.25rem;
                width: 32px;
                text-align: center;
            }
            
            .activity-message {
                font-size: 0.875rem;
                color: var(--gray-700);
                margin-bottom: 0.25rem;
            }
            
            .activity-time {
                font-size: 0.75rem;
                color: var(--gray-500);
            }
            
            .course-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--gray-100);
            }
            
            .course-item:last-child {
                border-bottom: none;
            }
            
            .course-name {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--gray-900);
                margin-bottom: 0.25rem;
            }
            
            .course-stats {
                font-size: 0.75rem;
                color: var(--gray-500);
            }
            
            .course-progress {
                min-width: 100px;
            }
            
            .alert-item {
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 0.75rem;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            
            .alert-warning {
                background: #fef3cd;
                border: 1px solid #fecaca;
            }
            
            .alert-info {
                background: #dbeafe;
                border: 1px solid #bfdbfe;
            }
            
            .alert-title {
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: 0.25rem;
            }
            
            .alert-message {
                font-size: 0.75rem;
                color: var(--gray-600);
                margin-bottom: 0.25rem;
            }
            
            .alert-time {
                font-size: 0.75rem;
                color: var(--gray-500);
            }
            
            .alert-dismiss {
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                color: var(--gray-400);
                padding: 0;
                width: 20px;
                height: 20px;
            }
            
            .alert-count {
                background: var(--error);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .no-alerts {
                text-align: center;
                color: var(--gray-500);
                font-style: italic;
                padding: 2rem;
            }
            
            @media (max-width: 768px) {
                .dashboard-grid {
                    grid-template-columns: 1fr;
                }
                
                .metrics-grid {
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Cleanup when module is destroyed
     */
    destroy() {
        if (this.realtimeInterval) {
            clearInterval(this.realtimeInterval);
        }
    }
}

// Export for use in main application
export default DashboardModule;
