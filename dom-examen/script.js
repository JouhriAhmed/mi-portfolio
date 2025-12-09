// Ejercicio 1
let titulo = document.getElementById("titulo");
titulo.textContent = "Título actualizado";

let parrafo = document.getElementById("parrafo");
parrafo.textContent = "Texto actualizado";

// Ejercicio 2
let imagen = document.getElementById("mi-imagen");
imagen.src = "imagen2.png";

let descripcion = document.getElementById("descripcion");
descripcion.textContent = "Imagen actualizada.";
// Ejercicio 3
let tituloEstilo = document.getElementById("titulo-estilo");
tituloEstilo.style.color = "red";
tituloEstilo.style.fontSize = "32px";

// Ejercicio 4

let nuevoParrafo = document.createElement("p");

let textoParrafo = document.createTextNode("Este es un párrafo añadido");

nuevoParrafo.appendChild(textoParrafo);

let contenedor = document.getElementById("contenedor");

contenedor.appendChild(nuevoParrafo);

