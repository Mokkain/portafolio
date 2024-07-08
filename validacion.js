const submitButton = form.querySelector('.formcontato__boton');
const campoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!submitButton.disabled) {
        alert("Mensaje enviado correctamente.");
        formulario.reset();
        submitButton.disabled = true;
    }
});

campoFormulario.forEach((campo) => {

    campo.addEventListener("blur", () => {
        verificarCampo(campo);
        verificarFormulario();
    });

    campo.addEventListener("input", () => {
        verificarCampo(campo);
        verificarFormulario();
    });

    campo.addEventListener("invalid", e => e.preventDefault());
});

const tiposError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooShort",
    "tooLong",
];

const mensajes = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío.",
        patternMismatch: "Por favor, ingrese un nombre válido.",
        tooShort: "Por favor, ingrese un nombre válido.",
        tooLong: "Debe contener máximo 50 carácteres.",
    },
    email: {
        valueMissing: "El campo email no puede estar vacío.",
        typeMismatch: "Debe contener '@' y un dominio. Ejemplo: texto@dominio.com",
        tooLong: "Por favor, ingrese un e-mail válido.",
    },
    asunto: {
        valueMissing: "El campo Asunto no puede estar vacío.",
        tooShort: "Por favor, ingrese un Asunto válido.",
        tooLong: "Debe contener máximo 50 carácteres.",
    },
    mensaje: {
        valueMissing: "El campo Mensaje no puede estar vacío.",
        tooShort: "Por favor, ingrese un Mensaje válido.",
        tooLong: "Debe contener máximo 300 carácteres.",
    },
};

function verificarCampo(campo) {

    let mensaje = "";
    campo.setCustomValidity("");

    if (campo.name === "nombre") {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(campo.value)) {
            campo.setCustomValidity("patternMismatch");
            mensaje = mensajes[campo.name].patternMismatch;
        } else if (campo.value.length >= 50) {
            campo.setCustomValidity("tooLong");
            mensaje = mensajes[campo.name].tooLong;
        }
    }

    if (campo.name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(campo.value)) {
            campo.setCustomValidity("typeMismatch");
            mensaje = mensajes[campo.name].typeMismatch;
        }
    } 

    if (campo.name == "asunto") {
        if (campo.value.length >= 50) {
            campo.setCustomValidity("tooLong");
            mensaje = mensajes[campo.name].tooLong;
        }
    }

    if (campo.name == "mensaje") {
        if (campo.value.length >= 300) {
            campo.setCustomValidity("tooLong");
            mensaje = mensajes[campo.name].tooLong;
        }
    }

    tiposError.forEach(error => {
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error];
            console.log(mensaje);
        }
    })

    const mensajeError = campo.parentNode.querySelector(".mensaje-error");

    const validarInputCheck = campo.checkValidity();

    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = "";
    }

}

function verificarFormulario() {
    let todosValidos = true;

    campoFormulario.forEach(campo => {
        if (!campo.checkValidity()) {
            todosValidos = false;
        }
    });

    submitButton.disabled = !todosValidos;
}