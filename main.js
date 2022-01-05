const nav = document.getElementById("nav");
const main = document.querySelector("main");
const footer = document.querySelector("footer")
const seccionInicio = document.getElementById("seccion-inicio");
const seccionPrincipal = document.getElementById("seccion-principal");
const seccionPersonajes = document.getElementById("seccion-personajes");
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");
const botonSeccionPersonajes = document.getElementById("boton-seccion-personajes");
const botonSeccionBusqueda = document.getElementById("boton-seccion-busqueda");
const botonSeccionComics = document.getElementById("boton-seccion-comics");
const todasLasSecciones = document.querySelectorAll(".secciones");
const siguientePagina = document.getElementById("next");
const paginaAnterior = document.getElementById("prev")


//FUNCIONES Y VARIABLES AUXILIARES

let offset = 0;


const ocultarSecciones = () => {
    todasLasSecciones.forEach((seccion)=> {
        seccion.classList.add("ocultar");
    })
}

const desvanecerSeccion = (seccion) => {
    seccion.style.transitionProperty = "opacity";
    seccion.style.opacity = "0";
}


///

botonDeslizarSeccionAbajo.onclick = () => {
    seccionInicio.classList.add("trasladar-hacia-arriba");
    setTimeout (()=> {
        seccionInicio.style.display = "none"
    },900)
    main.classList.remove("ocultar")
    seccionPrincipal.classList.remove("ocultar");
   

}

const vibrarOnomatopeya = (onomatopeya) => {
    onomatopeya.style.animationName = "rotacion";
    setTimeout(() => {
        onomatopeya.style.animationName = "";
    }, 600)
}



botonSeccionPersonajes.onclick = () => {
    vibrarOnomatopeya(botonSeccionPersonajes);
    desvanecerSeccion(seccionPrincipal);
    setTimeout (() => {
        seccionPrincipal.classList.add("ocultar")
    },800)
    
    seccionPersonajes.classList.remove("ocultar");
    //aparece la seccion personajes
    //llamado a la api con todos los persoanjes
    // analogamente en las dos funciones de abajo
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


const mostrarListaPersonajes = () => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=1fd738e2dc343485449632dfe8caffa1&offset=${offset}`)
    .then(res => res.json())
    .then(data => {
        personajesHTML(data.data.results)
    })
}

const personajesHTML = (personaje) => {
    const contenedorTarjetasPersonajes = document.getElementById("contenedor-tarjetas-personajes");
    const html = personaje.reduce((acc,element) => {
        return acc + `
        <div class="tarjeta-personaje">
            <div class="contenedor-imagen-comic">
                <img class="imagen-personaje" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="Comic:${element.name}">
            </div>
            <h4 class="nombre-personaje">${element.name}</h4>
        </div>`
    },"")

    contenedorTarjetasPersonajes.innerHTML = html;
}



// mostrarListaPersonajes()

siguientePagina.onclick = () => {
    offset += 20
    mostrarListaPersonajes()
}


