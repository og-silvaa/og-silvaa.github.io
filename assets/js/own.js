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
  habilidades(jsonData.habilidades);
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
     let icono = jsonData.iconos[tecnologia];
    
     if (icono!=undefined) {
       card += `<img class="icono" src="images/icon/${icono}.png" title="${tecnologia}">`;
     } else {
       card += `${tecnologia}   `
     }
   });
  return card+"</div>";
}
function habilidades(habilidades){
  let contenedor=document.getElementById("habilidades");
  let table=document.createElement("table");
  
  habilidades.forEach((habilidad,i)=>{
    fila(habilidad,table);
  })
  contenedor.appendChild(table);
}

function fila(arbol, padre){
  let contenedor = padre
  let trCreate=false;
  if(padre.nodeName!="TR"){
      let tr= document.createElement("tr")
      contenedor=tr
      trCreate=true;
    }
  
  let td = document.createElement("td");
  td.innerHTML=arbol.nombre;
  contenedor.appendChild(td);

  if(arbol.detalles){
    arbol.detalles.forEach((detalle,i)=>{
      
      fila(detalle,contenedor)
      if(trCreate){
        padre.appendChild(contenedor);
      }
    })
  }
}
