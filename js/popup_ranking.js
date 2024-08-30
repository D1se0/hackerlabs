// Función para mostrar/ocultar el contenedor del ranking
document.getElementById('ranking-btn').addEventListener('click', function() {
    var rankingContainer = document.getElementById('rankingContainer');
    if (rankingContainer.style.display === 'none' || rankingContainer.style.display === '') {
        rankingContainer.style.display = 'flex'; // Usar flex para centrar
    } else {
        rankingContainer.style.display = 'none';
    }
});

// Función para cerrar el contenedor del ranking
function closeRanking() {
    document.getElementById('rankingContainer').style.display = 'none';
}

// Ejemplo de cómo actualizar el ranking
function updateRanking(rankingData) {
    var rankingBody = document.getElementById('rankingBody');
    rankingBody.innerHTML = ''; // Limpiar el contenido existente
    rankingData.forEach(function(entry, index) {
        var row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${entry.user}</td><td>${entry.date}</td>`;
        rankingBody.appendChild(row);
    });
}

document.getElementById('ranking-btn').addEventListener('click', function() {
    document.querySelector('.popup-overlay-ranking').style.display = 'flex'; // Muestra el overlay
    document.getElementById('rankingContainer').style.display = 'block'; // Muestra el popup
});

document.querySelector('.btn-close-ranking').addEventListener('click', function() {
    document.querySelector('.popup-overlay-ranking').style.display = 'none'; // Oculta el overlay
    document.getElementById('rankingContainer').style.display = 'none'; // Oculta el popup
});

