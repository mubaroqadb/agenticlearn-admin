/**
 * Course Management Module for AgenticLearn Admin Portal
 * Comprehensive course and curriculum management
 */

import UIComponents from '../core/ui-components.js';

class CourseManagementModule {
    constructor(apiClient) {
        this.api = apiClient;
        this.courses = [];
        this.categories = [];
        this.currentView = 'cards';
        this.isLoading = false;
    }

    /**
     * Render the course management interface
     */
    async render() {
        try {
            console.log('📚 Rendering Course Management module...');

            const container = document.getElementById('courses-content');
            if (!container) {
                console.error('❌ Course Management container not found');
                return;
            }

            // Show loading state
            container.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <h3>📚 Loading Course Management...</h3>
                    <p>Fetching courses and curriculum data</p>
                </div>
            `;

            // Load course data
            await this.loadCourseData();

            // Render course management interface
            this.renderCourseInterface(container);

            console.log('✅ Course Management module rendered successfully');

        } catch (error) {
            console.error('❌ Failed to render course management:', error);

            const container = document.getElementById('courses-content');
            if (container) {
                container.innerHTML = `
                    <div class="error-state">
                        <div class="error-icon">❌</div>
                        <h3>Failed to Load Course Management</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="window.adminPortal.modules.courses.retry()">
                            🔄 Retry
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Load course data from backend
     */
    async loadCourseData() {
        try {
            console.log('📚 Loading course data from backend...');
            this.isLoading = true;

            const coursesResponse = await this.api.getCourses();
            if (coursesResponse.success) {
                this.courses = coursesResponse.data;
                console.log('✅ Course data loaded from backend');
            } else {
                // Use comprehensive mock data for demo
                this.courses = this.getMockCourseData();
                console.log('⚠️ Using mock course data');
            }

            // Load categories
            this.categories = this.extractCategories();

        } catch (error) {
            console.error('❌ Failed to load course data:', error);
            this.courses = this.getMockCourseData();
            this.categories = this.extractCategories();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Get comprehensive mock course data
     */
    getMockCourseData() {
        return [
            {
                id: 'course_001',
                title: 'JavaScript Fundamentals',
                description: 'Learn the basics of JavaScript programming including variables, functions, and DOM manipulation.',
                category: 'Programming',
                level: 'Beginner',
                status: 'Published',
                instructor: 'Dr. Michael Chen',
                instructorId: 'user_002',
                thumbnail: '💻',
                duration: '8 weeks',
                totalLessons: 24,
                enrolledStudents: 234,
                completionRate: 87,
                rating: 4.8,
                reviews: 156,
                price: 'Free',
                tags: ['JavaScript', 'Programming', 'Web Development'],
                createdDate: '2025-05-01T00:00:00Z',
                lastUpdated: '2025-06-20T00:00:00Z',
                language: 'English',
                prerequisites: ['Basic Computer Skills'],
                learningOutcomes: [
                    'Understand JavaScript syntax and fundamentals',
                    'Create interactive web pages',
                    'Work with functions and objects',
                    'Manipulate the DOM effectively'
                ]
            },
            {
                id: 'course_002',
                title: 'Digital Literacy Basics',
                description: 'Essential digital skills for the modern world including internet safety, digital communication, and basic computer operations.',
                category: 'Digital Literacy',
                level: 'Beginner',
                status: 'Published',
                instructor: 'Prof. Sarah Wilson',
                instructorId: 'user_004',
                thumbnail: '🌐',
                duration: '6 weeks',
                totalLessons: 18,
                enrolledStudents: 189,
                completionRate: 92,
                rating: 4.9,
                reviews: 98,
                price: 'Free',
                tags: ['Digital Skills', 'Internet Safety', 'Communication'],
                createdDate: '2025-04-15T00:00:00Z',
                lastUpdated: '2025-06-15T00:00:00Z',
                language: 'English',
                prerequisites: ['None'],
                learningOutcomes: [
                    'Navigate the internet safely and effectively',
                    'Use digital communication tools',
                    'Understand online privacy and security',
                    'Manage digital files and folders'
                ]
            },
            {
                id: 'course_003',
                title: 'Green Computing Principles',
                description: 'Learn about sustainable technology practices, energy-efficient computing, and environmental impact of digital technologies.',
                category: 'Sustainability',
                level: 'Intermediate',
                status: 'Published',
                instructor: 'Dr. Maria Santos',
                instructorId: 'user_008',
                thumbnail: '🌱',
                duration: '10 weeks',
                totalLessons: 30,
                enrolledStudents: 156,
                completionRate: 78,
                rating: 4.7,
                reviews: 89,
                price: 'Free',
                tags: ['Green Computing', 'Sustainability', 'Environment'],
                createdDate: '2025-03-20T00:00:00Z',
                lastUpdated: '2025-06-10T00:00:00Z',
                language: 'English',
                prerequisites: ['Basic Computer Knowledge'],
                learningOutcomes: [
                    'Understand environmental impact of computing',
                    'Implement energy-efficient practices',
                    'Design sustainable technology solutions',
                    'Evaluate carbon footprint of digital activities'
                ]
            },
            {
                id: 'course_004',
                title: 'Web Development Introduction',
                description: 'Comprehensive introduction to web development covering HTML, CSS, and basic JavaScript for creating modern websites.',
                category: 'Web Development',
                level: 'Beginner',
                status: 'Published',
                instructor: 'Prof. David Kim',
                instructorId: 'user_005',
                thumbnail: '🌐',
                duration: '12 weeks',
                totalLessons: 36,
                enrolledStudents: 145,
                completionRate: 83,
                rating: 4.6,
                reviews: 72,
                price: 'Free',
                tags: ['HTML', 'CSS', 'JavaScript', 'Web Design'],
                createdDate: '2025-04-01T00:00:00Z',
                lastUpdated: '2025-06-25T00:00:00Z',
                language: 'English',
                prerequisites: ['Digital Literacy Basics'],
                learningOutcomes: [
                    'Create responsive web pages with HTML and CSS',
                    'Add interactivity with JavaScript',
                    'Understand web development best practices',
                    'Deploy websites to the internet'
                ]
            },
            {
                id: 'course_005',
                title: 'AI Ethics & Safety',
                description: 'Explore the ethical implications of artificial intelligence, safety considerations, and responsible AI development practices.',
                category: 'AI & Ethics',
                level: 'Advanced',
                status: 'Published',
                instructor: 'Dr. Michael Chen',
                instructorId: 'user_002',
                thumbnail: '🤖',
                duration: '8 weeks',
                totalLessons: 24,
                enrolledStudents: 123,
                completionRate: 95,
                rating: 4.9,
                reviews: 67,
                price: 'Free',
                tags: ['AI', 'Ethics', 'Safety', 'Technology'],
                createdDate: '2025-05-10T00:00:00Z',
                lastUpdated: '2025-06-28T00:00:00Z',
                language: 'English',
                prerequisites: ['Basic understanding of AI concepts'],
                learningOutcomes: [
                    'Understand ethical implications of AI',
                    'Identify potential AI safety risks',
                    'Apply responsible AI development practices',
                    'Evaluate AI systems for bias and fairness'
                ]
            },
            {
                id: 'course_006',
                title: 'Data Science Fundamentals',
                description: 'Introduction to data science concepts, statistical analysis, and data visualization techniques.',
                category: 'Data Science',
                level: 'Intermediate',
                status: 'Draft',
                instructor: 'Dr. Maria Santos',
                instructorId: 'user_008',
                thumbnail: '📊',
                duration: '14 weeks',
                totalLessons: 42,
                enrolledStudents: 0,
                completionRate: 0,
                rating: 0,
                reviews: 0,
                price: 'Free',
                tags: ['Data Science', 'Statistics', 'Visualization'],
                createdDate: '2025-06-01T00:00:00Z',
                lastUpdated: '2025-06-28T00:00:00Z',
                language: 'English',
                prerequisites: ['JavaScript Fundamentals', 'Basic Mathematics'],
                learningOutcomes: [
                    'Understand data science workflow',
                    'Perform statistical analysis',
                    'Create data visualizations',
                    'Work with large datasets'
                ]
            }
        ];
    }

    /**
     * Extract categories from courses
     */
    extractCategories() {
        const categorySet = new Set(this.courses.map(course => course.category));
        return Array.from(categorySet).map(category => ({
            name: category,
            count: this.courses.filter(course => course.category === category).length
        }));
    }

    /**
     * Render comprehensive course management interface
     */
    renderCourseInterface(container) {
        const publishedCourses = this.courses.filter(c => c.status === 'Published');
        const draftCourses = this.courses.filter(c => c.status === 'Draft');
        const totalStudents = this.courses.reduce((sum, course) => sum + course.enrolledStudents, 0);
        const avgRating = publishedCourses.length > 0 ?
            (publishedCourses.reduce((sum, course) => sum + course.rating, 0) / publishedCourses.length).toFixed(1) : 0;

        container.innerHTML = `
            <div class="course-management-header">
                <div class="page-header">
                    <h2 class="page-title">📚 Course Management</h2>
                    <p class="page-subtitle">Comprehensive course and curriculum management system</p>
                </div>

                <div class="course-actions">
                    <button class="btn btn-secondary" onclick="window.adminPortal.modules.courses.exportCourses()">
                        📊 Export Courses
                    </button>
                    <button class="btn btn-primary" onclick="window.adminPortal.modules.courses.createCourse()">
                        ➕ Create Course
                    </button>
                </div>
            </div>

            <!-- Course Statistics -->
            <div class="course-stats-grid">
                ${UIComponents.createStatsCard('Total Courses', this.courses.length, '📚', null, 'primary')}
                ${UIComponents.createStatsCard('Published', publishedCourses.length, '✅', null, 'success')}
                ${UIComponents.createStatsCard('Total Students', UIComponents.formatNumber(totalStudents), '👥', null, 'info')}
                ${UIComponents.createStatsCard('Avg Rating', `⭐ ${avgRating}`, '📊', null, 'warning')}
            </div>

            <!-- Course Filters -->
            <div class="course-filters">
                <div class="filter-section">
                    <label class="filter-label">Filter by Category:</label>
                    <select class="filter-select" id="category-filter" onchange="window.adminPortal.modules.courses.filterCourses()">
                        <option value="all">All Categories</option>
                        ${this.categories.map(cat => `
                            <option value="${cat.name}">${cat.name} (${cat.count})</option>
                        `).join('')}
                    </select>
                </div>

                <div class="filter-section">
                    <label class="filter-label">Filter by Status:</label>
                    <select class="filter-select" id="status-filter" onchange="window.adminPortal.modules.courses.filterCourses()">
                        <option value="all">All Status</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                    </select>
                </div>

                <div class="filter-section">
                    <label class="filter-label">Filter by Level:</label>
                    <select class="filter-select" id="level-filter" onchange="window.adminPortal.modules.courses.filterCourses()">
                        <option value="all">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div class="filter-section">
                    <label class="filter-label">Search Courses:</label>
                    <input type="text" class="filter-input" id="course-search" placeholder="Search by title or instructor..."
                           oninput="window.adminPortal.modules.courses.searchCourses(this.value)">
                </div>
            </div>

            <!-- View Toggle -->
            <div class="view-toggle">
                <button class="btn btn-secondary ${this.currentView === 'cards' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.courses.toggleView('cards')" id="cards-view">
                    🔲 Card View
                </button>
                <button class="btn btn-secondary ${this.currentView === 'table' ? 'active' : ''}"
                        onclick="window.adminPortal.modules.courses.toggleView('table')" id="table-view">
                    📋 Table View
                </button>
            </div>

            <!-- Course Cards Grid -->
            <div class="courses-grid" id="courses-grid" style="display: ${this.currentView === 'cards' ? 'grid' : 'none'}">
                ${this.renderCourseCards()}
            </div>

            <!-- Course Table -->
            <div class="course-table-container" id="course-table" style="display: ${this.currentView === 'table' ? 'block' : 'none'}">
                ${this.renderCourseTable()}
            </div>
        `;

        // Add course management styles
        this.addCourseManagementStyles();
    }

    /**
     * Render course cards
     */
    renderCourseCards() {
        return this.courses.map(course => `
            <div class="course-card" data-category="${course.category}" data-status="${course.status}" data-level="${course.level}">
                <div class="course-card-header">
                    <div class="course-thumbnail">${course.thumbnail}</div>
                    <div class="course-status-badge">
                        ${UIComponents.createBadge(course.status, course.status.toLowerCase())}
                    </div>
                </div>

                <div class="course-card-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>

                    <div class="course-meta">
                        <div class="meta-item">
                            <span class="meta-icon">👨‍🏫</span>
                            <span class="meta-text">${course.instructor}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📚</span>
                            <span class="meta-text">${course.category}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📊</span>
                            <span class="meta-text">${course.level}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">⏱️</span>
                            <span class="meta-text">${course.duration}</span>
                        </div>
                    </div>

                    <div class="course-stats">
                        <div class="stat-item">
                            <span class="stat-value">${course.enrolledStudents}</span>
                            <span class="stat-label">Students</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${course.totalLessons}</span>
                            <span class="stat-label">Lessons</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${course.completionRate}%</span>
                            <span class="stat-label">Completion</span>
                        </div>
                        ${course.rating > 0 ? `
                            <div class="stat-item">
                                <span class="stat-value">⭐ ${course.rating}</span>
                                <span class="stat-label">Rating</span>
                            </div>
                        ` : ''}
                    </div>

                    <div class="course-tags">
                        ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>

                <div class="course-card-actions">
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.courses.viewCourse('${course.id}')">
                        👁️ View
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.courses.editCourse('${course.id}')">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.courses.manageCourse('${course.id}')">
                        ⚙️ Manage
                    </button>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render course table
     */
    renderCourseTable() {
        const headers = [
            { key: 'thumbnail', label: '' },
            { key: 'title', label: 'Course Title' },
            { key: 'instructor', label: 'Instructor' },
            { key: 'category', label: 'Category' },
            { key: 'status', label: 'Status' },
            { key: 'students', label: 'Students' },
            { key: 'rating', label: 'Rating' },
            { key: 'actions', label: 'Actions' }
        ];

        const rows = this.courses.map(course => ({
            thumbnail: `<div class="table-thumbnail">${course.thumbnail}</div>`,
            title: `<div class="table-title">
                        <div class="title-text">${course.title}</div>
                        <div class="title-meta">${course.level} • ${course.duration}</div>
                    </div>`,
            instructor: course.instructor,
            category: course.category,
            status: UIComponents.createBadge(course.status, course.status.toLowerCase()),
            students: course.enrolledStudents,
            rating: course.rating > 0 ? `⭐ ${course.rating}` : 'N/A',
            actions: `
                <div class="table-actions">
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.courses.viewCourse('${course.id}')">View</button>
                    <button class="btn btn-sm btn-secondary" onclick="window.adminPortal.modules.courses.editCourse('${course.id}')">Edit</button>
                </div>
            `
        }));

        return UIComponents.createDataTable(headers, rows, {
            searchable: false, // We have custom search
            sortable: true,
            pagination: true
        });
    }

    /**
     * Filter courses by category, status, and level
     */
    filterCourses() {
        const categoryFilter = document.getElementById('category-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const levelFilter = document.getElementById('level-filter').value;

        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            const courseCategory = card.dataset.category;
            const courseStatus = card.dataset.status;
            const courseLevel = card.dataset.level;

            const categoryMatch = categoryFilter === 'all' || courseCategory === categoryFilter;
            const statusMatch = statusFilter === 'all' || courseStatus === statusFilter;
            const levelMatch = levelFilter === 'all' || courseLevel === levelFilter;

            if (categoryMatch && statusMatch && levelMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Search courses by title or instructor
     */
    searchCourses(query) {
        const searchTerm = query.toLowerCase();
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
            const courseInstructor = card.querySelector('.meta-text').textContent.toLowerCase();

            if (courseTitle.includes(searchTerm) || courseInstructor.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Toggle between card and table view
     */
    toggleView(viewType) {
        const cardsGrid = document.getElementById('courses-grid');
        const tableContainer = document.getElementById('course-table');
        const cardsBtn = document.getElementById('cards-view');
        const tableBtn = document.getElementById('table-view');

        this.currentView = viewType;

        if (viewType === 'cards') {
            cardsGrid.style.display = 'grid';
            tableContainer.style.display = 'none';
            cardsBtn.classList.add('active');
            tableBtn.classList.remove('active');
        } else {
            cardsGrid.style.display = 'none';
            tableContainer.style.display = 'block';
            cardsBtn.classList.remove('active');
            tableBtn.classList.add('active');
        }
    }

    /**
     * View course details
     */
    viewCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        const modalContent = `
            <div class="course-detail-modal">
                <div class="course-detail-header">
                    <div class="course-thumbnail-large">${course.thumbnail}</div>
                    <div class="course-detail-info">
                        <h2>${course.title}</h2>
                        <p class="course-instructor">👨‍🏫 ${course.instructor}</p>
                        <div class="course-badges">
                            ${UIComponents.createBadge(course.category, 'info')}
                            ${UIComponents.createBadge(course.level, 'secondary')}
                            ${UIComponents.createBadge(course.status, course.status.toLowerCase())}
                        </div>
                    </div>
                </div>

                <div class="course-detail-content">
                    <div class="detail-section">
                        <h3>Course Information</h3>
                        <p class="course-description">${course.description}</p>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <label>Duration:</label>
                                <span>${course.duration}</span>
                            </div>
                            <div class="detail-item">
                                <label>Total Lessons:</label>
                                <span>${course.totalLessons}</span>
                            </div>
                            <div class="detail-item">
                                <label>Language:</label>
                                <span>${course.language}</span>
                            </div>
                            <div class="detail-item">
                                <label>Price:</label>
                                <span>${course.price}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Performance Metrics</h3>
                        <div class="metrics-grid">
                            <div class="metric-item">
                                <span class="metric-value">${course.enrolledStudents}</span>
                                <span class="metric-label">Enrolled Students</span>
                            </div>
                            <div class="metric-item">
                                <span class="metric-value">${course.completionRate}%</span>
                                <span class="metric-label">Completion Rate</span>
                            </div>
                            ${course.rating > 0 ? `
                                <div class="metric-item">
                                    <span class="metric-value">⭐ ${course.rating}</span>
                                    <span class="metric-label">Average Rating</span>
                                </div>
                                <div class="metric-item">
                                    <span class="metric-value">${course.reviews}</span>
                                    <span class="metric-label">Reviews</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Learning Outcomes</h3>
                        <ul class="learning-outcomes">
                            ${course.learningOutcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h3>Prerequisites</h3>
                        <div class="prerequisites">
                            ${course.prerequisites.map(prereq => `<span class="prerequisite">${prereq}</span>`).join('')}
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Tags</h3>
                        <div class="course-tags">
                            ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        UIComponents.createModal(`Course Details - ${course.title}`, modalContent, {
            size: 'large',
            actions: [
                { label: 'Edit Course', type: 'primary', onclick: `window.adminPortal.modules.courses.editCourse('${courseId}'); this.closest('.modal').remove();` },
                { label: 'Manage Course', type: 'secondary', onclick: `window.adminPortal.modules.courses.manageCourse('${courseId}'); this.closest('.modal').remove();` },
                { label: 'Close', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Edit course
     */
    editCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        const modalContent = `
            <form class="course-edit-form" onsubmit="window.adminPortal.modules.courses.saveCourse(event, '${courseId}')">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="edit-title">Course Title</label>
                        <input type="text" id="edit-title" value="${course.title}" required>
                    </div>

                    <div class="form-group">
                        <label for="edit-instructor">Instructor</label>
                        <input type="text" id="edit-instructor" value="${course.instructor}" required>
                    </div>

                    <div class="form-group">
                        <label for="edit-category">Category</label>
                        <select id="edit-category" required>
                            ${this.categories.map(cat => `
                                <option value="${cat.name}" ${course.category === cat.name ? 'selected' : ''}>${cat.name}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit-level">Level</label>
                        <select id="edit-level" required>
                            <option value="Beginner" ${course.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                            <option value="Intermediate" ${course.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                            <option value="Advanced" ${course.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit-status">Status</label>
                        <select id="edit-status" required>
                            <option value="Draft" ${course.status === 'Draft' ? 'selected' : ''}>Draft</option>
                            <option value="Published" ${course.status === 'Published' ? 'selected' : ''}>Published</option>
                            <option value="Archived" ${course.status === 'Archived' ? 'selected' : ''}>Archived</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit-duration">Duration</label>
                        <input type="text" id="edit-duration" value="${course.duration}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="edit-description">Description</label>
                    <textarea id="edit-description" rows="4" required>${course.description}</textarea>
                </div>
            </form>
        `;

        UIComponents.createModal(`Edit Course - ${course.title}`, modalContent, {
            size: 'large',
            actions: [
                { label: 'Save Changes', type: 'primary', onclick: `window.adminPortal.modules.courses.saveCourse(null, '${courseId}')` },
                { label: 'Cancel', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Save course changes
     */
    saveCourse(event, courseId) {
        if (event) event.preventDefault();

        const title = document.getElementById('edit-title').value;
        const instructor = document.getElementById('edit-instructor').value;
        const category = document.getElementById('edit-category').value;
        const level = document.getElementById('edit-level').value;
        const status = document.getElementById('edit-status').value;
        const duration = document.getElementById('edit-duration').value;
        const description = document.getElementById('edit-description').value;

        // Update course in local data
        const courseIndex = this.courses.findIndex(c => c.id === courseId);
        if (courseIndex !== -1) {
            this.courses[courseIndex] = {
                ...this.courses[courseIndex],
                title,
                instructor,
                category,
                level,
                status,
                duration,
                description,
                lastUpdated: new Date().toISOString()
            };
        }

        // Update categories
        this.categories = this.extractCategories();

        // Close modal and refresh view
        document.querySelector('.modal').remove();
        this.refreshCourseDisplay();

        UIComponents.showNotification(`Course "${title}" updated successfully`, 'success');
    }

    /**
     * Manage course (students, content, etc.)
     */
    manageCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        const modalContent = `
            <div class="course-management-modal">
                <div class="management-tabs">
                    <button class="tab-btn active" onclick="window.adminPortal.modules.courses.switchTab('students')">
                        👥 Students (${course.enrolledStudents})
                    </button>
                    <button class="tab-btn" onclick="window.adminPortal.modules.courses.switchTab('content')">
                        📚 Content (${course.totalLessons} lessons)
                    </button>
                    <button class="tab-btn" onclick="window.adminPortal.modules.courses.switchTab('analytics')">
                        📊 Analytics
                    </button>
                </div>

                <div class="tab-content" id="students-tab">
                    <h3>Enrolled Students</h3>
                    <p>Student management features coming soon...</p>
                    <div class="student-stats">
                        <div class="stat-item">
                            <span class="stat-value">${course.enrolledStudents}</span>
                            <span class="stat-label">Total Enrolled</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${course.completionRate}%</span>
                            <span class="stat-label">Completion Rate</span>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="content-tab" style="display: none;">
                    <h3>Course Content</h3>
                    <p>Content management features coming soon...</p>
                    <div class="content-stats">
                        <div class="stat-item">
                            <span class="stat-value">${course.totalLessons}</span>
                            <span class="stat-label">Total Lessons</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${course.duration}</span>
                            <span class="stat-label">Duration</span>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="analytics-tab" style="display: none;">
                    <h3>Course Analytics</h3>
                    <p>Analytics features coming soon...</p>
                    <div class="analytics-stats">
                        ${course.rating > 0 ? `
                            <div class="stat-item">
                                <span class="stat-value">⭐ ${course.rating}</span>
                                <span class="stat-label">Average Rating</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${course.reviews}</span>
                                <span class="stat-label">Total Reviews</span>
                            </div>
                        ` : '<p>No analytics data available yet.</p>'}
                    </div>
                </div>
            </div>
        `;

        UIComponents.createModal(`Manage Course - ${course.title}`, modalContent, {
            size: 'large',
            actions: [
                { label: 'Close', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Switch management tabs
     */
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
        document.getElementById(`${tabName}-tab`).style.display = 'block';
    }

    /**
     * Create new course
     */
    createCourse() {
        const modalContent = `
            <form class="course-create-form" onsubmit="window.adminPortal.modules.courses.saveNewCourse(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="new-title">Course Title</label>
                        <input type="text" id="new-title" required>
                    </div>

                    <div class="form-group">
                        <label for="new-instructor">Instructor</label>
                        <input type="text" id="new-instructor" required>
                    </div>

                    <div class="form-group">
                        <label for="new-category">Category</label>
                        <select id="new-category" required>
                            <option value="">Select Category</option>
                            ${this.categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="new-level">Level</label>
                        <select id="new-level" required>
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="new-duration">Duration</label>
                        <input type="text" id="new-duration" placeholder="e.g., 8 weeks" required>
                    </div>

                    <div class="form-group">
                        <label for="new-lessons">Total Lessons</label>
                        <input type="number" id="new-lessons" min="1" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="new-description">Description</label>
                    <textarea id="new-description" rows="4" placeholder="Describe what students will learn..." required></textarea>
                </div>
            </form>
        `;

        UIComponents.createModal('Create New Course', modalContent, {
            size: 'large',
            actions: [
                { label: 'Create Course', type: 'primary', onclick: 'window.adminPortal.modules.courses.saveNewCourse()' },
                { label: 'Cancel', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Save new course
     */
    saveNewCourse(event) {
        if (event) event.preventDefault();

        const title = document.getElementById('new-title').value;
        const instructor = document.getElementById('new-instructor').value;
        const category = document.getElementById('new-category').value;
        const level = document.getElementById('new-level').value;
        const duration = document.getElementById('new-duration').value;
        const lessons = parseInt(document.getElementById('new-lessons').value);
        const description = document.getElementById('new-description').value;

        if (!title || !instructor || !category || !level || !duration || !lessons || !description) {
            UIComponents.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Create new course object
        const newCourse = {
            id: `course_${Date.now()}`,
            title,
            description,
            category,
            level,
            status: 'Draft',
            instructor,
            instructorId: 'admin_created',
            thumbnail: '📚',
            duration,
            totalLessons: lessons,
            enrolledStudents: 0,
            completionRate: 0,
            rating: 0,
            reviews: 0,
            price: 'Free',
            tags: [category, level],
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            language: 'English',
            prerequisites: ['None'],
            learningOutcomes: ['Course content to be defined']
        };

        // Add to courses array
        this.courses.push(newCourse);
        this.categories = this.extractCategories();

        // Close modal and refresh view
        document.querySelector('.modal').remove();
        this.refreshCourseDisplay();

        UIComponents.showNotification(`Course "${title}" created successfully`, 'success');
    }

    /**
     * Export courses data
     */
    async exportCourses() {
        try {
            UIComponents.showNotification('Exporting course data...', 'info');
            const exportResponse = await this.api.exportData('courses', 'csv');

            if (exportResponse.success) {
                UIComponents.showNotification('Course data exported successfully', 'success');
            } else {
                throw new Error('Export failed');
            }
        } catch (error) {
            UIComponents.showNotification('Export functionality coming soon', 'info');
        }
    }

    /**
     * Refresh course display
     */
    refreshCourseDisplay() {
        const container = document.getElementById('courses-content');
        if (container) {
            this.renderCourseInterface(container);
        }
    }

    /**
     * Add course management specific styles
     */
    addCourseManagementStyles() {
        if (document.getElementById('course-management-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'course-management-styles';
        styles.textContent = `
            .course-management-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .course-actions {
                display: flex;
                gap: 0.5rem;
            }

            .course-stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .course-filters {
                display: flex;
                gap: 2rem;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                flex-wrap: wrap;
            }

            .courses-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .course-card {
                background: white;
                border-radius: 12px;
                border: 1px solid var(--gray-200);
                overflow: hidden;
                transition: var(--transition);
                box-shadow: var(--shadow-sm);
            }

            .course-card:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-md);
            }

            .course-card-header {
                position: relative;
                padding: 1.5rem;
                background: var(--accent);
                text-align: center;
            }

            .course-thumbnail {
                font-size: 3rem;
                margin-bottom: 0.5rem;
            }

            .course-status-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
            }

            .course-card-content {
                padding: 1.5rem;
            }

            .course-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: 0.75rem;
                line-height: 1.4;
            }

            .course-description {
                font-size: 0.875rem;
                color: var(--gray-600);
                line-height: 1.5;
                margin-bottom: 1rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .course-meta {
                margin-bottom: 1rem;
            }

            .meta-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
                color: var(--gray-600);
            }

            .meta-icon {
                font-size: 1rem;
                width: 20px;
            }

            .course-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
                padding: 1rem;
                background: var(--gray-50);
                border-radius: 8px;
            }

            .course-stats .stat-item {
                text-align: center;
            }

            .course-stats .stat-value {
                display: block;
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--gray-900);
                margin-bottom: 0.25rem;
            }

            .course-stats .stat-label {
                font-size: 0.75rem;
                color: var(--gray-500);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .course-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }

            .tag {
                background: var(--accent);
                color: var(--gray-700);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .course-card-actions {
                display: flex;
                gap: 0.5rem;
                padding: 1rem 1.5rem;
                background: var(--gray-50);
                border-top: 1px solid var(--gray-200);
            }

            .course-card-actions .btn {
                flex: 1;
                font-size: 0.75rem;
                padding: 0.5rem;
            }

            .course-detail-modal {
                max-width: 700px;
            }

            .course-detail-header {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--gray-200);
            }

            .course-thumbnail-large {
                font-size: 4rem;
                width: 80px;
                text-align: center;
            }

            .course-detail-info h2 {
                margin-bottom: 0.5rem;
                color: var(--gray-900);
            }

            .course-instructor {
                color: var(--gray-600);
                margin-bottom: 1rem;
            }

            .course-badges {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }

            .detail-section {
                margin-bottom: 2rem;
            }

            .detail-section h3 {
                margin-bottom: 1rem;
                color: var(--gray-900);
                font-size: 1.125rem;
            }

            .learning-outcomes {
                list-style: none;
                padding: 0;
            }

            .learning-outcomes li {
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--gray-100);
                position: relative;
                padding-left: 1.5rem;
            }

            .learning-outcomes li:before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--success);
                font-weight: bold;
            }

            .prerequisites {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }

            .prerequisite {
                background: var(--info);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .course-management-modal {
                min-width: 600px;
            }

            .management-tabs {
                display: flex;
                border-bottom: 1px solid var(--gray-200);
                margin-bottom: 1.5rem;
            }

            .tab-btn {
                background: none;
                border: none;
                padding: 1rem 1.5rem;
                cursor: pointer;
                font-size: 0.875rem;
                color: var(--gray-600);
                border-bottom: 2px solid transparent;
                transition: var(--transition);
            }

            .tab-btn.active {
                color: var(--primary);
                border-bottom-color: var(--primary);
            }

            .tab-btn:hover {
                color: var(--primary);
            }

            .tab-content h3 {
                margin-bottom: 1rem;
                color: var(--gray-900);
            }

            .student-stats,
            .content-stats,
            .analytics-stats {
                display: flex;
                gap: 2rem;
                margin-top: 1rem;
            }

            .table-thumbnail {
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--accent);
                border-radius: 8px;
            }

            .table-title {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }

            .title-text {
                font-weight: 500;
                color: var(--gray-900);
            }

            .title-meta {
                font-size: 0.75rem;
                color: var(--gray-500);
            }

            @media (max-width: 768px) {
                .course-management-header {
                    flex-direction: column;
                    align-items: stretch;
                }

                .course-filters {
                    flex-direction: column;
                    gap: 1rem;
                }

                .courses-grid {
                    grid-template-columns: 1fr;
                }

                .course-stats-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }

                .course-stats {
                    grid-template-columns: repeat(2, 1fr);
                }

                .management-tabs {
                    flex-direction: column;
                }

                .tab-btn {
                    text-align: left;
                    border-bottom: 1px solid var(--gray-200);
                    border-right: none;
                }

                .tab-btn.active {
                    border-bottom-color: var(--gray-200);
                    border-left: 3px solid var(--primary);
                    background: var(--accent);
                }
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Retry loading courses
     */
    async retry() {
        await this.render();
    }

    /**
     * Create new course
     */
    createCourse() {
        const modalContent = `
            <form class="course-create-form" onsubmit="window.adminPortal.modules.courses.saveNewCourse(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="new-title">Course Title</label>
                        <input type="text" id="new-title" required>
                    </div>

                    <div class="form-group">
                        <label for="new-instructor">Instructor</label>
                        <input type="text" id="new-instructor" required>
                    </div>

                    <div class="form-group">
                        <label for="new-category">Category</label>
                        <select id="new-category" required>
                            <option value="">Select Category</option>
                            ${this.categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('')}
                            <option value="new">+ Add New Category</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="new-level">Level</label>
                        <select id="new-level" required>
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="new-duration">Duration</label>
                        <input type="text" id="new-duration" placeholder="e.g., 8 weeks" required>
                    </div>

                    <div class="form-group">
                        <label for="new-lessons">Total Lessons</label>
                        <input type="number" id="new-lessons" min="1" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="new-description">Description</label>
                    <textarea id="new-description" rows="4" placeholder="Describe what students will learn in this course..." required></textarea>
                </div>

                <div class="form-group">
                    <label for="new-thumbnail">Thumbnail Emoji</label>
                    <input type="text" id="new-thumbnail" placeholder="📚" maxlength="2">
                </div>
            </form>
        `;

        UIComponents.createModal('Create New Course', modalContent, {
            size: 'large',
            actions: [
                { label: 'Create Course', type: 'primary', onclick: 'window.adminPortal.modules.courses.saveNewCourse()' },
                { label: 'Cancel', type: 'secondary', onclick: 'this.closest(\'.modal\').remove()' }
            ]
        });
    }

    /**
     * Save new course
     */
    saveNewCourse(event) {
        if (event) event.preventDefault();

        const title = document.getElementById('new-title').value;
        const instructor = document.getElementById('new-instructor').value;
        const category = document.getElementById('new-category').value;
        const level = document.getElementById('new-level').value;
        const duration = document.getElementById('new-duration').value;
        const lessons = parseInt(document.getElementById('new-lessons').value);
        const description = document.getElementById('new-description').value;
        const thumbnail = document.getElementById('new-thumbnail').value || '📚';

        if (!title || !instructor || !category || !level || !duration || !lessons || !description) {
            UIComponents.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Create new course object
        const newCourse = {
            id: `course_${Date.now()}`,
            title,
            description,
            category,
            level,
            status: 'Draft',
            instructor,
            instructorId: 'admin_created',
            thumbnail,
            duration,
            totalLessons: lessons,
            enrolledStudents: 0,
            completionRate: 0,
            rating: 0,
            reviews: 0,
            price: 'Free',
            tags: [category, level],
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            language: 'English',
            prerequisites: ['None'],
            learningOutcomes: ['Course content to be defined']
        };

        // Add to courses array
        this.courses.push(newCourse);

        // Update categories
        this.categories = this.extractCategories();

        // Close modal and refresh view
        document.querySelector('.modal').remove();
        this.refreshCourseDisplay();

        UIComponents.showNotification(`Course "${title}" created successfully`, 'success');
    }

    /**
     * Export courses data
     */
    async exportCourses() {
        try {
            UIComponents.showNotification('Exporting course data...', 'info');

            // In real app, this would call the API
            const exportResponse = await this.api.exportData('courses', 'csv');

            if (exportResponse.success) {
                UIComponents.showNotification('Course data exported successfully', 'success');
                // Download would happen here
            } else {
                throw new Error('Export failed');
            }
        } catch (error) {
            console.error('❌ Failed to export courses:', error);
            UIComponents.showNotification('Export functionality coming soon', 'info');
        }
    }

    /**
     * Refresh course display
     */
    refreshCourseDisplay() {
        const container = document.getElementById('courses-content');
        if (container) {
            this.renderCourseInterface(container);
        }
    }

    /**
     * Retry loading courses
     */
    async retry() {
        await this.render();
    }
}

export default CourseManagementModule;
