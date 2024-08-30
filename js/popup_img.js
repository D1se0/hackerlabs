document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');

    document.querySelectorAll('.item .btn[data-bs-target="#modalInfo"]').forEach(button => {
        button.addEventListener('click', (event) => {
            const item = event.currentTarget.closest('.item');
            const imageUrl = item.getAttribute('data-image');

            // Actualiza la URL de la imagen en el popup
            popupImage.src = imageUrl;

            // Muestra el popup
            popup.classList.add('show'); // Asegúrate de que tu CSS muestre el popup
        });
    });

    document.getElementById('closePopup').addEventListener('click', () => {
        popup.classList.remove('show'); // Asegúrate de que tu CSS o JavaScript oculte el popup
    });
});
