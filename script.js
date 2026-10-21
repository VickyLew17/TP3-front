fetch("https://openlibrary.org/search.json?q=romance&limit=30")          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Libros cargados');
    console.log(data);

    
  })

  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error:', error);
  });

let libros = [];