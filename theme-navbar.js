// Acquisisci il valore del tema iniziale di .nav_wrap
let initialTheme = $(".nav_wrap").attr("data-theme") || "light"; // Default to "light" if not set

// Determina il tema corrente basato sul valore di data-theme
let currentTheme = initialTheme === "dark" ? "dark-theme" : "light-theme";

// Imposta le classi iniziali di .nav_wrap in base al tema corrente
$(".nav_wrap").addClass(currentTheme);

$("section[data-theme]").each(function () {
  let theme = 1; // Imposta il tema di default (light)
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
        if (theme === 1 && currentTheme !== "light-theme") {
          $(".nav_wrap").removeClass("dark-theme").addClass("light-theme");
          currentTheme = "light-theme";
        } else if (theme === 2 && currentTheme !== "dark-theme") {
          $(".nav_wrap").removeClass("light-theme").addClass("dark-theme");
          currentTheme = "dark-theme";
        }
      }
    },
  });
});
