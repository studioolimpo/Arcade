// Calcola il valore di 1rem in pixel
function getRemInPixels() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  
  // Inizializza lo Swiper
  var mySwiper = new Swiper(".first-swiper", {
    spaceBetween: getRemInPixels(), // 1rem
    loop: true,
    speed: 1000,
    followFinger: true,
    freeMode: false,
    centeredSlides: true,
    slideToClickedSlide: false,
    //rewind: false,
    //slidesPerGroup: 1,
    mousewheel: {
      forceToAxis: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: getRemInPixels(), // 1rem
      },
      478: {
        slidesPerView: 1.15,
        spaceBetween: getRemInPixels(), // 1rem
      },
      767: {
        slidesPerView: 1.15,
        spaceBetween: getRemInPixels(), // 1rem
      },
      988: {
        slidesPerView: 1.65,
        spaceBetween: getRemInPixels(), // 1rem
      },
      1920: {
        slidesPerView: 1.65,
        spaceBetween: getRemInPixels(), // 1rem
      },
    },
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
  });
  