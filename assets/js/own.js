let jsonData = {}; // Variable global

// Cargar el JSON
fetch("assets/data/data.json")
  .then(response => response.json())
  .then(data => {
    jsonData = data; // Guardar los datos globalmente
    updatePage(); // Llamar a una función para actualizar la UI
  })
  .catch(error => console.error("Error cargando JSON:", error));

// Función para usar los datos en la página
function updatePage() {
  document.getElementById("nombre").textContent = jsonData.nombre;
  document.getElementById("descripcion").innerHTML = jsonData.descripcion;
  proyectos(jsonData.proyectos);
}

function proyectos(proyectos){
    let contenedor= document.getElementById("proyectos")
    proyectos.forEach(proyecto=>{
        let card= `<div class="proyecto">
          <div>${proyecto.titulo}</div>
          <div>${proyecto.descripcion}</div>
        </div>`;
        contenedor.innerHTML +=card;
    });
}