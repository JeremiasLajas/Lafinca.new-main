import { insertarPropiedades, obtenerPropiedades } from "../modelos/propiedades";
const btnNuevo = document.querySelector('#btnNuevo');
const formularioModal = new bootstrap.Modal(document.getElementById('formularioModal'));

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
              <h5 class="card-title">${propiedad.titulo} - ${propiedad.operacion} </h5>
              <p class="card-text">${propiedad.descripcion} M2: ${propiedad.mt2} Ambientes: ${propiedad.ambientes} Direccion: ${propiedad.direccion}</p>
              <p class="card-text">Propietario: ${propiedad.propietarios}</p>
              <p class="card-text">Precio: U$D ${propiedad.precio}</p>
              <a href="#" class="btn btn-primary">Consultar</a>
          </div>
      </div>
    </div>
      `
    }
}

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function(e) {
  e.preventDefault();     // Prevenimos la acción por defecto
  const datos = new FormData(formulario); // Guardamos los datos del formulario

  switch(opcion) {
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
    if(e.target.closest(selector)) { // Si el objetivo del manejador es el selector
      manejador(e); // Ejecutamos el método del manejador
    }
  })
}

/**
 * Función para el botón Editar
 */
on(document, 'click', '.btnEditar', e => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón

  // Guardamos los valores del card del artículo
  id = cardFooter.querySelector('.idArticulo').value;
  const codigo = cardFooter.parentNode.querySelector('span[name=spancodigo]').innerHTML;
  const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML;
  const descripcion = cardFooter.parentNode.querySelector('.card-text').innerHTML;
  const precio = cardFooter.parentNode.querySelector('span[name=spanprecio]').innerHTML;
  const imagen = cardFooter.querySelector('.imagenArticulo').value;

  // Asignamos los valores a los input del formulario
  inputCodigo.value = codigo;
  inputNombre.value = nombre;
  inputDescripcion.value = descripcion;
  inputPrecio.value = precio;
  frmImagen.src = `imagenes/productos/${imagen}`;

  // Mostramos el formulario
  formularioModal.show();

  opcion = 'actualizar';

});


/**
 *  Función para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
  id = cardFooter.querySelector('.idArticulo').value; // Obtenemos el id del artículo
  const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML; // Obtenemos el nombre del artículo
  let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}`); // Pedimos confirmación para eliminar
  if (aceptar) {
      eliminarArticulos(id);
      insertarAlerta(`${nombre}  borrado`, 'danger');
      mostrarArticulos();
  }
});