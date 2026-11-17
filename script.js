let libros = [];

let generoSeleccionado = "todos";

let favoritos = [];

fetch("https://openlibrary.org/search.json?q=books&limit=200&fields=key,title,author_name,cover_i,subject")          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Libros cargados');
    console.log(data);

    libros = data.docs;

    mostrarLibros(libros);
  })

  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error:', error);
  });


let contenedor = document.getElementById("contenedor-libros");

function mostrarLibros(lista) {

  contenedor.innerHTML = "";

  lista.forEach(libro => {

    let tarjeta = document.createElement("article");

    tarjeta.innerHTML = `
            <img src="${`https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`}" alt="Portada de ${libro.title}">
            <h2>${libro.title}</h2>
            <p>Autor: ${libro.author_name ? libro.author_name.join(", ") : "Desconocido"}</p>
            <button class="btn-favorito">♡</button>
        `;

      let botonFavorito = tarjeta.querySelector(".btn-favorito");

      botonFavorito.addEventListener("click", () => {

        if (favoritos.includes(libro)) {
          favoritos = favoritos.filter(favorito => favorito != libro);
          botonFavorito.textContent = "♡";
        }

        else {
          favoritos.push(libro);
          botonFavorito.textContent = "♥";
        }
      })

    contenedor.appendChild(tarjeta);
  });
}

const buscador = document.getElementById("busqueda");

buscador.addEventListener("input", () => {
  const texto = buscador.value.trim().toLowerCase();

  const tarjetas = contenedor.querySelectorAll("article");

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.querySelector("h2").textContent.trim().toLowerCase();

    tarjeta.style.display = nombre.includes(texto) ? "" : "none";
  });
});

function filtrar() {

  const librosFiltrados = libros.filter(libro => {
    if (generoSeleccionado === "todos") {
      return true;
    }

    return libro.subject && libro.subject.some(tema =>
      tema.toLowerCase().includes(generoSeleccionado)
    )
  })

  mostrarLibros(librosFiltrados);

}

document.querySelectorAll(".btn-genero").forEach(boton => {
  boton.addEventListener("click", () => {

    generoSeleccionado = boton.dataset.genero;

    filtrar()
  })
})
