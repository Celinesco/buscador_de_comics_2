
const seccionInicio = document.getElementById("seccion-inicio");
const seccionPrincipal = document.getElementById("seccion-principal");
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");
const botonSeccionPersonajes = document.getElementById("boton-seccion-personajes");
const botonSeccionBusqueda = document.getElementById("boton-seccion-busqueda");
const botonSeccionComics = document.getElementById("boton-seccion-comics");
const todasLasSecciones = document.querySelectorAll(".secciones");


//FUNCIONES AUXILIARES

const ocultarSecciones = () => {
    todasLasSecciones.forEach((seccion)=> {
        seccion.classList.add("ocultar");
    })
}

const desvanecerSeccion = (seccion) => {
    seccion.style.transitionProperty = "opacity";
    seccion.style.opacity = "0";
}


botonDeslizarSeccionAbajo.onclick = () => {
    seccionInicio.classList.add("trasladar-hacia-arriba");
    setTimeout (()=> {
        seccionInicio.style.display = "none"
    },900)
}

const vibrarOnomatopeya = (onomatopeya) => {
    onomatopeya.style.animationName = "rotacion";
    setTimeout(() => {
        onomatopeya.style.animationName = "";
    }, 600)
}



botonSeccionPersonajes.onclick = () => {
    vibrarOnomatopeya(botonSeccionPersonajes);
    setTimeout (() => {
        desvanecerSeccion(seccionPrincipal)
    },800)

    //aparece la seccion personajes
    //llamado a la api con todos los persoanjes
}

botonSeccionBusqueda.onclick = () => {
    vibrarOnomatopeya(botonSeccionBusqueda);
    setTimeout (() => {
        desvanecerSeccion(seccionPrincipal)
    },800)
}

botonSeccionComics.onclick = () => {
    vibrarOnomatopeya(botonSeccionComics);
    setTimeout (() => {
        desvanecerSeccion(seccionPrincipal)
    },800)
}



