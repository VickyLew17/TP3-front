let libros = [];

fetch("https://openlibrary.org/search.json?q=books&limit=200")          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Libros cargados');
    console.log(data);

    libros = data.docs;

    mostrarLibros();
    
  })

  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error:', error);
  });

function mostrarLibros () {
  let contenedor = document.getElementById("contenedor-libros");

  libros.forEach(libro => {
    let tarjeta = document.createElement("article");

    let portada = `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`;

    tarjeta.innerHTML = `
            <img src="${portada}" alt="Portada de ${libro.title}">
            <h2>${libro.title}</h2>
            <p>Autor: ${libro.author_name}</p>
        `;

        contenedor.appendChild(tarjeta); 
  });
}

const buscador = document.getElementById("busqueda");
const contenedorLibros = document.getElementById("contenedor-libros");

buscador.addEventListener("input", () => {
    const texto = buscador.value.trim().toLowerCase();

    const tarjetas = contenedorLibros.querySelectorAll("article");

    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.querySelector("h2").textContent.trim().toLowerCase();

        tarjeta.style.display = nombre.includes(texto) ? "" : "none";
    });
});