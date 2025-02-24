"use strict";

// Funzione per alternare la classe "active" sugli elementi
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Variabili per la gestione della barra laterale (sidebar)
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Gestione della barra laterale su dispositivi mobili (toggle)
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Variabili per la gestione dei testimoni (testimonial)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Variabili per il contenuto del modal
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Funzione per alternare la visualizzazione del modal
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Aggiungiamo un evento di click su ogni elemento di testimonianza (testimonial)
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    // Imposta l'immagine, il titolo e il testo del modal
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    // Mostra il modal
    testimonialsModalFunc();
  });
}

// Aggiungiamo l'evento per chiudere il modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Variabili per la gestione della selezione del filtro (Custom Select)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Gestione del click sul custom select (per mostrare/nascondere il menu)
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Aggiungiamo un evento su ogni elemento della lista del filtro
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue); // Applica il filtro selezionato
  });
}

// Variabili per gli elementi da filtrare
const filterItems = document.querySelectorAll("[data-filter-item]");

// Funzione di filtro per visualizzare/nascondere gli elementi in base alla selezione
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }

  // Gestione della visualizzazione dell'iframe del curriculum in base al filtro selezionato
  const curriculumItems = document.querySelectorAll(
    "[data-category='curriculum']"
  );
  const allItems = document.querySelectorAll("[data-category='all']");

  // Mostra l'iframe del curriculum solo quando viene selezionato "Curriculum"
  if (selectedValue === "curriculum") {
    curriculumItems.forEach((item) => (item.style.display = "block"));
    allItems.forEach((item) => (item.style.display = "none"));
  } else if (selectedValue === "all") {
    curriculumItems.forEach((item) => (item.style.display = "none"));
    allItems.forEach((item) => (item.style.display = "block"));
  } else {
    // Se un altro filtro viene selezionato, nasconde l'iframe del curriculum
    curriculumItems.forEach((item) => (item.style.display = "none"));
  }
};

// Aggiungi l'evento per ogni pulsante di filtro su dispositivi di grandi dimensioni
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Variabili per il modulo di contatto
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Aggiungiamo un evento per ogni campo di input del modulo
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Verifica se il modulo è valido
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Variabili per la navigazione delle pagine
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Aggiungiamo l'evento di click su ogni link di navigazione
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form[data-form]");
  const popupModal = document.getElementById("popupModal");
  const closePopup = document.getElementById("closePopup");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenire l'invio del modulo
    popupModal.style.display = "block"; // Mostra il popup
  });

  closePopup.addEventListener("click", function () {
    popupModal.style.display = "none"; // Chiudi il popup
    form.submit(); // Invia il modulo dopo la chiusura del popup
  });

  window.addEventListener("click", function (event) {
    if (event.target == popupModal) {
      popupModal.style.display = "none"; // Chiudi il popup se si clicca fuori
      form.submit(); // Invia il modulo dopo la chiusura del popup
    }
  });
});
