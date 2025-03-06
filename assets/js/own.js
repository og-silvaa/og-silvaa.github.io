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

function proyectos(proyectos) {
  let contenedor = document.getElementById("proyectos")
  proyectos.forEach(proyecto => {
    if (proyecto.visible == false) return;
    let card = `
          <div class="proyecto">
          <h3>${proyecto.titulo}</h3>
          ${entidad(proyecto)}
          <div>${proyecto.descripcion}</div>
          ${tecnologias(proyecto.tecnologias)}
        </div>`;
    contenedor.innerHTML += card;
  });
}
function entidad(proyecto) {
  let card = ``;
  if (proyecto.entidadVisible || new Date().getFullYear() - proyecto.anio > 4)
    card += `<h4>${proyecto.entidad} - ${proyecto.anio}</h4>`;
  else
    card += `<h4>Importante ${proyecto.rubro} en ${proyecto.pais} - ${proyecto.anio}</h4>`;
  return card;
}
function tecnologias(tecnologias) {
  if(tecnologias==undefined) return "";
  let card = `<div>`;

  tecnologias.forEach(tecnologia => {
    let icono = jsonData.iconos.find(icono => tecnologia == Object.keys(icono)[0])
    console.log(tecnologia);
    console.log(icono);
    
    if (icono!=undefined) {
      card += `<img class="icono" src="images/icon/${Object.values(icono)[0]}.png" title="${tecnologia}">`;
    } else {
      card += `${tecnologia}   `
    }
  });
  return card+"</div>";
}