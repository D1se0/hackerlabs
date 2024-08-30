let currentPage = 1;
const totalPages = document.querySelectorAll('.page').length;

function showPage(page) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(pageDiv => pageDiv.style.display = 'none');
    
    // Mostrar la página actual
    document.querySelector(`.page[data-page="${page}"]`).style.display = 'flex';

    // Habilitar/Deshabilitar los botones de navegación
    document.getElementById('prev').disabled = page === 1;
    document.getElementById('next').disabled = page === totalPages;
}

// Manejar clics en los botones de paginación
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
});

// Mostrar la primera página inicialmente
showPage(currentPage);
