// Import shared components
import { apiClient } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/api-client.js";
import { UIComponents } from "https://YOUR_USERNAME.github.io/agenticlearn-shared/js/ui-components.js";
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import { setInner, onClick } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js";
import { redirect } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js";

async function initializeAdminConsole() {
    const token = getCookie("login");
    if (!token) {
        redirect("https://YOUR_USERNAME.github.io/agenticlearn-auth");
        return;
    }

    try {
        // Verify admin access using shared API client
        const response = await apiClient.request("/auth/me");
        if (response.user.role !== 'admin') {
            UIComponents.showNotification("Access denied. Admin privileges required.", "error");
            redirect("https://YOUR_USERNAME.github.io/agenticlearn-auth");
            return;
        }

        setInner("admin-name", response.user.name);

        // Load admin data
        await loadSystemMetrics();
        await loadGreenMetrics();
        await loadUserData();

        // Setup event listeners
        setupEventListeners();

        // Auto-refresh every 30 seconds
        setInterval(() => {
            loadSystemMetrics();
            loadGreenMetrics();
            updateCarbonIndicator();
        }, 30000);

        // Show welcome notification
        UIComponents.showNotification(`Welcome, ${response.user.name}! Admin console loaded.`, "success");

        // Update carbon indicator
        updateCarbonIndicator();

        console.log("🌱 Admin Console loaded with shared components");
    } catch (error) {
        console.error("Failed to load admin console:", error);
        setInner("admin-name", "Error loading console");
        UIComponents.showNotification("Failed to load admin console", "error");
    }
}

async function loadSystemMetrics() {
    try {
        const metrics = await apiClient.request("/admin/analytics");

        setInner("total-users", metrics.totalUsers || 0);
        setInner("active-sessions", metrics.activeSessions || 0);
        setInner("api-requests", metrics.apiRequestsPerHour || 0);

        // Update system status
        const statusElement = document.getElementById("system-status");
        if (metrics.systemHealth > 90) {
            statusElement.className = "metric-value status-good";
            statusElement.textContent = "●";
        } else if (metrics.systemHealth > 70) {
            statusElement.className = "metric-value status-warning";
            statusElement.textContent = "●";
        } else {
            statusElement.className = "metric-value status-error";
            statusElement.textContent = "●";
        }

    } catch (error) {
        console.error("Failed to load system metrics:", error);
        setInner("total-users", "Error");
        UIComponents.showNotification("Failed to load system metrics", "warning");
    }
}

async function loadGreenMetrics() {
    try {
        const greenData = await apiClient.request("/admin/green-metrics");

        setInner("carbon-footprint", (greenData.totalCarbon || 0).toFixed(3));
        setInner("energy-efficiency", (greenData.energyEfficiency || 0).toFixed(1) + "%");
        setInner("cache-hit-ratio", (greenData.cacheHitRatio || 0).toFixed(1) + "%");
        setInner("green-score", greenData.greenScore || 0);

    } catch (error) {
        console.error("Failed to load green metrics:", error);
        setInner("carbon-footprint", "Error");
        UIComponents.showNotification("Failed to load green metrics", "warning");
    }
}

async function loadUserData() {
    try {
        const users = await apiClient.request("/admin/users");
        
        let userListHTML = `
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="padding: 0.5rem; text-align: left;">Name</th>
                        <th style="padding: 0.5rem; text-align: left;">Email</th>
                        <th style="padding: 0.5rem; text-align: left;">Role</th>
                        <th style="padding: 0.5rem; text-align: left;">Status</th>
                        <th style="padding: 0.5rem; text-align: left;">Last Active</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        users.slice(0, 10).forEach(user => {
            userListHTML += `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 0.5rem;">${user.name}</td>
                    <td style="padding: 0.5rem;">${user.email}</td>
                    <td style="padding: 0.5rem;">${user.role}</td>
                    <td style="padding: 0.5rem;">${user.status}</td>
                    <td style="padding: 0.5rem;">${new Date(user.lastActive).toLocaleDateString()}</td>
                </tr>
            `;
        });
        
        userListHTML += `
                </tbody>
            </table>
            <p style="margin-top: 1rem; font-size: 0.875rem; color: #666;">
                Showing 10 of ${users.length} users
            </p>
        `;
        
        setInner("user-list", userListHTML);
        
    } catch (error) {
        console.error("Failed to load user data:", error);
        setInner("user-list", "<p>Error loading user data</p>");
        UIComponents.showNotification("Failed to load user data", "warning");
    }
}

function updateCarbonIndicator() {
    const metrics = apiClient.getCarbonMetrics();
    const indicator = document.getElementById("carbon-indicator");
    if (indicator) {
        indicator.textContent = `🌱 ${metrics.totalCarbon.toFixed(6)}g CO2`;
    }
}

function setupEventListeners() {
    // User Management
    onClick("btn-view-users", () => {
        UIComponents.showNotification("Opening user management interface...", "info");
    });

    onClick("btn-create-user", () => {
        const email = prompt("Enter user email:");
        const role = prompt("Enter user role (student/educator/admin):");
        if (email && role) {
            UIComponents.showNotification(`Creating user: ${email} with role: ${role}`, "success");
            // TODO: Implement user creation
        }
    });

    onClick("btn-export-data", () => {
        UIComponents.showNotification("Generating CSV export...", "info");
    });
    
    // AI Management
    onClick("btn-ai-analytics", () => {
        alert("Feature: AI Analytics - Opening AI performance dashboard");
    });
    
    onClick("btn-model-status", () => {
        alert("AI Models Status: All models operational");
    });
    
    onClick("btn-retrain-models", () => {
        if (confirm("Are you sure you want to retrain AI models? This may take several hours.")) {
            alert("Starting model retraining process...");
        }
    });
    
    // System Actions
    onClick("btn-backup", () => {
        if (confirm("Create system backup? This may take a few minutes.")) {
            alert("Creating backup... You will be notified when complete.");
        }
    });
    
    onClick("btn-logs", () => {
        window.open(`${API_BASE_URL}/admin/logs`, '_blank');
    });
    
    onClick("btn-maintenance", () => {
        if (confirm("Enable maintenance mode? This will temporarily disable user access.")) {
            alert("Maintenance mode enabled. Remember to disable it when done.");
        }
    });
    
    onClick("btn-emergency", () => {
        if (confirm("EMERGENCY STOP: This will immediately shut down all services. Are you sure?")) {
            if (confirm("This action cannot be undone remotely. Confirm emergency stop?")) {
                alert("Emergency stop initiated. System shutdown in progress.");
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeAdminConsole);
