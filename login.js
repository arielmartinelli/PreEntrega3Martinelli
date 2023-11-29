function iniciarSesion() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosRegistrados.find(user => user.username === username && user.password === password);

    if (usuarioExistente) {
        redireccionarAPagina();
    } else {
        alert('Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
}

function registrarUsuario() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosRegistrados.find(user => user.username === newUsername);

    if (usuarioExistente) {
        alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
    } else {
        const nuevoUsuario = {
            username: newUsername,
            password: newPassword
        };

        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

        alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
        mostrarFormularioLogin();
    }
}

function redireccionarAPagina() {
    window.location.href = 'inicio.html';
}

function mostrarFormularioRegistro() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registroForm').style.display = 'block';
}

function mostrarFormularioLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registroForm').style.display = 'none';
}

document.getElementById('newPassword').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        registrarUsuario();
    }
});

document.getElementById('password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        iniciarSesion();
    }
});

