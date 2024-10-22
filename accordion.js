gsap.utils.toArray(".accordion_trigger_item").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling; // Rinomina 'sibling' in 'content'
      const items = content.querySelectorAll(".accordion_description_wrap"); // Seleziona tutti i child con classe 'item'
      const arrow = trigger.querySelector(".accordion_trigger_svg");
  
      // Cancella le animazioni in corso
      gsap.killTweensOf(content);
      gsap.killTweensOf(items);
      gsap.killTweensOf(arrow);
  
      // Imposta l'origine di trasformazione per l'arrow
      gsap.set(arrow, { transformOrigin: "center" });
  
      if (trigger.classList.contains("open")) {
        gsap.to(items, {
          autoAlpha: 0,
          duration: 0.5,
        });
  
        gsap.to(arrow, { rotateZ: 0, duration: 0.7 });
  
        gsap.to(content, { height: 0, duration: 0.5 });
      } else {
        content.style.height = "auto";
        const autoHeight = content.offsetHeight;
        content.style.height = 0;
  
        gsap.to(arrow, { rotateZ: 180, duration: 0.7 });
        gsap.set(items, { autoAlpha: 0 });
  
        gsap.to(content, {
          height: autoHeight,
          duration: 0.5,
          onComplete: () => {
            content.style.height = "auto";
          },
        });
  
        // Anima 'items' con un effetto stagger
        gsap.to(
          items,
          {
            autoAlpha: 1,
            duration: 1.5,
            stagger: { each: 0.1 },
          },
          "<"
        );
      }
  
      // Toggle della classe 'open'
      trigger.classList.toggle("open");
    });
  });
  