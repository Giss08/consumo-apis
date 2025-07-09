document.addEventListener('DOMContentLoaded', function () {
    cargarJSON(); // 🎬 Se ejecuta al cargar la página
    document.querySelector('.buscador button').addEventListener('click', buscarPelicula);
    document.querySelector('.buscador input').addEventListener('input', buscarPelicula);
});

let peliculasCargadas = []; // 💾 Se usa para búsquedas y filtrados

// ✅ Cargar JSON
function cargarJSON() {
    fetch('assets/data/peliculas.json')
        .then(res => res.json())
        .then(peliculas => {
            peliculasCargadas = peliculas;
            mostrarPeliculas(peliculas);
        })
        .catch(err => console.error("Error al cargar JSON:", err));
}

// ✅ Mostrar películas en el <main>
function mostrarPeliculas(lista) {
    const contenedor = document.querySelector('main');
    contenedor.innerHTML = "";

    lista.forEach(pelicula => {
        const article = document.createElement('article');
        article.classList.add('pelicula');

        article.innerHTML = `
            <button onclick="mostrarModalPorID(${pelicula.id})">
                <img src="${pelicula.ruta_caratula}" alt="${pelicula.nombre}">
                <h2>${pelicula.nombre}</h2>
                <h3>${pelicula.anio}</h3>
            </button>
        `;

        contenedor.appendChild(article);
    });

    if (lista.length === 0) {
        contenedor.innerHTML = "<p style='padding: 1em;'>No se encontraron resultados.</p>";
    }
}

// ✅ Mostrar modal por ID
function mostrarModalPorID(id) {
    const pelicula = peliculasCargadas.find(p => p.id === id);
    if (pelicula) {
        mostrarModal(pelicula);
    }
}

// ✅ Buscar película por nombre
function buscarPelicula() {
    const textoBusqueda = document.querySelector('.buscador input').value.toLowerCase();

    const filtradas = peliculasCargadas.filter(pelicula =>
        pelicula.nombre.toLowerCase().includes(textoBusqueda)
    );

    mostrarPeliculas(filtradas);
}


// ✅ Mostrar modal (insertado dinámicamente)
function mostrarModal(pelicula) {
    // Cerrar otro modal si existe
    const modal = document.getElementById("modal");
   
    modal.classList.add("active");

    modal.innerHTML = `
        <div class="modal-header">
            <img src="${pelicula.ruta_caratula}" alt="${pelicula.nombre}">
            <button id="close-modal" onclick="cerrarModal()">
                <img src="assets/img/close.png" alt="Cerrar">
            </button>
            <h1>${pelicula.nombre}</h1>
            <h2>${pelicula.categoria} - ${pelicula.anio}</h2>
            <hr>
        </div>
        <div class="modal-body">
            <p>${pelicula.sinopsis}</p>
            <h2>Reparto</h2>
            <h3>${pelicula.reparto.join(', ')}</h3>
            <button>VER PELICULA <img src="assets/img/play-button-arrowhead.png" alt=""></button>
        </div>
    `;
}

// ❌ Cerrar modal
function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("active");
}

// ✅ Escuchar clics en botones del footer (categorías)
document.querySelectorAll('footer button').forEach(boton => {
    boton.addEventListener('click', function () {
        const categoria = this.textContent.trim();
        filtrarPorCategoria(categoria);
    });
});

// ✅ Función para filtrar por categoría
function filtrarPorCategoria(categoria) {
    const filtradas = peliculasCargadas.filter(pelicula =>
        pelicula.categoria.toLowerCase() === categoria.toLowerCase()
    );

    mostrarPeliculas(filtradas);
}

function openMenu(){
    const modal = document.getElementById("menu");
    modal.classList.toggle("active");
}

