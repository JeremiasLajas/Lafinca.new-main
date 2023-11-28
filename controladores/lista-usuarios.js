// Importa las funciones y variables de usuarios en lugar de propiedades
import { insertarUsuarios, obtenerUsuarios, actualizarUsuarios, eliminarUsuarios } from "../modelos/usuarios";

const btnAgregar = document.querySelector('#btnAgregar');
const formularioModal = new bootstrap.Modal(document.getElementById('formularioModal'));
const formulario = document.querySelector('#formulario');
const contenedorUsuarios = document.querySelector('#lista-usuario tbody')
// Alerta
const alerta = document.querySelector('#alerta');

// Imputs
const inputCodigo = document.querySelector("#codigo");
const inputNombre = document.querySelector("#nombreYApellido");
const inputCorreo = document.querySelector("#correo");
const inputDni = document.querySelector("#dni");
const inputFechaDeNacimiento = document.querySelector("#fechaDeNacimiento");
const inputSexo = document.querySelector("#sexo");
const inputDireccion = document.querySelector("#direccion");
const inputLocalidad = document.querySelector("#localidad");
const inputProvincia = document.querySelector("#provincia");
const inputPassword = document.querySelector("#password");
const inputObservaciones = document.querySelector("#observaciones");
const inputTelefono = document.querySelector("#telefono");

// Variables
let opcion = '';
let id;
let codigo;
let mensajeAlerta;

// Evento que sucede cuando todo el contenido del DOM es leído
document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarios();
});

/**
* Ejecuta el evento click del Botón Nuevo
*/
btnAgregar.addEventListener('click', () => {
    // Limpiamos los inputs
    inputCodigo.value = null;
    inputNombre.value = null;
    inputCorreo.value = null;
    inputDni.value = null;
    inputFechaDeNacimiento.value = null;
    inputSexo.value = null;
    inputDireccion.value = null;
    inputLocalidad.value = null;
    inputProvincia.value = null;
    inputPassword.value = null;
    inputObservaciones.value = null;
    inputTelefono.value = null;


    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
});

// Función para mostrar usuarios
async function mostrarUsuarios() {
    const usuarios = await obtenerUsuarios();
    const listado = document.getElementById('listado');
    listado.innerHTML = '';
    for (let usuario of usuarios) {
        console.log(usuario);
        // Código similar al anterior, adaptado para mostrar usuarios
        listado.innerHTML += `
            <tr>
    <td>${usuario.codigo}</td>
    <td>${usuario.nombreyapellido}</td>
    <td>${usuario.correo}</td>
    <td>
        <!-- Botones para modificar y eliminar usuario -->
        <button type="button" class="btnEditar btn-primary btn-sm" data-toggle="modal" data-target="#editUserModal">
            Editar
        </button>
        <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteUserModal">
            Eliminar
        </button>
        <input type="hidden" class="idUsuario" value="${usuario.id}">
    </td>
</tr>

      `;


    }
}

// Evento submit del formulario, adaptado para usuarios
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const datos = new FormData(formulario);

    switch (opcion) {
        case 'insertar':
            mensajeAlerta = `Datos guardados`;
            insertarUsuarios(datos);
            break;

        case 'actualizar':
            mensajeAlerta = `Datos actualizados`;
            actualizarUsuarios(datos, id);
            break;
    }

    insertarAlerta(mensajeAlerta, 'success');
    mostrarUsuarios();
});

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

// Evento para el botón Editar, adaptado para usuarios
on(document, 'click', '.btnEditar', e => {
    const botones = e.target.parentNode;
    id = botones.querySelector('.idUsuario').value;
    const codigo = botones.parentNode.querySelector('span[name=spancodigo]').innerHTML;
    const nombre = botones.parentNode.querySelector('span[name=spannombre]').innerHTML;
    const correo = botones.parentNode.querySelector('span[name=spancorreo]').innerHTML;
    const dni = botones.parentNode.querySelector('span[name=spandni]').innerHTML;
    const fechadenac = botones.parentNode.querySelector('span[name=spanfechadenac]').innerHTML;
    const sexo = botones.parentNode.querySelector('span[name=spansexo]').innerHTML;
    const dirección = botones.parentNode.querySelector('span[name=spandirección]').innerHTML;
    const localidad = botones.parentNode.querySelector('span[name=spanlocalidad]').innerHTML;
    const provincia = botones.parentNode.querySelector('span[name=spanprovincia]').innerHTML;
    const password = botones.parentNode.querySelector('span[name=spanpassword]').innerHTML;

    inputCodigo.value = codigo;
    inputNombre.value = nombre;
    inputCorreo.value = correo;
    inputDni.value = dni;
    inputFechadenac.value = fechadenac;
    inputSexo.value = sexo;
    inputDireccion.value = direccción;
    inputLocalidad.value = localidad;
    inputProvincia.value = provincia;
    inputPassword.value = password;

    // Mostrar formulario
    formularioModal.show();
    opcion = 'actualizar';
});

// Evento para el botón Borrar, adaptado para usuarios
on(document, 'click', '.btnBorrar', e => {
    const botones = e.target.parentNode;
    id = botones.querySelector('.idUsuario').value;
    const nombre = botones.parentNode.querySelector('span[name=spannombre]').innerHTML;
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}?`);

    if (aceptar) {
        eliminarUsuarios(id);
        insertarAlerta(`${nombre} eliminado`, 'danger');
        mostrarUsuarios();
    }
});