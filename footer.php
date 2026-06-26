    </main>

    <!-- FOOTER -->
    <footer>
        <div class="container">
            <p class="footer-text">© 2026 Soyal Shrestha. Built with HTML, CSS, and Vanilla JavaScript. Engineered with care.</p>
        </div>
    </footer>

    <!-- COMMAND PALETTE MODAL -->
    <div class="modal-overlay" id="cmd-palette-overlay">
        <div class="modal-window cmd-palette-modal">
            <div class="cmd-palette-input-wrapper">
                <i data-lucide="search" class="cmd-palette-search-icon"></i>
                <input type="text" class="cmd-palette-input" id="cmd-palette-input" placeholder="Type a command or section name..." autocomplete="off" spellcheck="false">
                <button class="modal-close-btn" id="close-cmd-palette"><i data-lucide="x"></i></button>
            </div>
            <div class="cmd-palette-results" id="cmd-palette-results">
                <!-- Command results will be injected here -->
            </div>
        </div>
    </div>

    <!-- DETAILS MODAL (FOR BLOGS / PROJECTS DETAIL VIEWS) -->
    <div class="modal-overlay" id="details-overlay">
        <div class="modal-window details-modal">
            <div class="modal-header">
                <div>
                    <h3 class="details-modal-title" id="details-title">Project or Blog Title</h3>
                    <div class="details-meta" id="details-meta-data">Category • Date</div>
                </div>
                <button class="modal-close-btn" id="close-details-modal"><i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" id="details-body-content">
                <!-- Detailed content injected by Javascript -->
            </div>
        </div>
    </div>

    <!-- Link to app logic -->
    <script src="app.js"></script>
    </body>

    </html>