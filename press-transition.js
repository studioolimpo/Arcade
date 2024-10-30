// Funzione per rilevare se è un dispositivo mobile
const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

// Trigger per animazioni con ScrollTrigger
const createScrollTrigger = (triggerElement, timeline, startOffset = "98%") => {
  ScrollTrigger.create({
    trigger: triggerElement,
    start: `top ${startOffset}`,
    onEnter: () => timeline.play(),
  });
};

// Animazioni per elementi con attributo [fade-in-up]
$("[fade-in-up]").each(function () {
  const tl = gsap.timeline({ paused: true });
  tl.from($(this), {
    autoAlpha: 0,
    y: "0.5rem",
    duration: 1.2,
    ease: "power1.out",
  });
  createScrollTrigger($(this), tl);
});

// Animazioni per dividers con attributo [divider-in]
$("[divider-in]").each(function () {
  const tl = gsap.timeline({ paused: true });
  tl.from($(this), {
    autoAlpha: 0,
    scaleX: 0.9,
    transformOrigin: "left center",
    duration: 1,
    ease: "cubic-bezier(0.33, 0, 0.13, 1)",
  });
  createScrollTrigger($(this), tl);
});

// Animazione GSAP per l'introduzione
const introTl = gsap.timeline({ paused: true });
introTl
  .from(".logo_svg", {
    yPercent: 100,
    duration: isMobileDevice() ? 0.5 : 0.7,
    ease: "cubic-bezier(0.33, 0, 0.13, 1)",
  })
  .from(
    ".nav_divider_bg",
    {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "left center",
      duration: isMobileDevice() ? 1.2 : 1.6,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
    },
    "<"
  )
  .from(
    "#hero .layout_full_layout",
    {
      y: "1.5rem",
      autoAlpha: 0,
      duration: 1.2,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
    },
    "<0.3"
  )
  .from(
    ".nav_hamburger_layout",
    {
      opacity: 0,
      yPercent: 100,
      duration: 0.7,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
    },
    isMobileDevice() ? "<0.2" : "<"
  )
  .from(
    ".nav_menu_link",
    {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
      stagger: {
        amount: 0.45,
      },
    },
    "<0.4"
  )

  //alert message animation
  .from(
    ".nav_alert_text",
    {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
      stagger: { amount: 0.45 },
    },
    isMobileDevice() ? "-=1.6" : "-=1.2"
  );

  
// Inizio della transizione al caricamento della pagina
gsap.to(".transition_wrap", {
  opacity: 0,
  duration: 0.5,
  ease: "power2.inOut",
  onComplete: () => {
    gsap.set(".transition_wrap", { display: "none" });
    introTl.restart();
  },
});

// Definisci la tua timeline GSAP, inizialmente in pausa
let popupTimeline = gsap.timeline({ paused: true });

// Aggiungi animazioni alla timeline
popupTimeline
  .from(".popup_wrap", {
    autoAlpha: 0,
    //y: "3rem",
    duration: 0.5,
    ease: "cubic-bezier(0.33, 0, 0.13, 1)",
  })

  .from(
    ".popup_contain",
    {
      autoAlpha: 0,
      y: "1rem",
      duration: 1,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
    },
    "<0.5"
  );

// Interazione per aprire il popup
$(".form_main_list").submit(() => {
  // click our div trigger to run our Webflow Interaction
  $(".form_main_trigger").click();
});

$(".form_main_trigger").on("click", function () {
  // Rimuovi la classe che nasconde il popup (se presente) e avvia la timeline GSAP
  $(".popup_wrap").removeClass("popup-hide");
  popupTimeline.play(); // Avvia l'animazione
});

// Gestione del click sui link
$(document).ready(function () {
  $("a").on("click", function (e) {
    const href = $(this).attr("href");
    if (
      $(this).prop("hostname") === window.location.host &&
      !href.includes("#") &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();
      gsap.set(".transition_wrap", { display: "block" });
      gsap.fromTo(
        ".transition_wrap",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            window.location = href;
          },
        }
      );
    }
  });

  // Gestione del back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
});
