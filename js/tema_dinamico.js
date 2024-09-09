// script.js
const button = document.getElementById('toggleButton');
const slider = document.querySelector('.slider');
const themeStylesheet = document.getElementById('theme-stylesheet');
const body = document.body;

// Ajustes para la posición del slider
const sliderPositionLight = 'translateX(0)'; // Posición para modo claro
const sliderPositionDark = 'translateX(75px)'; // Posición ajustada para modo oscuro

// Cargar el tema guardado si existe
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeStylesheet.setAttribute('href', 'css/style_dark.css');
    slider.style.transform = sliderPositionDark;
} else {
    body.classList.add('light-mode');
    themeStylesheet.setAttribute('href', 'css/style_light.css');
    slider.style.transform = sliderPositionLight;
}

// Cambiar el tema al hacer clic
button.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeStylesheet.setAttribute('href', 'css/style_light.css');
        slider.style.transform = sliderPositionLight;
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeStylesheet.setAttribute('href', 'css/style_dark.css');
        slider.style.transform = sliderPositionDark;
        localStorage.setItem('theme', 'dark');
    }
});
