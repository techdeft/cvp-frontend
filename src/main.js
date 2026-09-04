import './style.css';
import 'preline/preline';

// Ensure Preline components auto-init on initial DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (window.HSStaticMethods) {
    window.HSStaticMethods.autoInit();
  }

  // Testimonial Slider Interactivity
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

    prevBtn.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
      startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
      startAutoSlide();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateCarousel(idx);
        startAutoSlide();
      });
    });

    const carouselContainer = document.getElementById('testimonial-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();
  }
});
