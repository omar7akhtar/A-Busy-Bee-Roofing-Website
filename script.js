const animatedSections = document.querySelectorAll(
  ".hero, .trust-strip, .section, .section-divider"
);

animatedSections.forEach((section) => {
  section.classList.add("scroll-reveal");
});

let ticking = false;

function updateRevealStates() {
  const enterTop = window.innerHeight;
  const enterBottom = 0;
  const exitTop = window.innerHeight * 1.02;
  const exitBottom = -window.innerHeight * 0.02;

  animatedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const isVisible = section.classList.contains("is-visible");

    if (!isVisible && rect.top < enterTop && rect.bottom > enterBottom) {
      section.classList.add("is-visible");
      return;
    }

    if (isVisible && (rect.bottom < exitBottom || rect.top > exitTop)) {
      section.classList.remove("is-visible");
    }
  });

  ticking = false;
}

function queueRevealUpdate() {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(updateRevealStates);
}

window.addEventListener("scroll", queueRevealUpdate, { passive: true });
window.addEventListener("resize", queueRevealUpdate);
window.addEventListener("load", queueRevealUpdate);

queueRevealUpdate();
