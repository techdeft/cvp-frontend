/**
 * Reusable Navigation Header & Footer Component System
 */

export function renderHeader(containerId = 'site-header') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentPath = window.location.pathname.toLowerCase();
  const isHomePage = currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/');

  const homeClass = isHomePage 
    ? 'font-bold text-[#ff5533] focus:outline-none transition text-xl sm:text-sm' 
    : 'font-semibold text-gray-900 hover:text-[#ff5533] focus:outline-none transition text-xl sm:text-sm';

  const homeAria = isHomePage ? 'aria-current="page"' : '';

  container.innerHTML = `
    <header class="sticky top-0 z-50 w-full max-w-full bg-white/95 backdrop-blur-md text-sm transition-all overflow-x-hidden border-b border-slate-200/80">
      <nav class="max-w-[85rem] w-full max-w-full mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20" aria-label="Global">
        <div class="flex items-center justify-between w-full max-w-full sm:w-auto px-2 sm:px-0">
          <!-- Logo -->
          <a class="flex-none flex items-center gap-2" href="/" aria-label="TechBroker">
            <img src="/images/logo.png" alt="TechBroker Logo" class="h-9 w-auto max-h-10 object-contain" />
          </a>
          
          <!-- Mobile Toggle Button -->
          <div class="sm:hidden">
            <button type="button" id="mobile-menu-toggle" class="p-2 inline-flex justify-center items-center gap-2 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff5533] transition-all text-xs rounded-lg border border-gray-200" aria-label="Toggle navigation">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Navigation Links Container -->
        <div id="navbar-collapse" class="hidden transition-all duration-300 fixed inset-x-0 top-[65px] bottom-0 bg-[#fafbfc] z-50 p-6 overflow-y-auto sm:static sm:block sm:inset-auto sm:bg-transparent sm:p-0 sm:overflow-visible basis-full grow">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-end sm:ps-5 h-full sm:h-auto">
            <a class="${homeClass}" ${homeAria} href="/">Home</a>
            <a class="font-semibold text-gray-900 hover:text-[#ff5533] focus:outline-none transition text-xl sm:text-sm" href="/#how-it-works">How It Works</a>
            <a class="font-semibold text-gray-900 hover:text-[#ff5533] focus:outline-none transition text-xl sm:text-sm" href="/#services">Services</a>
            <a class="font-semibold text-gray-900 hover:text-[#ff5533] focus:outline-none transition text-xl sm:text-sm" href="/#faq">FAQ</a>
            
            <!-- Auth Action Buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 sm:pt-0 border-t border-gray-200 sm:border-t-0 mt-auto sm:mt-0">
              <a class="py-3 sm:py-2.5 px-5 inline-flex justify-center items-center gap-x-2 text-base sm:text-sm font-semibold rounded-full border border-gray-300 bg-white text-gray-900 shadow-xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff5533] transition" href="https://auth.centralverification.com/login" target="_blank" rel="noopener noreferrer">
                Sign in
              </a>
              <a class="py-3 sm:py-2.5 px-5 inline-flex justify-center items-center gap-x-2 text-base sm:text-sm font-semibold rounded-full border border-transparent bg-[#ff5533] text-white hover:bg-[#e04422] focus:outline-none focus:ring-2 focus:ring-[#ff5533] shadow-md shadow-[#ff5533]/25 transition" href="https://auth.centralverification.com/register" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </div>

          </div>
        </div>
      </nav>
    </header>
  `;

  // Attach mobile toggle listener
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navbarCollapse = document.getElementById('navbar-collapse');
  if (toggleBtn && navbarCollapse) {
    toggleBtn.addEventListener('click', () => {
      navbarCollapse.classList.toggle('hidden');
    });

    // Close menu when clicking nav links on mobile
    navbarCollapse.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 640) {
          navbarCollapse.classList.add('hidden');
        }
      });
    });
  }
}

export function renderFooter(containerId = 'site-footer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <footer class="bg-[#fafbfc] text-slate-800 border-t border-slate-200 mt-auto">
      <div class="max-w-[85rem] mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          
          <!-- Brand & Description -->
          <div class="md:col-span-6 lg:col-span-5 space-y-4">
            <a class="flex items-center gap-2" href="/" aria-label="TechBroker">
              <img src="/images/logo.png" alt="TechBroker Logo" class="h-9 w-auto max-h-10 object-contain" />
            </a>
            <p class="text-slate-600 text-sm leading-relaxed max-w-sm">
              Central Verification Portal (CVP) — Standardized, automated credential verification platform for institutions, employers, and individuals.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="md:col-span-3 lg:col-span-3 space-y-3">
            <h4 class="font-urbanist font-bold text-base text-[#0F172B]">Quick Links</h4>
            <ul class="space-y-2 text-sm font-medium">
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="/">Home</a></li>
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="/#how-it-works">How It Works</a></li>
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="/#services">Services</a></li>
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="/#faq">FAQ</a></li>
            </ul>
          </div>

          <!-- Legal & Privacy -->
          <div class="md:col-span-3 lg:col-span-4 space-y-3">
            <h4 class="font-urbanist font-bold text-base text-[#0F172B]">Legal & Privacy</h4>
            <ul class="space-y-2 text-sm font-medium">
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="/privacy">Privacy Policy</a></li>
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="#">Terms of Service</a></li>
              <li><a class="text-slate-600 hover:text-[#ff5533] transition-colors" href="#">Data Protection Policy</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 font-medium">
          <p>&copy; 2026 TechBroker Central Verification Portal. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a class="hover:text-[#ff5533] transition-colors" href="/privacy">Privacy Policy</a>
            <a class="hover:text-[#ff5533] transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
