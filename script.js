// Base de datos de la carrera
const dataMalla = [
    { sem: 1, ramos: ["Práctica I", "Introducción a la medicina veterinaria", "Zoología", "Biología", "Química General", "Introducción a la vida universitaria", "Estrategias de resolución de problemas"] },
    { sem: 2, ramos: ["INGLES I", "COMUNICACION Y TECNOLOGIA", "QUIMICA ORGANICA I BIOQUIMICA", "ESTADISTICA", "HISTOLOGIA Y EMBRIOLOGIA", "ECOLOGIA", "PRACTICA II"] },
    { sem: 3, ramos: ["ANATOMIA I", "FISIOLOGIA VETERINARIA", "GESTION AMBIENTAL Y CONSERVACION", "PRACTICA III", "ETOLOGIA Y BIENESTAR ANIMAL", "INGLES II"] },
    { sem: 4, ramos: ["ANATOMIA II", "INTERACCION HOSPEDERO PATOGENO", "MODULO INTEGRADOR CICLO INICIAL", "FISIOLOGIA ESPECIAL", "INGLES III", "FORMACION DE LIDERES DEL MAÑANA", "GENETICA PECUARIA"] },
    { sem: 5, ramos: ["PRACTICA IV", "PATOLOGIA FUNCIONAL", "ALIMENTACION Y NUTRICION ANIMAL", "INSPECCION Y CONTROL DE ALIMENTOS", "EPIDEMIOLOGIA", "ANALISIS Y RESOLUCION DE CONFLICTOS"] },
    { sem: 6, ramos: ["PRACTICA V", "PATOLOGIA ESPECIAL", "FARMACOLOGIA Y TERAPEUTICA", "HEMATOLOGIA Y LABORATORIO CLINICO", "SEMIOLOGIA", "ELECTIVO DE FORMACION GENERAL"] },
    { sem: 7, ramos: ["PRACTICA VI", "ENFERMEDADES INFECCIOSAS Y PARASITARIAS", "PRODUCCION ANIMAL I", "GINECOLOGIA Y OBSTETRICIA", "METODOLOGIA DE LA INVESTIGACION", "PROYECTOS DE RESPONSABILIDAD SOCIAL Y EMPRENDIMIENTO"] },
    { sem: 8, ramos: ["CIRUGIA GENERAL", "SALUD PUBLICA", "PRODUCCION ANIMAL II", "MEDICINA INTERNA", "MODULO INTEGRADOR CICLO INTERMEDIO", "APLICACION DE PROYECTOS"] },
    { sem: 9, ramos: ["TECNICAS QUIRURGICAS", "IMAGENOLOGIA", "CLINICA DE ANIMALES MAYORES", "ECONOMIA Y ADMINISTRACION DE EMPRESAS VETERINARIAS", "CLINICA DE ANIMALES MENORES", "ELECTIVO DE ESPECIALIDAD I"] },
    { sem: 10, ramos: ["MODULO INTEGRADO PROFESIONAL", "EVALUACION DE PROYECTOS", "SALUD LABORAL Y LEGISLACION VETERINARIA", "ELECTIVO DE ESPECIALIDAD II"] }
];

const requisitos = {
    "COMUNICACION Y TECNOLOGIA": ["Introducción a la vida universitaria"],
    "QUIMICA ORGANICA I BIOQUIMICA": ["Química General"],
    "HISTOLOGIA Y EMBRIOLOGIA": ["Biología"],
    "ECOLOGIA": ["Zoología"],
    "PRACTICA II": ["Práctica I"],
    "ANATOMIA I": ["HISTOLOGIA Y EMBRIOLOGIA"],
    "FISIOLOGIA VETERINARIA": ["HISTOLOGIA Y EMBRIOLOGIA"],
    "GESTION AMBIENTAL Y CONSERVACION": ["ECOLOGIA"],
    "PRACTICA III": ["PRACTICA II"],
    "INGLES II": ["INGLES I"],
    "ANATOMIA II": ["ANATOMIA I"],
    "INTERACCION HOSPEDERO PATOGENO": ["FISIOLOGIA VETERINARIA"],
    "MODULO INTEGRADOR CICLO INICIAL": ["ETOLOGIA Y BIENESTAR ANIMAL", "PRACTICA III", "GESTION AMBIENTAL Y CONSERVACION"],
    "INGLES III": ["INGLES II"],
    "PRACTICA IV": ["MODULO INTEGRADOR CICLO INICIAL"],
    "PATOLOGIA FUNCIONAL": ["FISIOLOGIA ESPECIAL"],
    "ALIMENTACION Y NUTRICION ANIMAL": ["FISIOLOGIA ESPECIAL"],
    "INSPECCION Y CONTROL DE ALIMENTOS": ["INTERACCION HOSPEDERO PATOGENO"],
    "EPIDEMIOLOGIA": ["INTERACCION HOSPEDERO PATOGENO"],
    "ANALISIS Y RESOLUCION DE CONFLICTOS": ["FORMACION DE LIDERES DEL MAÑANA"],
    "PRACTICA V": ["PRACTICA IV"],
    "PATOLOGIA ESPECIAL": ["PATOLOGIA FUNCIONAL"],
    "HEMATOLOGIA Y LABORATORIO CLINICO": ["FISIOLOGIA ESPECIAL"],
    "PRACTICA VI": ["PRACTICA V"],
    "ENFERMEDADES INFECCIOSAS Y PARASITARIAS": ["PATOLOGIA ESPECIAL"],
    "PRODUCCION ANIMAL I": ["ALIMENTACION Y NUTRICION ANIMAL"],
    "GINECOLOGIA Y OBSTETRICIA": ["SEMIOLOGIA"],
    "PROYECTOS DE RESPONSABILIDAD SOCIAL Y EMPRENDIMIENTO": ["ANALISIS Y RESOLUCION DE CONFLICTOS"],
    "CIRUGIA GENERAL": ["FARMACOLOGIA Y TERAPEUTICA"],
    "SALUD PUBLICA": ["EPIDEMIOLOGIA"],
    "PRODUCCION ANIMAL II": ["PRODUCCION ANIMAL I"],
    "MEDICINA INTERNA": ["ENFERMEDADES INFECCIOSAS Y PARASITARIAS"],
    "MODULO INTEGRADOR CICLO INTERMEDIO": ["PRODUCCION ANIMAL I", "PRACTICA VI"],
    "APLICACION DE PROYECTOS": ["PROYECTOS DE RESPONSABILIDAD SOCIAL Y EMPRENDIMIENTO"],
    "TECNICAS QUIRURGICAS": ["CIRUGIA GENERAL"],
    "IMAGENOLOGIA": ["MEDICINA INTERNA"],
    "CLINICA DE ANIMALES MAYORES": ["MEDICINA INTERNA"],
    "CLINICA DE ANIMALES MENORES": ["MEDICINA INTERNA"],
    "MODULO INTEGRADO PROFESIONAL": ["CLINICA DE ANIMALES MAYORES", "CLINICA DE ANIMALES MENORES"],
    "EVALUACION DE PROYECTOS": ["ECONOMIA Y ADMINISTRACION DE EMPRESAS VETERINARIAS"]
};

let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

function renderMalla() {
    const contenedor = document.getElementById('malla');
    contenedor.innerHTML = '';

    dataMalla.forEach(semestre => {
        const col = document.createElement('div');
        col.className = 'semestre-col';
        col.innerHTML = `<h2>Semestre ${semestre.sem}</h2>`;

        semestre.ramos.forEach(nombreRamo => {
            const card = document.createElement('div');
            card.className = 'ramo-card';
            card.textContent = nombreRamo;
            
            const reqs = requisitos[nombreRamo.toUpperCase()] || [];
            const estaAprobado = aprobados.includes(nombreRamo);
            const bloqueado = reqs.some(r => !aprobados.includes(r));

            if (estaAprobado) card.classList.add('aprobado');
            if (bloqueado && !estaAprobado) card.classList.add('bloqueado');

            card.onclick = () => toggleRamo(nombreRamo, bloqueado, reqs);
            col.appendChild(card);
        });
        contenedor.appendChild(col);
    });
    actualizarProgreso();
}

function toggleRamo(nombre, bloqueado, reqs) {
    if (aprobados.includes(nombre)) {
        aprobados = aprobados.filter(r => r !== nombre);
    } else {
        if (bloqueado) {
            const faltantes = reqs.filter(r => !aprobados.includes(r));
            showToast(`Bloqueado. Faltan: ${faltantes.join(', ')}`);
            return;
        }
        aprobados.push(nombre);
    }
    localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
    renderMalla();
}

function actualizarProgreso() {
    const totalRamos = dataMalla.reduce((acc, s) => acc + s.ramos.length, 0);
    const porcentaje = Math.round((aprobados.length / totalRamos) * 100);
    document.getElementById('progress-text').textContent = `Progreso: ${porcentaje}%`;
}

function showToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

document.getElementById('btn-reset').onclick = () => {
    if(confirm("¿Seguro que quieres reiniciar todo tu progreso?")) {
        aprobados = [];
        localStorage.removeItem('ramosAprobados');
        renderMalla();
    }
};

renderMalla();
