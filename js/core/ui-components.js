/**
 * UI Components Library for AgenticLearn Admin Portal
 * Reusable UI components with consistent styling
 */

export class UIComponents {
    
    /**
     * Show notification message
     */
    static showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container') || document.body;
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add styles if not already present
        this.addNotificationStyles();
        
        container.appendChild(notification);
        
        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, duration);
        }
        
        return notification;
    }

    /**
     * Get notification icon based on type
     */
    static getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    /**
     * Add notification styles
     */
    static addNotificationStyles() {
        if (document.getElementById('notification-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            }
            
            .notification {
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                margin-bottom: 10px;
                border-left: 4px solid var(--info);
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-success { border-left-color: var(--success); }
            .notification-error { border-left-color: var(--error); }
            .notification-warning { border-left-color: var(--warning); }
            .notification-info { border-left-color: var(--info); }
            
            .notification-content {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                gap: 8px;
            }
            
            .notification-icon {
                font-size: 16px;
            }
            
            .notification-message {
                flex: 1;
                font-size: 14px;
                color: var(--gray-700);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: var(--gray-400);
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--gray-600);
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Create a stats card component
     */
    static createStatsCard(title, value, icon, trend = null, color = 'primary') {
        const trendHtml = trend ? `
            <div class="stats-trend ${trend.direction}">
                <span class="trend-icon">${trend.direction === 'up' ? '↗' : '↘'}</span>
                <span class="trend-value">${trend.value}</span>
            </div>
        ` : '';

        return `
            <div class="stats-card stats-card-${color}">
                <div class="stats-header">
                    <div class="stats-icon">${icon}</div>
                    <div class="stats-info">
                        <div class="stats-title">${title}</div>
                        <div class="stats-value">${value}</div>
                    </div>
                </div>
                ${trendHtml}
            </div>
        `;
    }

    /**
     * Create a data table component
     */
    static createDataTable(headers, rows, options = {}) {
        const {
            searchable = true,
            sortable = true,
            pagination = true,
            actions = []
        } = options;

        const searchHtml = searchable ? `
            <div class="table-search">
                <input type="text" placeholder="Search..." class="search-input" />
                <span class="search-icon">🔍</span>
            </div>
        ` : '';

        const actionsHtml = actions.length > 0 ? `
            <div class="table-actions">
                ${actions.map(action => `
                    <button class="btn btn-${action.type || 'secondary'}" onclick="${action.onclick}">
                        ${action.icon || ''} ${action.label}
                    </button>
                `).join('')}
            </div>
        ` : '';

        const headersHtml = headers.map(header => `
            <th class="${sortable ? 'sortable' : ''}" data-column="${header.key || header}">
                ${header.label || header}
                ${sortable ? '<span class="sort-icon">↕</span>' : ''}
            </th>
        `).join('');

        const rowsHtml = rows.map(row => `
            <tr>
                ${headers.map(header => {
                    const key = header.key || header;
                    const value = typeof row[key] !== 'undefined' ? row[key] : '';
                    return `<td>${value}</td>`;
                }).join('')}
            </tr>
        `).join('');

        return `
            <div class="data-table-container">
                <div class="table-header">
                    ${searchHtml}
                    ${actionsHtml}
                </div>
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>${headersHtml}</tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </div>
                ${pagination ? '<div class="table-pagination"></div>' : ''}
            </div>
        `;
    }

    /**
     * Create a modal dialog
     */
    static createModal(title, content, options = {}) {
        const {
            size = 'medium',
            closable = true,
            actions = []
        } = options;

        const closeButton = closable ? `
            <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
        ` : '';

        const actionsHtml = actions.length > 0 ? `
            <div class="modal-actions">
                ${actions.map(action => `
                    <button class="btn btn-${action.type || 'secondary'}" onclick="${action.onclick}">
                        ${action.label}
                    </button>
                `).join('')}
            </div>
        ` : '';

        const modal = document.createElement('div');
        modal.className = `modal modal-${size}`;
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    ${closeButton}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${actionsHtml}
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    /**
     * Create a progress bar
     */
    static createProgressBar(value, max = 100, options = {}) {
        const {
            label = '',
            color = 'primary',
            size = 'medium',
            showValue = true
        } = options;

        const percentage = Math.round((value / max) * 100);
        const valueText = showValue ? `<span class="progress-value">${percentage}%</span>` : '';

        return `
            <div class="progress-container progress-${size}">
                ${label ? `<div class="progress-label">${label}</div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill progress-${color}" style="width: ${percentage}%"></div>
                </div>
                ${valueText}
            </div>
        `;
    }

    /**
     * Create a badge component
     */
    static createBadge(text, type = 'default') {
        return `<span class="badge badge-${type}">${text}</span>`;
    }

    /**
     * Create a loading spinner
     */
    static createLoadingSpinner(size = 'medium') {
        return `<div class="loading-spinner loading-spinner-${size}"></div>`;
    }

    /**
     * Create an empty state component
     */
    static createEmptyState(title, description, action = null) {
        const actionHtml = action ? `
            <button class="btn btn-primary" onclick="${action.onclick}">
                ${action.icon || ''} ${action.label}
            </button>
        ` : '';

        return `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3 class="empty-title">${title}</h3>
                <p class="empty-description">${description}</p>
                ${actionHtml}
            </div>
        `;
    }

    /**
     * Create a chart container
     */
    static createChartContainer(id, title, type = 'line') {
        return `
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">${title}</h3>
                    <div class="chart-controls">
                        <select class="chart-period">
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <canvas id="${id}" class="chart-canvas"></canvas>
                </div>
            </div>
        `;
    }

    /**
     * Format number with appropriate units
     */
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /**
     * Format date for display
     */
    static formatDate(date, format = 'short') {
        const d = new Date(date);
        const options = {
            short: { month: 'short', day: 'numeric' },
            long: { year: 'numeric', month: 'long', day: 'numeric' },
            time: { hour: '2-digit', minute: '2-digit' }
        };
        return d.toLocaleDateString('en-US', options[format]);
    }

    /**
     * Debounce function for search inputs
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Export for use in other modules
export default UIComponents;
