document.addEventListener('DOMContentLoaded', function () {
    // Flags correctas para cada máquina
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

    // Manejar la apertura del modal y cargar el nombre de la máquina
    const modalFlag = document.getElementById('modalFlag');
    modalFlag.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const machineName = button.getAttribute('data-machine');
        const machineNameInput = document.getElementById('machineName');
        machineNameInput.value = machineName;
    });

    // Limpiar los campos al cerrar el modal
    modalFlag.addEventListener('hidden.bs.modal', function () {
        document.getElementById('flagInput').value = ''; // Limpiar el campo de entrada
        document.getElementById('flagMessage').textContent = ''; // Limpiar el mensaje
        document.getElementById('flagMessage').classList.remove('text-success', 'text-danger'); // Eliminar clases de estilo
    });

    // Validar la flag cuando se envía
    const submitFlag = document.getElementById('submitFlag');
    submitFlag.addEventListener('click', function () {
        const machineName = document.getElementById('machineName').value;
        const flagInput = document.getElementById('flagInput').value;
        const flagMessage = document.getElementById('flagMessage');

        if (flags[machineName] === flagInput) {
            flagMessage.textContent = "¡Flag correcta!";
            flagMessage.classList.remove('text-danger');
            flagMessage.classList.add('text-success');
        } else {
            flagMessage.textContent = "Flag incorrecta. Inténtalo de nuevo.";
            flagMessage.classList.remove('text-success');
            flagMessage.classList.add('text-danger');
        }
    });
});
