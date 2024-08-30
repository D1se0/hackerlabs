// Manejo del popup de comandos
document.querySelectorAll('.command-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Obtener el ID de la descripción del botón
        const descriptionId = e.currentTarget.parentElement.getAttribute('data-description-id');

        // Obtener el contenido de la descripción
        const descriptionContent = document.getElementById(descriptionId).innerHTML;

        // Actualizar el contenido del popup de comandos
        document.getElementById('popup-command-description').innerHTML = descriptionContent;
        document.getElementById('popupDetailsCommand').style.display = 'flex'; // Mostrar el popup
    });
});

// Manejo del popup de detalles de técnicas de hacking
document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', (e) => {
        // Obtener el texto, enlace e imagen del botón
        const info = e.currentTarget.getAttribute('data-info');
        const linkHref = e.currentTarget.getAttribute('data-href');
        const imageSrc = e.currentTarget.getAttribute('data-image'); // Obtener la URL de la imagen

        // Actualizar el contenido del popup
        document.getElementById('popup-link-text').innerText = info;
        document.getElementById('popup-description').href = linkHref;
        document.getElementById('popupImage').src = imageSrc;

        // Mostrar el popup de detalles
        document.getElementById('popupDetails').style.display = 'flex';
    });
});

// Manejo del popup de información de puertos
document.querySelectorAll('.btn-port-details').forEach(button => {
    button.addEventListener('click', (e) => {
        // Obtener la información y descripción del puerto
        const portInfo = e.currentTarget.getAttribute('data-port-info');
        const portDescription = e.currentTarget.getAttribute('data-port-description');
        
        // Actualizar el contenido del popup
        document.getElementById('popup-port-info').innerText = portInfo;
        document.getElementById('popup-port-description').innerText = portDescription;

        // Mostrar el popup de puertos
        document.getElementById('popupPortDetails').style.display = 'flex';
    });
});

// Cerrar los popups cuando se hace clic en el botón de cerrar
document.querySelectorAll('.btn-close').forEach(button => {
    button.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        if (targetId) {
            document.getElementById(targetId).style.display = 'none';
        }
    });
});

// Cerrar los popups cuando se hace clic fuera del contenido del popup
document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

// Manejo del popup de información de puertos
document.querySelectorAll('.btn-port-details').forEach(button => {
    button.addEventListener('click', (e) => {
        // Obtener el ID de la descripción del puerto
        const descriptionId = e.currentTarget.getAttribute('data-description-port-id');

        // Obtener el contenido de la descripción
        const descriptionContent = document.getElementById(descriptionId).innerHTML;

        // Actualizar el contenido del popup
        document.getElementById('popup-port-info').innerText = e.currentTarget.innerText;
        document.getElementById('popup-port-description').innerHTML = descriptionContent;

        // Mostrar el popup de puertos
        document.getElementById('popupPortDetails').style.display = 'flex';
    });
});

// Cerrar los popups cuando se hace clic en el botón de cerrar
document.querySelectorAll('.btn-close').forEach(button => {
    button.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        if (targetId) {
            document.getElementById(targetId).style.display = 'none';
        }
    });
});

// Cerrar los popups cuando se hace clic fuera del contenido del popup
document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});
