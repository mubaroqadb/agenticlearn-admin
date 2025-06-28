/**
 * AI Management Module for AgenticLearn Admin Portal
 * Comprehensive AI model monitoring, tuning, and performance management
 */

import UIComponents from '../core/ui-components.js';

class AIManagementModule {
    constructor(apiClient) {
        this.api = apiClient;
        this.aiData = null;
        this.currentView = 'overview';
        this.isLoading = false;
    }

    /**
     * Render the AI management interface
     */
    async render() {
        try {
            console.log('🤖 Rendering AI Management module...');

            const container = document.getElementById('ai-management-content');
            if (!container) {
                console.error('❌ AI Management container not found');
                return;
            }

            // Show loading state
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <h3>🤖 Loading AI Management...</h3>
                    <p>Fetching AI models and performance data</p>
                </div>
            `;

            // Load AI data
            await this.loadAIData();

            // Render AI management interface
            this.renderAIInterface(container);

            console.log('✅ AI Management module rendered successfully');

        } catch (error) {
            console.error('❌ Failed to render AI management:', error);

            const container = document.getElementById('ai-management-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-state">
                        <div class="error-icon">❌</div>
                        <h3>Failed to Load AI Management</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.aiManagement.retry()">
                            🔄 Retry
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Load AI data from backend
     */
    async loadAIData() {
        try {
            console.log('🤖 Loading AI data from backend...');
            this.isLoading = true;

            const aiResponse = await this.api.getAIData();
            if (aiResponse.success) {
                this.aiData = aiResponse.data;
                console.log('✅ AI data loaded from backend');
            } else {
                // Use comprehensive mock data for demo
                this.aiData = this.getMockAIData();
                console.log('⚠️ Using mock AI data');
            }

        } catch (error) {
            console.error('❌ Failed to load AI data:', error);
            this.aiData = this.getMockAIData();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get comprehensive mock AI data
     */
    getMockAIData() {
        return {
            models: [
                {
                    id: 'model_001',
                    name: 'AgenticLearn Tutor GPT',
                    type: 'Language Model',
                    version: 'v2.1.3',
                    status: 'Active',
                    accuracy: 94.7,
                    responseTime: 245, // ms
                    usage: 87.3, // percentage
                    lastUpdated: '2025-06-28T10:00:00Z',
                    description: 'Primary AI tutor for personalized learning assistance',
                    parameters: '7B',
                    provider: 'OpenAI',
                    costPerRequest: 0.002
                },
                {
                    id: 'model_002',
                    name: 'Content Recommendation Engine',
                    type: 'Recommendation System',
                    version: 'v1.8.2',
                    status: 'Active',
                    accuracy: 91.2,
                    responseTime: 156,
                    usage: 76.8,
                    lastUpdated: '2025-06-27T15:30:00Z',
                    description: 'Personalized course and content recommendations',
                    parameters: '2B',
                    provider: 'Custom',
                    costPerRequest: 0.001
                },
                {
                    id: 'model_003',
                    name: 'Assessment Generator',
                    type: 'Content Generation',
                    version: 'v1.5.1',
                    status: 'Active',
                    accuracy: 89.4,
                    responseTime: 312,
                    usage: 45.2,
                    lastUpdated: '2025-06-26T09:00:00Z',
                    description: 'Automated quiz and assessment generation',
                    parameters: '3B',
                    provider: 'Anthropic',
                    costPerRequest: 0.0015
                },
                {
                    id: 'model_004',
                    name: 'Learning Path Optimizer',
                    type: 'Optimization',
                    version: 'v2.0.1',
                    status: 'Training',
                    accuracy: 86.1,
                    responseTime: 423,
                    usage: 23.7,
                    lastUpdated: '2025-06-25T14:20:00Z',
                    description: 'Optimizes learning paths based on student progress',
                    parameters: '1.5B',
                    provider: 'Custom',
                    costPerRequest: 0.0008
                }
            ],
            performance: {
                totalRequests: 1247893,
                successRate: 99.2,
                avgResponseTime: 234,
                totalCost: 2847.32,
                costTrend: -12.3, // percentage change
                errorRate: 0.8,
                uptime: 99.7
            },
            usage: {
                daily: [
                    { date: '2025-06-22', requests: 12450 },
                    { date: '2025-06-23', requests: 13200 },
                    { date: '2025-06-24', requests: 11800 },
                    { date: '2025-06-25', requests: 14500 },
                    { date: '2025-06-26', requests: 15200 },
                    { date: '2025-06-27', requests: 13900 },
                    { date: '2025-06-28', requests: 16100 }
                ],
                byModel: {
                    'AgenticLearn Tutor GPT': 45.2,
                    'Content Recommendation Engine': 28.7,
                    'Assessment Generator': 16.3,
                    'Learning Path Optimizer': 9.8
                }
            },
            monitoring: {
                alerts: [
                    {
                        id: 'alert_001',
                        type: 'warning',
                        model: 'Learning Path Optimizer',
                        message: 'Model accuracy below threshold (86.1%)',
                        timestamp: '2025-06-28T09:30:00Z',
                        status: 'active'
                    },
                    {
                        id: 'alert_002',
                        type: 'info',
                        model: 'Assessment Generator',
                        message: 'Model update available (v1.5.2)',
                        timestamp: '2025-06-27T16:45:00Z',
                        status: 'active'
                    }
                ],
                metrics: {
                    bias: 2.3, // percentage
                    fairness: 94.7,
                    explainability: 87.2,
                    safety: 98.1
                }
            },
            training: {
                activeJobs: [
                    {
                        id: 'job_001',
                        model: 'Learning Path Optimizer',
                        type: 'Fine-tuning',
                        progress: 67,
                        eta: '2 hours',
                        startTime: '2025-06-28T08:00:00Z'
                    }
                ],
                completedJobs: [
                    {
                        id: 'job_002',
                        model: 'Content Recommendation Engine',
                        type: 'Retraining',
                        completedTime: '2025-06-27T12:00:00Z',
                        duration: '4.5 hours',
                        improvement: '+2.3% accuracy'
                    }
                ]
            }
        };
    }

    /**
     * Render AI management interface
     */
    renderAIInterface(container) {
        const activeModels = this.aiData.models.filter(m => m.status === 'Active').length;
        const avgAccuracy = (this.aiData.models.reduce((sum, m) => sum + m.accuracy, 0) / this.aiData.models.length).toFixed(1);
        const totalCost = this.aiData.performance.totalCost;

        container.innerHTML = `
            <div class="ai-management-header">
                <div class="page-header">
                    <h2 class="page-title">🤖 AI Management</h2>
                    <p class="page-subtitle">Comprehensive AI model monitoring, tuning, and performance management</p>
                </div>

                <div class="ai-actions">
                    <button class="btn btn-secondary" onclick="window.adminPortal.modules.aiManagement.exportAIData()">
                        📊 Export AI Data
                    </button>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.aiManagement.deployModel()">
                        🚀 Deploy Model
                    </button>
                </div>
            </div>

            <!-- AI Overview Stats -->
            <div class="ai-stats-grid">
                ${UIComponents.createStatsCard('Active Models', activeModels, '🤖', null, 'primary')}
                ${UIComponents.createStatsCard('Avg Accuracy', `${avgAccuracy}%`, '🎯', null, 'success')}
                ${UIComponents.createStatsCard('Total Requests', UIComponents.formatNumber(this.aiData.performance.totalRequests), '📊', null, 'info')}
                ${UIComponents.createStatsCard('Monthly Cost', `$${totalCost.toFixed(2)}`, '💰', { value: `${this.aiData.performance.costTrend}%`, direction: 'down' }, 'warning')}
            </div>

            <!-- AI Navigation -->
            <div class="ai-nav">
                <button class="nav-btn ${this.currentView === 'overview' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.aiManagement.switchView('overview')">
                    📈 Overview
                </button>
                <button class="nav-btn ${this.currentView === 'models' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.aiManagement.switchView('models')">
                    🤖 Models
                </button>
                <button class="nav-btn ${this.currentView === 'performance' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.aiManagement.switchView('performance')">
                    ⚡ Performance
                </button>
                <button class="nav-btn ${this.currentView === 'monitoring' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.aiManagement.switchView('monitoring')">
                    🔍 Monitoring
                </button>
                <button class="nav-btn ${this.currentView === 'training' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.aiManagement.switchView('training')">
                    🎓 Training
                </button>
            </div>

            <!-- AI Content -->
            <div class="ai-content" id="ai-view-content">
                ${this.renderAIView()}
            </div>
        `;

        // Add AI management styles
        this.addAIManagementStyles();
    }

    /**
     * Render AI view based on current view
     */
    renderAIView() {
        switch (this.currentView) {
            case 'overview':
                return this.renderOverview();
            case 'models':
                return this.renderModels();
            case 'performance':
                return this.renderPerformance();
            case 'monitoring':
                return this.renderMonitoring();
            case 'training':
                return this.renderTraining();
            default:
                return this.renderOverview();
        }
    }

    /**
     * Render overview
     */
    renderOverview() {
        return `
            <div class="ai-section">
                <h3>🤖 AI System Overview</h3>

                <!-- System Health -->
                <div class="system-overview">
                    <div class="overview-card">
                        <h4>📊 System Performance</h4>
                        <div class="overview-metrics">
                            <div class="metric">
                                <span class="metric-label">Success Rate:</span>
                                <span class="metric-value">${this.aiData.performance.successRate}%</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Avg Response Time:</span>
                                <span class="metric-value">${this.aiData.performance.avgResponseTime}ms</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Uptime:</span>
                                <span class="metric-value">${this.aiData.performance.uptime}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="overview-card">
                        <h4>🎯 AI Ethics & Safety</h4>
                        <div class="ethics-metrics">
                            <div class="ethics-item">
                                <span class="ethics-label">Bias Score:</span>
                                <span class="ethics-value">${this.aiData.monitoring.metrics.bias}%</span>
                                <div class="ethics-bar">
                                    <div class="ethics-fill" style="width: ${100 - this.aiData.monitoring.metrics.bias}%"></div>
                                </div>
                            </div>
                            <div class="ethics-item">
                                <span class="ethics-label">Fairness:</span>
                                <span class="ethics-value">${this.aiData.monitoring.metrics.fairness}%</span>
                                <div class="ethics-bar">
                                    <div class="ethics-fill" style="width: ${this.aiData.monitoring.metrics.fairness}%"></div>
                                </div>
                            </div>
                            <div class="ethics-item">
                                <span class="ethics-label">Safety:</span>
                                <span class="ethics-value">${this.aiData.monitoring.metrics.safety}%</span>
                                <div class="ethics-bar">
                                    <div class="ethics-fill" style="width: ${this.aiData.monitoring.metrics.safety}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Usage Chart -->
                <div class="usage-chart-container">
                    <h4>📈 AI Usage Trends (Last 7 Days)</h4>
                    <div class="usage-chart">
                        ${this.renderUsageChart()}
                    </div>
                </div>

                <!-- Active Alerts -->
                <div class="active-alerts">
                    <h4>⚠️ Active Alerts</h4>
                    ${this.aiData.monitoring.alerts.length > 0 ?
                        this.aiData.monitoring.alerts.map(alert => `
                            <div class="alert-item alert-${alert.type}">
                                <div class="alert-icon">${alert.type === 'warning' ? '⚠️' : 'ℹ️'}</div>
                                <div class="alert-content">
                                    <div class="alert-title">${alert.model}</div>
                                    <div class="alert-message">${alert.message}</div>
                                    <div class="alert-time">${UIComponents.formatDate(alert.timestamp, 'short')}</div>
                                </div>
                                <button class="alert-dismiss" onclick="window.adminPortal.modules.aiManagement.dismissAlert('${alert.id}')">×</button>
                            </div>
                        `).join('') :
                        '<div class="no-alerts">✅ No active alerts</div>'
                    }
                </div>
            </div>
        `;
    }

    /**
     * Render models view
     */
    renderModels() {
        return `
            <div class="ai-section">
                <h3>🤖 AI Models Management</h3>

                <div class="models-grid">
                    ${this.aiData.models.map(model => `
                        <div class="model-card">
                            <div class="model-header">
                                <div class="model-info">
                                    <h4>${model.name}</h4>
                                    <p class="model-type">${model.type}</p>
                                </div>
                                <div class="model-status">
                                    ${UIComponents.createBadge(model.status, model.status.toLowerCase())}
                                </div>
                            </div>

                            <div class="model-content">
                                <p class="model-description">${model.description}</p>

                                <div class="model-metrics">
                                    <div class="metric-item">
                                        <span class="metric-label">Accuracy:</span>
                                        <span class="metric-value">${model.accuracy}%</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Response Time:</span>
                                        <span class="metric-value">${model.responseTime}ms</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Usage:</span>
                                        <span class="metric-value">${model.usage}%</span>
                                    </div>
                                    <div class="metric-item">
                                        <span class="metric-label">Cost/Request:</span>
                                        <span class="metric-value">$${model.costPerRequest}</span>
                                    </div>
                                </div>

                                <div class="model-details">
                                    <div class="detail-item">
                                        <span class="detail-label">Version:</span>
                                        <span class="detail-value">${model.version}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Parameters:</span>
                                        <span class="detail-value">${model.parameters}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Provider:</span>
                                        <span class="detail-value">${model.provider}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Last Updated:</span>
                                        <span class="detail-value">${UIComponents.formatDate(model.lastUpdated, 'short')}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="model-actions">
                                <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.configureModel('${model.id}')">
                                    ⚙️ Configure
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.monitorModel('${model.id}')">
                                    📊 Monitor
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.updateModel('${model.id}')">
                                    🔄 Update
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render performance view
     */
    renderPerformance() {
        const perf = this.aiData.performance;

        return `
            <div class="ai-section">
                <h3>⚡ AI Performance Analytics</h3>

                <!-- Performance Metrics -->
                <div class="performance-grid">
                    <div class="performance-card">
                        <h4>📊 Request Metrics</h4>
                        <div class="performance-stats">
                            <div class="stat-large">
                                <span class="stat-value">${UIComponents.formatNumber(perf.totalRequests)}</span>
                                <span class="stat-label">Total Requests</span>
                            </div>
                            <div class="stat-row">
                                <div class="stat-item">
                                    <span class="stat-label">Success Rate:</span>
                                    <span class="stat-value">${perf.successRate}%</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Error Rate:</span>
                                    <span class="stat-value">${perf.errorRate}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="performance-card">
                        <h4>⚡ Response Times</h4>
                        <div class="performance-stats">
                            <div class="stat-large">
                                <span class="stat-value">${perf.avgResponseTime}ms</span>
                                <span class="stat-label">Average Response</span>
                            </div>
                            <div class="response-breakdown">
                                ${this.aiData.models.map(model => `
                                    <div class="response-item">
                                        <span class="response-model">${model.name}:</span>
                                        <span class="response-time">${model.responseTime}ms</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="performance-card">
                        <h4>💰 Cost Analysis</h4>
                        <div class="performance-stats">
                            <div class="stat-large">
                                <span class="stat-value">$${perf.totalCost.toFixed(2)}</span>
                                <span class="stat-label">Monthly Cost</span>
                            </div>
                            <div class="cost-trend">
                                <span class="trend-label">Cost Trend:</span>
                                <span class="trend-value ${perf.costTrend < 0 ? 'positive' : 'negative'}">
                                    ${perf.costTrend > 0 ? '+' : ''}${perf.costTrend}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Usage Distribution -->
                <div class="usage-distribution">
                    <h4>📈 Model Usage Distribution</h4>
                    <div class="usage-bars">
                        ${Object.entries(this.aiData.usage.byModel).map(([model, percentage]) => `
                            <div class="usage-bar-item">
                                <div class="usage-info">
                                    <span class="usage-model">${model}</span>
                                    <span class="usage-percentage">${percentage}%</span>
                                </div>
                                <div class="usage-bar">
                                    <div class="usage-fill" style="width: ${percentage}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render monitoring view
     */
    renderMonitoring() {
        const monitoring = this.aiData.monitoring;

        return `
            <div class="ai-section">
                <h3>🔍 AI Monitoring & Ethics</h3>

                <!-- Ethics Dashboard -->
                <div class="ethics-dashboard">
                    <h4>🎯 AI Ethics & Fairness Metrics</h4>
                    <div class="ethics-grid">
                        <div class="ethics-card">
                            <h5>Bias Detection</h5>
                            <div class="ethics-score ${monitoring.metrics.bias < 5 ? 'good' : monitoring.metrics.bias < 10 ? 'warning' : 'danger'}">
                                ${monitoring.metrics.bias}%
                            </div>
                            <p>Lower is better</p>
                        </div>

                        <div class="ethics-card">
                            <h5>Fairness Score</h5>
                            <div class="ethics-score ${monitoring.metrics.fairness > 90 ? 'good' : monitoring.metrics.fairness > 80 ? 'warning' : 'danger'}">
                                ${monitoring.metrics.fairness}%
                            </div>
                            <p>Higher is better</p>
                        </div>

                        <div class="ethics-card">
                            <h5>Explainability</h5>
                            <div class="ethics-score ${monitoring.metrics.explainability > 85 ? 'good' : monitoring.metrics.explainability > 75 ? 'warning' : 'danger'}">
                                ${monitoring.metrics.explainability}%
                            </div>
                            <p>Model transparency</p>
                        </div>

                        <div class="ethics-card">
                            <h5>Safety Score</h5>
                            <div class="ethics-score ${monitoring.metrics.safety > 95 ? 'good' : monitoring.metrics.safety > 90 ? 'warning' : 'danger'}">
                                ${monitoring.metrics.safety}%
                            </div>
                            <p>Content safety</p>
                        </div>
                    </div>
                </div>

                <!-- Alerts Management -->
                <div class="alerts-management">
                    <h4>⚠️ Alerts & Notifications</h4>
                    <div class="alerts-list">
                        ${monitoring.alerts.map(alert => `
                            <div class="alert-card alert-${alert.type}">
                                <div class="alert-header">
                                    <div class="alert-icon">${alert.type === 'warning' ? '⚠️' : 'ℹ️'}</div>
                                    <div class="alert-info">
                                        <h5>${alert.model}</h5>
                                        <p class="alert-time">${UIComponents.formatDate(alert.timestamp, 'long')}</p>
                                    </div>
                                    <div class="alert-actions">
                                        <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.resolveAlert('${alert.id}')">
                                            ✅ Resolve
                                        </button>
                                        <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.dismissAlert('${alert.id}')">
                                            ❌ Dismiss
                                        </button>
                                    </div>
                                </div>
                                <div class="alert-message">${alert.message}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Monitoring Controls -->
                <div class="monitoring-controls">
                    <h4>🔧 Monitoring Configuration</h4>
                    <div class="controls-grid">
                        <div class="control-group">
                            <label>Alert Thresholds:</label>
                            <div class="threshold-controls">
                                <div class="threshold-item">
                                    <span>Accuracy:</span>
                                    <input type="number" value="85" min="0" max="100"> %
                                </div>
                                <div class="threshold-item">
                                    <span>Response Time:</span>
                                    <input type="number" value="500" min="0"> ms
                                </div>
                                <div class="threshold-item">
                                    <span>Error Rate:</span>
                                    <input type="number" value="5" min="0" max="100"> %
                                </div>
                            </div>
                        </div>

                        <div class="control-actions">
                            <button class="btn btn-primary" onclick="window.adminPortal.modules.aiManagement.updateThresholds()">
                                💾 Save Thresholds
                            </button>
                            <button class="btn btn-secondary" onclick="window.adminPortal.modules.aiManagement.resetThresholds()">
                                🔄 Reset to Default
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render training view
     */
    renderTraining() {
        const training = this.aiData.training;

        return `
            <div class="ai-section">
                <h3>🎓 AI Training & Development</h3>

                <!-- Active Training Jobs -->
                <div class="training-jobs">
                    <h4>🔄 Active Training Jobs</h4>
                    ${training.activeJobs.length > 0 ? `
                        <div class="jobs-list">
                            ${training.activeJobs.map(job => `
                                <div class="job-card active-job">
                                    <div class="job-header">
                                        <div class="job-info">
                                            <h5>${job.model}</h5>
                                            <p class="job-type">${job.type}</p>
                                        </div>
                                        <div class="job-status">
                                            <span class="status-badge active">Running</span>
                                        </div>
                                    </div>

                                    <div class="job-progress">
                                        <div class="progress-info">
                                            <span>Progress: ${job.progress}%</span>
                                            <span>ETA: ${job.eta}</span>
                                        </div>
                                        ${UIComponents.createProgressBar(job.progress, 100, { size: 'medium', showValue: false })}
                                    </div>

                                    <div class="job-details">
                                        <span class="job-start">Started: ${UIComponents.formatDate(job.startTime, 'short')}</span>
                                    </div>

                                    <div class="job-actions">
                                        <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.pauseTraining('${job.id}')">
                                            ⏸️ Pause
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="window.adminPortal.modules.aiManagement.stopTraining('${job.id}')">
                                            ⏹️ Stop
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="no-jobs">
                            <p>No active training jobs</p>
                            <button class="btn btn-primary" onclick="window.adminPortal.modules.aiManagement.startTraining()">
                                🚀 Start New Training
                            </button>
                        </div>
                    `}
                </div>

                <!-- Completed Jobs -->
                <div class="completed-jobs">
                    <h4>✅ Recently Completed Jobs</h4>
                    <div class="jobs-list">
                        ${training.completedJobs.map(job => `
                            <div class="job-card completed-job">
                                <div class="job-header">
                                    <div class="job-info">
                                        <h5>${job.model}</h5>
                                        <p class="job-type">${job.type}</p>
                                    </div>
                                    <div class="job-status">
                                        <span class="status-badge completed">Completed</span>
                                    </div>
                                </div>

                                <div class="job-results">
                                    <div class="result-item">
                                        <span class="result-label">Duration:</span>
                                        <span class="result-value">${job.duration}</span>
                                    </div>
                                    <div class="result-item">
                                        <span class="result-label">Improvement:</span>
                                        <span class="result-value improvement">${job.improvement}</span>
                                    </div>
                                    <div class="result-item">
                                        <span class="result-label">Completed:</span>
                                        <span class="result-value">${UIComponents.formatDate(job.completedTime, 'short')}</span>
                                    </div>
                                </div>

                                <div class="job-actions">
                                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.viewTrainingLogs('${job.id}')">
                                        📋 View Logs
                                    </button>
                                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.aiManagement.deployModel('${job.id}')">
                                        🚀 Deploy
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Training Configuration -->
                <div class="training-config">
                    <h4>⚙️ Training Configuration</h4>
                    <div class="config-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="training-model">Select Model:</label>
                                <select id="training-model">
                                    ${this.aiData.models.map(model => `
                                        <option value="${model.id}">${model.name}</option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="training-type">Training Type:</label>
                                <select id="training-type">
                                    <option value="fine-tuning">Fine-tuning</option>
                                    <option value="retraining">Full Retraining</option>
                                    <option value="transfer-learning">Transfer Learning</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="training-dataset">Dataset:</label>
                                <select id="training-dataset">
                                    <option value="latest">Latest Dataset</option>
                                    <option value="custom">Custom Dataset</option>
                                    <option value="augmented">Augmented Dataset</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button class="btn btn-primary" onclick="window.adminPortal.modules.aiManagement.startCustomTraining()">
                                🎓 Start Training
                            </button>
                            <button class="btn btn-secondary" onclick="window.adminPortal.modules.aiManagement.scheduleTraining()">
                                📅 Schedule Training
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render usage chart
     */
    renderUsageChart() {
        const data = this.aiData.usage.daily;
        const maxRequests = Math.max(...data.map(d => d.requests));

        return `
            <div class="usage-chart-bars">
                ${data.map(day => {
                    const height = (day.requests / maxRequests) * 100;
                    return `
                        <div class="usage-bar">
                            <div class="bar-fill" style="height: ${height}%"></div>
                            <div class="bar-value">${UIComponents.formatNumber(day.requests)}</div>
                            <div class="bar-label">${UIComponents.formatDate(day.date, 'short')}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Switch AI view
     */
    switchView(viewType) {
        this.currentView = viewType;

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update content
        const contentContainer = document.getElementById('ai-view-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.renderAIView();
        }
    }

    /**
     * Configure model
     */
    configureModel(modelId) {
        const model = this.aiData.models.find(m => m.id === modelId);
        if (!model) return;

        UIComponents.showNotification(`Opening configuration for ${model.name}...`, 'info');
        // In real app, this would open model configuration modal
        setTimeout(() => {
            UIComponents.showNotification('Model configuration functionality coming soon', 'info');
        }, 1000);
    }

    /**
     * Monitor model
     */
    monitorModel(modelId) {
        const model = this.aiData.models.find(m => m.id === modelId);
        if (!model) return;

        UIComponents.showNotification(`Opening monitoring dashboard for ${model.name}...`, 'info');
        // Switch to monitoring view and highlight this model
        this.switchView('monitoring');
    }

    /**
     * Update model
     */
    updateModel(modelId) {
        const model = this.aiData.models.find(m => m.id === modelId);
        if (!model) return;

        UIComponents.showNotification(`Checking for updates for ${model.name}...`, 'info');
        setTimeout(() => {
            UIComponents.showNotification('Model update functionality coming soon', 'info');
        }, 1000);
    }

    /**
     * Deploy model
     */
    deployModel(modelId) {
        UIComponents.showNotification('Preparing model deployment...', 'info');
        setTimeout(() => {
            UIComponents.showNotification('Model deployment functionality coming soon', 'info');
        }, 1000);
    }

    /**
     * Dismiss alert
     */
    dismissAlert(alertId) {
        // Remove alert from data
        this.aiData.monitoring.alerts = this.aiData.monitoring.alerts.filter(alert => alert.id !== alertId);

        // Refresh current view if on overview or monitoring
        if (this.currentView === 'overview' || this.currentView === 'monitoring') {
            const contentContainer = document.getElementById('ai-view-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderAIView();
            }
        }

        UIComponents.showNotification('Alert dismissed', 'success');
    }

    /**
     * Export AI data
     */
    async exportAIData() {
        try {
            UIComponents.showNotification('Exporting AI data...', 'info');

            const exportResponse = await this.api.exportData('ai-models', 'excel');

            if (exportResponse.success) {
                UIComponents.showNotification('AI data exported successfully', 'success');
            } else {
                throw new Error('Export failed');
            }
        } catch (error) {
            UIComponents.showNotification('Export functionality coming soon', 'info');
        }
    }

    /**
     * Add AI management specific styles
     */
    addAIManagementStyles() {
        if (document.getElementById('ai-management-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'ai-management-styles';
        styles.textContent = `
            .ai-management-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .ai-actions {
                display: flex;
                gap: 0.5rem;
            }

            .ai-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .ai-nav {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 2rem;
                padding: 0.5rem;
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                overflow-x: auto;
            }

            .ai-section {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                padding: 2rem;
            }

            .ai-section h3 {
                margin-bottom: 2rem;
                color: var(--gray-900);
                font-size: 1.5rem;
            }

            .ai-section h4 {
                margin-bottom: 1.5rem;
                color: var(--gray-800);
                font-size: 1.125rem;
            }

            .system-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .overview-card {
                padding: 1.5rem;
                background: var(--accent);
                border-radius: 12px;
                border: 1px solid var(--gray-200);
            }

            .overview-card h4 {
                margin-bottom: 1rem;
                color: var(--gray-900);
            }

            .overview-metrics {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .overview-metrics .metric {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .metric-label {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .metric-value {
                font-weight: 600;
                color: var(--gray-900);
            }

            .ethics-metrics {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .ethics-item {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .ethics-label {
                min-width: 80px;
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .ethics-value {
                min-width: 40px;
                font-weight: 600;
                color: var(--gray-900);
            }

            .ethics-bar {
                flex: 1;
                height: 8px;
                background: var(--gray-200);
                border-radius: 4px;
                overflow: hidden;
            }

            .ethics-fill {
                height: 100%;
                background: var(--success);
                transition: width 0.3s ease;
            }

            .usage-chart-container {
                margin-bottom: 2rem;
            }

            .usage-chart-bars {
                display: flex;
                align-items: end;
                gap: 1rem;
                height: 200px;
                padding: 1rem 0;
            }

            .usage-bar {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
            }

            .bar-fill {
                width: 100%;
                background: var(--primary);
                border-radius: 4px 4px 0 0;
                min-height: 20px;
            }

            .bar-value {
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--gray-900);
                margin-top: 0.5rem;
            }

            .bar-label {
                font-size: 0.625rem;
                color: var(--gray-600);
                margin-top: 0.25rem;
                text-align: center;
            }

            .models-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 2rem;
            }

            .model-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                overflow: hidden;
            }

            .model-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 1.5rem;
                background: var(--accent);
                border-bottom: 1px solid var(--gray-200);
            }

            .model-info h4 {
                margin-bottom: 0.5rem;
                color: var(--gray-900);
            }

            .model-type {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .model-content {
                padding: 1.5rem;
            }

            .model-description {
                color: var(--gray-600);
                margin-bottom: 1.5rem;
                line-height: 1.5;
            }

            .model-metrics {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
                margin-bottom: 1.5rem;
            }

            .model-metrics .metric-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                background: var(--gray-50);
                border-radius: 8px;
            }

            .model-details {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.75rem;
            }

            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.875rem;
            }

            .detail-label {
                color: var(--gray-600);
            }

            .detail-value {
                font-weight: 500;
                color: var(--gray-900);
            }

            .model-actions {
                display: flex;
                gap: 0.5rem;
                padding: 1rem 1.5rem;
                background: var(--gray-50);
                border-top: 1px solid var(--gray-200);
            }

            .model-actions .btn {
                flex: 1;
                font-size: 0.75rem;
            }

            .performance-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .performance-card {
                padding: 1.5rem;
                background: var(--accent);
                border-radius: 12px;
                border: 1px solid var(--gray-200);
            }

            .performance-stats {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .stat-large {
                text-align: center;
                padding: 1rem;
                background: white;
                border-radius: 8px;
            }

            .stat-large .stat-value {
                display: block;
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: 0.5rem;
            }

            .stat-large .stat-label {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .positive {
                color: var(--success);
            }

            .negative {
                color: var(--error);
            }

            @media (max-width: 768px) {
                .ai-management-header {
                    flex-direction: column;
                    align-items: stretch;
                }

                .ai-nav {
                    flex-wrap: wrap;
                }

                .models-grid {
                    grid-template-columns: 1fr;
                }

                .system-overview {
                    grid-template-columns: 1fr;
                }

                .performance-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Retry loading AI data
     */
    async retry() {
        await this.render();
    }
}

export default AIManagementModule;
