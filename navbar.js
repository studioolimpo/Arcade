// Seleziona gli elementi dalla DOM
var hamburger = document.querySelector(".nav_btn_wrap");
var nav = document.querySelector(".nav_mobile_wrap");
var links = document.querySelectorAll(".nav_mobile_link_wrap");
var background = document.querySelector(".nav_mobile_bg");
var navContain = document.querySelector(".nav_contain");
var navDivider = document.querySelector(".nav_divider_wrap");
var hamburgerLine = document.querySelectorAll(".nav_hamburger_line");
var navWrap = document.querySelector(".nav_wrap");
var logoWrap = document.querySelector(".nav_logo_wrap");

// Crea una timeline GSAP per l'animazione del menu
var tl = gsap.timeline({
  paused: true,
  reversed: true,
  onReverseComplete: function () {
    gsap.set(nav, { display: "none" });
    // Imposta il mixBlendMode su normal di default quando l'animazione è invertita
    gsap.set(navContain, { css: { mixBlendMode: "normal" } });
    gsap.set(navDivider, { css: { mixBlendMode: "normal" } });
    document.body.style.overflow = ""; // Riattiva lo scroll del body
    lenis.start(); // Riattiva lo scroll di Lenis
  },
});

// Definisci l'animazione iniziale per la timeline
tl.set(nav, { display: "block" })
  .from(background, { yPercent: -100, duration: 0.5, ease: "power1.inOut" }, 0)
  .to(hamburgerLine[0], { y: 3.5, rotate: 45, duration: 0.4 }, "<")
  .to(hamburgerLine[1], { y: -3.5, rotate: -45, duration: 0.4 }, "<")
  .from(
    links,
    {
      autoAlpha: 0,
      yPercent: 15,
      duration: 0.8,
      stagger: {
        amount: 0.7,
      },
    },
    "-=0.3"
  );

// Funzione per gestire l'animazione del menu e il mix-blend-mode
function toggleAnim() {
  // Toggle class "is-active" su .hamburger e .nav
  hamburger.classList.toggle("is-active");
  nav.classList.toggle("is-active");

  // Controlla se navWrap ha la classe dark-theme o light-theme ad ogni click
  if (navWrap.classList.contains("dark-theme")) {
    gsap.set(navContain, { css: { mixBlendMode: "difference" } });
    gsap.set(navDivider, { css: { mixBlendMode: "difference" } });
  } else {
    gsap.set(navContain, { css: { mixBlendMode: "normal" } });
    gsap.set(navDivider, { css: { mixBlendMode: "normal" } });
  }

  // Riproduci o inverti l'animazione
  if (tl.reversed()) {
    tl.play();
    document.body.style.overflow = "hidden"; // Disabilita lo scroll del body
    lenis.stop(); // Disabilita lo scroll di Lenis
  } else {
    tl.reverse();
  }
}

// Aggiungi l'evento click su .nav_btn_wrap per gestire l'animazione
hamburger.addEventListener("click", toggleAnim);

// Aggiungi l'evento click su ciascun link del menu mobile
links.forEach(function (link) {
  link.addEventListener("click", toggleAnim);
});
