document.addEventListener('DOMContentLoaded', function () {
    // Variable global para controlar si un popup está abierto
    let popupOpen = false;

    // Función para filtrar los items según la dificultad
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
        // Cierra el popup principal y el popup de opciones
        document.getElementById('popup').style.display = 'none';
        document.getElementById('popupOpciones').style.display = 'none';

        // Cierra los modales de Bootstrap
        const modals = ['modalDownload1', 'modalUpload1', 'modalInfo1', 'modalDownload2', 'modalUpload2', 'modalInfo2', 'modalDownload3', 'modalUpload3', 'modalInfo3', 'modalDownload4', 'modalUpload4', 'modalInfo4', 'modalDownload5', 'modalUpload5', 'modalInfo5', 'modalDownload6', 'modalUpload6', 'modalInfo6', 'modalDownload7', 'modalUpload7', 'modalInfo7', 'modalDownload8', 'modalUpload8', 'modalInfo8', 'modalDownload9', 'modalUpload9', 'modalInfo9', 'modalDownload10', 'modalUpload10', 'modalInfo10', 'modalDownload11', 'modalUpload11', 'modalInfo11', 'modalDownload12', 'modalUpload12', 'modalInfo12', 'modalDownload13', 'modalUpload13', 'modalInfo13', 'modalDownload14', 'modalUpload14', 'modalInfo14', 'modalDownload15', 'modalUpload15', 'modalInfo15', 'modalDownload16', 'modalUpload16', 'modalInfo16', 'modalDownload17', 'modalUpload17', 'modalInfo17', 'modalDownload18', 'modalUpload18', 'modalInfo18', 'modalDownload19', 'modalUpload19', 'modalInfo19', 'modalDownload20', 'modalUpload20', 'modalInfo20', 'modalDownload21', 'modalUpload21', 'modalInfo21', 'modalDownload22', 'modalUpload22', 'modalInfo22', 'modalDownload23', 'modalUpload23', 'modalInfo23', 'modalDownload24', 'modalUpload24', 'modalInfo24'];
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

    function showPopup(popupId, isModal = false) {
        closeAllPopups();  // Cierra cualquier popup o modal abierto
        popupOpen = true;

        if (isModal) {
            const modal = new bootstrap.Modal(document.getElementById(popupId));
            modal.show();
        } else {
            document.getElementById(popupId).style.display = 'flex';
        }
    }

    // Función específica para mostrar el popup con el contenido y la imagen
function showPopupWithContent(title, author, difficulty, date, imageUrl) {
    showPopup('popup');

    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupAuthor').textContent = `Autor: ${author}`;
    document.getElementById('popupDate').textContent = `Fecha de creación: ${date}`;

    const difficultyElement = document.getElementById('difficultyLevel');
    
    // Limpiar cualquier contenido anterior en difficultyElement
    difficultyElement.innerHTML = '';

    // Limpiar clases previas de difficultyElement
    difficultyElement.className = 'difficulty'; // Solo la clase base

    // Crear un elemento para la badge
    const badge = document.createElement('span');
    badge.className = 'badge'; // Clase base para el badge
    badge.textContent = difficulty; // Establecer el texto del badge

    // Asignar la clase específica basada en el nivel de dificultad
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
        default:
            difficultyElement.classList.add('default-difficulty');
            break;
    }

    // Añadir el badge al elemento difficultyLevel
    difficultyElement.appendChild(badge);

    // Actualiza la URL de la imagen en el popup
    document.getElementById('popupImage').src = imageUrl;
}

    document.getElementById('closePopup').addEventListener('click', function () {
        closeAllPopups();
    });

    document.getElementById('closePopupOpciones').addEventListener('click', function () {
        closeAllPopups();
    });

    // Eventos para abrir popups y modales
    document.querySelector('button[onclick="menu()"]').addEventListener('click', () => showPopup('popupOpciones'));

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function () {
            const title = this.querySelector('.item-title').textContent;
            const author = this.dataset.author || 'Desconocido';
            const difficulty = this.querySelector('.badge').textContent;
            const date = this.dataset.date || 'No disponible';
            const imageUrl = this.dataset.image || ''; // Obtiene la URL de la imagen

            showPopupWithContent(title, author, difficulty, date, imageUrl);
        });
    });

    // Los siguientes eventos se han dejado como estaban porque parecen manejar modales de Bootstrap y no requieren cambios
    document.querySelector('.actions .btnDownload1').addEventListener('click', () => showPopup('modalDownload1', true));
    document.querySelector('.actions .btnUpload1').addEventListener('click', () => showPopup('modalUpload1', true));
    document.querySelector('.actions .btnInfo1').addEventListener('click', () => showPopup('modalInfo1', true));

    document.querySelector('.actions .btnDownload2').addEventListener('click', () => showPopup('modalDownload2', true));
    document.querySelector('.actions .btnUpload2').addEventListener('click', () => showPopup('modalUpload2', true));
    document.querySelector('.actions .btnInfo2').addEventListener('click', () => showPopup('modalInfo2', true));

    document.querySelector('.actions .btnDownload3').addEventListener('click', () => showPopup('modalDownload3', true));
    document.querySelector('.actions .btnUpload3').addEventListener('click', () => showPopup('modalUpload3', true));
    document.querySelector('.actions .btnInfo3').addEventListener('click', () => showPopup('modalInfo3', true));

    document.querySelector('.actions .btnDownload4').addEventListener('click', () => showPopup('modalDownload4', true));
    document.querySelector('.actions .btnUpload4').addEventListener('click', () => showPopup('modalUpload4', true));
    document.querySelector('.actions .btnInfo4').addEventListener('click', () => showPopup('modalInfo4', true));

    document.querySelector('.actions .btnDownload5').addEventListener('click', () => showPopup('modalDownload5', true));
    document.querySelector('.actions .btnUpload5').addEventListener('click', () => showPopup('modalUpload5', true));
    document.querySelector('.actions .btnInfo5').addEventListener('click', () => showPopup('modalInfo5', true));

    document.querySelector('.actions .btnDownload6').addEventListener('click', () => showPopup('modalDownload6', true));
    document.querySelector('.actions .btnUpload6').addEventListener('click', () => showPopup('modalUpload6', true));
    document.querySelector('.actions .btnInfo6').addEventListener('click', () => showPopup('modalInfo6', true));

    document.querySelector('.actions .btnDownload7').addEventListener('click', () => showPopup('modalDownload7', true));
    document.querySelector('.actions .btnUpload7').addEventListener('click', () => showPopup('modalUpload7', true));
    document.querySelector('.actions .btnInfo7').addEventListener('click', () => showPopup('modalInfo7', true));

    document.querySelector('.actions .btnDownload8').addEventListener('click', () => showPopup('modalDownload8', true));
    document.querySelector('.actions .btnUpload8').addEventListener('click', () => showPopup('modalUpload8', true));
    document.querySelector('.actions .btnInfo8').addEventListener('click', () => showPopup('modalInfo8', true));

    document.querySelector('.actions .btnDownload9').addEventListener('click', () => showPopup('modalDownload9', true));
    document.querySelector('.actions .btnUpload9').addEventListener('click', () => showPopup('modalUpload9', true));
    document.querySelector('.actions .btnInfo9').addEventListener('click', () => showPopup('modalInfo9', true));

    document.querySelector('.actions .btnDownload10').addEventListener('click', () => showPopup('modalDownload10', true));
    document.querySelector('.actions .btnUpload10').addEventListener('click', () => showPopup('modalUpload10', true));
    document.querySelector('.actions .btnInfo10').addEventListener('click', () => showPopup('modalInfo10', true));

    document.querySelector('.actions .btnDownload11').addEventListener('click', () => showPopup('modalDownload11', true));
    document.querySelector('.actions .btnUpload11').addEventListener('click', () => showPopup('modalUpload11', true));
    document.querySelector('.actions .btnInfo11').addEventListener('click', () => showPopup('modalInfo11', true));

    document.querySelector('.actions .btnDownload12').addEventListener('click', () => showPopup('modalDownload12', true));
    document.querySelector('.actions .btnUpload12').addEventListener('click', () => showPopup('modalUpload12', true));
    document.querySelector('.actions .btnInfo12').addEventListener('click', () => showPopup('modalInfo12', true));

    document.querySelector('.actions .btnDownload13').addEventListener('click', () => showPopup('modalDownload13', true));
    document.querySelector('.actions .btnUpload13').addEventListener('click', () => showPopup('modalUpload13', true));
    document.querySelector('.actions .btnInfo13').addEventListener('click', () => showPopup('modalInfo13', true));

    document.querySelector('.actions .btnDownload14').addEventListener('click', () => showPopup('modalDownload14', true));
    document.querySelector('.actions .btnUpload14').addEventListener('click', () => showPopup('modalUpload14', true));
    document.querySelector('.actions .btnInfo14').addEventListener('click', () => showPopup('modalInfo14', true));

    document.querySelector('.actions .btnDownload15').addEventListener('click', () => showPopup('modalDownload15', true));
    document.querySelector('.actions .btnUpload15').addEventListener('click', () => showPopup('modalUpload15', true));
    document.querySelector('.actions .btnInfo15').addEventListener('click', () => showPopup('modalInfo15', true));

    document.querySelector('.actions .btnDownload16').addEventListener('click', () => showPopup('modalDownload16', true));
    document.querySelector('.actions .btnUpload16').addEventListener('click', () => showPopup('modalUpload16', true));
    document.querySelector('.actions .btnInfo16').addEventListener('click', () => showPopup('modalInfo16', true));

    document.querySelector('.actions .btnDownload17').addEventListener('click', () => showPopup('modalDownload17', true));
    document.querySelector('.actions .btnUpload17').addEventListener('click', () => showPopup('modalUpload17', true));
    document.querySelector('.actions .btnInfo17').addEventListener('click', () => showPopup('modalInfo17', true));

    document.querySelector('.actions .btnDownload18').addEventListener('click', () => showPopup('modalDownload18', true));
    document.querySelector('.actions .btnUpload18').addEventListener('click', () => showPopup('modalUpload18', true));
    document.querySelector('.actions .btnInfo18').addEventListener('click', () => showPopup('modalInfo18', true));

    document.querySelector('.actions .btnDownload19').addEventListener('click', () => showPopup('modalDownload19', true));
    document.querySelector('.actions .btnUpload19').addEventListener('click', () => showPopup('modalUpload19', true));
    document.querySelector('.actions .btnInfo19').addEventListener('click', () => showPopup('modalInfo19', true));

    document.querySelector('.actions .btnDownload20').addEventListener('click', () => showPopup('modalDownload20', true));
    document.querySelector('.actions .btnUpload20').addEventListener('click', () => showPopup('modalUpload20', true));
    document.querySelector('.actions .btnInfo20').addEventListener('click', () => showPopup('modalInfo20', true));

    document.querySelector('.actions .btnDownload21').addEventListener('click', () => showPopup('modalDownload21', true));
    document.querySelector('.actions .btnUpload21').addEventListener('click', () => showPopup('modalUpload21', true));
    document.querySelector('.actions .btnInfo21').addEventListener('click', () => showPopup('modalInfo21', true));

    document.querySelector('.actions .btnDownload22').addEventListener('click', () => showPopup('modalDownload22', true));
    document.querySelector('.actions .btnUpload22').addEventListener('click', () => showPopup('modalUpload22', true));
    document.querySelector('.actions .btnInfo22').addEventListener('click', () => showPopup('modalInfo22', true));

    document.querySelector('.actions .btnDownload23').addEventListener('click', () => showPopup('modalDownload23', true));
    document.querySelector('.actions .btnUpload23').addEventListener('click', () => showPopup('modalUpload23', true));
    document.querySelector('.actions .btnInfo23').addEventListener('click', () => showPopup('modalInfo23', true));

    document.querySelector('.actions .btnDownload24').addEventListener('click', () => showPopup('modalDownload24', true));
    document.querySelector('.actions .btnUpload24').addEventListener('click', () => showPopup('modalUpload24', true));
    document.querySelector('.actions .btnInfo24').addEventListener('click', () => showPopup('modalInfo24', true));
});

//document.addEventListener('DOMContentLoaded', function() {
//    const popupInfo = document.querySelectorAll('.popup-overlay');
//
//    function closeAllPopups() {
//        popupInfo.forEach(popup => {
//            popup.style.display = 'none'; // Ajusta esto según cómo ocultas los popups
//        });
//    }
//
//    // Selecciona todos los modales
//    const modals = document.querySelectorAll('.modal');
//
//    // Añade un event listener para el evento de ocultar los modales
//    modals.forEach(modal => {
//        modal.addEventListener('hide.bs.modal', closeAllPopups);
//    });
//});


document.addEventListener('DOMContentLoaded', function() {
    const popupInfo = document.querySelectorAll('.popup-overlay');

    function closeAllPopups() {
        popupInfo.forEach(popup => {
            popup.style.display = 'none'; // Oculta todos los popups de información
        });
    }

    function closePopupsWithDelay() {
        setTimeout(() => {
            popupInfo.forEach(popup => {
                if (getComputedStyle(popup).display !== 'none') {
                    popup.style.display = 'none'; // Oculta todos los popups de información si están visibles
                }
            });
        }, 1); // Retraso de 0.1 segundos
    }

    // Selecciona todos los modales
    const modals = document.querySelectorAll('.modal');

    // Añade un event listener para el evento de ocultar los modales
    modals.forEach(modal => {
        modal.addEventListener('hide.bs.modal', closeAllPopups);

        // Añade un event listener para el evento de mostrar los modales
        modal.addEventListener('show.bs.modal', closePopupsWithDelay);
    });
});

// Función para mostrar el popup y actualizar enlaces de redes sociales
function showPopup(item) {
    // Extraer enlaces y nombres de redes sociales del ítem
    const socialLinks = [];
    let i = 1;
    let link;
    while (link = item.getAttribute(`data-redsocial${i}`)) {
        const name = item.getAttribute(`data-redsocial${i}-nombre`) || `Red Social ${i}`;
        socialLinks.push({ link, name });
        i++;
    }

    // Construir el HTML para los enlaces de redes sociales
    const socialLinksContainer = document.getElementById('popupSocialLinks');
    if (socialLinks.length > 0) {
        let socialLinksHtml = 'Redes sociales: ';
        socialLinks.forEach(({ link, name }) => {
            socialLinksHtml += `<a href="${link}" target="_blank" style="text-decoration: none; color: whitesmoke;">${name}</a> `;
        });
        socialLinksContainer.innerHTML = socialLinksHtml;
    } else {
        socialLinksContainer.innerHTML = ''; // Limpia el contenedor si no hay enlaces
    }
}

// Ejemplo de cómo agregar el evento de clic a los ítems
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        showPopup(item);
    });
});



