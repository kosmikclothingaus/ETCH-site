/* 
  ETCH Theme - Product Image Slideshow
  Handles product image carousel functionality
*/

class ProductSlideshow {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.slideIndex = 1;
    this.slides = this.container.querySelectorAll('.product-image');
    this.dots = document.querySelectorAll('.slideshow-dots .dot');
    
    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.showSlides(this.slideIndex);
    
    // Attach event listeners to prev/next buttons
    const prevBtn = this.container.querySelector('.prev');
    const nextBtn = this.container.querySelector('.next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.plusSlides(-1));
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.plusSlides(1));
    }
    
    // Attach event listeners to dots using data attributes
    this.dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideNum = parseInt(dot.dataset.slide, 10);
        this.currentSlide(slideNum);
      });
    });
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    
    // Hide all slides
    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });
    
    // Remove active class from all dots
    this.dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (this.slides[this.slideIndex - 1]) {
      this.slides[this.slideIndex - 1].style.display = 'block';
    }
    if (this.dots[this.slideIndex - 1]) {
      this.dots[this.slideIndex - 1].classList.add('active');
    }
  }
}

// Initialize slideshow when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProductSlideshow('.product-images-slideshow');
  });
} else {
  new ProductSlideshow('.product-images-slideshow');
}