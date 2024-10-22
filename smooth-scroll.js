// Inizializzazione di Lenis per lo smooth scroll
const lenis = new Lenis({
    duration: 1.2, // Durata originale
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing dolce originale
    smooth: true,
    smoothTouch: true,
  });
  
  // Funzione di richiesta di animazione
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  // Avvia la richiesta di animazione
  requestAnimationFrame(raf);
  
  // Gestione dei pulsanti per avviare o fermare lo scroll
  $("[data-lenis-start]").on("click", function () {
    console.log("Start scrolling");
    lenis.start();
  });
  
  $("[data-lenis-stop]").on("click", function () {
    console.log("Stop scrolling");
    lenis.stop();
  });
  
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      console.log("Scrolling stopped");
      lenis.stop();
    } else {
      console.log("Scrolling resumed");
      lenis.start();
    }
  });
  
  // Scorri al top su caricamento della pagina per tutti i dispositivi
  window.addEventListener("load", function () {
    // Disabilita la persistenza della posizione di scroll
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  
    // Controlla se siamo su un dispositivo mobile
    if (window.innerWidth > 768) {
      lenis.scrollTo(0, { duration: 0 }); // Forza lo scroll all'inizio senza animazione su desktop
    } else {
      window.scrollTo(0, 0); // Scrolla immediatamente senza animazione su mobile
    }
  });
  
  // Gestione del back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload(); // Ricarica la pagina se l'evento è persistito
    }
  };
  
  // Transizione del tema
  document.querySelectorAll("[data-theme]").forEach((el) => {
    el.addEventListener("click", function () {
      let theme = el.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", theme);
    });
  });
  
  // Variabile per tracciare la posizione dello scroll
  let lastScroll = 0;
  
  // Aggiungi la logica per prevenire lo scroll oltre il top
  lenis.on("scroll", ({ scroll }) => {
    const navWrap = document.querySelector(".nav_wrap"); // Seleziona l'elemento .nav_wrap
  
    // Controlla se si sta scrollando oltre il top
    if (scroll < 0) {
      console.log("Sei oltre il top, cambio in absolute");
      navWrap.style.position = "absolute"; // Cambia la posizione della navbar
    } else {
      navWrap.style.position = "fixed"; // Imposta la navbar come fixed quando non sei oltre il top
  
      // Se stai scrollando verso il basso, assicurati che la navbar rimanga fixed
      if (scroll > lastScroll) {
        navWrap.style.position = "fixed"; // Assicurati che sia fixed quando scrolli verso il basso
      }
    }
  
    lastScroll = scroll; // Aggiorna la posizione dello scroll
  });
  
  // Inizializzazione di ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0); // Lag smoothing disabilitato
  