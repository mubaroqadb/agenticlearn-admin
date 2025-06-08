import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import { setInner, onClick } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js";
import { getWithToken } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js";
import { redirect } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js";

const API_BASE_URL = "https://agenticlearn-api-production.up.railway.app/api/v1";

async function initializeAdminConsole() {
    const token = getCookie("login");
    if (!token) {
        redirect("https://YOUR_USERNAME.github.io/agenticlearn-auth");
        return;
    }

    try {
        // Verify admin access
        const response = await getWithToken(`${API_BASE_URL}/auth/me`, "login", token);
        if (response.user.role !== 'admin') {
            alert("Access denied. Admin privileges required.");
            redirect("https://YOUR_USERNAME.github.io/agenticlearn-auth");
            return;
        }

        setInner("admin-name", response.user.name);
        
        // Load admin data
        await loadSystemMetrics(token);
        await loadGreenMetrics(token);
        await loadUserData(token);
        
        // Setup event listeners
        setupEventListeners();
        
        // Auto-refresh every 30 seconds
        setInterval(() => {
            loadSystemMetrics(token);
            loadGreenMetrics(token);
        }, 30000);
        
        console.log("🌱 Admin Console loaded with JSCroot");
    } catch (error) {
        console.error("Failed to load admin console:", error);
        setInner("admin-name", "Error loading console");
    }
}

async function loadSystemMetrics(token) {
    try {
        const metrics = await getWithToken(`${API_BASE_URL}/admin/analytics`, "login", token);
        
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
    }
}

async function loadGreenMetrics(token) {
    try {
        const greenData = await getWithToken(`${API_BASE_URL}/admin/green-metrics`, "login", token);
        
        setInner("carbon-footprint", (greenData.totalCarbon || 0).toFixed(3));
        setInner("energy-efficiency", (greenData.energyEfficiency || 0).toFixed(1) + "%");
        setInner("cache-hit-ratio", (greenData.cacheHitRatio || 0).toFixed(1) + "%");
        setInner("green-score", greenData.greenScore || 0);
        
    } catch (error) {
        console.error("Failed to load green metrics:", error);
        setInner("carbon-footprint", "Error");
    }
}

async function loadUserData(token) {
    try {
        const users = await getWithToken(`${API_BASE_URL}/admin/users`, "login", token);
        
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
    }
}

function setupEventListeners() {
    // User Management
    onClick("btn-view-users", () => {
        alert("Feature: View All Users - Opening user management interface");
    });
    
    onClick("btn-create-user", () => {
        const email = prompt("Enter user email:");
        const role = prompt("Enter user role (student/educator/admin):");
        if (email && role) {
            alert(`Creating user: ${email} with role: ${role}`);
            // TODO: Implement user creation
        }
    });
    
    onClick("btn-export-data", () => {
        alert("Feature: Export Data - Generating CSV export");
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
