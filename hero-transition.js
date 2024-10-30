// Funzione per rilevare se è un dispositivo mobile
const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

// Trigger per animazioni con ScrollTrigger
const createScrollTrigger = (triggerElement, timeline, startOffset) => {
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
  createScrollTrigger($(this), tl, "99%");
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
  createScrollTrigger($(this), tl, "90%");
});

// Split del testo in linee e avvolgimento
// function splitText(e) {
//   if ($(e).hasClass("splitted")) return $(e).find(".single-line");
//   const t = new SplitType(e, {
//     types: "lines",
//     tagName: "span",
//     linesClass: "single-line",
//   });
//   $(t.lines).wrap('<div class="line-wrapper" style="overflow: hidden;"></div>');
//   $(e).addClass("splitted");
//   return t.lines;
// }

// // Split del testo nell'hero
// let typeSplit = new SplitType("#hero .u-text-h1[text-split]", {
//   types: "lines, words, chars",
//   tagName: "span",
// });
// const lines = splitText("#hero .u-text-h1 [text-split]");

// Timeline di intro per Hero Section
let introTl = gsap.timeline({ paused: true });
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
    "#hero .g_content_wrap",
    {
      opacity: 0,
      y: "1rem",
      duration: 1,
      ease: "cubic-bezier(0.33, 0, 0.13, 1)",
    },
    "<0.5"
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
      stagger: { amount: 0.45 },
    },
    "<0.3"
  )
    //alert message animation ferie
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

// Codice che gira al caricamento
gsap.to(".transition_wrap", {
  opacity: 0,
  duration: 0.5,
  ease: "power2.inOut",
  onComplete: () => {
    gsap.set(".transition_wrap", { display: "none" });
    introTl.restart();
    ScrollTrigger.refresh(); // Aggiorna ScrollTrigger
  },
});

// Animazione dell'immagine nella sezione hero
gsap.fromTo(
  "#hero .g_visual_img",
  { scale: 1.05 },
  { scale: 1, duration: 3.5, ease: "cubic-bezier(.33,0,.67,1)" }
);

// Gestione del click sui link
$(document).ready(function () {
  $("a").on("click", function (e) {
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank"
    ) {
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".transition_wrap", { display: "block" });
      gsap.fromTo(
        ".transition_wrap",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power1.inOut",
          onComplete: () => {
            window.location = destination;
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
