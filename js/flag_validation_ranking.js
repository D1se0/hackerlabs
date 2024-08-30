document.addEventListener('DOMContentLoaded', function () {
    const flags = {
        "Avengers": "INHUISKHJ5JE6T2U",
        "Overflow": "#",
        "Tusty": "2d264e1f92a8230d442750d69fba4cc5",
        "Ciberhack": "Q29kaWdvOiByb290Y2liZXjoYWNr",
        "Cyb3rSh1€ld": "#",
        "Nezuko": "finalorigami",
        "nCloud": "#",
        "Ghost": "Q29kaWdvOiBnaG9zdHjlc3VlbHRv",
        "GuardiansOfGalaxy": "#",
        "HackMeDaddy": "2d264e1f92a8230d442750d69fba4cc5",
        "inj3ct0rs": "8e776bdaed0b6748686b7ce6d38ccca3",
        "LFI.elf": "2d264e1f92a8230d442750d69fba4cc5",
        // Agrega más flags para otras máquinas aquí
    };

    const rankingContainer = document.getElementById('rankingContainer');
    const popupOverlayRanking = document.querySelector('.popup-overlay-ranking');
    const btnCloseRanking = document.querySelector('.btn-close-ranking');
    const submitFlag = document.getElementById('submitFlag');
    const flagMessage = document.getElementById('flagMessage');
    const modalFlag = new bootstrap.Modal(document.getElementById('modalFlag'));
    const rankingBody = document.getElementById('rankingBody');

    // Función para mostrar el popup de ranking
    function showRanking() {
        popupOverlayRanking.style.display = 'flex'; // Usar 'flex' para centrar el contenido
        renderRanking(); // Renderizar el ranking
    }

    // Función para cerrar el popup de ranking
    function closeRanking() {
        popupOverlayRanking.style.display = 'none';
    }

    // Manejar el clic en el botón de cierre del popup de ranking
    btnCloseRanking.addEventListener('click', closeRanking);

    // Cerrar el popup de ranking si se hace clic fuera del contenido
    popupOverlayRanking.addEventListener('click', function (event) {
        if (event.target === popupOverlayRanking) {
            closeRanking();
        }
    });

    // Función para renderizar el ranking desde localStorage
    function renderRanking() {
        rankingBody.innerHTML = ''; // Limpiar el contenido existente

        // Obtener el ranking almacenado en localStorage
        const rankingData = JSON.parse(localStorage.getItem('ranking')) || [];

        rankingData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.user}</td>
                <td>${entry.date}</td>
                <td>${entry.machine}</td>
            `;
            rankingBody.appendChild(row);
        });
    }

    // Llamar a renderRanking al cargar la página para mostrar el ranking guardado
    renderRanking();

    // Función para añadir un nuevo registro al ranking
    function addRankingEntry(user, date, machine) {
        const rankingData = JSON.parse(localStorage.getItem('ranking')) || [];
        rankingData.push({ user, date, machine });
        localStorage.setItem('ranking', JSON.stringify(rankingData));
        renderRanking();
    }

    // Manejar la apertura del modal y cargar el nombre de la máquina
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
        button.addEventListener('click', function () {
            const machineName = button.getAttribute('data-machine');
            document.getElementById('machineName').value = machineName;
        });
    });

    // Limpiar los campos al cerrar el modal
    document.getElementById('modalFlag').addEventListener('hidden.bs.modal', function () {
        document.getElementById('flagInput').value = ''; // Limpiar el campo de entrada
        document.getElementById('usernameInput').value = ''; // Limpiar el campo de nombre de usuario
        flagMessage.textContent = ''; // Limpiar el mensaje
        flagMessage.classList.remove('text-success', 'text-danger'); // Eliminar clases de estilo
    });

    // Validar la flag cuando se envía
    submitFlag.addEventListener('click', function () {
        const machineName = document.getElementById('machineName').value;
        const flagInput = document.getElementById('flagInput').value;
        const usernameInput = document.getElementById('usernameInput').value;

        const now = new Date();
        const dateString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        if (flags[machineName] === flagInput) {
            flagMessage.textContent = "¡Flag correcta!";
            flagMessage.classList.remove('text-danger');
            flagMessage.classList.add('text-success');

            // Añadir al ranking
            addRankingEntry(usernameInput, dateString, machineName);
            
            // Cerrar el modal de flag
            modalFlag.hide();

            // Cerrar el popup de ranking si estaba abierto
            closeRanking();

            // Guardar flag correcta en localStorage para no mostrar popup al recargar
            localStorage.setItem('rankingShown', 'true');
        } else {
            flagMessage.textContent = "Flag incorrecta. Inténtalo de nuevo.";
            flagMessage.classList.remove('text-success');
            flagMessage.classList.add('text-danger');
        }
    });

    // Verificar si se debe mostrar el ranking popup al cargar la página
    if (localStorage.getItem('rankingShown') !== 'true') {
        showRanking();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const resetRankingButton = document.getElementById('resetRanking');

    // Función para resetear el ranking
    function resetRanking() {
        localStorage.removeItem('ranking'); // Eliminar datos del ranking del localStorage
        renderRanking(); // Volver a renderizar el ranking vacío
    }

    // Manejar el clic en el botón de resetear ranking
    if (resetRankingButton) {
        resetRankingButton.addEventListener('click', function () {
            if (confirm('¿Estás seguro de que quieres resetear el ranking? Esta acción es irreversible.')) {
                resetRanking();
            }
        });
    }

    // Función para renderizar el ranking desde localStorage
    function renderRanking() {
        rankingBody.innerHTML = ''; // Limpiar el contenido existente

        // Obtener el ranking almacenado en localStorage
        const rankingData = JSON.parse(localStorage.getItem('ranking')) || [];

        rankingData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.user}</td>
                <td>${entry.date}</td>
                <td>${entry.machine}</td>
            `;
            rankingBody.appendChild(row);
        });
    }

    // Renderizar el ranking al cargar la página
    renderRanking();
});

document.addEventListener('DOMContentLoaded', function () {
    const popupRanking = document.querySelector('.popup-overlay-ranking');
    const machineName = document.getElementById('machineName').value;

    // Cierra el popup del ranking si está visible al cargar la página
    if (popupRanking && popupRanking.style.display !== 'none') {
        popupRanking.style.display = 'none';
        document.body.style.overflow = ''; // Restablecer el desbordamiento del cuerpo
    }
});
