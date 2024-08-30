document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const items = document.querySelectorAll('.item');

    function filterItems() {
        const searchQuery = searchInput.value.toLowerCase();

        items.forEach(item => {
            const title = item.querySelector('.item-title strong').textContent.toLowerCase();

            if (title.includes(searchQuery)) {
                item.style.display = '';  // Mostrar elemento si coincide con la búsqueda
            } else {
                item.style.display = 'none';  // Ocultar elemento si no coincide
            }
        });
    }

    searchInput.addEventListener('input', filterItems);
});
