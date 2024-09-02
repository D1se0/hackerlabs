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
        "404-not-found": "2424b2a3292e20c6e1ade39ed3e77629",
        "dance-samba": "efb6984b9b0eb57451aca3f93c8ce6b7",
        "vulnvault": "640c89bbfa2f70a4038fd570c65d6dcc",
        "crackoff": "c33b3d6c28dddad9fadd90b81fc57d24",
        "pressenter": "4e4a603de810988e0842777de1d97e68",
        "mapache2": "e180269a01be15fc0b889bd34fd93c5c",
        "ctrl-x": "97e2171b74984a382b62fcb39ab893c8",
        "r00tless": "ba10787e7f3a49c890439a44515da649",
        "0xc0ffee": "d6c4a33bec66ea2948f09a0db32335de",
        "memesploit": "b57069733c1fbdf4795c0b36597c307a",
        "jenkhack": "c43cb8e62105280785c7500ba705a9fc",
        "chmod-4755": "1e4e4054308a62a2bbaacd02074f1ad2",
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
        // Verificar si la entrada ya existe
        if (!rankingData.some(entry => entry.user === user && entry.machine === machine)) {
            rankingData.unshift({ user, date, machine }); // Cambiado de push() a unshift()
            localStorage.setItem('ranking', JSON.stringify(rankingData));
            renderRanking();
        }
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

        const now = new Date();
        const dateString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

        const authenticatedUser = localStorage.getItem('authenticatedUser');
        if (!authenticatedUser) {
            flagMessage.textContent = "Debes iniciar sesión para validar una flag.";
            flagMessage.classList.remove('text-success');
            flagMessage.classList.add('text-danger');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === authenticatedUser);

        // Verificar si la flag ya ha sido validada por el usuario
        if (user && user.flags.some(flagData => flagData.machine === machineName && flagData.flag === flagInput)) {
            flagMessage.textContent = "Ya has validado esta flag anteriormente.";
            flagMessage.classList.remove('text-success');
            flagMessage.classList.add('text-danger');
            return;
        }

        if (flags[machineName] === flagInput) {
            flagMessage.textContent = "¡Flag correcta!";
            flagMessage.classList.remove('text-danger');
            flagMessage.classList.add('text-success');

            // Añadir al ranking
            addRankingEntry(authenticatedUser, dateString, machineName);

            // Guardar flag correcta en el perfil del usuario
            if (user) {
                user.flags.push({ flag: flagInput, machine: machineName, date: dateString });
                localStorage.setItem('users', JSON.stringify(users));
            }

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

    // Resetear el ranking
    const resetRankingButton = document.getElementById('resetRanking');
    if (resetRankingButton) {
        resetRankingButton.addEventListener('click', function () {
            if (confirm('¿Estás seguro de que quieres resetear el ranking? Esta acción es irreversible.')) {
                localStorage.removeItem('ranking');
                renderRanking(); // Volver a renderizar el ranking vacío
            }
        });
    }

    // Cierra el popup del ranking si está visible al cargar la página
    const popupRanking = document.querySelector('.popup-overlay-ranking');
    if (popupRanking && popupRanking.style.display !== 'none') {
        popupRanking.style.display = 'none';
        document.body.style.overflow = ''; // Restablecer el desbordamiento del cuerpo
    }
});
