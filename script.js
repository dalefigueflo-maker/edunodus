function abrirLogin(rol) {
    const modal = document.getElementById(rol)
    if (modal) {
        modal.style.display = "flex"
    }
}

function cerrarLogin(rol) {
    const modal = document.getElementById(rol)
    if (modal) {
        modal.style.display = "none"
        document.getElementById("usuario-docente").value = ""
        document.getElementById("contrasena-docente").value = ""
        document.getElementById("usuario-admin").value = ""
        document.getElementById("contrasena-admin").value = ""
    }
}

function ingresarAlPortal(rol) {
    if (rol === "DOCENTE") {
        const usuario = document.getElementById("usuario-docente").value
        const contrasena = document.getElementById("contrasena-docente").value
        if (!usuario || !contrasena) {
            return alert("Todos los campos son obligatorios")
        }
        db.collection("docentes").doc(usuario).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data()
                if (data.contrasena === contrasena) {
                    document.getElementById("user-display").innerText = "Docente: " + data.usuario
                    document.getElementById("DOCENTE").style.display = "none"
                    document.getElementById("ADMINISTRATIVO").style.display = "none"
                    document.getElementById("main-area").style.display = "none"
                    document.getElementById("pag-docente").style.display = "flex"
                } else {
                    alert("Contraseña incorrecta")
                }
            } else {
                alert("Usuario no encontrado")
            }
        })
            .catch((error) => {
                console.log("Error al obtener el documento: ", error);
            })
    } else if (rol === "ADMINISTRATIVO") {
        const usuario = document.getElementById("usuario-admin").value
        const contrasena = document.getElementById("contrasena-admin").value
        if (!usuario || !contrasena) {
            return alert("Todos los campos son obligatorios")
        }
        db.collection("administradores").doc(usuario).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data()
                if (data.contrasena === contrasena) {
                    document.getElementById("user-display").innerText = "Administrador: " + data.usuario
                    document.getElementById("DOCENTE").style.display = "none"
                    document.getElementById("ADMINISTRATIVO").style.display = "none"
                    document.getElementById("main-area").style.display = "none"
                    document.getElementById("pag-administrativo").style.display = "flex"
                } else {
                    alert("Contraseña incorrecta")
                }
            } else {
                alert("Usuario no encontrado")
            }
        })
            .catch((error) => {
                console.log("Error al obtener el documento: ", error);
            })
    }
}

const materias = ["ARTESPLASTICAS", "BIOLOGIA", "COMPUTACION", "FILOSOFIA", "FISICA", "GEOGRAFIA", "HISTORIA", "INGLES", "LENGUAJE", "LITERATURA", "MATEMATICAS", "ORIENTACION", "PSICOLOGIA", "QUIMICA", "SOCIALES", "CIENCIAS NATURALES"]
const grados = ["1º Primaria", "2º Primaria", "3º Primaria", "4º Primaria", "5º Primaria", "6º Primaria", "1º Secundaria", "2º Secundaria", "3º Secundaria", "4º Secundaria", "5º Secundaria", "6º Secundaria"]
const paralelos = ["A", "B", "C"]

function terminarSesión(rol) {
    if (rol === "DOCENTE") {
        const modal = document.getElementById("pag-docente")
        if (modal) {
            modal.style.display = "none"
        }
        document.getElementById("main-area").style.display = "flex"
        document.getElementById("user-display").innerText = "Invitado"
        document.getElementById("usuario-docente").value = ""
        document.getElementById("contrasena-docente").value = ""
    } else if (rol === "ADMINISTRATIVO") {
        const modal = document.getElementById("pag-administrativo")
        if (modal) {
            modal.style.display = "none"
        }
        document.getElementById("main-area").style.display = "flex"
        document.getElementById("user-display").innerText = "Invitado"
        document.getElementById("usuario-admin").value = ""
        document.getElementById("contrasena-admin").value = ""
    }
}

function abrirAlumnosDocente() {
    document.getElementById("pag-docente").style.display = "none"
    document.getElementById("pagina-alumnos-docente").style.display = "flex"
    document.getElementById("opciones-alumnos-docentes").style.display = "flex"
    document.getElementById("opciones-alumnos-docentes").innerHTML = `
    <select class="opciones-select" id="grado-docente">
        <option value="">GRADO</option>
        ${grados.map((grado) => `<option value="${grado}">${grado}</option>`).join("")}
    </select>
    <select class="opciones-select" id="paralelo-docente">
        <option value="">PARALELO</option>
        ${paralelos.map((paralelo) => `<option value="${paralelo}">${paralelo}</option>`).join("")}
    </select>
    <button class="btn-ver" onclick="verAlumnosDocente()">VER</button>
    <button class="btn-cerrar" onclick="volverAlPaginaDocente()">VOLVER</button>
    `
}

function volverAlPaginaDocente() {
    document.getElementById("pag-docente").style.display = "flex"
    document.getElementById("pagina-alumnos-docente").style.display = "none"
    document.getElementById("opciones-alumnos-docentes").style.display = "none"
}

function verAlumnosDocente() {
    const grado = document.getElementById("grado-docente").value
    const paralelo = document.getElementById("paralelo-docente").value
    if (!grado || !paralelo) {
        return alert("Todos los campos son obligatorios")
    }
    db.collection("alumnos").where("grado", "==", grado).where("paralelo", "==", paralelo).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            console.log(data)
        })
    })
}

function abrirAsistenciasDocente() {
    document.getElementById("pag-docente").style.display = "none"
    document.getElementById("pagina-alumnos-docente").style.display = "flex"
    document.getElementById("opciones-alumnos-docentes").style.display = "flex"
}