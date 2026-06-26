// Lightbox
function openLightbox(imgSrc, imgAlt) {
  const existing = document.getElementById('lb-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = '<button id="lb-close" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl hover:bg-white/30 transition-colors z-10 cursor-pointer" aria-label="Close">&times;</button><div class="flex items-center justify-center w-full h-full p-4"><img id="lb-img" class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" alt=""></div>';
  overlay.className = 'fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300';

  const img = overlay.querySelector('#lb-img');
  img.src = imgSrc;
  img.alt = imgAlt || '';

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('#lb-close')) overlay.remove();
  });

  document.addEventListener('keydown', function lbKey(e) {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', lbKey); }
  });

  document.body.appendChild(overlay);
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-lightbox]');
  if (link) { e.preventDefault(); openLightbox(link.href, link.querySelector('img')?.alt || ''); }
});

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Dropdown toggle logic
  const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const targetId = button.getAttribute('data-dropdown-toggle');
      const menu = document.getElementById(targetId);
      const chevron = button.querySelector('.dropdown-chevron');

      if (menu) {
        // Desktop dropdown uses opacity/scale
        if (menu.id === 'list-dropdown') {
          const isHidden = menu.classList.contains('opacity-0');

          // Reset other desktop menus if they existed
          document.querySelectorAll('#list-dropdown').forEach(m => {
            if (m !== menu) {
              m.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
              m.classList.remove('scale-100');
              const otherBtn = document.querySelector(`[data-dropdown-toggle="${m.id}"]`);
              if (otherBtn) {
                const otherChevron = otherBtn.querySelector('.dropdown-chevron');
                if (otherChevron) otherChevron.classList.remove('rotate-180');
              }
            }
          });

          if (isHidden) {
            menu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
            menu.classList.add('scale-100');
            if (chevron) chevron.classList.add('rotate-180');
          } else {
            menu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
            menu.classList.remove('scale-100');
            if (chevron) chevron.classList.remove('rotate-180');
          }
        } 
        // Mobile dropdown uses hidden/flex
        else {
          const isHidden = menu.classList.contains('hidden');
          if (isHidden) {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            if (chevron) chevron.classList.add('rotate-180');
          } else {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            if (chevron) chevron.classList.remove('rotate-180');
          }
        }
      }

      e.stopPropagation();
    });
  });

  // Close desktop dropdowns when clicking outside
  document.addEventListener('click', () => {
    const desktopDropdown = document.getElementById('list-dropdown');
    if (desktopDropdown && !desktopDropdown.classList.contains('opacity-0')) {
      desktopDropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
      desktopDropdown.classList.remove('scale-100');
      const btn = document.querySelector('[data-dropdown-toggle="list-dropdown"]');
      if (btn) {
        const chevron = btn.querySelector('.dropdown-chevron');
        if (chevron) chevron.classList.remove('rotate-180');
      }
    }
  });

  // Mobile Menu Logic
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileMenuContent = document.getElementById('mobile-menu-content');

  const openMobileMenu = () => {
    mobileMenu.classList.remove('pointer-events-none', 'invisible');
    mobileMenuBackdrop.classList.remove('opacity-0');
    mobileMenuBackdrop.classList.add('opacity-100');
    mobileMenuContent.classList.remove('translate-x-full');
    mobileMenuContent.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  const closeMobileMenu = () => {
    mobileMenuBackdrop.classList.add('opacity-0');
    mobileMenuBackdrop.classList.remove('opacity-100');
    mobileMenuContent.classList.add('translate-x-full');
    mobileMenuContent.classList.remove('translate-x-0');
    document.body.style.overflow = ''; // Restore scroll

    // Add pointer-events-none and invisible after transition
    setTimeout(() => {
      mobileMenu.classList.add('pointer-events-none', 'invisible');
    }, 300);
  };

  // Testimonial expand/collapse
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.testimonial-toggle');
    if (!btn) return;
    const content = btn.parentElement.querySelector('.testimonial-content');
    if (!content) return;
    const expanded = btn.getAttribute('data-expanded') === 'true';
    if (expanded) {
      content.classList.remove('expanded');
      btn.textContent = 'See more';
      btn.setAttribute('data-expanded', 'false');
    } else {
      content.classList.add('expanded');
      btn.textContent = 'See less';
      btn.setAttribute('data-expanded', 'true');
    }
  });

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
});
