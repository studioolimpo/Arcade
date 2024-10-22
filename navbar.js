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

// Acquisisci il valore del tema iniziale di .nav_wrap
let initialTheme = navWrap.getAttribute("data-theme") || "dark"; // Default to "dark" if not set

// Determina il tema corrente basato sul valore di data-theme
let currentTheme = initialTheme === "dark" ? "dark-theme" : "light-theme";

// Imposta le classi iniziali di .nav_wrap in base al tema corrente
navWrap.classList.add(currentTheme);

// Crea una timeline GSAP per l'animazione del menu
var tl = gsap.timeline({
  paused: true,
  reversed: true,
  onReverseComplete: function () {
    gsap.set(nav, { display: "none" });
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
      yPercent: 10,
      duration: 0.8,
      stagger: {
        amount: 0.7,
      },
    },
    "-=0.25"
  );

// Funzione per gestire l'animazione del menu e il mix-blend-mode
function toggleAnim() {
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

// Gestione della visibilità della navbar in base allo scroll
let bodyScrollDirection;
let lastScrollTop = 0;
const scrollThreshold = 20;

// Check start page
if (window.scrollY > 0) {
  navWrap.classList.add("is-hidden");
}

// Hide / show nav on scroll down / up
ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    let currentScrollTop = self.scroll(); // Ottieni la posizione attuale di scroll
    if (Math.abs(currentScrollTop - lastScrollTop) > scrollThreshold) {
      bodyScrollDirection = currentScrollTop > lastScrollTop ? 1 : -1; // 1 per scroll giù, -1 per scroll su
      lastScrollTop = currentScrollTop; // Aggiorna l'ultima posizione di scroll

      if (bodyScrollDirection === 1) {
        navWrap.classList.add("is-hidden");
      } else {
        navWrap.classList.remove("is-hidden");
      }
    }
  },
});

// Determina il tema corrente e gestisce le classi
$("section[data-theme]").each(function () {
  let theme = 1; // Imposta il tema di default (light)
  if ($(this).attr("data-theme") === "dark") theme = 2; // Cambia tema se è "dark"

  ScrollTrigger.create({
    trigger: $(this),
    start: "top top",
    end: "bottom top",
    // markers: "true",
    onToggle: ({ isActive }) => {
      if (isActive) {
        // Esegui la transizione dei colori
        gsap.to(".nav_wrap", { ...colorThemes[theme], duration: 0.3 });

        // Gestisci le classi di tema solo se c'è un cambiamento effettivo
        if (theme === 1 && currentTheme !== "light-theme") {
          $(".nav_wrap").removeClass("dark-theme").addClass("light-theme");
          currentTheme = "light-theme";
          gsap.set(navContain, { css: { mixBlendMode: "normal" } });
          gsap.set(navDivider, { css: { mixBlendMode: "normal" } });
        } else if (theme === 2 && currentTheme !== "dark-theme") {
          $(".nav_wrap").removeClass("light-theme").addClass("dark-theme");
          currentTheme = "dark-theme";
          // Imposta mix-blend-mode su "difference" per il tema dark
          gsap.set(navContain, { css: { mixBlendMode: "difference" } });
          gsap.set(navDivider, { css: { mixBlendMode: "difference" } });
        }
      }
    },
  });
});

// Cause a click on menu bg to trigger a click on nav button
background.addEventListener("click", function () {
  hamburger.click();
});
