/**
 * Analytics & Reports Module for AgenticLearn Admin Portal
 * Comprehensive analytics, insights, and reporting system
 */

import { UIComponents } from '../core/ui-components.js';

export class AnalyticsModule {
    constructor(apiClient) {
        this.api = apiClient;
        this.analyticsData = null;
        this.currentTimeframe = '30d';
        this.currentView = 'overview';
        this.isLoading = false;
        this.charts = {};
    }

    /**
     * Render the analytics interface
     */
    async render() {
        try {
            console.log('📊 Rendering Analytics module...');

            const container = document.getElementById('analytics-content');
            if (!container) {
                console.error('❌ Analytics container not found');
                return;
            }

            // Show loading state
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <h3>📊 Loading Analytics...</h3>
                    <p>Fetching system analytics and generating reports</p>
                </div>
            `;

            // Load analytics data
            await this.loadAnalyticsData();

            // Render analytics interface
            this.renderAnalyticsInterface(container);

            console.log('✅ Analytics module rendered successfully');

        } catch (error) {
            console.error('❌ Failed to render analytics:', error);

            const container = document.getElementById('analytics-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-state">
                        <div class="error-icon">❌</div>
                        <h3>Failed to Load Analytics</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.analytics.retry()">
                            🔄 Retry
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Load analytics data from backend
     */
    async loadAnalyticsData() {
        try {
            console.log('📊 Loading analytics data from backend...');
            this.isLoading = true;

            const analyticsResponse = await this.api.getAnalytics(this.currentTimeframe);
            if (analyticsResponse.success) {
                this.analyticsData = analyticsResponse.data;
                console.log('✅ Analytics data loaded from backend');
            } else {
                // Use comprehensive mock data for demo
                this.analyticsData = this.getMockAnalyticsData();
                console.log('⚠️ Using mock analytics data');
            }

        } catch (error) {
            console.error('❌ Failed to load analytics data:', error);
            this.analyticsData = this.getMockAnalyticsData();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get comprehensive mock analytics data
     */
    getMockAnalyticsData() {
        return {
            overview: {
                totalUsers: 2847,
                activeUsers: 1523,
                newUsers: 234,
                userGrowth: 12.5,
                totalCourses: 156,
                activeCourses: 89,
                courseCompletions: 1247,
                avgCompletionRate: 84.3,
                totalRevenue: 0, // Free platform
                carbonSaved: 245.7, // kg CO2
                systemUptime: 99.8,
                avgSessionTime: 42.5 // minutes
            },
            userAnalytics: {
                registrationTrend: [
                    { date: '2025-06-01', count: 45 },
                    { date: '2025-06-02', count: 52 },
                    { date: '2025-06-03', count: 38 },
                    { date: '2025-06-04', count: 67 },
                    { date: '2025-06-05', count: 71 },
                    { date: '2025-06-06', count: 43 },
                    { date: '2025-06-07', count: 59 },
                    { date: '2025-06-08', count: 84 },
                    { date: '2025-06-09', count: 76 },
                    { date: '2025-06-10', count: 92 }
                ],
                usersByRole: {
                    students: 2456,
                    educators: 234,
                    administrators: 12
                },
                usersByLocation: [
                    { country: 'United States', users: 856, percentage: 30.1 },
                    { country: 'United Kingdom', users: 423, percentage: 14.9 },
                    { country: 'Canada', users: 312, percentage: 11.0 },
                    { country: 'Australia', users: 267, percentage: 9.4 },
                    { country: 'Germany', users: 234, percentage: 8.2 },
                    { country: 'Others', users: 755, percentage: 26.4 }
                ],
                engagementMetrics: {
                    dailyActiveUsers: 1523,
                    weeklyActiveUsers: 2134,
                    monthlyActiveUsers: 2847,
                    avgSessionsPerUser: 3.2,
                    avgTimePerSession: 42.5,
                    bounceRate: 23.4
                }
            },
            courseAnalytics: {
                popularCourses: [
                    {
                        title: 'JavaScript Fundamentals',
                        enrollments: 234,
                        completions: 203,
                        completionRate: 86.8,
                        avgRating: 4.8,
                        revenue: 0
                    },
                    {
                        title: 'Digital Literacy Basics',
                        enrollments: 189,
                        completions: 174,
                        completionRate: 92.1,
                        avgRating: 4.9,
                        revenue: 0
                    },
                    {
                        title: 'Green Computing Principles',
                        enrollments: 156,
                        completions: 122,
                        completionRate: 78.2,
                        avgRating: 4.7,
                        revenue: 0
                    },
                    {
                        title: 'Web Development Introduction',
                        enrollments: 145,
                        completions: 120,
                        completionRate: 82.8,
                        avgRating: 4.6,
                        revenue: 0
                    },
                    {
                        title: 'AI Ethics & Safety',
                        enrollments: 123,
                        completions: 117,
                        completionRate: 95.1,
                        avgRating: 4.9,
                        revenue: 0
                    }
                ],
                categoryPerformance: [
                    { category: 'Programming', courses: 45, students: 1234, avgCompletion: 84.2 },
                    { category: 'Digital Literacy', courses: 32, students: 987, avgCompletion: 91.5 },
                    { category: 'Sustainability', courses: 28, students: 654, avgCompletion: 78.9 },
                    { category: 'Web Development', courses: 25, students: 543, avgCompletion: 82.1 },
                    { category: 'AI & Ethics', courses: 18, students: 432, avgCompletion: 93.4 },
                    { category: 'Data Science', courses: 8, students: 123, avgCompletion: 67.8 }
                ],
                enrollmentTrend: [
                    { date: '2025-06-01', enrollments: 23 },
                    { date: '2025-06-02', enrollments: 31 },
                    { date: '2025-06-03', enrollments: 28 },
                    { date: '2025-06-04', enrollments: 45 },
                    { date: '2025-06-05', enrollments: 52 },
                    { date: '2025-06-06', enrollments: 34 },
                    { date: '2025-06-07', enrollments: 41 },
                    { date: '2025-06-08', enrollments: 67 },
                    { date: '2025-06-09', enrollments: 59 },
                    { date: '2025-06-10', enrollments: 73 }
                ]
            },
            performanceMetrics: {
                systemHealth: {
                    cpu: { current: 45, avg: 42, max: 78 },
                    memory: { current: 67, avg: 64, max: 89 },
                    storage: { current: 23, avg: 21, max: 34 },
                    network: { current: 89, avg: 87, max: 95 }
                },
                responseTime: {
                    avg: 245, // ms
                    p95: 567,
                    p99: 1234
                },
                errorRates: {
                    total: 0.12, // percentage
                    api: 0.08,
                    frontend: 0.04
                },
                carbonFootprint: {
                    daily: 8.2, // kg CO2
                    monthly: 245.7,
                    yearly: 2948.4,
                    savedVsTraditional: 1234.5
                }
            },
            learningAnalytics: {
                completionRates: {
                    overall: 84.3,
                    byLevel: {
                        beginner: 91.2,
                        intermediate: 82.7,
                        advanced: 76.4
                    },
                    byDuration: {
                        'short': 93.1, // < 4 weeks
                        'medium': 84.7, // 4-8 weeks
                        'long': 72.3 // > 8 weeks
                    }
                },
                learningPaths: [
                    { path: 'Web Development Track', students: 456, completion: 78.9 },
                    { path: 'Digital Literacy Track', students: 234, completion: 89.2 },
                    { path: 'Green Computing Track', students: 123, completion: 82.1 },
                    { path: 'AI Fundamentals Track', students: 89, completion: 91.5 }
                ],
                skillProgress: {
                    programming: 67.8,
                    digitalLiteracy: 84.2,
                    sustainability: 72.1,
                    aiEthics: 89.3,
                    webDevelopment: 75.6
                }
            },
            reports: {
                generated: [
                    {
                        id: 'report_001',
                        title: 'Monthly User Engagement Report',
                        type: 'User Analytics',
                        generatedDate: '2025-06-28T10:00:00Z',
                        format: 'PDF',
                        size: '2.3 MB'
                    },
                    {
                        id: 'report_002',
                        title: 'Course Performance Analysis',
                        type: 'Course Analytics',
                        generatedDate: '2025-06-27T15:30:00Z',
                        format: 'Excel',
                        size: '1.8 MB'
                    },
                    {
                        id: 'report_003',
                        title: 'System Performance Report',
                        type: 'Technical',
                        generatedDate: '2025-06-26T09:00:00Z',
                        format: 'PDF',
                        size: '1.2 MB'
                    }
                ]
            }
        };
    }

    /**
     * Render comprehensive analytics interface
     */
    renderAnalyticsInterface(container) {
        container.innerHTML = `
            <div class="analytics-header">
                <div class="page-header">
                    <h2 class="page-title">📊 Analytics & Reports</h2>
                    <p class="page-subtitle">Comprehensive system analytics, insights, and performance reports</p>
                </div>

                <div class="analytics-controls">
                    <div class="timeframe-selector">
                        <label>Timeframe:</label>
                        <select id="timeframe-select" onchange="window.adminPortal.modules.analytics.changeTimeframe(this.value)">
                            <option value="7d" ${this.currentTimeframe === '7d' ? 'selected' : ''}>Last 7 days</option>
                            <option value="30d" ${this.currentTimeframe === '30d' ? 'selected' : ''}>Last 30 days</option>
                            <option value="90d" ${this.currentTimeframe === '90d' ? 'selected' : ''}>Last 90 days</option>
                            <option value="1y" ${this.currentTimeframe === '1y' ? 'selected' : ''}>Last year</option>
                        </select>
                    </div>

                    <div class="analytics-actions">
                        <button class="btn btn-secondary" onclick="window.adminPortal.modules.analytics.exportAnalytics()">
                            📊 Export Data
                        </button>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.analytics.generateReport()">
                            📋 Generate Report
                        </button>
                    </div>
                </div>
            </div>

            <!-- Analytics Navigation -->
            <div class="analytics-nav">
                <button class="nav-btn ${this.currentView === 'overview' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.analytics.switchView('overview')">
                    📈 Overview
                </button>
                <button class="nav-btn ${this.currentView === 'users' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.analytics.switchView('users')">
                    👥 Users
                </button>
                <button class="nav-btn ${this.currentView === 'courses' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.analytics.switchView('courses')">
                    📚 Courses
                </button>
                <button class="nav-btn ${this.currentView === 'performance' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.analytics.switchView('performance')">
                    ⚡ Performance
                </button>
                <button class="nav-btn ${this.currentView === 'learning' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.analytics.switchView('learning')">
                    🎓 Learning
                </button>
                <button class="nav-btn ${this.currentView === 'reports' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.analytics.switchView('reports')">
                    📋 Reports
                </button>
            </div>

            <!-- Analytics Content -->
            <div class="analytics-content" id="analytics-view-content">
                ${this.renderAnalyticsView()}
            </div>
        `;

        // Add analytics styles
        this.addAnalyticsStyles();
    }

    /**
     * Render analytics view based on current view
     */
    renderAnalyticsView() {
        switch (this.currentView) {
            case 'overview':
                return this.renderOverviewAnalytics();
            case 'users':
                return this.renderUserAnalytics();
            case 'courses':
                return this.renderCourseAnalytics();
            case 'performance':
                return this.renderPerformanceAnalytics();
            case 'learning':
                return this.renderLearningAnalytics();
            case 'reports':
                return this.renderReportsView();
            default:
                return this.renderOverviewAnalytics();
        }
    }

    /**
     * Render overview analytics
     */
    renderOverviewAnalytics() {
        const data = this.analyticsData.overview;

        return `
            <!-- Key Metrics -->
            <div class="metrics-grid">
                ${UIComponents.createStatsCard('Total Users', UIComponents.formatNumber(data.totalUsers), '👥', { value: `+${data.userGrowth}%`, direction: 'up' }, 'primary')}
                ${UIComponents.createStatsCard('Active Users', UIComponents.formatNumber(data.activeUsers), '🟢', null, 'success')}
                ${UIComponents.createStatsCard('Total Courses', data.totalCourses, '📚', null, 'info')}
                ${UIComponents.createStatsCard('Avg Completion', `${data.avgCompletionRate}%`, '✅', null, 'warning')}
            </div>

            <!-- Overview Charts -->
            <div class="charts-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>📈 User Registration Trend</h3>
                        <span class="chart-period">${this.currentTimeframe}</span>
                    </div>
                    <div class="chart-container">
                        ${this.renderSimpleChart(this.analyticsData.userAnalytics.registrationTrend, 'line')}
                    </div>
                </div>

                <div class="chart-card">
                    <div class="chart-header">
                        <h3>📚 Course Enrollments</h3>
                        <span class="chart-period">${this.currentTimeframe}</span>
                    </div>
                    <div class="chart-container">
                        ${this.renderSimpleChart(this.analyticsData.courseAnalytics.enrollmentTrend, 'bar')}
                    </div>
                </div>
            </div>

            <!-- Quick Insights -->
            <div class="insights-grid">
                <div class="insight-card">
                    <div class="insight-icon">🌱</div>
                    <div class="insight-content">
                        <h4>Carbon Footprint</h4>
                        <p class="insight-value">${data.carbonSaved} kg CO2 saved</p>
                        <p class="insight-description">Through green computing practices</p>
                    </div>
                </div>

                <div class="insight-card">
                    <div class="insight-icon">⚡</div>
                    <div class="insight-content">
                        <h4>System Uptime</h4>
                        <p class="insight-value">${data.systemUptime}%</p>
                        <p class="insight-description">Excellent system reliability</p>
                    </div>
                </div>

                <div class="insight-card">
                    <div class="insight-icon">⏱️</div>
                    <div class="insight-content">
                        <h4>Avg Session Time</h4>
                        <p class="insight-value">${data.avgSessionTime} min</p>
                        <p class="insight-description">High user engagement</p>
                    </div>
                </div>

                <div class="insight-card">
                    <div class="insight-icon">🎯</div>
                    <div class="insight-content">
                        <h4>Course Completions</h4>
                        <p class="insight-value">${UIComponents.formatNumber(data.courseCompletions)}</p>
                        <p class="insight-description">Total successful completions</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render user analytics
     */
    renderUserAnalytics() {
        const data = this.analyticsData.userAnalytics;

        return `
            <div class="analytics-section">
                <h3>👥 User Analytics</h3>

                <!-- User Stats -->
                <div class="metrics-grid">
                    ${UIComponents.createStatsCard('Daily Active', UIComponents.formatNumber(data.engagementMetrics.dailyActiveUsers), '📅', null, 'primary')}
                    ${UIComponents.createStatsCard('Weekly Active', UIComponents.formatNumber(data.engagementMetrics.weeklyActiveUsers), '📊', null, 'success')}
                    ${UIComponents.createStatsCard('Monthly Active', UIComponents.formatNumber(data.engagementMetrics.monthlyActiveUsers), '📈', null, 'info')}
                    ${UIComponents.createStatsCard('Avg Sessions', data.engagementMetrics.avgSessionsPerUser, '🔄', null, 'warning')}
                </div>

                <!-- User Distribution -->
                <div class="charts-grid">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h4>Users by Role</h4>
                        </div>
                        <div class="chart-container">
                            ${this.renderPieChart(data.usersByRole)}
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="chart-header">
                            <h4>Users by Location</h4>
                        </div>
                        <div class="chart-container">
                            ${this.renderLocationChart(data.usersByLocation)}
                        </div>
                    </div>
                </div>

                <!-- Engagement Metrics -->
                <div class="engagement-metrics">
                    <h4>📊 Engagement Metrics</h4>
                    <div class="metrics-list">
                        <div class="metric-item">
                            <span class="metric-label">Average Time per Session:</span>
                            <span class="metric-value">${data.engagementMetrics.avgTimePerSession} minutes</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Bounce Rate:</span>
                            <span class="metric-value">${data.engagementMetrics.bounceRate}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Sessions per User:</span>
                            <span class="metric-value">${data.engagementMetrics.avgSessionsPerUser}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render course analytics
     */
    renderCourseAnalytics() {
        const data = this.analyticsData.courseAnalytics;

        return `
            <div class="analytics-section">
                <h3>📚 Course Analytics</h3>

                <!-- Popular Courses -->
                <div class="popular-courses">
                    <h4>🏆 Top Performing Courses</h4>
                    <div class="courses-table">
                        ${data.popularCourses.map(course => `
                            <div class="course-row">
                                <div class="course-info">
                                    <div class="course-title">${course.title}</div>
                                    <div class="course-stats">
                                        ${course.enrollments} enrollments • ${course.completions} completions
                                    </div>
                                </div>
                                <div class="course-metrics">
                                    <div class="metric">
                                        <span class="metric-label">Completion Rate</span>
                                        <span class="metric-value">${course.completionRate}%</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">Rating</span>
                                        <span class="metric-value">⭐ ${course.avgRating}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Category Performance -->
                <div class="category-performance">
                    <h4>📊 Category Performance</h4>
                    <div class="categories-grid">
                        ${data.categoryPerformance.map(category => `
                            <div class="category-card">
                                <h5>${category.category}</h5>
                                <div class="category-stats">
                                    <div class="stat">
                                        <span class="stat-value">${category.courses}</span>
                                        <span class="stat-label">Courses</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-value">${UIComponents.formatNumber(category.students)}</span>
                                        <span class="stat-label">Students</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-value">${category.avgCompletion}%</span>
                                        <span class="stat-label">Avg Completion</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render performance analytics
     */
    renderPerformanceAnalytics() {
        const data = this.analyticsData.performanceMetrics;

        return `
            <div class="analytics-section">
                <h3>⚡ System Performance</h3>

                <!-- System Health -->
                <div class="system-health">
                    <h4>🔧 System Health Metrics</h4>
                    <div class="health-grid">
                        ${Object.entries(data.systemHealth).map(([key, metrics]) => `
                            <div class="health-card">
                                <h5>${key.toUpperCase()}</h5>
                                <div class="health-metrics">
                                    <div class="health-current">
                                        <span class="health-value">${metrics.current}%</span>
                                        <span class="health-label">Current</span>
                                    </div>
                                    <div class="health-avg">
                                        <span class="health-value">${metrics.avg}%</span>
                                        <span class="health-label">Average</span>
                                    </div>
                                    <div class="health-max">
                                        <span class="health-value">${metrics.max}%</span>
                                        <span class="health-label">Peak</span>
                                    </div>
                                </div>
                                <div class="health-bar">
                                    <div class="health-fill" style="width: ${metrics.current}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Performance Metrics -->
                <div class="performance-metrics">
                    <h4>📊 Performance Metrics</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h5>Response Time</h5>
                            <div class="metric-values">
                                <div class="metric-item">
                                    <span class="metric-label">Average:</span>
                                    <span class="metric-value">${data.responseTime.avg}ms</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">95th Percentile:</span>
                                    <span class="metric-value">${data.responseTime.p95}ms</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">99th Percentile:</span>
                                    <span class="metric-value">${data.responseTime.p99}ms</span>
                                </div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <h5>Error Rates</h5>
                            <div class="metric-values">
                                <div class="metric-item">
                                    <span class="metric-label">Total:</span>
                                    <span class="metric-value">${data.errorRates.total}%</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">API:</span>
                                    <span class="metric-value">${data.errorRates.api}%</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">Frontend:</span>
                                    <span class="metric-value">${data.errorRates.frontend}%</span>
                                </div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <h5>🌱 Carbon Footprint</h5>
                            <div class="metric-values">
                                <div class="metric-item">
                                    <span class="metric-label">Daily:</span>
                                    <span class="metric-value">${data.carbonFootprint.daily} kg CO2</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">Monthly:</span>
                                    <span class="metric-value">${data.carbonFootprint.monthly} kg CO2</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-label">Saved vs Traditional:</span>
                                    <span class="metric-value">${UIComponents.formatNumber(data.carbonFootprint.savedVsTraditional)} kg CO2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render learning analytics
     */
    renderLearningAnalytics() {
        const data = this.analyticsData.learningAnalytics;

        return `
            <div class="analytics-section">
                <h3>🎓 Learning Analytics</h3>

                <!-- Completion Rates -->
                <div class="completion-analysis">
                    <h4>📊 Completion Rate Analysis</h4>
                    <div class="completion-grid">
                        <div class="completion-card">
                            <h5>Overall Completion Rate</h5>
                            <div class="completion-value">${data.completionRates.overall}%</div>
                            <div class="completion-bar">
                                <div class="completion-fill" style="width: ${data.completionRates.overall}%"></div>
                            </div>
                        </div>

                        <div class="completion-breakdown">
                            <h5>By Difficulty Level</h5>
                            ${Object.entries(data.completionRates.byLevel).map(([level, rate]) => `
                                <div class="breakdown-item">
                                    <span class="breakdown-label">${level.charAt(0).toUpperCase() + level.slice(1)}:</span>
                                    <span class="breakdown-value">${rate}%</span>
                                    <div class="breakdown-bar">
                                        <div class="breakdown-fill" style="width: ${rate}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>

                        <div class="completion-breakdown">
                            <h5>By Course Duration</h5>
                            ${Object.entries(data.completionRates.byDuration).map(([duration, rate]) => `
                                <div class="breakdown-item">
                                    <span class="breakdown-label">${duration.charAt(0).toUpperCase() + duration.slice(1)}:</span>
                                    <span class="breakdown-value">${rate}%</span>
                                    <div class="breakdown-bar">
                                        <div class="breakdown-fill" style="width: ${rate}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Learning Paths -->
                <div class="learning-paths">
                    <h4>🛤️ Learning Path Performance</h4>
                    <div class="paths-grid">
                        ${data.learningPaths.map(path => `
                            <div class="path-card">
                                <h5>${path.path}</h5>
                                <div class="path-stats">
                                    <div class="path-stat">
                                        <span class="stat-value">${path.students}</span>
                                        <span class="stat-label">Students</span>
                                    </div>
                                    <div class="path-stat">
                                        <span class="stat-value">${path.completion}%</span>
                                        <span class="stat-label">Completion</span>
                                    </div>
                                </div>
                                <div class="path-progress">
                                    ${UIComponents.createProgressBar(path.completion, 100, { size: 'medium', showValue: false })}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Skill Progress -->
                <div class="skill-progress">
                    <h4>🎯 Skill Development Progress</h4>
                    <div class="skills-grid">
                        ${Object.entries(data.skillProgress).map(([skill, progress]) => `
                            <div class="skill-item">
                                <div class="skill-header">
                                    <span class="skill-name">${skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <span class="skill-percentage">${progress}%</span>
                                </div>
                                <div class="skill-bar">
                                    <div class="skill-fill" style="width: ${progress}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render reports view
     */
    renderReportsView() {
        const data = this.analyticsData.reports;

        return `
            <div class="analytics-section">
                <h3>📋 Reports & Exports</h3>

                <!-- Report Generation -->
                <div class="report-generation">
                    <h4>📊 Generate New Report</h4>
                    <div class="report-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="report-type">Report Type:</label>
                                <select id="report-type">
                                    <option value="user-analytics">User Analytics</option>
                                    <option value="course-performance">Course Performance</option>
                                    <option value="system-performance">System Performance</option>
                                    <option value="learning-analytics">Learning Analytics</option>
                                    <option value="comprehensive">Comprehensive Report</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="report-format">Format:</label>
                                <select id="report-format">
                                    <option value="pdf">PDF</option>
                                    <option value="excel">Excel</option>
                                    <option value="csv">CSV</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="report-period">Period:</label>
                                <select id="report-period">
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d">Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                    <option value="1y">Last year</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-primary" onclick="window.adminPortal.modules.analytics.generateCustomReport()">
                                    📋 Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Generated Reports -->
                <div class="generated-reports">
                    <h4>📁 Generated Reports</h4>
                    <div class="reports-list">
                        ${data.generated.map(report => `
                            <div class="report-item">
                                <div class="report-icon">📄</div>
                                <div class="report-info">
                                    <div class="report-title">${report.title}</div>
                                    <div class="report-meta">
                                        ${report.type} • ${report.format} • ${report.size}
                                    </div>
                                    <div class="report-date">
                                        Generated: ${UIComponents.formatDate(report.generatedDate, 'short')}
                                    </div>
                                </div>
                                <div class="report-actions">
                                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.analytics.downloadReport('${report.id}')">
                                        📥 Download
                                    </button>
                                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.analytics.shareReport('${report.id}')">
                                        🔗 Share
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Quick Export Options -->
                <div class="quick-exports">
                    <h4>⚡ Quick Exports</h4>
                    <div class="export-buttons">
                        <button class="btn btn-secondary" onclick="window.adminPortal.modules.analytics.quickExport('users')">
                            👥 Export User Data
                        </button>
                        <button class="btn btn-secondary" onclick="window.adminPortal.modules.analytics.quickExport('courses')">
                            📚 Export Course Data
                        </button>
                        <button class="btn btn-secondary" onclick="window.adminPortal.modules.analytics.quickExport('analytics')">
                            📊 Export Analytics
                        </button>
                        <button class="btn btn-secondary" onclick="window.adminPortal.modules.analytics.quickExport('performance')">
                            ⚡ Export Performance
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render simple chart (placeholder for real chart library)
     */
    renderSimpleChart(data, type = 'line') {
        const maxValue = Math.max(...data.map(d => d.count || d.enrollments));

        return `
            <div class="simple-chart ${type}-chart">
                ${data.map((item, index) => {
                    const value = item.count || item.enrollments;
                    const height = (value / maxValue) * 100;
                    return `
                        <div class="chart-bar" style="height: ${height}%">
                            <div class="chart-value">${value}</div>
                            <div class="chart-label">${item.date ? UIComponents.formatDate(item.date, 'short') : item.label}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Render pie chart (placeholder)
     */
    renderPieChart(data) {
        const total = Object.values(data).reduce((sum, val) => sum + val, 0);

        return `
            <div class="pie-chart">
                ${Object.entries(data).map(([key, value]) => {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `
                        <div class="pie-segment">
                            <div class="segment-label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                            <div class="segment-value">${UIComponents.formatNumber(value)} (${percentage}%)</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Render location chart
     */
    renderLocationChart(data) {
        return `
            <div class="location-chart">
                ${data.map(location => `
                    <div class="location-item">
                        <div class="location-info">
                            <span class="location-name">${location.country}</span>
                            <span class="location-percentage">${location.percentage}%</span>
                        </div>
                        <div class="location-bar">
                            <div class="location-fill" style="width: ${location.percentage}%"></div>
                        </div>
                        <div class="location-count">${UIComponents.formatNumber(location.users)} users</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Switch analytics view
     */
    switchView(viewType) {
        this.currentView = viewType;

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update content
        const contentContainer = document.getElementById('analytics-view-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.renderAnalyticsView();
        }
    }

    /**
     * Change timeframe
     */
    async changeTimeframe(timeframe) {
        this.currentTimeframe = timeframe;
        UIComponents.showNotification(`Updating analytics for ${timeframe}...`, 'info');

        // Reload data with new timeframe
        await this.loadAnalyticsData();

        // Refresh current view
        const contentContainer = document.getElementById('analytics-view-content');
        if (contentContainer) {
            contentContainer.innerHTML = this.renderAnalyticsView();
        }

        UIComponents.showNotification('Analytics updated successfully', 'success');
    }

    /**
     * Export analytics data
     */
    async exportAnalytics() {
        try {
            UIComponents.showNotification('Exporting analytics data...', 'info');

            const exportResponse = await this.api.exportData('analytics', 'excel');

            if (exportResponse.success) {
                UIComponents.showNotification('Analytics data exported successfully', 'success');
            } else {
                throw new Error('Export failed');
            }
        } catch (error) {
            UIComponents.showNotification('Export functionality coming soon', 'info');
        }
    }

    /**
     * Generate comprehensive report
     */
    async generateReport() {
        try {
            UIComponents.showNotification('Generating comprehensive report...', 'info');

            const reportResponse = await this.api.generateReport('comprehensive', this.currentTimeframe);

            if (reportResponse.success) {
                UIComponents.showNotification('Report generated successfully', 'success');
                // Refresh reports view if currently active
                if (this.currentView === 'reports') {
                    this.switchView('reports');
                }
            } else {
                throw new Error('Report generation failed');
            }
        } catch (error) {
            UIComponents.showNotification('Report generation functionality coming soon', 'info');
        }
    }

    /**
     * Generate custom report
     */
    async generateCustomReport() {
        const reportType = document.getElementById('report-type').value;
        const format = document.getElementById('report-format').value;
        const period = document.getElementById('report-period').value;

        try {
            UIComponents.showNotification(`Generating ${reportType} report...`, 'info');

            const reportResponse = await this.api.generateReport(reportType, period, format);

            if (reportResponse.success) {
                UIComponents.showNotification(`${reportType} report generated successfully`, 'success');
                // Refresh reports list
                this.switchView('reports');
            } else {
                throw new Error('Custom report generation failed');
            }
        } catch (error) {
            UIComponents.showNotification('Custom report generation functionality coming soon', 'info');
        }
    }

    /**
     * Download report
     */
    downloadReport(reportId) {
        UIComponents.showNotification(`Downloading report ${reportId}...`, 'info');
        // In real app, this would trigger download
        setTimeout(() => {
            UIComponents.showNotification('Download functionality coming soon', 'info');
        }, 1000);
    }

    /**
     * Share report
     */
    shareReport(reportId) {
        UIComponents.showNotification(`Generating share link for report ${reportId}...`, 'info');
        // In real app, this would generate share link
        setTimeout(() => {
            UIComponents.showNotification('Share functionality coming soon', 'info');
        }, 1000);
    }

    /**
     * Quick export
     */
    async quickExport(dataType) {
        try {
            UIComponents.showNotification(`Exporting ${dataType} data...`, 'info');

            const exportResponse = await this.api.exportData(dataType, 'csv');

            if (exportResponse.success) {
                UIComponents.showNotification(`${dataType} data exported successfully`, 'success');
            } else {
                throw new Error('Quick export failed');
            }
        } catch (error) {
            UIComponents.showNotification('Quick export functionality coming soon', 'info');
        }
    }

    /**
     * Add analytics specific styles
     */
    addAnalyticsStyles() {
        if (document.getElementById('analytics-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'analytics-styles';
        styles.textContent = `
            .analytics-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .analytics-controls {
                display: flex;
                gap: 2rem;
                align-items: center;
                flex-wrap: wrap;
            }

            .timeframe-selector {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .timeframe-selector label {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--gray-700);
            }

            .timeframe-selector select {
                padding: 0.5rem;
                border: 1px solid var(--gray-300);
                border-radius: 6px;
                font-size: 0.875rem;
            }

            .analytics-actions {
                display: flex;
                gap: 0.5rem;
            }

            .analytics-nav {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 2rem;
                padding: 0.5rem;
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                overflow-x: auto;
            }

            .nav-btn {
                background: none;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--gray-600);
                cursor: pointer;
                transition: var(--transition);
                white-space: nowrap;
            }

            .nav-btn:hover {
                background: var(--accent);
                color: var(--gray-900);
            }

            .nav-btn.active {
                background: var(--primary);
                color: white;
            }

            .analytics-section {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                padding: 2rem;
            }

            .analytics-section h3 {
                margin-bottom: 2rem;
                color: var(--gray-900);
                font-size: 1.5rem;
            }

            .analytics-section h4 {
                margin-bottom: 1.5rem;
                color: var(--gray-800);
                font-size: 1.125rem;
            }

            .charts-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }

            .chart-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.5rem;
            }

            .chart-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            .chart-header h3,
            .chart-header h4 {
                margin: 0;
                color: var(--gray-900);
            }

            .chart-period {
                font-size: 0.75rem;
                color: var(--gray-500);
                background: var(--accent);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
            }

            .simple-chart {
                display: flex;
                align-items: end;
                gap: 0.5rem;
                height: 200px;
                padding: 1rem 0;
            }

            .chart-bar {
                flex: 1;
                background: var(--primary);
                border-radius: 4px 4px 0 0;
                position: relative;
                min-height: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }

            .chart-value {
                font-size: 0.75rem;
                color: white;
                font-weight: 600;
                padding: 0.25rem;
            }

            .chart-label {
                font-size: 0.625rem;
                color: var(--gray-600);
                text-align: center;
                margin-top: 0.5rem;
                transform: rotate(-45deg);
                white-space: nowrap;
            }

            .pie-chart {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .pie-segment {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                background: var(--accent);
                border-radius: 8px;
            }

            .segment-label {
                font-weight: 500;
                color: var(--gray-900);
            }

            .segment-value {
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .location-chart {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .location-item {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .location-info {
                min-width: 120px;
                display: flex;
                justify-content: space-between;
            }

            .location-name {
                font-weight: 500;
                color: var(--gray-900);
            }

            .location-percentage {
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .location-bar {
                flex: 1;
                height: 8px;
                background: var(--gray-200);
                border-radius: 4px;
                overflow: hidden;
            }

            .location-fill {
                height: 100%;
                background: var(--primary);
                transition: width 0.3s ease;
            }

            .location-count {
                min-width: 80px;
                text-align: right;
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .insights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .insight-card {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
            }

            .insight-icon {
                font-size: 2rem;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--accent);
                border-radius: 12px;
            }

            .insight-content h4 {
                margin-bottom: 0.5rem;
                color: var(--gray-900);
                font-size: 1rem;
            }

            .insight-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: 0.25rem;
            }

            .insight-description {
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .engagement-metrics,
            .popular-courses,
            .category-performance,
            .system-health,
            .performance-metrics,
            .completion-analysis,
            .learning-paths,
            .skill-progress,
            .report-generation,
            .generated-reports,
            .quick-exports {
                margin-bottom: 2rem;
            }

            .metrics-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .metric-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: var(--accent);
                border-radius: 8px;
            }

            .metric-label {
                font-weight: 500;
                color: var(--gray-700);
            }

            .metric-value {
                font-weight: 600;
                color: var(--gray-900);
            }

            .courses-table {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .course-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                background: var(--accent);
                border-radius: 12px;
            }

            .course-info {
                flex: 1;
            }

            .course-title {
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: 0.5rem;
            }

            .course-stats {
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .course-metrics {
                display: flex;
                gap: 2rem;
            }

            .course-metrics .metric {
                text-align: center;
            }

            .course-metrics .metric-label {
                display: block;
                font-size: 0.75rem;
                color: var(--gray-500);
                margin-bottom: 0.25rem;
            }

            .course-metrics .metric-value {
                font-weight: 600;
                color: var(--gray-900);
            }

            .categories-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
            }

            .category-card {
                padding: 1.5rem;
                background: var(--accent);
                border-radius: 12px;
                text-align: center;
            }

            .category-card h5 {
                margin-bottom: 1rem;
                color: var(--gray-900);
            }

            .category-stats {
                display: flex;
                justify-content: space-around;
            }

            .category-stats .stat {
                text-align: center;
            }

            .category-stats .stat-value {
                display: block;
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--primary);
                margin-bottom: 0.25rem;
            }

            .category-stats .stat-label {
                font-size: 0.75rem;
                color: var(--gray-500);
            }

            @media (max-width: 768px) {
                .analytics-header {
                    flex-direction: column;
                    align-items: stretch;
                }

                .analytics-controls {
                    flex-direction: column;
                    gap: 1rem;
                }

                .analytics-nav {
                    flex-wrap: wrap;
                }

                .charts-grid {
                    grid-template-columns: 1fr;
                }

                .insights-grid {
                    grid-template-columns: 1fr;
                }

                .course-row {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }

                .course-metrics {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Retry loading analytics
     */
    async retry() {
        await this.render();
    }
}

export default AnalyticsModule;

export default AnalyticsModule;
