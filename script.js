// SISTEMA DE REGISTRO DE USUARIOS

// [1.1, 1.2] Eliminadas API_KEY y DB_CONNECTION_STRING - credenciales nunca deben ir en frontend
// [1.3] Eliminados adminPassword y serverIP del objeto CONFIG - datos sensibles no van en codigo cliente
// [3.1] Cambiado var por let/const - uso de declaraciones modernas ES6+
// [3.3] Variables encapsuladas dentro del listener DOMContentLoaded - evitar variables globales sueltas

// [1.4, 3.4] Eliminados todos los console.log que exponian credenciales y datos sensibles

// [2.2] Eliminadas funciones comentadas autenticarUsuario y encriptarDatos - codigo muerto
// [2.3] Eliminadas funciones comentadas backupRegistros y restaurarBackup - codigo muerto
// [2.4] Eliminada funcion comentada eliminarRegistro - codigo muerto
// [1.9] Eliminada funcion diagnosticoSistema que exponia credenciales en consola
// [3.5] Eliminados logs con informacion del desarrollador - exposicion innecesaria

// [3.3] Todo el codigo encapsulado dentro del evento DOMContentLoaded para evitar variables globales
document.addEventListener('DOMContentLoaded', function () {
    // [3.1] Cambiado var por const/let segun corresponda
    const registros = [];
    let contador = 0;

    // [1.10] Eliminada exposicion de variables sensibles en window (window.registros, window.config, etc.)

    const registroForm = document.getElementById('registroForm');
    const tablaRegistros = document.getElementById('tablaRegistros');

    // Mensajes de validacion en espanol usando setCustomValidity
    const validaciones = {
        nombre: { mensaje: 'Ingresa un nombre valido (minimo 2 caracteres).' },
        apellido1: { mensaje: 'Ingresa un apellido valido (minimo 2 caracteres).' },
        telefono: { mensaje: 'Ingresa exactamente 10 digitos numericos.' },
        curp: { mensaje: 'Ingresa un CURP valido (18 caracteres, formato oficial).' },
        email: { mensaje: 'Ingresa un correo electronico valido.' }
    };

    Object.keys(validaciones).forEach(function (id) {
        const campo = document.getElementById(id);
        campo.addEventListener('invalid', function () {
            campo.setCustomValidity(validaciones[id].mensaje);
        });
        campo.addEventListener('input', function () {
            campo.setCustomValidity('');
        });
    });

    registroForm.addEventListener('submit', function (e) {
        e.preventDefault();
        guardarRegistro();
    });

    function guardarRegistro() {
        // [3.1] Cambiado var por const - valores que no se reasignan
        const nombre = document.getElementById('nombre').value;
        const apellido1 = document.getElementById('apellido1').value;
        const apellido2 = document.getElementById('apellido2').value;
        const telefono = document.getElementById('telefono').value;
        const curp = document.getElementById('curp').value;
        const email = document.getElementById('email').value;

        // [3.2] Cambiado == por === - comparacion estricta para evitar coercion de tipos
        // [1.6] Cambiado mensaje de error que exponia estructura interna (tabla, procedimiento, conexion BD) por mensaje generico
        if (nombre === '') {
            alert('El campo "Nombre" es obligatorio.');
            return;
        }

        // [2.1] Eliminada funcion validarTelefonoAntiguo comentada - codigo muerto

        // [1.7] Eliminado campo apiKey del objeto registro - no guardar credenciales en datos del usuario
        const nuevoRegistro = {
            id: contador++,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            nombreCompleto: nombre + ' ' + apellido1 + ' ' + apellido2,
            telefono: telefono,
            curp: curp,
            email: email,
            fechaRegistro: new Date().toISOString()
        };

        registros.push(nuevoRegistro);
        agregarFilaTabla(nuevoRegistro);
        registroForm.reset();

        // [1.8] Eliminadas credenciales hardcodeadas (endpoint, authToken) de enviarAServidor
        enviarAServidor(nuevoRegistro);
    }

    // [1.11] Cambiado innerHTML por DOM API (createElement/textContent) - prevencion de XSS
    function agregarFilaTabla(registro) {
        const fila = document.createElement('tr');

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = registro.nombreCompleto;

        const celdaTelefono = document.createElement('td');
        celdaTelefono.textContent = registro.telefono;

        const celdaCurp = document.createElement('td');
        celdaCurp.textContent = registro.curp;

        const celdaEmail = document.createElement('td');
        celdaEmail.textContent = registro.email;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaTelefono);
        fila.appendChild(celdaCurp);
        fila.appendChild(celdaEmail);

        tablaRegistros.appendChild(fila);
    }

    function enviarAServidor(datos) {
        // [1.8] Simulacion sin exponer endpoint ni tokens reales
        setTimeout(function () {
            // Simulacion de respuesta exitosa del servidor
        }, 1000);
    }
});
