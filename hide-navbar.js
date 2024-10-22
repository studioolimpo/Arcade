let navEl = $(".nav_wrap");
let navButtonEl = $(".nav_btn_wrap");
let menuBackgroundEl = $(".nav_mobile_bg");

const scrollThreshold = 20;

// Check start page
if ($(window).scrollTop() > 0) {
  navEl.addClass("is-hidden");
}

// Hide / show nav on scroll down / up
let bodyScrollDirection;
let lastScrollTop = 0;
ScrollTrigger.create({
  trigger: "body",
  //markers: "true",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    // Controlla se la posizione attuale supera il valore di soglia
    let currentScrollTop = self.scroll(); // Ottieni la posizione attuale di scroll

    if (Math.abs(currentScrollTop - lastScrollTop) > scrollThreshold) {
      bodyScrollDirection = currentScrollTop > lastScrollTop ? 1 : -1; // 1 per scroll giù, -1 per scroll su
      lastScrollTop = currentScrollTop; // Aggiorna l'ultima posizione di scroll

      if (bodyScrollDirection === 1) {
        navEl.addClass("is-hidden");
      } else {
        navEl.removeClass("is-hidden");
      }
    }
  },
});

// Track if nav is opened or closed
navButtonEl.on("click", function () {
  navEl.toggleClass("is-open");
});

// Cause a click on menu bg to trigger a click on nav button
menuBackgroundEl.on("click", function () {
  navButtonEl[0].click();
});
