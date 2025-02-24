"use strict";

// Funzione per attivare/disattivare classi
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Variabili per la sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Funzionalità di toggle per la sidebar su mobile
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Variabili per le testimonianze
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Variabili per il modal
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Funzione per attivare/disattivare il modal
const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Event listener per ogni testimonianza
testimonialsItem.forEach((item) => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
});

// Event listener per chiusura modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Variabili per il filtro personalizzato
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle del menu select
select.addEventListener("click", () => elementToggleFunc(select));

// Event listener per gli elementi della select
selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Variabili per il filtro
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    item.classList.toggle(
      "active",
      selectedValue === "all" || selectedValue === item.dataset.category
    );
  });
};

// Gestione bottoni di filtro per schermi grandi
let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Variabili per il form di contatto
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Validazione del form
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Variabili per la navigazione della pagina
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Event listener per la navigazione
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    pages.forEach((page, index) => {
      const isActive =
        this.textContent.trim().toLowerCase() === page.dataset.page;
      page.classList.toggle("active", isActive);
      navigationLinks[index].classList.toggle("active", isActive);
    });

    window.scrollTo(0, 0);
  });
});

// Gestione popup del form
document.addEventListener("DOMContentLoaded", () => {
  const popupModal = document.getElementById("popupModal");
  const closePopup = document.getElementById("closePopup");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    popupModal.style.display = "block";
  });

  closePopup.addEventListener("click", () => {
    popupModal.style.display = "none";
    if (form.checkValidity()) {
      form.submit();
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target === popupModal) {
      popupModal.style.display = "none";
      if (form.checkValidity()) {
        form.submit();
      }
    }
  });
});
