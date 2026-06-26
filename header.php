<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soyal Shrestha | Backend Developer & Software Engineer</title>

    <!-- Meta tags for SEO -->
    <meta name="description" content="Portfolio of Soyal Shrestha, a Backend Developer & Software Engineer specializing in Python, Django, REST APIs, databases, and scalable systems. Learn about my work, travel stories, and gaming.">
    <meta name="keywords" content="Soyal Shrestha, Backend Developer, Software Engineer, Python, Django, PHP, Laravel, API Developer, System Design, Nepal Travel, Gaming">
    <meta name="author" content="Soyal Shrestha">

    <!-- Link to external stylesheet -->
    <link rel="stylesheet" href="styles.css">

    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body>
    <!-- Reading Progress Bar -->
    <div id="reading-progress"></div>

    <!-- Navigation Header -->
    <header>
        <div class="nav-container">
            <a href="#hero" class="logo">
                <span class="logo-symbol">&lt;</span>Soyal.S<span class="logo-symbol">/&gt;</span>
            </a>

            <nav class="nav-links">
                <a href="#about" class="nav-link">About</a>
                <a href="#dashboard" class="nav-link">Dashboard</a>
                <a href="#skills" class="nav-link">Skills</a>
                <a href="#projects" class="nav-link">Projects</a>
                <a href="#roadmap" class="nav-link">Roadmap</a>
                <a href="#blog" class="nav-link">Blog</a>
                <a href="#contact" class="nav-link">Contact</a>
            </nav>

            <div class="nav-actions">
                <button class="cmd-palette-btn" id="open-cmd-palette" title="Open Command Palette (Ctrl+K)">
                    <i data-lucide="terminal"></i>
                    <span>Menu</span>
                    <span class="kbd-shortcut">Ctrl+K</span>
                </button>

                <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle Light/Dark Theme">
                    <i data-lucide="sun" id="sun-icon" style="display: none;"></i>
                    <i data-lucide="moon" id="moon-icon"></i>
                </button>

                <button class="mobile-menu-btn" id="mobile-menu-trigger" aria-label="Open navigation menu">
                    <i data-lucide="menu"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Mobile Nav Menu Overlay -->
    <div class="modal-overlay" id="mobile-menu-overlay">
        <div class="modal-window" style="max-width: 320px; height: auto;">
            <div class="modal-header">
                <h3>Navigation</h3>
                <button class="modal-close-btn" id="close-mobile-menu"><i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" style="display: flex; flex-direction: column; gap: 1.5rem; text-align: center; padding: 2rem;">
                <a href="#about" class="mobile-nav-link">About</a>
                <a href="#dashboard" class="mobile-nav-link">Dashboard</a>
                <a href="#skills" class="mobile-nav-link">Skills</a>
                <a href="#projects" class="mobile-nav-link">Projects</a>
                <a href="#roadmap" class="mobile-nav-link">Roadmap</a>
                <a href="#blog" class="mobile-nav-link">Blog</a>
                <a href="#contact" class="mobile-nav-link">Contact</a>
            </div>
        </div>
    </div>

    <!-- Main Content wrapper -->
    <main>