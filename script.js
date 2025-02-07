document.addEventListener("DOMContentLoaded", function () {
  // Funzione per rendere visibili le sezioni durante lo scroll
  const sections = document.querySelectorAll(".section");

  function revealSections() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealSections);
  revealSections(); // Assicura che le sezioni vengano visibili anche se sono già in vista al caricamento

  // Funzione per la conferma del messaggio inviato
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenire il comportamento predefinito del form
    // Visualizza il messaggio di conferma
    alert("Messaggio inviato con successo!");
    form.reset(); // Reset del modulo dopo l'invio
  });

  // Gestione della barra di navigazione al cambio di scroll
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
