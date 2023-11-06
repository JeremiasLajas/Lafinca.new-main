import { insertarPropiedades, obtenerPropiedades, actualizarPropiedades } from "../modelos/propiedades";
const btnNuevo = document.querySelector('#btnNuevo');
const formularioModal = new bootstrap.Modal(document.getElementById('formularioModal'));
const formulario = document.querySelector('#formulario');
// Alerta
const alerta = document.querySelector('#alerta');

// Inputs
const inputCodigo = document.querySelector("#codigo");
const inputTitulo = document.querySelector("#titulo");
const inputPropietario = document.querySelector("#propietario");
const inputPrecio = document.querySelector("#precio");
const inputOperacion = document.querySelector("#operacion");
const inputMt2 = document.querySelector("#mt2");
const inputAmbientes = document.querySelector("#ambientes");
const inputDireccion = document.querySelector("#direccion");
const inputDescripcion = document.querySelector("#descripcion");
const inputImagen = document.querySelector("#imagen");

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// Variables
let opcion = '';
let id;
let codigo;
let mensajeAlerta;

// Evento que sucede cuando todo el contenido del DOM es leído
document.addEventListener('DOMContentLoaded', () => {
  mostrarPropiedades();
});

/**
 * Ejecuta el evento click del Botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
  // Limpiamos los inputs
  inputCodigo.value = null;
  inputTitulo.value = null;
  inputPropietario.value = null;
  inputPrecio.value = null;
  inputOperacion.value = null;
  inputMt2.value = null;
  inputAmbientes.value = null;
  inputDireccion.value = null;
  inputDescripcion.value = null;
  inputImagen.value = null;
  frmImagen.src = './imagen/imagenNodisponible.png';
  

  // Mostramos el formulario
  formularioModal.show();

  opcion = 'insertar';
});


async function mostrarPropiedades() {
  const propiedades = await obtenerPropiedades();

  const listado = document.getElementById('listado');
  listado.innerHTML = '';
  for (let propiedad of propiedades) {
    console.log(propiedad);
    listado.innerHTML += `
    <div class="col  py-3">
      <div class="card" style="width: 18rem;">
          <img src="imagen/${propiedad.imagen}" class="card-img-top" alt="${propiedad.titulo}">
          <div class="card-body">
              <h5 class="card-title"><span name="spantitulo">${propiedad.titulo}</span> - <span name="spanoperacion">${propiedad.operacion} </span></h5>
              <p class="card-text"><span name="spandescripcion">${propiedad.descripcion}</span> <span name="spanmt2"> M2: ${propiedad.mt2} <span name="spanambientes"> Ambientes: ${propiedad.ambientes} <span name="spandireccion"> Direccion: ${propiedad.direccion}</p>
              <p class="card-text"> <span name="spanpropietario"> ${propiedad.propietario}</span></p>
              <p class="card-text"><span name="spanprecio">Precio: U$D ${propiedad.precio}</span></p>
            <div class="card-footer d-flex justify-content-center">
              <a class="btnEditar btn btn-primary">Editar</a>
              <a class="btnBorrar btn btn-danger">Borrar</a>
              <input type="hidden" class="idPropiedad" value="${propiedad.id}">
              
              <input type="hidden" class="imagenPropiedad" value="${propiedad.imagen ?? 'imagenNodisponible.jpg'}">
            </div>
          </div>
      </div>
    </div>
      `
  }
}

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function (e) {
  e.preventDefault();     // Prevenimos la acción por defecto
  const datos = new FormData(formulario); // Guardamos los datos del formulario

  switch (opcion) {
    case 'insertar':
      mensajeAlerta = `Datos guardados`;
      insertarPropiedades(datos);
      break;

    case 'actualizar':
      mensajeAlerta = `Datos actualizados`;
      actualizarPropiedades(datos, id);
      break;
  }
  insertarAlerta(mensajeAlerta, 'success');
  mostrarPropiedades();
})

/**
* Define el mensaje de alerta
* @param mensaje el mensaje a mostrar
* @param tipo el tipo de alerta
*/
const insertarAlerta = (mensaje, tipo) => {
  const envoltorio = document.createElement('div');
  envoltorio.innerHTML = `
  <div class="alert alert-${tipo} alert-dismissible" role="alert">
      <div>${mensaje}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  </div>
  `;
  alerta.append(envoltorio);
};

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento el elemento al que se realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
  elemento.addEventListener(evento, e => { // Agregamos el método para escuchar el evento
    if (e.target.closest(selector)) { // Si el objetivo del manejador es el selector
      manejador(e); // Ejecutamos el método del manejador
    }
  })
}

/**
 * Función para el botón Editar
 */
on(document, 'click', '.btnEditar', e => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón

  // Guardamos los valores del card de la propiedad
  id = cardFooter.querySelector('.idPropiedad').value;
  const titulo = cardFooter.parentNode.querySelector('span[name=spantitulo]').innerHTML;
  const propietario = cardFooter.parentNode.querySelector('span[name=spanpropietario]').innerHTML;
  const operacion = cardFooter.parentNode.querySelector('span[name=spanoperacion]').innerHTML;
  const precio = cardFooter.parentNode.querySelector('span[name=spanprecio]').innerHTML;
  const mt2 = cardFooter.parentNode.querySelector('span[name=spanmt2]').innerHTML;
  const ambientes = cardFooter.parentNode.querySelector('span[name=spanambientes]').innerHTML;
  const direccion = cardFooter.parentNode.querySelector('span[name=spandireccion]').innerHTML;
  const descripcion = cardFooter.parentNode.querySelector('span[name=spandescripcion]').innerHTML;
  const imagen = cardFooter.querySelector('.imagenPropiedad').value;

  // Asignamos los valores a los input del formulario
  inputTitulo.value = titulo;
  inputPropietario.value = propietario;
  inputOperacion.value = operacion;
  inputPrecio.value = precio;
  inputMt2.value = mt2;
  inputAmbientes.value = ambientes;
  inputDireccion.value = direccion;
  inputDescripcion.value = descripcion;
  
  frmImagen.src = `./imagen/${imagen}`;

  // Mostramos el formulario
  formularioModal.show();

  opcion = 'actualizar';

});


/**
 *  Función para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
  id = cardFooter.querySelector('.idPropiedad').value; // Obtenemos el id de la propiedad
  const titulo = cardFooter.parentNode.querySelector('span[name=spantitulo]').innerHTML; // Obtenemos el nombre del artículo
  let aceptar = confirm(`¿Realmente desea eliminar a ${titulo}`); // Pedimos confirmación para eliminar
  if (aceptar) {
    eliminarPropiedades(id);
    insertarAlerta(`${titulo}  borrado`, 'danger');
    mostrarPropiedades();
  }
});