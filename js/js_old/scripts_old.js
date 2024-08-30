document.addEventListener('DOMContentLoaded', function () {
    let popupOpen = false;

    function filterItems(difficulty) {
        document.querySelectorAll('#container-muy-facil, #container-facil, #container-medio, #container-dificil').forEach(container => {
            container.style.display = 'none';
        });

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

    document.getElementById('botonmuyfacil').addEventListener('click', () => filterItems('muy-facil'));
    document.getElementById('botonfacil').addEventListener('click', () => filterItems('facil'));
    document.getElementById('botonmedio').addEventListener('click', () => filterItems('medio'));
    document.getElementById('botondificil').addEventListener('click', () => filterItems('dificil'));
    document.getElementById('botontodos').addEventListener('click', () => filterItems('todos'));

    filterItems('todos');

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

    function showPopup(title, author, difficulty, date) {
        closeAllPopups(); // Cierra todos los demás popups antes de abrir uno nuevo

        popupOpen = true;

        document.getElementById('popupTitle').textContent = title;
        document.getElementById('popupAuthor').textContent = `Autor: ${author}`;
        document.getElementById('popupDate').textContent = `Fecha de creación: ${date}`;

        const difficultyElement = document.getElementById('difficultyLevel');
        difficultyElement.textContent = difficulty;

        difficultyElement.className = '';
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

    document.getElementById('closePopup').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';
        popupOpen = false;
    });

    function showPopupOpciones() {
        closeAllPopups(); // Cierra todos los demás popups antes de abrir uno nuevo

        popupOpen = true;

        document.getElementById('popupOpciones').style.display = 'flex';
    }

    document.getElementById('closePopupOpciones').addEventListener('click', function () {
        document.getElementById('popupOpciones').style.display = 'none';
        popupOpen = false;
    });

    document.querySelector('button[onclick="menu()"]').addEventListener('click', showPopupOpciones);

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function () {
            const title = this.querySelector('.item-title').textContent;
            const author = this.dataset.author || 'Desconocido';
            const difficulty = this.querySelector('.badge').textContent;
            const date = this.dataset.date || 'No disponible';

            showPopup(title, author, difficulty, date);
        });
    });

    function showDownloadModal(title) {
        closeAllPopups(); // Cierra todos los demás popups antes de abrir uno nuevo

        popupOpen = true;

        document.getElementById('downloadTitle').textContent = title;
        const modalDownload = new bootstrap.Modal(document.getElementById('modalDownload'));
        modalDownload.show();

        // Cierra el popup de información del CTF al cerrar el modal de descarga
        document.getElementById('modalDownload').addEventListener('hidden.bs.modal', closeAllPopups);
    }

    function showUploadModal() {
        closeAllPopups(); // Cierra todos los demás popups antes de abrir uno nuevo

        popupOpen = true;

        const modalUpload = new bootstrap.Modal(document.getElementById('modalUpload'));
        modalUpload.show();

        // Cierra el popup de información del CTF al cerrar el modal de subida
        document.getElementById('modalUpload').addEventListener('hidden.bs.modal', closeAllPopups);
    }

    function showInfoModal() {
        closeAllPopups(); // Cierra todos los demás popups antes de abrir uno nuevo

        popupOpen = true;

        const infoContainer = document.getElementById('infoContainer');
        infoContainer.innerHTML = '';

        const writeups = [
            { name: 'Autor 1', img: 'texto.png', link: 'https://example.com/author1' },
            { name: 'Autor 2', img: 'author2.jpg', link: 'https://example.com/author2' }
        ];

        writeups.forEach(writeup => {
            const item = document.createElement('div');
            item.className = 'info-author d-flex align-items-center mb-3';
            item.innerHTML = `
                <a href="${writeup.link}" target="_blank" class="d-flex align-items-center">
                    <img src="${writeup.img}" alt="${writeup.name}" class="me-2" style="width: 50px; height: 50px; object-fit: cover;">
                    ${writeup.name}
                </a>
            `;
            infoContainer.appendChild(item);
        });

        const modalInfo = new bootstrap.Modal(document.getElementById('modalInfo'));
        modalInfo.show();

        // Cierra el popup de información del CTF al cerrar el modal de información
        document.getElementById('modalInfo').addEventListener('hidden.bs.modal', closeAllPopups);
    }

    document.querySelector('.actions button:nth-child(1)').addEventListener('click', function () {
        showDownloadModal('Título de la Máquina');
    });

    document.querySelector('.actions button:nth-child(2)').addEventListener('click', function () {
        showUploadModal();
    });

    document.querySelector('.actions button:nth-child(3)').addEventListener('click', function () {
        showInfoModal();
    });
});
