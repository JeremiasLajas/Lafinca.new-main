const url = './api/login.php';

// Variables de objetos del DOM
const formLogin = document.getElementById("form-login"); // document.querySelector("#form-login")
const divLogin = document.getElementById("div-login"); 
const divLogout = document.getElementById("div-logout"); 
const textoLogueado = document.getElementById("texto-logueado"); 
const btnLogout = document.getElementById("btn-logout"); 
const inputUsuario = document.getElementById("usuario"); 
const inputPassword = document.getElementById("password"); 

// Variables
let usuario = '';
let nivel = '';
let logueado = false;

document.addEventListener('DOMContentLoaded', () => {
    verificar();
})

/**
 * Enviar los datos del formulario
 */
formLogin.addEventListener('submit', (e) => {
    e.preventDefault;
    const datos = new FormData(formLogin);
    login(datos);
})

/**
 * Busca el usuario y se loguea
 */
const login = (datos) => {
    fetch(url, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then((data => {
        console.log(data);
        if(data[0].usuario) {
            usuario = data[0].usuario;
            nivel = data[0].nivel;
            logueado = true;
            sessionStorage.setItem('usuario',usuario);
            sessionStorage.setItem('nivel',nivel);
            verificar();
        }
        inputUsuario.value = '';
        inputPassword.value = '';
    }));
    //window.location.reload();
}

/**
 * Verifica si un usuario está logueado
 */
const verificar = () => {
    if(sessionStorage.getItem('usuario')) {
        usuario = sessionStorage.getItem('usuario');
        textoLogueado.innerHTML = `Bienvenido ${usuario}`;
        logueado = true;
    }
    if(logueado) {
        divLogin.style.display = 'none';
        divLogout.style.display = 'inline';
    } else {
        divLogin.style.display = 'inline';
        divLogout.style.display = 'none';
    }
}

/**
 * Cerrar sesión
 */
const logout = () => {
    logueado = false;
    textoLogueado.innerHTML = '';
    sessionStorage.removeItem('usuario');
    verificar();
    window.location.reload()
}

/**
 * Ejecuta el clic del botón Logout
 */
btnLogout.addEventListener('click', () => {
    logout();
})