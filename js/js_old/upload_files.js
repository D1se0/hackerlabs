// js/upload.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'Archivos_pagina_web'); // Reemplaza con tu nombre de preset

            const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/deduwa6yn/upload';

            fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Respuesta completa de Cloudinary:', data); // Mostrar toda la respuesta en la consola

                    if (data.secure_url) {
                        console.log('Archivo subido exitosamente:', data);
                        alert('Archivo subido exitosamente!');

                        // Obtener la URL del archivo
                        const fileUrl = data.secure_url;

                        // Mostrar la URL en el HTML
                        const resultDiv = document.createElement('div');
                        resultDiv.innerHTML = `<p>Archivo subido: <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>`;
                        document.body.appendChild(resultDiv);
                    } else {
                        console.error('URL del archivo no encontrada en la respuesta:', data);
                        alert('Error al obtener la URL del archivo.');
                    }
                })
                .catch(error => {
                    console.error('Error al subir el archivo:', error);
                    alert('Error al subir el archivo.');
                });
        } else {
            alert('Por favor selecciona un archivo.');
        }
    });
});
