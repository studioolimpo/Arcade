var navContain = document.querySelector(".nav_contain");
var navDivider = document.querySelector(".nav_divider_wrap");
var background = document.querySelector(".nav_mobile_bg");

// Acquisisci il valore del tema iniziale di .nav_wrap
let initialTheme = $(".nav_wrap").attr("data-theme") || "dark"; // Default to "brand" if not set

// Determina il tema corrente basato sul valore di data-theme
let currentTheme = initialTheme === "dark" ? "dark-theme" : "brand-theme";

// Imposta le classi iniziali di .nav_wrap in base al tema corrente
$(".nav_wrap").addClass(currentTheme);

$("section[data-theme]").each(function () {
  let theme = 3; // Imposta il tema di default (brand)
  if ($(this).attr("data-theme") === "dark") theme = 2; // Cambia il tema se è "dark"

  ScrollTrigger.create({
    trigger: $(this),
    start: "top top",
    end: "bottom top",
    // markers: "true",
    onToggle: ({ self, isActive }) => {
      if (isActive) {
        // Esegui la transizione dei colori
        gsap.to(".nav_wrap", { ...colorThemes[theme], duration: 0.3 });

        // Gestisci le classi di tema solo se c'è un cambiamento effettivo
        if (theme === 1 && currentTheme !== "brand-theme") {
          $(".nav_wrap").removeClass("dark-theme").addClass("brand-theme");
          currentTheme = "brand-theme";
          gsap.set(navContain, { css: { mixBlendMode: "normal" } });
          gsap.set(navDivider, { css: { mixBlendMode: "normal" } });
          gsap.set(background, {
            css: { background: "var(--swatch--brand-banco)" },
          });
        } else if (theme === 2 && currentTheme !== "dark-theme") {
          $(".nav_wrap").removeClass("brand-theme").addClass("dark-theme");
          currentTheme = "dark-theme";
          // Imposta mix-blend-mode su "difference" per il tema dark
          gsap.set(navContain, { css: { mixBlendMode: "difference" } });
          gsap.set(navDivider, { css: { mixBlendMode: "difference" } });
          // gsap.set(background, {
          //  css: { background: "var(--swatch--light)" },
          // });
        } else if (theme === 3 && currentTheme !== "brand-theme") {
          // Se il tema è brand e non è già impostato, mantieni normal
          $(".nav_wrap").removeClass("dark-theme").addClass("brand-theme");
          currentTheme = "brand-theme";
          gsap.set(navContain, { css: { mixBlendMode: "normal" } });
          gsap.set(navDivider, { css: { mixBlendMode: "normal" } });
          gsap.set(background, {
            css: { background: "var(--swatch--brand-banco)" },
          });
        }
      }
    },
  });
});
