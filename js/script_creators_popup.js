// Elementos del DOM
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const creatorOverlay = document.getElementById('creatorOverlay');
const popup = document.getElementById('popup-creator');

const popupOpciones = document.getElementById('popupOpciones');
const closePopupOpciones = document.getElementById('closePopupOpciones');

// Mostrar el popup de creadores y cerrar el de opciones si está abierto
openPopupBtn.addEventListener('click', function () {
    // Cerrar el popup de opciones si está abierto
    if (popupOpciones.style.display === 'flex') {
        popupOpciones.style.display = 'none';
    }
    creatorOverlay.style.display = 'flex';
});

// Cerrar el popup de creadores
closePopupBtn.addEventListener('click', function () {
    creatorOverlay.style.display = 'none';
});

// Cerrar el popup al hacer clic en la superposición (overlay)
creatorOverlay.addEventListener('click', function (e) {
    if (e.target === creatorOverlay) {
        creatorOverlay.style.display = 'none';
    }
});

// Cerrar el popup de opciones
closePopupOpciones.addEventListener('click', function () {
    popupOpciones.style.display = 'none';
});