// JS/Login.js
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    // Datos de usuario (en un caso real, deberías obtenerlos de una base de datos)
    const usuarios = [
        { username: 'usuario1', password: 'contraseña1' },
        { username: 'usuario2', password: 'contraseña2' },
        // Agrega más usuarios según sea necesario
    ];

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validar el usuario
        const usuarioValido = usuarios.find(usuario => usuario.username === username && usuario.password === password);

        if (usuarioValido) {
            loginMessage.textContent = "¡Login exitoso!";
            loginMessage.style.color = "green";
            // Redirigir al usuario a principal.html
            window.location.href = "principal.html";
        } else {
            loginMessage.textContent = "Usuario o contraseña incorrectos.";
            loginMessage.style.color = "red";
        }
    });
});
