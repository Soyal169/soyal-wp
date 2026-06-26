// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    initializeTheme();
    initializeScrollEffects();
    initializeTerminal();
    initializeDashboard();
    initializeSkills();
    initializeProjects();
    initializeRoadmap();
    initializeBlog();
    initializeCommandPalette();
    initializeMobileMenu();
    updateVisitorCounter();
});

// ----------------------------------------------------
// THEME STATE MANAGEMENT
// ----------------------------------------------------
function initializeTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");
    const htmlEl = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    htmlEl.setAttribute("data-theme", savedTheme);
    updateThemeIcons(savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlEl.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlEl.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        updateThemeIcons(newTheme);
        addTerminalLine(`Theme changed to: ${newTheme.toUpperCase()}`);
    });

    function updateThemeIcons(theme) {
        if (theme === "light") {
            sunIcon.style.display = "inline-block";
            moonIcon.style.display = "none";
        } else {
            sunIcon.style.display = "none";
            moonIcon.style.display = "inline-block";
        }
    }
}

// ----------------------------------------------------
// READING PROGRESS & SCROLL INTERACTION
// ----------------------------------------------------
function initializeScrollEffects() {
    const progressBar = document.getElementById("reading-progress");
    const sectionContainers = document.querySelectorAll(".section-container");
    const navLinks = document.querySelectorAll(".nav-link");

    // Scroll listener for progress bar and active section highlighting
    window.addEventListener("scroll", () => {
        // Reading Progress
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        // Scroll Reveal Sections
        sectionContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85) {
                container.classList.add("visible");
            }
        });

        // Active Nav Highlight
        let currentSectionId = "";
        const sections = document.querySelectorAll("section");
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (window.scrollY >= secTop) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // Initial check for visibility on load
    setTimeout(() => {
        sectionContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                container.classList.add("visible");
            }
        });
        // Hero is visible by default
        const heroSection = document.querySelector("#hero .section-container");
        if (heroSection) heroSection.classList.add("visible");
    }, 100);
}

// ----------------------------------------------------
// VISITOR COUNTER
// ----------------------------------------------------
function updateVisitorCounter() {
    const counterEl = document.getElementById("visitor-count");
    if (!counterEl) return;
    
    // Simulate counter increment using localStorage
    let visits = localStorage.getItem("visitor-nodes") || 103482;
    visits = parseInt(visits) + 1;
    localStorage.setItem("visitor-nodes", visits);
    counterEl.innerText = visits.toLocaleString();
}

// ----------------------------------------------------
// MOBILE MENU NAVIGATION
// ----------------------------------------------------
function initializeMobileMenu() {
    const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const closeMobileMenu = document.getElementById("close-mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    mobileMenuTrigger.addEventListener("click", () => {
        mobileMenuOverlay.classList.add("active");
    });

    const closeMenu = () => {
        mobileMenuOverlay.classList.remove("active");
    };

    closeMobileMenu.addEventListener("click", closeMenu);
    mobileMenuOverlay.addEventListener("click", (e) => {
        if (e.target === mobileMenuOverlay) closeMenu();
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            closeMenu();
            // Smooth scroll handler
            const targetId = link.getAttribute("href");
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                e.preventDefault();
                window.scrollTo({
                    top: targetSec.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });
}

// ----------------------------------------------------
// DATA DATABASES
// ----------------------------------------------------
const SKILLS_DATA = {
    backend: [
        { name: "Python", level: 80 },
        { name: "Django & DRF", level: 75 },
        { name: "PHP", level: 90 },
        { name: "Laravel", level: 85 },
        { name: "REST APIs", level: 92 },
        { name: "Auth (OAuth, JWT, Sessions)", level: 88 },
        { name: "Background Jobs & Queues", level: 80 }
    ],
    databases: [
        { name: "MySQL / MariaDB", level: 88 },
        { name: "PostgreSQL", level: 78 },
        { name: "Database Design & Normalization", level: 85 },
        { name: "Query Optimization & Indexing", level: 80 }
    ],
    swe: [
        { name: "Object-Oriented Programming (OOP)", level: 90 },
        { name: "Design Patterns", level: 82 },
        { name: "MVC Architecture", level: 88 },
        { name: "Clean Code & Refactoring", level: 85 },
        { name: "SOLID Principles", level: 84 },
        { name: "Unit & Integration Testing", level: 78 }
    ],
    infra: [
        { name: "Git & Version Control", level: 88 },
        { name: "Docker", level: 75 },
        { name: "Linux OS & Bash Shell", level: 82 },
        { name: "Postman", level: 90 }
    ],
    cs: [
        { name: "Data Structures", level: 80 },
        { name: "Algorithms & Time Complexity", level: 78 },
        { name: "System Design Foundations", level: 75 },
        { name: "Networking Fundamentals", level: 72 }
    ]
};

const PROJECTS_DATA = [
    {
        id: "proj-1",
        title: "Distributed Task Processing Pipeline",
        categories: ["backend", "python", "automation"],
        tags: ["Python", "Django", "Redis", "Celery", "PostgreSQL"],
        desc: "A asynchronous task queue engine designed to parse third-party telemetry, process large log streams, and write updates dynamically without blocking frontend applications.",
        businessProblem: "A analytics platform suffered severe page load delays when users triggered exports or requested processing of large dataset uploads, bottlenecking CPU usage.",
        technicalSolution: "Decoupled web requests from execution tasks. Setup Django REST Framework to receive uploads, quickly register a unique task token, and pass job payloads to Redis.",
        architecture: "Distributed worker architecture. A Celery worker cluster consumes messages, performs calculations, updates progress states in Redis, and stores output details in PostgreSQL.",
        databaseDesign: "Task schema design with dynamic metadata JSONB fields, indexing on status/tokens, and automatic archiving tables for older job logs to maintain database speed.",
        apiDesign: "Standardized REST endpoints: POST `/api/v1/jobs/submit`, GET `/api/v1/jobs/status/{task_id}`, and webhook configurations for completion notifications.",
        challengesSolved: "Handling Celery worker connection drops and preventing duplicate message delivery by integrating atomic Redis lock blocks (idempotency checks)."
    },
    {
        id: "proj-2",
        title: "High-Concurrency Scheduling API Engine",
        categories: ["backend", "api", "laravel", "database"],
        tags: ["PHP", "Laravel", "MySQL", "Redis", "Docker"],
        desc: "A reliable booking infrastructure API that manages real-time appointments, prevents double bookings under high load, and handles automatic confirmations.",
        businessProblem: "A ticketing application faced database locking conflicts and double-allocations during ticket release windows, leading to database failure and angry users.",
        technicalSolution: "Rebuilt core transactional code using optimistic database concurrency locks, Redis-based inventory check gates, and transactional database isolation levels.",
        architecture: "Traditional MVC structure exposed purely as a headless API service. Utilizes a Redis cache buffer layer to prevent hitting the database for sold-out events.",
        databaseDesign: "MySQL database featuring strict relational constraints, indexed foreign keys for user/event pairings, and optimized join structures for fast inventory availability checks.",
        apiDesign: "JWT-authenticated API routes with granular scopes, rate limiting headers, custom query error handlers, and detailed payload validations.",
        challengesSolved: "Implemented Redis locks to resolve race conditions where concurrent checkouts attempted to reserve the same seat simultaneously."
    },
    {
        id: "proj-3",
        title: "Log Ingestion and Metric Extractor",
        categories: ["python", "automation"],
        tags: ["Python", "SQLite", "Regex", "Bash"],
        desc: "A lightweight CLI parsing tool that reads server log streams (Nginx, Gunicorn), extracts performance metrics, and aggregates warning reports.",
        businessProblem: "Server administrators lacked direct visibility into runtime response delays and critical error rates without installing expensive corporate cloud APM tools.",
        technicalSolution: "Wrote a low-overhead Python CLI agent running as a cron-daemon that parses access log files via regular expressions, aggregates indicators, and logs outputs locally.",
        architecture: "Modular piping design. Consists of a FileWatcher module, a RegexParser engine, a LocalStorage sync agent, and an alert threshold checker.",
        databaseDesign: "Embedded SQLite engine utilizing a single daily aggregated table structure to keep agent memory footprint under 30MB.",
        apiDesign: "Console UI outputs and JSON file exports matching structured log standards (Elasticsearch ready).",
        challengesSolved: "Handling rolling logs and massive files efficiently by using memory-friendly generators in Python instead of loading entire logs into RAM."
    },
    {
        id: "proj-4",
        title: "Enterprise Core Database Optimizer",
        categories: ["database", "backend"],
        tags: ["PostgreSQL", "Query Tuning", "Database Design"],
        desc: "A query analysis, indexing redesign, and schema tuning project that scaled data transactions on a relational base containing over 10M rows.",
        businessProblem: "Reporting queries and customer filters took upwards of 15 seconds to load, frequently locking primary user detail rows and causing application timeouts.",
        technicalSolution: "Analyzed transaction profiles using PG query planner tools (`EXPLAIN ANALYZE`), rewrote inefficient ORM-generated nested queries, and implemented compound indexes.",
        architecture: "Centralized relational database structure with optimized read replica synchronization strategies.",
        databaseDesign: "Optimized schema by normalizing duplicate metadata profiles, converting string searches to integer-indexed enumerations, and setting up indexes.",
        apiDesign: "N/A (Database level refactoring). Optimized existing ORM database query triggers across application backend systems.",
        challengesSolved: "Successfully refactored queries to eliminate sequential tables scans, reducing page latency from 15 seconds to under 150ms on index queries."
    }
];

const BLOGS_DATA = [
    {
        id: "blog-1",
        title: "Deconstructing the Request-Response Lifecycle in Django",
        category: "engineering",
        tags: ["Python", "Django", "Backend"],
        date: "2026-05-12",
        readTime: "8 min read",
        excerpt: "An in-depth look under the hood of Django's WSGI/ASGI handlers, middleware pipeline, URL routing, and view execution workflow.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
        content: `
            <p>To write highly optimized code, we must understand what happens between the moment a user hits Enter and when our server returns a JSON response. In Django, this journey is a structured chain of components.</p>
            <h3>1. The Gateway Interface (WSGI/ASGI)</h3>
            <p>Whether using Gunicorn, Uvicorn, or Nginx, the incoming HTTP query is parsed and translated into a standard Python dictionary (environ/scope) and passed to Django's application handler class.</p>
            <h3>2. The Middleware Stack</h3>
            <p>Django passes this request through a list of middleware classes configured in settings. Middleware handles authentication token parsing, security header attachment, csrf validation, and session verification sequentially.</p>
            <blockquote>"Middleware is the Swiss Army knife of django web apps, executing code before and after views run."</blockquote>
            <h3>3. URL Dispatcher & View Resolution</h3>
            <p>Once middleware resolves successfully, Django compares the requested path against the URL patterns. Upon finding a match, it imports the corresponding controller function or view class, injects database clients, and executes view logic.</p>
        `
    },
    {
        id: "blog-2",
        title: "How We Scaled Relational Queries by 60%",
        category: "engineering",
        tags: ["Database", "PostgreSQL", "Optimization"],
        date: "2026-04-28",
        readTime: "6 min read",
        excerpt: "Practical tips on identifying N+1 query patterns, indexing strategies, compound indexes, and using EXPLAIN ANALYZE for query plans.",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=400",
        content: `
            <p>Most backend application slowdowns do not occur because of CPU limits or programming languages; they are caused by poorly optimized database access layers.</p>
            <h3>Finding the N+1 Culprit</h3>
            <p>An N+1 query issue occurs when your ORM runs one query to fetch parent records (e.g., 50 projects) and then runs 50 separate queries to fetch children records (e.g., tags for each project). In Django, use <code>select_related()</code> or <code>prefetch_related()</code>. In Laravel, use eager loading via <code>with()</code>.</p>
            <h3>The Power of Compound Indexes</h3>
            <p>If your application frequently filters queries using multiple columns (e.g., <code>WHERE status = 'active' AND user_id = 12</code>), creating single-column indexes on both columns is not optimal. Instead, create a composite index that contains both columns to locate matching nodes instantly.</p>
        `
    },
    {
        id: "blog-3",
        title: "Trekking to Annapurna Base Camp: A Nepal Adventure",
        category: "travel",
        tags: ["Nepal", "Trekking", "Hiking"],
        date: "2025-11-10",
        readTime: "12 min read",
        excerpt: "A recount of hiking through rhododendron forests, suspension bridges, and reaching 4,130m above sea level at the foot of giant peaks.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400",
        content: `
            <p>Leaving the keyboard behind to ascend the Himalayas is one of the most grounding experiences a software engineer can have. The Annapurna Base Camp (ABC) trek is a gorgeous challenge.</p>
            <h3>The Trail Structure</h3>
            <p>The journey takes you from green subtropical valleys, through high suspension bridges crossing roaring rivers, and up thousands of stone steps. The scenery transforms daily—from bamboo forests to rocky alpine environments surrounded by snow-capped peaks.</p>
            <h3>Reaching 4,130m</h3>
            <p>Waking up at 4:00 AM at Machhapuchhre Base Camp to hike up to ABC under a night sky full of stars is unforgettable. As the sun rises over Annapurna I (8,091m), you realize how massive the world is beyond code libraries and databases.</p>
        `
    },
    {
        id: "blog-4",
        title: "My Transition Path: Laravel to Python Systems Engineering",
        category: "engineering",
        tags: ["Career", "Python", "Laravel"],
        date: "2026-02-15",
        readTime: "10 min read",
        excerpt: "Why language syntax is secondary, and why focusing on design patterns, algorithms, and modular boundaries will make you a better engineer.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
        content: `
            <p>For several years, PHP and Laravel were my core tooling. Laravel is a fantastic framework that gets products to market quickly. However, to grow as a software developer, I wanted to understand low-level concepts without framework magic.</p>
            <h3>Why Python?</h3>
            <p>Python's simplicity allowed me to focus directly on data processing, concurrent networking, and algorithmic efficiency. Django provides strict structures while forcing you to understand relational mappings more explicitly.</p>
            <h3>Key Takeaway</h3>
            <p>Frames and languages change, but principles remain: HTTP headers, TCP handshakes, database indexes, message brokers, and code readability do not change based on what you write. Focus on concepts, not code syntaxes.</p>
        `
    },
    {
        id: "blog-5",
        title: "Gaming Insights: narrative designs in RPGs",
        category: "gaming",
        tags: ["Gaming", "Level Design", "Witcher"],
        date: "2026-03-01",
        readTime: "7 min read",
        excerpt: "An analysis of environmental storytelling, side quest scaling, and level design structures that create immersive game environments.",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400",
        content: `
            <p>Game design is software engineering at its most artistic. Exploring games like Witcher 3, Elden Ring, and Baldur's Gate reveals fascinating architectural decisions made by system designers.</p>
            <h3>Environmental Storytelling</h3>
            <p>Great games don't tell stories only in cutscenes; they build it into the landscape. A ruined caravan, a specific distribution of monsters, or letters left in cabins tell stories without reading text lines, mimicking clean code architecture that is self-documenting.</p>
            <h3>System Scaling</h3>
            <p>RPGs require complex algorithms to scale item level drops, match enemy stats dynamically, and handle state triggers. Seeing how game engines manage high entity state trees teaches us massive lessons in caching and concurrent database structures.</p>
        `
    }
];

const ROADMAP_DATA = [
    { name: "Python", status: "completed", desc: "Mastering advanced features, decorators, generators, and async programming models." },
    { name: "Django", status: "completed", desc: "Building scalable web services, customizing Django REST Framework serializers and viewsets." },
    { name: "Advanced API Design", status: "active", desc: "Designing idempotent endpoints, versioning systems, and OAuth integration flows." },
    { name: "System Design", status: "active", desc: "Studying load balancers, database scaling (sharding, replication), and cache patterns." },
    { name: "Docker", status: "active", desc: "Containerizing backend environments, setting up multi-container docker-compose workflows." },
    { name: "PostgreSQL", status: "upcoming", desc: "Deep dive into write-ahead logs, transaction isolation levels, and geographic databases." },
    { name: "Microservices", status: "upcoming", desc: "Exploring service boundaries, synchronous vs asynchronous inter-service communication." },
    { name: "Cloud Computing", status: "upcoming", desc: "Learning AWS core services (EC2, S3, RDS, IAM) and serverless deployment paths." },
    { name: "Testing", status: "upcoming", desc: "Mastering TDD patterns, unit testing dependencies with mocks, and load testing APIs." },
    { name: "Software Architecture", status: "upcoming", desc: "Studying Clean Architecture, Hexagonal patterns, and Domain-Driven Design (DDD)." }
];

// ----------------------------------------------------
// TERMINAL LOGIC
// ----------------------------------------------------
let terminalHistory = [];
let terminalHistoryIdx = -1;

function initializeTerminal() {
    const termInput = document.getElementById("terminal-cmd-input");
    const termScreen = document.getElementById("terminal-screen");
    if (!termInput || !termScreen) return;

    termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = termInput.value.trim();
            if (cmd) {
                processTerminalCommand(cmd);
                terminalHistory.push(cmd);
                terminalHistoryIdx = terminalHistory.length;
            }
            termInput.value = "";
        } else if (e.key === "ArrowUp") {
            if (terminalHistoryIdx > 0) {
                terminalHistoryIdx--;
                termInput.value = terminalHistory[terminalHistoryIdx];
            }
            e.preventDefault();
        } else if (e.key === "ArrowDown") {
            if (terminalHistoryIdx < terminalHistory.length - 1) {
                terminalHistoryIdx++;
                termInput.value = terminalHistory[terminalHistoryIdx];
            } else {
                terminalHistoryIdx = terminalHistory.length;
                termInput.value = "";
            }
            e.preventDefault();
        }
    });

    // Autofocus command line when clicking inside terminal window
    document.querySelector(".terminal-window").addEventListener("click", () => {
        termInput.focus();
    });
}

function addTerminalLine(text, isCommand = false) {
    const termScreen = document.getElementById("terminal-screen");
    const lastLine = termScreen.querySelector(".terminal-line").parentElement;
    
    const newOutput = document.createElement("div");
    newOutput.className = "terminal-output";
    if (isCommand) {
        newOutput.innerHTML = `<span class="terminal-prompt">soyal@engine-hub:~$</span> ${text}`;
    } else {
        newOutput.innerHTML = text;
    }
    
    termScreen.insertBefore(newOutput, termScreen.querySelector(".terminal-line"));
    termScreen.scrollTop = termScreen.scrollHeight;
}

function processTerminalCommand(cmdString) {
    addTerminalLine(cmdString, true);
    const cmd = cmdString.toLowerCase().split(" ")[0];
    
    switch (cmd) {
        case "help":
            addTerminalLine(`Available commands:
  - <b>about</b>    : Displays a summary of my background
  - <b>projects</b> : Lists featured systems and applications
  - <b>skills</b>   : Lists key technology capabilities
  - <b>roadmap</b>  : Displays my current and future learning roadmap
  - <b>contact</b>  : Shows contact methods and links
  - <b>theme</b>    : Toggle light/dark UI themes
  - <b>clear</b>    : Clears the terminal screen`);
            break;
        case "about":
            addTerminalLine("Soyal Shrestha: Backend Developer & Software Engineer. Building reliable REST APIs, database schemas, and background job queues. Passionate about Python, Django, system design, and Nepal travel/hiking.");
            break;
        case "projects":
            let projList = "Featured Engineering Solutions:<br>";
            PROJECTS_DATA.forEach(p => {
                projList += `• <b>${p.title}</b> (${p.tags.slice(0, 3).join(", ")})<br>`;
            });
            addTerminalLine(projList);
            break;
        case "skills":
            let skillList = "Primary Technologies:<br>";
            Object.keys(SKILLS_DATA).forEach(domain => {
                const names = SKILLS_DATA[domain].slice(0, 4).map(s => s.name).join(", ");
                skillList += `• <i>${domain.toUpperCase()}</i>: ${names}...<br>`;
            });
            addTerminalLine(skillList);
            break;
        case "roadmap":
            let roadList = "Current Growth Vectors:<br>";
            ROADMAP_DATA.forEach((r, idx) => {
                const statusChar = r.status === "completed" ? "✔" : r.status === "active" ? "➜" : "○";
                roadList += ` [${statusChar}] ${idx + 1}. ${r.name}<br>`;
            });
            addTerminalLine(roadList);
            break;
        case "contact":
            addTerminalLine(`Contact details:
  - Email: soyal@example.com
  - GitHub: github.com
  - LinkedIn: linkedin.com`);
            break;
        case "theme":
            document.getElementById("theme-toggle").click();
            break;
        case "clear":
            const termScreen = document.getElementById("terminal-screen");
            const outputs = termScreen.querySelectorAll(".terminal-output");
            outputs.forEach(op => op.remove());
            break;
        default:
            addTerminalLine(`Command not found: '${cmd}'. Type 'help' to see list of available commands.`);
    }
}

// ----------------------------------------------------
// DEVELOPER DASHBOARD WIDGETS
// ----------------------------------------------------
function initializeDashboard() {
    // Generate GitHub contribution grid
    const grid = document.getElementById("github-contributions-grid");
    if (!grid) return;

    // We want 7 rows and 53 columns
    const totalCells = 7 * 53;
    let gridHTML = "";
    for (let i = 0; i < totalCells; i++) {
        // Randomly generate activity levels (0-4)
        const rand = Math.random();
        let level = "";
        if (rand > 0.9) level = "level-4";
        else if (rand > 0.8) level = "level-3";
        else if (rand > 0.6) level = "level-2";
        else if (rand > 0.4) level = "level-1";
        
        gridHTML += `<div class="github-cell ${level}" title="Contribution node active"></div>`;
    }
    grid.innerHTML = gridHTML;
}

// ----------------------------------------------------
// INTERACTIVE SKILLS DISPLAY
// ----------------------------------------------------
function initializeSkills() {
    const tabContainer = document.getElementById("skills-tabs");
    if (!tabContainer) return;

    const tabs = tabContainer.querySelectorAll(".skills-tab-btn");
    
    // Load skills initially
    loadSkillsDomain("backend");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const domain = tab.getAttribute("data-tab");
            
            // Hide all tab contents
            const contents = document.querySelectorAll(".skills-tab-content");
            contents.forEach(c => c.classList.remove("active"));
            
            // Show target
            const activeContent = document.getElementById(`skills-${domain}`);
            if (activeContent) {
                activeContent.classList.add("active");
            }
            
            loadSkillsDomain(domain);
        });
    });
}

function loadSkillsDomain(domain) {
    const grid = document.getElementById(`skills-grid-${domain}`);
    if (!grid) return;
    grid.innerHTML = "";

    const skills = SKILLS_DATA[domain] || [];
    skills.forEach(skill => {
        const card = document.createElement("div");
        card.className = "skill-card";
        card.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%;"></div>
            </div>
        `;
        grid.appendChild(card);

        // Animate width on next frame
        requestAnimationFrame(() => {
            setTimeout(() => {
                const progBar = card.querySelector(".skill-progress");
                if (progBar) progBar.style.width = `${skill.level}%`;
            }, 50);
        });
    });
}

// ----------------------------------------------------
// PROJECTS GALLERY WITH FILTERING AND DETAIL MODALS
// ----------------------------------------------------
function initializeProjects() {
    const filterContainer = document.getElementById("projects-filters");
    if (!filterContainer) return;

    const filters = filterContainer.querySelectorAll(".filter-btn");
    renderProjects("all");

    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(f => f.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.getAttribute("data-filter"));
        });
    });
}

function renderProjects(categoryFilter) {
    const grid = document.getElementById("projects-list-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = categoryFilter === "all" 
        ? PROJECTS_DATA 
        : PROJECTS_DATA.filter(p => p.categories.includes(categoryFilter));

    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "project-card";
        
        const tagsHTML = p.tags.map(t => `<span class="tech-tag">${t}</span>`).join("");
        
        card.innerHTML = `
            <div class="project-meta-top">
                <span class="project-category">${p.categories[0]}</span>
                <i data-lucide="folder" style="width:16px; height:16px; color:var(--text-muted);"></i>
            </div>
            <div class="project-card-header">
                <h4 class="project-title">${p.title}</h4>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tech-tags">${tagsHTML}</div>
            </div>
            <div class="project-highlights">
                <div class="highlight-item">
                    <span class="highlight-label">Problem:</span>
                    <span>${p.businessProblem.substring(0, 75)}...</span>
                </div>
                <div class="highlight-item">
                    <span class="highlight-label">Solution:</span>
                    <span>${p.technicalSolution.substring(0, 75)}...</span>
                </div>
            </div>
            <div class="project-links">
                <button class="project-link-btn view-project-details-btn" data-id="${p.id}">
                    <i data-lucide="eye" style="width:14px; height:14px;"></i> View Details
                </button>
                <a href="https://github.com" target="_blank" class="project-link-btn">
                    <i data-lucide="github" style="width:14px; height:14px;"></i> Codebase
                </a>
            </div>
        `;
        grid.appendChild(card);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Attach details click listeners
    const viewButtons = grid.querySelectorAll(".view-project-details-btn");
    viewButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const projId = btn.getAttribute("data-id");
            openProjectModal(projId);
        });
    });
}

function openProjectModal(id) {
    const proj = PROJECTS_DATA.find(p => p.id === id);
    if (!proj) return;

    const overlay = document.getElementById("details-overlay");
    const title = document.getElementById("details-title");
    const meta = document.getElementById("details-meta-data");
    const body = document.getElementById("details-body-content");

    title.innerText = proj.title;
    meta.innerText = `${proj.categories.map(c => c.toUpperCase()).join(" • ")}`;
    
    body.innerHTML = `
        <div class="details-content">
            <h3><i data-lucide="alert-circle" style="display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> Business Problem</h3>
            <p>${proj.businessProblem}</p>
            
            <h3><i data-lucide="check-circle" style="display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> Technical Solution</h3>
            <p>${proj.technicalSolution}</p>
            
            <h3><i data-lucide="git-branch" style="display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> Architecture Overview</h3>
            <p>${proj.architecture}</p>
            
            <h3><i data-lucide="database" style="display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> Database Design</h3>
            <p>${proj.databaseDesign}</p>
            
            <h3><i data-lucide="link" style="display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> API Endpoints & Interfaces</h3>
            <p>${proj.apiDesign}</p>
            
            <h3><i data-lucide="shield-alert" style="display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> Challenges Solved</h3>
            <p>${proj.challengesSolved}</p>
        </div>
    `;

    overlay.classList.add("active");
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// ----------------------------------------------------
// GROWTH ROADMAP TIMELINE
// ----------------------------------------------------
function initializeRoadmap() {
    const timeline = document.getElementById("roadmap-list-timeline");
    if (!timeline) return;
    timeline.innerHTML = "";

    ROADMAP_DATA.forEach((item, index) => {
        const node = document.createElement("div");
        node.className = `roadmap-item ${item.status}`;
        
        node.innerHTML = `
            <div class="roadmap-node"></div>
            <div class="roadmap-content">
                <span class="roadmap-index">Step 0${index + 1} • ${item.status.toUpperCase()}</span>
                <h4 class="roadmap-title">${item.name}</h4>
                <p class="roadmap-desc">${item.desc}</p>
            </div>
        `;
        timeline.appendChild(node);
    });
}

// ----------------------------------------------------
// BLOG SYSTEM WITH FILTERS & DETAILS MODAL
// ----------------------------------------------------
function initializeBlog() {
    const tabContainer = document.getElementById("blog-category-tabs");
    const searchInput = document.getElementById("blog-search");
    if (!tabContainer || !searchInput) return;

    const tabs = tabContainer.querySelectorAll(".blog-tab-btn");

    renderBlogs("all", "");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderBlogs(tab.getAttribute("data-category"), searchInput.value.trim());
        });
    });

    searchInput.addEventListener("input", () => {
        const activeTab = tabContainer.querySelector(".blog-tab-btn.active");
        const category = activeTab ? activeTab.getAttribute("data-category") : "all";
        renderBlogs(category, searchInput.value.trim());
    });
}

function renderBlogs(categoryFilter, searchQuery) {
    const grid = document.getElementById("blog-grid-list");
    if (!grid) return;
    grid.innerHTML = "";

    let filtered = BLOGS_DATA;

    if (categoryFilter !== "all") {
        filtered = filtered.filter(b => b.category === categoryFilter);
    }

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(b => 
            b.title.toLowerCase().includes(q) || 
            b.excerpt.toLowerCase().includes(q) ||
            b.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    filtered.forEach(b => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.innerHTML = `
            <img src="${b.image}" alt="${b.title}" class="blog-card-image">
            <div class="blog-card-body">
                <div class="blog-card-meta">
                    <span>${b.date}</span>
                    <span>${b.readTime}</span>
                </div>
                <h4 class="blog-card-title">${b.title}</h4>
                <p class="blog-card-excerpt">${b.excerpt}</p>
                <div class="blog-card-tags">
                    ${b.tags.map(t => `<span class="blog-tag">#${t}</span>`).join(" ")}
                </div>
            </div>
        `;
        card.addEventListener("click", () => openBlogModal(b.id));
        grid.appendChild(card);
    });
}

function openBlogModal(id) {
    const blog = BLOGS_DATA.find(b => b.id === id);
    if (!blog) return;

    const overlay = document.getElementById("details-overlay");
    const title = document.getElementById("details-title");
    const meta = document.getElementById("details-meta-data");
    const body = document.getElementById("details-body-content");

    title.innerText = blog.title;
    meta.innerText = `${blog.category.toUpperCase()} • ${blog.date} • ${blog.readTime}`;
    body.innerHTML = `
        <div class="details-content">
            <img src="${blog.image}" alt="${blog.title}" style="width:100%; height:300px; object-fit:cover; border-radius:8px; margin-bottom:1rem; border:1px solid var(--border-color)">
            ${blog.content}
        </div>
    `;

    overlay.classList.add("active");
}

// Close Modals Helper
document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".modal-overlay").forEach(overlay => {
            overlay.classList.remove("active");
        });
    });
});

document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
        }
    });
});

// Resume triggers and buttons
const resumeDl = document.getElementById("download-cv");
const resumeContact = document.getElementById("contact-cv-trigger");
[resumeDl, resumeContact].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
        // Trigger file download simulation
        alert("Downloading Resume: Soyal_Shrestha_Backend_Engineer.pdf (Placeholder Action)");
    });
});

// ----------------------------------------------------
// COMMAND PALETTE ACTIONS
// ----------------------------------------------------
const COMMAND_ITEMS = [
    { title: "Go to About", action: () => scrollToSection("about"), type: "navigation", shortcut: "G A" },
    { title: "Go to Dashboard", action: () => scrollToSection("dashboard"), type: "navigation", shortcut: "G D" },
    { title: "Go to Skills", action: () => scrollToSection("skills"), type: "navigation", shortcut: "G S" },
    { title: "Go to Projects", action: () => scrollToSection("projects"), type: "navigation", shortcut: "G P" },
    { title: "Go to Roadmap", action: () => scrollToSection("roadmap"), type: "navigation", shortcut: "G R" },
    { title: "Go to Blog", action: () => scrollToSection("blog"), type: "navigation", shortcut: "G B" },
    { title: "Go to Contact", action: () => scrollToSection("contact"), type: "navigation", shortcut: "G C" },
    { title: "Toggle Light/Dark Theme", action: () => document.getElementById("theme-toggle").click(), type: "action", shortcut: "T T" },
    { title: "Open Terminal UI", action: () => { scrollToSection("hero"); document.getElementById("terminal-cmd-input").focus(); }, type: "action", shortcut: "O T" },
    { title: "Clear Terminal Screen", action: () => processTerminalCommand("clear"), type: "action", shortcut: "C L" },
    { title: "Download Resume PDF", action: () => document.getElementById("download-cv").click(), type: "action", shortcut: "D R" }
];

function scrollToSection(id) {
    const sec = document.getElementById(id);
    if (sec) {
        window.scrollTo({
            top: sec.offsetTop - 70,
            behavior: "smooth"
        });
    }
}

function initializeCommandPalette() {
    const openBtn = document.getElementById("open-cmd-palette");
    const overlay = document.getElementById("cmd-palette-overlay");
    const input = document.getElementById("cmd-palette-input");
    const resultsContainer = document.getElementById("cmd-palette-results");
    
    if (!openBtn || !overlay || !input || !resultsContainer) return;

    let selectedIndex = 0;
    let filteredItems = [...COMMAND_ITEMS];

    const openPalette = () => {
        overlay.classList.add("active");
        input.value = "";
        filteredItems = [...COMMAND_ITEMS];
        selectedIndex = 0;
        renderResults();
        setTimeout(() => input.focus(), 50);
    };

    const closePalette = () => {
        overlay.classList.remove("active");
    };

    openBtn.addEventListener("click", openPalette);

    // Global listener for Ctrl+K
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === "k") {
            e.preventDefault();
            openPalette();
        } else if (e.key === "Escape") {
            closePalette();
        }
    });

    // Navigation and Action trigger within the palette
    input.addEventListener("keydown", (e) => {
        const items = resultsContainer.querySelectorAll(".cmd-item");
        if (e.key === "ArrowDown") {
            if (selectedIndex < items.length - 1) {
                selectedIndex++;
                updateSelection();
            }
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            if (selectedIndex > 0) {
                selectedIndex--;
                updateSelection();
            }
            e.preventDefault();
        } else if (e.key === "Enter") {
            if (filteredItems[selectedIndex]) {
                filteredItems[selectedIndex].action();
                closePalette();
            }
            e.preventDefault();
        }
    });

    input.addEventListener("input", () => {
        const q = input.value.toLowerCase().trim();
        if (q) {
            filteredItems = COMMAND_ITEMS.filter(item => 
                item.title.toLowerCase().includes(q) || 
                item.type.toLowerCase().includes(q)
            );
        } else {
            filteredItems = [...COMMAND_ITEMS];
        }
        selectedIndex = 0;
        renderResults();
    });

    function renderResults() {
        resultsContainer.innerHTML = "";
        if (filteredItems.length === 0) {
            resultsContainer.innerHTML = `<div style="padding:1rem; text-align:center; color:var(--text-muted)">No commands found. Try 'theme', 'go', or 'clear'.</div>`;
            return;
        }

        filteredItems.forEach((item, idx) => {
            const btn = document.createElement("button");
            btn.className = `cmd-item ${idx === selectedIndex ? "selected" : ""}`;
            
            const iconName = item.type === "navigation" ? "compass" : "sliders";
            
            btn.innerHTML = `
                <div class="cmd-item-left">
                    <i data-lucide="${iconName}" class="cmd-item-icon" style="width:16px; height:16px;"></i>
                    <span class="cmd-item-title">${item.title}</span>
                </div>
                <span class="cmd-item-shortcut">${item.shortcut}</span>
            `;
            
            btn.addEventListener("click", () => {
                item.action();
                closePalette();
            });

            resultsContainer.appendChild(btn);
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function updateSelection() {
        const items = resultsContainer.querySelectorAll(".cmd-item");
        items.forEach((item, idx) => {
            if (idx === selectedIndex) {
                item.classList.add("selected");
                item.scrollIntoView({ block: "nearest" });
            } else {
                item.classList.remove("selected");
            }
        });
    }
}
