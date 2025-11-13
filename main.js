const form = document.getElementById('registroForm');
const descripcion = document.getElementById('descripcion');
const contador = document.getElementById('contador');
const msgExito = document.getElementById('mensaje-exito');
const msgError = document.getElementById('mensaje-error');


descripcion.addEventListener('input', () => {
    contador.textContent = `${descripcion.value.length}/150 caracteres`;
    ActualizarProgreso();
});


function mostrarError(idCampo, mensaje) {
    const error = document.getElementById(`error-${idCampo}`);
    const campo = document.getElementById(idCampo);
    error.textContent = mensaje;
    error.style.display = 'block';
    campo.classList.add('input-error');
}

function limpiarError(idCampo) {
    const error = document.getElementById(`error-${idCampo}`);
    const campo = document.getElementById(idCampo);
    error.style.display = 'none';
    campo.classList.remove('input-error');
}


const campos = ['nombre', 'apellido', 'email', 'fecha', 'genero'];


campos.forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener('input', () => {
        limpiarError(id);
        ActualizarProgreso();
    });
    campo.addEventListener('change', () => {
        limpiarError(id);
        ActualizarProgreso();
    });
});


form.addEventListener('submit', function(e) {
    e.preventDefault();
    msgError.style.display = 'none';
    msgExito.style.display = 'none';

    let valido = true;
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const fecha = document.getElementById('fecha');
    const genero = document.getElementById('genero');
    const terminos = document.getElementById('terminos');

    if (nombre.value.trim().length < 2) {
        mostrarError('nombre', 'Por favor ingresa un nombre válido.');
        valido = false;
    }

    if (apellido.value.trim().length < 2) {
        mostrarError('apellido', 'Por favor ingresa un apellido válido.');
        valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        mostrarError('email', 'Correo electrónico inválido.');
        valido = false;
    }

    if (!fecha.value) {
        mostrarError('fecha', 'Selecciona una fecha válida.');
        valido = false;
    }

    if (!genero.value) {
        mostrarError('genero', 'Selecciona una opción.');
        valido = false;
    }

    if (!terminos.checked) {
        document.getElementById('error-terminos').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-terminos').style.display = 'none';
    }

    if (!valido) {
        msgError.style.display = 'block';
        return;
    }

    const datos = {
        nombre: nombre.value.trim(),
        apellido: apellido.value.trim(),
        email: email.value.trim(),
        fechaNacimiento: fecha.value,
        genero: genero.value,
        descripcion: descripcion.value.trim(),
        fechaRegistro: new Date().toLocaleString()
    };

    const jsonString = JSON.stringify(datos, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `registro_${datos.nombre}_${datos.apellido}.json`;
    enlace.click();

    msgExito.style.display = 'block';
    form.reset();
    contador.textContent = "0/150 caracteres";
    ActualizarProgreso(); // Reinicia la barra al enviar
});


function ActualizarProgreso() {
    let completados = 0;
    const total = campos.length;

    campos.forEach((id) => {
        const campo = document.getElementById(id);
        if (campo.type !== "checkbox" && campo.value.trim() !== "") {
            completados++;
        }
    });

    const porcentaje = Math.round((completados / total) * 100);
    const barra = document.getElementById("barraProgreso");

    if (barra) {
        barra.style.width = porcentaje + "%";
        barra.textContent = porcentaje + "%";
    }
}