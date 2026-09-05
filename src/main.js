import './style.css';
import 'preline/preline';

// Ensure Preline components auto-init on initial DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (window.HSStaticMethods) {
    window.HSStaticMethods.autoInit();
  }

  // ============================================================
  // SCROLL-AWARE HEADER
  // ============================================================
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
  }


  // ============================================================
  // SCROLL REVEAL — INTERSECTION OBSERVER
  // ============================================================
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.revealDelay || '0', 10);
            setTimeout(() => {
              el.classList.add('is-visible');
            }, delay);
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }


  // ============================================================
  // STAT COUNTER ANIMATION
  // ============================================================
  const statTargets = [
    { selector: '#stat-credentials', end: 15, suffix: 'M+', decimals: 0 },
    { selector: '#stat-partners',    end: 450, suffix: '+', decimals: 0 },
    { selector: '#stat-accuracy',    end: 99.9, suffix: '%', decimals: 1 },
  ];

  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  const animateCounter = (el, end, suffix, decimals) => {
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * end;

      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end.toFixed(decimals) + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statTargets.forEach(({ selector, end, suffix, decimals }) => {
            const el = document.querySelector(selector);
            if (el) animateCounter(el, end, suffix, decimals);
          });
          statsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }


  // ============================================================
  // TESTIMONIAL SLIDER
  // ============================================================
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (track && prevBtn && nextBtn && dots.length) {
    let currentIndex = 0;
    const totalSlides = dots.length;
    let autoSlideTimer = null;

    const updateCarousel = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.className = 'testimonial-dot cursor-pointer transition-all duration-300 w-10 h-3 bg-[#ff5533] rounded-full';
        } else {
          dot.className = 'testimonial-dot cursor-pointer transition-all duration-300 w-3 h-3 bg-[#334155] rounded-full hover:bg-slate-500';
        }
      });
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5000);
    };

    const stopAutoSlide = () => {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    };

    prevBtn.addEventListener('click', () => { updateCarousel(currentIndex - 1); startAutoSlide(); });
    nextBtn.addEventListener('click', () => { updateCarousel(currentIndex + 1); startAutoSlide(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => { updateCarousel(idx); startAutoSlide(); });
    });

    const carouselContainer = document.getElementById('testimonial-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }


  // ============================================================
  // FAQ SMOOTH ACCORDION (grid-template-rows technique)
  // ============================================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.faq-card');
      const bodyWrap = card.querySelector('.faq-body-wrap');
      const isOpen = card.classList.contains('active');

      // Close all other cards
      document.querySelectorAll('.faq-card').forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove('active', 'bg-white', 'border-[#ff5533]/40', 'shadow-md', 'shadow-slate-200/50');
          otherCard.classList.add('bg-[#EEEEF7]', 'border-transparent', 'shadow-xs');
          const otherWrap = otherCard.querySelector('.faq-body-wrap');
          if (otherWrap) otherWrap.classList.remove('open');
        }
      });

      // Toggle clicked card
      if (isOpen) {
        card.classList.remove('active', 'bg-white', 'border-[#ff5533]/40', 'shadow-md', 'shadow-slate-200/50');
        card.classList.add('bg-[#EEEEF7]', 'border-transparent', 'shadow-xs');
        if (bodyWrap) bodyWrap.classList.remove('open');
      } else {
        card.classList.add('active', 'bg-white', 'border-[#ff5533]/40', 'shadow-md', 'shadow-slate-200/50');
        card.classList.remove('bg-[#EEEEF7]', 'border-transparent', 'shadow-xs');
        if (bodyWrap) bodyWrap.classList.add('open');
      }
    });
  });

});


