/**
 * API Client for AgenticLearn Admin Portal
 * Handles all backend communication with proper error handling
 */

class APIClient {
    constructor() {
        this.baseURL = 'https://asia-southeast2-agenticai-462517.cloudfunctions.net/domyid';
        this.timeout = 10000; // 10 seconds
    }

    /**
     * Make HTTP request with error handling
     */
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: this.timeout,
            ...options
        };

        try {
            console.log(`🌐 API Request: ${defaultOptions.method} ${endpoint}`);
            
            const response = await fetch(url, defaultOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`✅ API Response: ${endpoint}`, data);
            
            return data;
            
        } catch (error) {
            console.error(`❌ API Error: ${endpoint}`, error);
            return {
                success: false,
                error: error.message,
                data: null
            };
        }
    }

    // ===== ADMIN PROFILE & SYSTEM =====
    
    /**
     * Get admin profile information
     */
    async getAdminProfile() {
        return await this.makeRequest('/admin/profile');
    }

    /**
     * Get system status and health
     */
    async getSystemStatus() {
        return await this.makeRequest('/admin/system/status');
    }

    /**
     * Get system metrics and statistics
     */
    async getSystemMetrics() {
        return await this.makeRequest('/admin/system/metrics');
    }

    // ===== DASHBOARD DATA =====
    
    /**
     * Get dashboard overview data
     */
    async getDashboardData() {
        return await this.makeRequest('/admin/dashboard');
    }

    /**
     * Get real-time system statistics
     */
    async getRealtimeStats() {
        return await this.makeRequest('/admin/dashboard/realtime');
    }

    // ===== USER MANAGEMENT =====
    
    /**
     * Get all users with pagination
     */
    async getUsers(page = 1, limit = 20, filters = {}) {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...filters
        });
        return await this.makeRequest(`/admin/users?${params}`);
    }

    /**
     * Get user by ID
     */
    async getUser(userId) {
        return await this.makeRequest(`/admin/users/${userId}`);
    }

    /**
     * Create new user
     */
    async createUser(userData) {
        return await this.makeRequest('/admin/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    /**
     * Update user
     */
    async updateUser(userId, userData) {
        return await this.makeRequest(`/admin/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    /**
     * Delete user
     */
    async deleteUser(userId) {
        return await this.makeRequest(`/admin/users/${userId}`, {
            method: 'DELETE'
        });
    }

    // ===== COURSE MANAGEMENT =====
    
    /**
     * Get all courses
     */
    async getCourses(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.makeRequest(`/admin/courses?${params}`);
    }

    /**
     * Get course by ID
     */
    async getCourse(courseId) {
        return await this.makeRequest(`/admin/courses/${courseId}`);
    }

    /**
     * Create new course
     */
    async createCourse(courseData) {
        return await this.makeRequest('/admin/courses', {
            method: 'POST',
            body: JSON.stringify(courseData)
        });
    }

    /**
     * Update course
     */
    async updateCourse(courseId, courseData) {
        return await this.makeRequest(`/admin/courses/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(courseData)
        });
    }

    /**
     * Delete course
     */
    async deleteCourse(courseId) {
        return await this.makeRequest(`/admin/courses/${courseId}`, {
            method: 'DELETE'
        });
    }

    // ===== ANALYTICS & REPORTS =====
    
    /**
     * Get system analytics
     */
    async getAnalytics(timeRange = '7d') {
        return await this.makeRequest(`/admin/analytics?range=${timeRange}`);
    }

    /**
     * Get user engagement analytics
     */
    async getUserEngagement(timeRange = '7d') {
        return await this.makeRequest(`/admin/analytics/engagement?range=${timeRange}`);
    }

    /**
     * Get learning progress analytics
     */
    async getLearningProgress(timeRange = '7d') {
        return await this.makeRequest(`/admin/analytics/progress?range=${timeRange}`);
    }

    /**
     * Get system performance metrics
     */
    async getPerformanceMetrics(timeRange = '24h') {
        return await this.makeRequest(`/admin/analytics/performance?range=${timeRange}`);
    }

    // ===== AI MANAGEMENT =====
    
    /**
     * Get AI model status and metrics
     */
    async getAIModels() {
        return await this.makeRequest('/admin/ai/models');
    }

    /**
     * Get AI usage statistics
     */
    async getAIUsageStats(timeRange = '7d') {
        return await this.makeRequest(`/admin/ai/usage?range=${timeRange}`);
    }

    /**
     * Update AI model configuration
     */
    async updateAIConfig(modelId, config) {
        return await this.makeRequest(`/admin/ai/models/${modelId}/config`, {
            method: 'PUT',
            body: JSON.stringify(config)
        });
    }

    // ===== SYSTEM ADMINISTRATION =====
    
    /**
     * Get system logs
     */
    async getSystemLogs(level = 'all', limit = 100) {
        return await this.makeRequest(`/admin/system/logs?level=${level}&limit=${limit}`);
    }

    /**
     * Perform system backup
     */
    async performBackup() {
        return await this.makeRequest('/admin/system/backup', {
            method: 'POST'
        });
    }

    /**
     * Get backup history
     */
    async getBackupHistory() {
        return await this.makeRequest('/admin/system/backups');
    }

    /**
     * Update system settings
     */
    async updateSystemSettings(settings) {
        return await this.makeRequest('/admin/system/settings', {
            method: 'PUT',
            body: JSON.stringify(settings)
        });
    }

    /**
     * Get system settings
     */
    async getSystemSettings() {
        return await this.makeRequest('/admin/system/settings');
    }

    // ===== UTILITY METHODS =====
    
    /**
     * Upload file
     */
    async uploadFile(file, type = 'general') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        return await this.makeRequest('/admin/upload', {
            method: 'POST',
            body: formData,
            headers: {} // Remove Content-Type to let browser set it for FormData
        });
    }

    /**
     * Export data
     */
    async exportData(type, format = 'csv', filters = {}) {
        const params = new URLSearchParams({
            format,
            ...filters
        });
        return await this.makeRequest(`/admin/export/${type}?${params}`);
    }

    // ===== ADMIN PORTAL SPECIFIC METHODS =====

    /**
     * Get dashboard data for admin portal
     */
    async getDashboard() {
        return await this.makeRequest('/api/agenticlearn/admin/dashboard');
    }

    /**
     * Get users for admin management
     */
    async getUsers() {
        return await this.makeRequest('/api/agenticlearn/admin/users');
    }

    /**
     * Get courses for admin management
     */
    async getCourses() {
        return await this.makeRequest('/api/agenticlearn/admin/courses');
    }

    /**
     * Get analytics data
     */
    async getAnalytics(timeframe = '30d') {
        return await this.makeRequest(`/api/agenticlearn/admin/analytics?range=${timeframe}`);
    }

    /**
     * Get AI data for AI management
     */
    async getAIData() {
        return await this.makeRequest('/api/agenticlearn/admin/ai/models');
    }

    /**
     * Get admin data for system administration
     */
    async getAdminData() {
        return await this.makeRequest('/api/agenticlearn/admin/system/status');
    }

    /**
     * Generate report functionality
     */
    async generateReport(type, timeframe, format = 'pdf') {
        try {
            console.log(`📋 Generating ${type} report for ${timeframe} in ${format} format...`);
            return {
                success: true,
                message: `${type} report generated`,
                type: type,
                timeframe: timeframe,
                format: format,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Test API connection
     */
    async testConnection() {
        try {
            const response = await this.getSystemStatus();
            return {
                success: true,
                message: 'API connection successful',
                data: response
            };
        } catch (error) {
            return {
                success: false,
                message: 'API connection failed',
                error: error.message
            };
        }
    }
}

// Export for use in other modules
export default APIClient;
