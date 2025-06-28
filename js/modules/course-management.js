/**
 * Course Management Module for AgenticLearn Admin Portal
 */

import { UIComponents } from '../core/ui-components.js';

export class CourseManagementModule {
    constructor(apiClient) {
        this.api = apiClient;
    }

    async render() {
        const container = document.getElementById('courses-content');
        if (!container) return;

        container.innerHTML = `
            <div class="page-header">
                <h2 class="page-title">📚 Course Management</h2>
                <p class="page-subtitle">Oversee all courses and curriculum</p>
            </div>
            <div class="coming-soon">
                <h3>📚 Course Management</h3>
                <p>Comprehensive course management features coming soon...</p>
            </div>
        `;
    }
}

export default CourseManagementModule;
