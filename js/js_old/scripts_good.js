document.addEventListener('DOMContentLoaded', function () {
    // Variable global para controlar si un popup está abierto
    let popupOpen = false;

    // Función para filtrar los items según la dificultad
    function filterItems(difficulty) {
        // Ocultar todos los contenedores
        document.querySelectorAll('#container-muy-facil, #container-facil, #container-medio, #container-dificil').forEach(container => {
            container.style.display = 'none';
        });

        // Mostrar el contenedor correspondiente
        if (difficulty === 'todos') {
            document.querySelectorAll('.col-md-12').forEach(container => {
                container.style.display = 'block';
            });
        } else {
            const container = document.getElementById(`container-${difficulty}`);
            if (container) {
                container.style.display = 'block';
            }
        }

        // Mover los items al contenedor adecuado
        document.querySelectorAll('.item').forEach(item => {
            if (difficulty === 'todos' || item.classList.contains(difficulty)) {
                item.style.display = 'flex';
                const container = document.getElementById(`container-${item.classList[1]}`);
                if (container) {
                    container.appendChild(item);
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Asignar manejadores de eventos a los botones
    document.getElementById('botonmuyfacil').addEventListener('click', () => filterItems('muy-facil'));
    document.getElementById('botonfacil').addEventListener('click', () => filterItems('facil'));
    document.getElementById('botonmedio').addEventListener('click', () => filterItems('medio'));
    document.getElementById('botondificil').addEventListener('click', () => filterItems('dificil'));
    document.getElementById('botontodos').addEventListener('click', () => filterItems('todos'));

    // Mostrar todos los elementos por defecto
    filterItems('todos');

    // Función para cerrar todos los popups y modales
    function closeAllPopups() {
        // Cierra el popup principal
        document.getElementById('popup').style.display = 'none';
        // Cierra el popup de opciones
        document.getElementById('popupOpciones').style.display = 'none';

        // Cierra los modales de Bootstrap
        const modals = ['modalDownload', 'modalUpload', 'modalInfo'];
        modals.forEach(modalId => {
            const modalElement = document.getElementById(modalId);
            if (modalElement) {
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        });

        popupOpen = false;
    }

    // Función para mostrar el popup principal
    function showPopup(title, author, difficulty, date) {
        if (popupOpen) return; // Si un popup ya está abierto, no abrir otro

        closeAllPopups(); // Cierra cualquier popup abierto

        popupOpen = true; // Marcar que un popup está abierto

        document.getElementById('popupTitle').textContent = title;
        document.getElementById('popupAuthor').textContent = `Autor: ${author}`;
        document.getElementById('popupDate').textContent = `Fecha de creación: ${date}`;

        const difficultyElement = document.getElementById('difficultyLevel');
        difficultyElement.textContent = difficulty;

        difficultyElement.className = ''; // Elimina cualquier clase previa
        switch (difficulty.toLowerCase()) {
            case 'muy fácil':
                difficultyElement.classList.add('muy-facil');
                break;
            case 'fácil':
                difficultyElement.classList.add('facil');
                break;
            case 'medio':
                difficultyElement.classList.add('medio');
                break;
            case 'difícil':
                difficultyElement.classList.add('dificil');
                break;
        }

        document.getElementById('popup').style.display = 'flex';
    }

    // Función para ocultar el popup principal
    document.getElementById('closePopup').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';
        popupOpen = false; // Marcar que no hay ningún popup abierto
    });

    // Función para mostrar el popup de opciones
    function showPopupOpciones() {
        if (popupOpen) return; // Si un popup ya está abierto, no abrir otro

        closeAllPopups(); // Cierra cualquier popup abierto

        popupOpen = true; // Marcar que un popup está abierto

        document.getElementById('popupOpciones').style.display = 'flex';
    }

    // Función para ocultar el popup de opciones
    document.getElementById('closePopupOpciones').addEventListener('click', function () {
        document.getElementById('popupOpciones').style.display = 'none';
        popupOpen = false; // Marcar que no hay ningún popup abierto
    });

    // Manejador para mostrar el popup de opciones al hacer clic en el botón correspondiente
    document.querySelector('button[onclick="menu()"]').addEventListener('click', showPopupOpciones);

    // Asignar eventos de clic a los items para mostrar el popup principal
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function () {
            const title = this.querySelector('.item-title').textContent;
            const author = this.dataset.author || 'Desconocido';
            const difficulty = this.querySelector('.badge').textContent;
            const date = this.dataset.date || 'No disponible';

            showPopup(title, author, difficulty, date);
        });
    });

    // Función para mostrar el modal de Descargar
    function showDownloadModal(title) {
        if (popupOpen) return; // Si un popup ya está abierto, no abrir otro

        closeAllPopups(); // Cierra cualquier popup abierto

        popupOpen = true; // Marcar que un popup está abierto

        document.getElementById('downloadTitle').textContent = title;
        const modalDownload = new bootstrap.Modal(document.getElementById('modalDownload'));
        modalDownload.show();

        // Cierra el popup de información del CTF al cerrar el modal de descarga
        document.getElementById('modalDownload').addEventListener('hidden.bs.modal', closeAllPopups);
    }

    // Función para mostrar el modal de Subir
    function showUploadModal() {
        if (popupOpen) return; // Si un popup ya está abierto, no abrir otro

        closeAllPopups(); // Cierra cualquier popup abierto

        popupOpen = true; // Marcar que un popup está abierto

        const modalUpload = new bootstrap.Modal(document.getElementById('modalUpload'));
        modalUpload.show();

        // Cierra el popup de información del CTF al cerrar el modal de subida
        document.getElementById('modalUpload').addEventListener('hidden.bs.modal', closeAllPopups);
    }

    // Función para mostrar el modal de Información
    function showInfoModal() {
        if (popupOpen) return; // Si un popup ya está abierto, no abrir otro

        closeAllPopups(); // Cierra cualquier popup abierto

        popupOpen = true; // Marcar que un popup está abierto

        // const infoContainer = document.getElementById('infoContainer');
        // infoContainer.innerHTML = '';

        // const writeups = [
        //     { name: 'Autor 1', img: 'ruta/a/tu/imagen1.png', link: 'https://example.com/author1' },
        //     { name: 'Autor 2', img: 'ruta/a/tu/imagen2.jpg', link: 'https://example.com/author2' }
        // ];

        // writeups.forEach(writeup => {
        //     const item = document.createElement('div');
        //     item.className = 'info-author d-flex align-items-center mb-3';
        //     item.innerHTML = `
        //         <a href="${writeup.link}" target="_blank" class="d-flex align-items-center">
        //             <img src="${writeup.img}" alt="${writeup.name}" class="me-2" style="width: 50px; height: 50px; object-fit: cover;">
        //             ${writeup.name}
        //         </a>
        //     `;
        //     infoContainer.appendChild(item);
        // });

        const modalInfo = new bootstrap.Modal(document.getElementById('modalInfo'));
        modalInfo.show();

        // Cierra el popup de información del CTF al cerrar el modal de información
        document.getElementById('modalInfo').addEventListener('hidden.bs.modal', closeAllPopups);
    }

    // Asignar eventos de clic a los botones de acción
    document.querySelector('.actions button:nth-child(1)').addEventListener('click', function () {
        showDownloadModal('Título de la Máquina'); // Cambia esto por el título adecuado
    });

    document.querySelector('.actions button:nth-child(2)').addEventListener('click', function () {
        showUploadModal();
    });

    document.querySelector('.actions button:nth-child(3)').addEventListener('click', function () {
        showInfoModal();
    });
});
