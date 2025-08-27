// Obtenemos todas las materias
const materias = document.querySelectorAll('.materia');

// Cargamos o inicializamos el estado desde el almacenamiento local
const estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");

// Aplica los estilos según el estado actual
function actualizarUI() {
    materias.forEach(m => {
        const id = m.dataset.id;
        const prereqs = (m.dataset.prereqs || "").split(',').filter(Boolean);

        const aprobados = prereqs.every(pr => estadoMaterias[pr] === "aprobada");

        if (prereqs.length > 0 && !aprobados) {
            m.classList.add("bloqueada");
            m.classList.remove("habilitada", "aprobada");
        } else {
            if (estadoMaterias[id] === "aprobada") {
                m.classList.add("aprobada");
                m.classList.remove("bloqueada", "habilitada");
            } else {
                m.classList.add("habilitada");
                m.classList.remove("bloqueada", "aprobada");
            }
        }
    });
}

// Guardamos el estado en localStorage
function guardarEstado() {
    localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
}

// Agregamos eventos de clic para cambiar el estado
materias.forEach(m => {
    const id = m.dataset.id;
    m.addEventListener('click', () => {
        if (m.classList.contains("bloqueada")) return;

        estadoMaterias[id] = estadoMaterias[id] === "aprobada" ? null : "aprobada";
        guardarEstado();
        actualizarUI();
    });
});

// Inicialización
actualizarUI();
