/**
 * System Administration Module for AgenticLearn Admin Portal
 * Comprehensive system settings, security, backup, and maintenance tools
 */

import { UIComponents } from '../core/ui-components.js';

export class AdministrationModule {
    constructor(apiClient) {
        this.api = apiClient;
        this.adminData = null;
        this.currentView = 'overview';
        this.isLoading = false;
    }

    /**
     * Render the administration interface
     */
    async render() {
        try {
            console.log('🔧 Rendering Administration module...');

            const container = document.getElementById('administration-content');
            if (!container) {
                console.error('❌ Administration container not found');
                return;
            }

            // Show loading state
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <h3>🔧 Loading System Administration...</h3>
                    <p>Fetching system settings and maintenance data</p>
                </div>
            `;

            // Load administration data
            await this.loadAdminData();

            // Render administration interface
            this.renderAdminInterface(container);

            console.log('✅ Administration module rendered successfully');

        } catch (error) {
            console.error('❌ Failed to render administration:', error);

            const container = document.getElementById('administration-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-state">
                        <div class="error-icon">❌</div>
                        <h3>Failed to Load Administration</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.administration.retry()">
                            🔄 Retry
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Load administration data from backend
     */
    async loadAdminData() {
        try {
            console.log('🔧 Loading administration data from backend...');
            this.isLoading = true;

            const adminResponse = await this.api.getAdminData();
            if (adminResponse.success) {
                this.adminData = adminResponse.data;
                console.log('✅ Administration data loaded from backend');
            } else {
                // Use comprehensive mock data for demo
                this.adminData = this.getMockAdminData();
                console.log('⚠️ Using mock administration data');
            }

        } catch (error) {
            console.error('❌ Failed to load administration data:', error);
            this.adminData = this.getMockAdminData();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get comprehensive mock administration data
     */
    getMockAdminData() {
        return {
            system: {
                version: 'AgenticLearn v2.1.3',
                uptime: '45 days, 12 hours',
                lastRestart: '2025-05-14T02:00:00Z',
                environment: 'Production',
                region: 'US-East-1',
                timezone: 'UTC',
                maintenance: {
                    scheduled: '2025-07-01T02:00:00Z',
                    duration: '2 hours',
                    type: 'Security Updates'
                }
            },
            security: {
                sslStatus: 'Active',
                sslExpiry: '2025-12-15T00:00:00Z',
                firewallStatus: 'Active',
                lastSecurityScan: '2025-06-27T10:00:00Z',
                vulnerabilities: 0,
                failedLogins: 12,
                suspiciousActivity: 3,
                twoFactorEnabled: true,
                passwordPolicy: {
                    minLength: 8,
                    requireSpecialChars: true,
                    requireNumbers: true,
                    requireUppercase: true,
                    expiryDays: 90
                }
            },
            backup: {
                lastBackup: '2025-06-28T03:00:00Z',
                backupSize: '2.4 GB',
                backupStatus: 'Success',
                retentionDays: 30,
                autoBackup: true,
                backupLocation: 'AWS S3',
                schedule: 'Daily at 3:00 AM UTC',
                recentBackups: [
                    { date: '2025-06-28T03:00:00Z', size: '2.4 GB', status: 'Success' },
                    { date: '2025-06-27T03:00:00Z', size: '2.3 GB', status: 'Success' },
                    { date: '2025-06-26T03:00:00Z', size: '2.3 GB', status: 'Success' },
                    { date: '2025-06-25T03:00:00Z', size: '2.2 GB', status: 'Success' },
                    { date: '2025-06-24T03:00:00Z', size: '2.2 GB', status: 'Failed' }
                ]
            },
            database: {
                status: 'Healthy',
                connections: 45,
                maxConnections: 100,
                size: '1.8 GB',
                lastOptimization: '2025-06-25T04:00:00Z',
                queryPerformance: 'Good',
                slowQueries: 2,
                indexHealth: 'Optimal'
            },
            logs: {
                errorLogs: 23,
                warningLogs: 156,
                infoLogs: 8934,
                logRetention: '90 days',
                logLevel: 'INFO',
                recentErrors: [
                    {
                        timestamp: '2025-06-28T11:30:00Z',
                        level: 'ERROR',
                        message: 'Database connection timeout',
                        source: 'API Gateway'
                    },
                    {
                        timestamp: '2025-06-28T09:15:00Z',
                        level: 'WARNING',
                        message: 'High memory usage detected',
                        source: 'System Monitor'
                    }
                ]
            },
            settings: {
                siteName: 'AgenticLearn',
                siteUrl: 'https://agenticlearn.com',
                adminEmail: 'admin@agenticlearn.com',
                timezone: 'UTC',
                language: 'English',
                theme: 'Green Computing',
                maintenanceMode: false,
                registrationEnabled: true,
                emailNotifications: true,
                analyticsEnabled: true,
                debugMode: false
            }
        };
    }

    /**
     * Render administration interface
     */
    renderAdminInterface(container) {
        container.innerHTML = `
            <div class="admin-header">
                <div class="page-header">
                    <h2 class="page-title">🔧 System Administration</h2>
                    <p class="page-subtitle">Comprehensive system settings, security, backup, and maintenance tools</p>
                </div>

                <div class="admin-actions">
                    <button class="btn btn-secondary" onclick="window.adminPortal.modules.administration.exportSystemData()">
                        📊 Export System Data
                    </button>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.administration.runMaintenance()">
                        🔧 Run Maintenance
                    </button>
                </div>
            </div>

            <!-- System Status Overview -->
            <div class="system-status-grid">
                ${UIComponents.createStatsCard('System Uptime', this.adminData.system.uptime, '⚡', null, 'success')}
                ${UIComponents.createStatsCard('Security Status', 'Secure', '🔒', null, 'primary')}
                ${UIComponents.createStatsCard('Last Backup', UIComponents.formatDate(this.adminData.backup.lastBackup, 'short'), '💾', null, 'info')}
                ${UIComponents.createStatsCard('Database Health', this.adminData.database.status, '🗄️', null, 'warning')}
            </div>

            <!-- Administration Navigation -->
            <div class="admin-nav">
                <button class="nav-btn ${this.currentView === 'overview' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.administration.switchView('overview')">
                    📊 Overview
                </button>
                <button class="nav-btn ${this.currentView === 'security' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.administration.switchView('security')">
                    🔒 Security
                </button>
                <button class="nav-btn ${this.currentView === 'backup' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.administration.switchView('backup')">
                    💾 Backup
                </button>
                <button class="nav-btn ${this.currentView === 'database' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.administration.switchView('database')">
                    🗄️ Database
                </button>
                <button class="nav-btn ${this.currentView === 'logs' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.administration.switchView('logs')">
                    📋 Logs
                </button>
                <button class="nav-btn ${this.currentView === 'settings' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.administration.switchView('settings')">
                    ⚙️ Settings
                </button>
            </div>

            <!-- Administration Content -->
            <div class="admin-content" id="admin-view-content">
                ${this.renderAdminView()}
            </div>
        `;

        // Add administration styles
        this.addAdministrationStyles();
    }

    /**
     * Render admin view based on current view
     */
    renderAdminView() {
        switch (this.currentView) {
            case 'overview':
                return this.renderOverview();
            case 'security':
                return this.renderSecurity();
            case 'backup':
                return this.renderBackup();
            case 'database':
                return this.renderDatabase();
            case 'logs':
                return this.renderLogs();
            case 'settings':
                return this.renderSettings();
            default:
                return this.renderOverview();
        }
    }

    /**
     * Render overview
     */
    renderOverview() {
        return `
            <div class="admin-section">
                <h3>📊 System Overview</h3>

                <!-- System Information -->
                <div class="system-info-grid">
                    <div class="info-card">
                        <h4>🖥️ System Information</h4>
                        <div class="info-list">
                            <div class="info-item">
                                <span class="info-label">Version:</span>
                                <span class="info-value">${this.adminData.system.version}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Environment:</span>
                                <span class="info-value">${this.adminData.system.environment}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Region:</span>
                                <span class="info-value">${this.adminData.system.region}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Timezone:</span>
                                <span class="info-value">${this.adminData.system.timezone}</span>
                            </div>
                        </div>
                    </div>

                    <div class="info-card">
                        <h4>🔧 Maintenance Schedule</h4>
                        <div class="maintenance-info">
                            <div class="maintenance-item">
                                <span class="maintenance-label">Next Maintenance:</span>
                                <span class="maintenance-value">${UIComponents.formatDate(this.adminData.system.maintenance.scheduled, 'long')}</span>
                            </div>
                            <div class="maintenance-item">
                                <span class="maintenance-label">Duration:</span>
                                <span class="maintenance-value">${this.adminData.system.maintenance.duration}</span>
                            </div>
                            <div class="maintenance-item">
                                <span class="maintenance-label">Type:</span>
                                <span class="maintenance-value">${this.adminData.system.maintenance.type}</span>
                            </div>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="window.adminPortal.modules.administration.scheduleMaintenance()">
                            📅 Reschedule
                        </button>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <h4>⚡ Quick Actions</h4>
                    <div class="actions-grid">
                        <button class="action-btn" onclick="window.adminPortal.modules.administration.createBackup()">
                            <div class="action-icon">💾</div>
                            <div class="action-text">Create Backup</div>
                        </button>
                        <button class="action-btn" onclick="window.adminPortal.modules.administration.optimizeDatabase()">
                            <div class="action-icon">🗄️</div>
                            <div class="action-text">Optimize Database</div>
                        </button>
                        <button class="action-btn" onclick="window.adminPortal.modules.administration.clearCache()">
                            <div class="action-icon">🧹</div>
                            <div class="action-text">Clear Cache</div>
                        </button>
                        <button class="action-btn" onclick="window.adminPortal.modules.administration.viewLogs()">
                            <div class="action-icon">📋</div>
                            <div class="action-text">View Logs</div>
                        </button>
                        <button class="action-btn" onclick="window.adminPortal.modules.administration.securityScan()">
                            <div class="action-icon">🔍</div>
                            <div class="action-text">Security Scan</div>
                        </button>
                        <button class="action-btn" onclick="window.adminPortal.modules.administration.systemRestart()">
                            <div class="action-icon">🔄</div>
                            <div class="action-text">System Restart</div>
                        </button>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="recent-activity">
                    <h4>📋 Recent System Activity</h4>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">💾</div>
                            <div class="activity-content">
                                <div class="activity-message">Automated backup completed successfully</div>
                                <div class="activity-time">${UIComponents.formatDate(this.adminData.backup.lastBackup, 'short')}</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">🔒</div>
                            <div class="activity-content">
                                <div class="activity-message">Security scan completed - no vulnerabilities found</div>
                                <div class="activity-time">${UIComponents.formatDate(this.adminData.security.lastSecurityScan, 'short')}</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">🗄️</div>
                            <div class="activity-content">
                                <div class="activity-message">Database optimization completed</div>
                                <div class="activity-time">${UIComponents.formatDate(this.adminData.database.lastOptimization, 'short')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render security view
     */
    renderSecurity() {
        const security = this.adminData.security;

        return `
            <div class="admin-section">
                <h3>🔒 Security Management</h3>

                <!-- Security Status -->
                <div class="security-status">
                    <div class="status-grid">
                        <div class="status-card ${security.sslStatus === 'Active' ? 'status-good' : 'status-warning'}">
                            <h4>🔐 SSL Certificate</h4>
                            <div class="status-value">${security.sslStatus}</div>
                            <div class="status-detail">Expires: ${UIComponents.formatDate(security.sslExpiry, 'short')}</div>
                        </div>

                        <div class="status-card ${security.firewallStatus === 'Active' ? 'status-good' : 'status-danger'}">
                            <h4>🛡️ Firewall</h4>
                            <div class="status-value">${security.firewallStatus}</div>
                            <div class="status-detail">Protection enabled</div>
                        </div>

                        <div class="status-card ${security.vulnerabilities === 0 ? 'status-good' : 'status-danger'}">
                            <h4>🔍 Vulnerabilities</h4>
                            <div class="status-value">${security.vulnerabilities}</div>
                            <div class="status-detail">Last scan: ${UIComponents.formatDate(security.lastSecurityScan, 'short')}</div>
                        </div>

                        <div class="status-card ${security.twoFactorEnabled ? 'status-good' : 'status-warning'}">
                            <h4>🔑 Two-Factor Auth</h4>
                            <div class="status-value">${security.twoFactorEnabled ? 'Enabled' : 'Disabled'}</div>
                            <div class="status-detail">Admin accounts</div>
                        </div>
                    </div>
                </div>

                <!-- Security Metrics -->
                <div class="security-metrics">
                    <h4>📊 Security Metrics</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-value">${security.failedLogins}</div>
                            <div class="metric-label">Failed Logins (24h)</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">${security.suspiciousActivity}</div>
                            <div class="metric-label">Suspicious Activities</div>
                        </div>
                    </div>
                </div>

                <!-- Password Policy -->
                <div class="password-policy">
                    <h4>🔐 Password Policy</h4>
                    <div class="policy-settings">
                        <div class="policy-item">
                            <label>Minimum Length:</label>
                            <input type="number" value="${security.passwordPolicy.minLength}" min="6" max="20">
                        </div>
                        <div class="policy-item">
                            <label>Require Special Characters:</label>
                            <input type="checkbox" ${security.passwordPolicy.requireSpecialChars ? 'checked' : ''}>
                        </div>
                        <div class="policy-item">
                            <label>Require Numbers:</label>
                            <input type="checkbox" ${security.passwordPolicy.requireNumbers ? 'checked' : ''}>
                        </div>
                        <div class="policy-item">
                            <label>Password Expiry (days):</label>
                            <input type="number" value="${security.passwordPolicy.expiryDays}" min="30" max="365">
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.administration.updatePasswordPolicy()">
                        💾 Update Policy
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render backup view
     */
    renderBackup() {
        const backup = this.adminData.backup;

        return `
            <div class="admin-section">
                <h3>💾 Backup Management</h3>

                <!-- Backup Status -->
                <div class="backup-status">
                    <div class="backup-overview">
                        <div class="backup-card">
                            <h4>📊 Backup Overview</h4>
                            <div class="backup-info">
                                <div class="backup-item">
                                    <span class="backup-label">Last Backup:</span>
                                    <span class="backup-value">${UIComponents.formatDate(backup.lastBackup, 'long')}</span>
                                </div>
                                <div class="backup-item">
                                    <span class="backup-label">Backup Size:</span>
                                    <span class="backup-value">${backup.backupSize}</span>
                                </div>
                                <div class="backup-item">
                                    <span class="backup-label">Status:</span>
                                    <span class="backup-value status-${backup.backupStatus.toLowerCase()}">${backup.backupStatus}</span>
                                </div>
                                <div class="backup-item">
                                    <span class="backup-label">Location:</span>
                                    <span class="backup-value">${backup.backupLocation}</span>
                                </div>
                            </div>
                        </div>

                        <div class="backup-actions">
                            <button class="btn btn-primary" onclick="window.adminPortal.modules.administration.createBackup()">
                                💾 Create Backup Now
                            </button>
                            <button class="btn btn-secondary" onclick="window.adminPortal.modules.administration.restoreBackup()">
                                🔄 Restore Backup
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Backup History -->
                <div class="backup-history">
                    <h4>📋 Recent Backups</h4>
                    <div class="backup-list">
                        ${backup.recentBackups.map(b => `
                            <div class="backup-item-row">
                                <div class="backup-date">${UIComponents.formatDate(b.date, 'short')}</div>
                                <div class="backup-size">${b.size}</div>
                                <div class="backup-status">
                                    <span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span>
                                </div>
                                <div class="backup-actions">
                                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.administration.downloadBackup('${b.date}')">
                                        📥 Download
                                    </button>
                                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.administration.restoreFromBackup('${b.date}')">
                                        🔄 Restore
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Backup Settings -->
                <div class="backup-settings">
                    <h4>⚙️ Backup Configuration</h4>
                    <div class="settings-form">
                        <div class="setting-item">
                            <label>Auto Backup:</label>
                            <input type="checkbox" ${backup.autoBackup ? 'checked' : ''}>
                        </div>
                        <div class="setting-item">
                            <label>Schedule:</label>
                            <input type="text" value="${backup.schedule}">
                        </div>
                        <div class="setting-item">
                            <label>Retention (days):</label>
                            <input type="number" value="${backup.retentionDays}" min="7" max="365">
                        </div>
                        <div class="setting-item">
                            <label>Backup Location:</label>
                            <select>
                                <option value="aws-s3" ${backup.backupLocation === 'AWS S3' ? 'selected' : ''}>AWS S3</option>
                                <option value="google-cloud">Google Cloud Storage</option>
                                <option value="azure">Azure Blob Storage</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.administration.updateBackupSettings()">
                        💾 Save Settings
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Switch admin view
     */
    switchView(viewType) {
        this.currentView = viewType;

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update content
        const contentContainer = document.getElementById('admin-view-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.renderAdminView();
        }
    }

    /**
     * Add administration specific styles
     */
    addAdministrationStyles() {
        if (document.getElementById('administration-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'administration-styles';
        styles.textContent = `
            .admin-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .admin-actions {
                display: flex;
                gap: 0.5rem;
            }

            .system-status-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .admin-nav {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 2rem;
                padding: 0.5rem;
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                overflow-x: auto;
            }

            .admin-section {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                padding: 2rem;
            }

            .admin-section h3 {
                margin-bottom: 2rem;
                color: var(--gray-900);
                font-size: 1.5rem;
            }

            .admin-section h4 {
                margin-bottom: 1.5rem;
                color: var(--gray-800);
                font-size: 1.125rem;
            }

            .system-info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .info-card {
                padding: 1.5rem;
                background: var(--accent);
                border-radius: 12px;
                border: 1px solid var(--gray-200);
            }

            .info-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .info-label {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .info-value {
                font-weight: 600;
                color: var(--gray-900);
            }

            .quick-actions {
                margin-bottom: 2rem;
            }

            .actions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
            }

            .action-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1.5rem;
                background: var(--accent);
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                cursor: pointer;
                transition: var(--transition);
            }

            .action-btn:hover {
                background: var(--gray-100);
                transform: translateY(-2px);
            }

            .action-icon {
                font-size: 2rem;
            }

            .action-text {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--gray-700);
            }

            .status-good {
                border-left: 4px solid var(--success);
            }

            .status-warning {
                border-left: 4px solid var(--warning);
            }

            .status-danger {
                border-left: 4px solid var(--error);
            }

            @media (max-width: 768px) {
                .admin-header {
                    flex-direction: column;
                    align-items: stretch;
                }

                .admin-nav {
                    flex-wrap: wrap;
                }

                .system-info-grid {
                    grid-template-columns: 1fr;
                }

                .actions-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Utility methods for administration actions
     */
    async createBackup() {
        UIComponents.showNotification('Creating system backup...', 'info');
        setTimeout(() => {
            UIComponents.showNotification('Backup functionality coming soon', 'info');
        }, 1000);
    }

    async runMaintenance() {
        UIComponents.showNotification('Running system maintenance...', 'info');
        setTimeout(() => {
            UIComponents.showNotification('Maintenance functionality coming soon', 'info');
        }, 1000);
    }

    async exportSystemData() {
        UIComponents.showNotification('Exporting system data...', 'info');
        setTimeout(() => {
            UIComponents.showNotification('Export functionality coming soon', 'info');
        }, 1000);
    }

    /**
     * Retry loading administration data
     */
    async retry() {
        await this.render();
    }
}

export default AdministrationModule;

export default AdministrationModule;
