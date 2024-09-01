document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const profileModal = document.getElementById('profileModal');
    const flagsModal = document.getElementById('flagsModal');
    const popupOpciones = document.getElementById('popupOpciones'); // Selecciona el popup de opciones
    const loginButton = document.getElementById('loginButton');
    const profileButton = document.getElementById('profileButton');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeProfileModal = document.getElementById('closeProfileModal');
    const closeFlagsModal = document.getElementById('closeFlagsModal');
    const closePopupOpciones = document.getElementById('closePopupOpciones'); // Botón para cerrar el popup de opciones

    // Función para mostrar el modal de inicio de sesión/registro
    const showLoginModal = () => {
        loginModal.style.display = 'flex';
        popupOpciones.style.display = 'none'; // Cierra el popup de opciones
    };

    // Función para mostrar el modal de perfil
    const showProfileModal = () => {
        showProfile(); // Actualiza el perfil antes de mostrar el modal
        profileModal.style.display = 'flex';
        popupOpciones.style.display = 'none'; // Cierra el popup de opciones
    };

    // Función para mostrar el modal de flags
    const showFlagsModal = () => {
        showFlags(); // Actualiza la lista de flags antes de mostrar el modal
        flagsModal.style.display = 'flex';
        popupOpciones.style.display = 'none'; // Cierra el popup de opciones
    };

    // Función para cerrar los modales
    const hideLoginModal = () => loginModal.style.display = 'none';
    const hideProfileModal = () => profileModal.style.display = 'none';
    const hideFlagsModal = () => flagsModal.style.display = 'none';

    // Evento para abrir los modales
    loginButton.addEventListener('click', showLoginModal);
    profileButton.addEventListener('click', showProfileModal);
    document.getElementById('showFlagsButton').addEventListener('click', showFlagsModal);

    // Evento para cerrar los modales
    closeLoginModal.addEventListener('click', hideLoginModal);
    closeProfileModal.addEventListener('click', hideProfileModal);
    closeFlagsModal.addEventListener('click', hideFlagsModal);

    // Evento para cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) hideLoginModal();
        else if (event.target === profileModal) hideProfileModal();
        else if (event.target === flagsModal) hideFlagsModal();
    });

    // Evento para cerrar el popup de opciones al hacer clic en su botón de cierre
    closePopupOpciones.addEventListener('click', () => {
        popupOpciones.style.display = 'none';
    });

    // Función para comprobar autenticación
    const checkAuthentication = () => {
        const user = localStorage.getItem('authenticatedUser');
        if (user) {
            loginButton.style.display = 'none';
            profileButton.style.display = 'inline-block';
        } else {
            loginButton.style.display = 'inline-block';
            profileButton.style.display = 'none';
        }
    };

    // Inicializar modales al cargar la página
    const initializeModals = () => {
        loginModal.style.display = 'none';
        profileModal.style.display = 'none';
        flagsModal.style.display = 'none';
    };

    checkAuthentication();
    initializeModals();

    // Cargar usuarios almacenados en localStorage
    const loadUsers = () => JSON.parse(localStorage.getItem('users')) || [];

    // Guardar usuarios en localStorage
    const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

    // Manejar el envío del formulario de inicio de sesión/registro
    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;

        if (username && password) {
            let users = loadUsers();
            let user = users.find(u => u.username === username);

            if (user) {
                // Iniciar sesión
                if (user.password === password) {
                    alert('Inicio de sesión exitoso');
                    localStorage.setItem('authenticatedUser', username);
                } else {
                    alert('Contraseña incorrecta');
                }
            } else {
                // Registrar usuario
                users.push({
                    username,
                    password,
                    email: '',
                    bio: '',
                    flags: [],
                    machines: []
                });
                saveUsers(users);
                alert('Registro exitoso');
                localStorage.setItem('authenticatedUser', username);
            }
            hideLoginModal();
            checkAuthentication();
        }
    });

    // Mostrar perfil
    const showProfile = () => {
        const authenticatedUser = localStorage.getItem('authenticatedUser');
        if (authenticatedUser) {
            const users = loadUsers();
            const user = users.find(u => u.username === authenticatedUser);

            document.getElementById('profileUserName').innerText = user.username;
            document.getElementById('profileEmailInput').value = user.email;
            document.getElementById('profileBioInput').value = user.bio;

            // Calcular y mostrar el porcentaje de flags validadas
            const totalFlags = 22; // Este es un número de ejemplo; cámbialo según tu caso
            const flagsValidated = user.flags.length;
            const flagsPercentage = (flagsValidated / totalFlags) * 100;
            const progressBar = document.getElementById('flagsProgress');
            const progressText = document.getElementById('progressText');
            progressBar.style.width = `${flagsPercentage}%`;
            progressText.innerText = `${flagsValidated} / ${totalFlags} (${flagsPercentage.toFixed(2)}%)`;
        }
    };

    // Mostrar las flags en el modal
    const showFlags = () => {
        const authenticatedUser = localStorage.getItem('authenticatedUser');
        if (authenticatedUser) {
            const users = loadUsers();
            const user = users.find(u => u.username === authenticatedUser);

            const flagsList = document.getElementById('validatedFlagsList');
            flagsList.innerHTML = '';
            user.flags.forEach(flagData => {
                const li = document.createElement('li');
                li.textContent = `${flagData.flag} - ${flagData.machine} (Validado: ${flagData.date})`;
                flagsList.appendChild(li);
            });
        }
    };

    // Guardar perfil
    document.getElementById('saveProfileButton').addEventListener('click', () => {
        const authenticatedUser = localStorage.getItem('authenticatedUser');
        if (authenticatedUser) {
            const users = loadUsers();
            const user = users.find(u => u.username === authenticatedUser);

            user.email = document.getElementById('profileEmailInput').value;
            user.bio = document.getElementById('profileBioInput').value;

            saveUsers(users);
            alert('Perfil guardado');
        }
    });

    // Cerrar sesión
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('authenticatedUser');
        hideProfileModal();
        checkAuthentication();
    });

    // Simular validación de flags (esto se puede quitar en la implementación final)
    const simulateFlagValidation = (flag, machine) => {
        const authenticatedUser = localStorage.getItem('authenticatedUser');
        if (authenticatedUser) {
            const users = loadUsers();
            const user = users.find(u => u.username === authenticatedUser);

            const now = new Date();
            const date = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

            user.flags.push({ flag, machine, date });
            user.machines.push(machine); // Añadir máquina a la lista de máquinas completadas

            saveUsers(users);
            alert('Flag validada');
            showProfile(); // Actualizar perfil después de validar la flag
        }
    };

    // Ejemplo de uso de la simulación
    // simulateFlagValidation('Flag1', 'RootMachine1');

    // Función para borrar todas las cuentas de usuario
    const deleteAllUsers = () => {
        if (confirm('¿Estás seguro de que deseas eliminar todas las cuentas de usuario? Esto no se puede deshacer.')) {
            localStorage.removeItem('users');
            localStorage.removeItem('authenticatedUser');
            alert('Todas las cuentas de usuario han sido eliminadas.');
        }
    };

    // Añadir un evento al botón para borrar todas las cuentas
    deleteAllUsersButton.addEventListener('click', deleteAllUsers);
});
