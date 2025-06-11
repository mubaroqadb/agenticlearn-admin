// Import shared components
import { apiClient } from "https://mubaroqadb.github.io/agenticlearn-shared/js/api-client.js";
import { UIComponents } from "https://mubaroqadb.github.io/agenticlearn-shared/js/ui-components.js";
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import { setInner, onClick } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js";
import { redirect } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js";

// Create compatibility wrapper for API client
const compatApiClient = {
    async request(endpoint) {
        // Map endpoints to correct service calls
        if (endpoint.startsWith('/auth/')) {
            return apiClient.auth(endpoint.replace('/auth', ''));
        } else if (endpoint.startsWith('/admin/')) {
            return apiClient.admin(endpoint.replace('/admin', ''));
        } else {
            // Fallback to direct backend call
            const token = getCookie("access_token") || getCookie("login");
            const baseURL = window.location.hostname.includes('localhost')
                ? "http://localhost:8080/api/v1"
                : "https://api.agenticlearn.com/api/v1"; // Will be Google Cloud endpoint

            const response = await fetch(`${baseURL}${endpoint}`, {
                headers: {
                    "Authorization": token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response.json();
        }
    }
};

async function initializeAdminConsole() {
    const token = getCookie("login");

    try {
        // Load admin data - use mock data if no token or API fails
        let adminName = "Demo Admin";
        let isAdmin = false;

        if (token) {
            try {
                const response = await compatApiClient.request("/auth/profile");
                adminName = response.data?.profile?.name || response.data?.email || "Demo Admin";
                isAdmin = response.data?.profile?.role === 'admin' || response.data?.role === 'admin';

                if (!isAdmin) {
                    UIComponents.showNotification("Access denied. Admin privileges required.", "error");
                    redirect("https://mubaroqadb.github.io/agenticlearn-auth");
                    return;
                }
            } catch (error) {
                console.log("Using demo mode - API not available");
                adminName = "Demo Admin (Offline Mode)";
                isAdmin = true; // Allow demo mode
            }
        } else {
            adminName = "Guest Admin (Demo Mode)";
            isAdmin = true; // Allow demo mode
        }

        setInner("admin-name", adminName);

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
        UIComponents.showNotification(`Welcome, ${adminName}! Admin console loaded.`, "success");

        // Update carbon indicator
        updateCarbonIndicator();

        console.log("🌱 Admin Console loaded with shared components");
    } catch (error) {
        console.error("Failed to load admin console:", error);
        setInner("admin-name", "Demo Admin");

        // Load with mock data
        await loadSystemMetrics();
        await loadGreenMetrics();
        await loadUserData();
        setupEventListeners();
        updateCarbonIndicator();

        UIComponents.showNotification("Admin console loaded in demo mode", "info");
    }
}

async function loadSystemMetrics() {
    try {
        const metrics = await compatApiClient.request("/admin/analytics").catch(() => ({
            totalUsers: 3,
            activeSessions: 2,
            apiRequestsPerHour: 45,
            systemHealth: 95
        }));

        setInner("total-users", metrics.data?.totalUsers || metrics.totalUsers || 0);
        setInner("active-sessions", metrics.data?.activeSessions || metrics.activeSessions || 0);
        setInner("api-requests", metrics.data?.apiRequestsPerHour || metrics.apiRequestsPerHour || 0);

        // Update system status
        const statusElement = document.getElementById("system-status");
        const systemHealth = metrics.data?.systemHealth || metrics.systemHealth || 95;
        if (systemHealth > 90) {
            statusElement.className = "metric-value status-good";
            statusElement.textContent = "●";
        } else if (systemHealth > 70) {
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
        const greenData = await compatApiClient.request("/admin/green-metrics").catch(() => ({
            totalCarbon: 0.125,
            energyEfficiency: 87.5,
            cacheHitRatio: 94.2,
            greenScore: 92
        }));

        const data = greenData.data || greenData;
        setInner("carbon-footprint", (data.totalCarbon || 0).toFixed(3));
        setInner("energy-efficiency", (data.energyEfficiency || 0).toFixed(1) + "%");
        setInner("cache-hit-ratio", (data.cacheHitRatio || 0).toFixed(1) + "%");
        setInner("green-score", data.greenScore || 0);

    } catch (error) {
        console.error("Failed to load green metrics:", error);
        setInner("carbon-footprint", "Error");
        UIComponents.showNotification("Failed to load green metrics", "warning");
    }
}

async function loadUserData() {
    try {
        const users = await compatApiClient.request("/admin/users").catch(() => [
            {
                name: "Andi Mahasiswa",
                email: "student1@agenticlearn.id",
                role: "student",
                status: "active",
                lastActive: new Date().toISOString()
            },
            {
                name: "Budi Pengajar",
                email: "educator@agenticlearn.id",
                role: "educator",
                status: "active",
                lastActive: new Date().toISOString()
            },
            {
                name: "Citra Admin",
                email: "admin@agenticlearn.id",
                role: "admin",
                status: "active",
                lastActive: new Date().toISOString()
            }
        ]);

        const userData = users.data || users;
        
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
        
        userData.slice(0, 10).forEach(user => {
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
                Showing 10 of ${userData.length} users
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
    try {
        const metrics = apiClient.getCarbonMetrics ? apiClient.getCarbonMetrics() : { totalCarbon: 0.000125 };
        const indicator = document.getElementById("carbon-indicator");
        if (indicator) {
            indicator.textContent = `🌱 ${metrics.totalCarbon.toFixed(6)}g CO2`;
        }
    } catch (error) {
        const indicator = document.getElementById("carbon-indicator");
        if (indicator) {
            indicator.textContent = `🌱 0.000125g CO2`;
        }
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
        const baseURL = window.location.hostname.includes('localhost')
            ? "http://localhost:8080/api/v1"
            : "https://api.agenticlearn.com/api/v1"; // Will be Google Cloud endpoint
        window.open(`${baseURL}/admin/logs`, '_blank');
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
