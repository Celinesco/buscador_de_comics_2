const nav = document.getElementById("nav");
const main = document.querySelector("main");
const footer = document.querySelector("footer")
const seccionInicio = document.getElementById("seccion-inicio");
const seccionPrincipal = document.getElementById("seccion-principal");
const seccionPersonajes = document.getElementById("seccion-personajes");
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");
const botonSeccionPersonajes = document.getElementById("boton-seccion-personajes");
const botonSeccionBusqueda = document.getElementById("boton-seccion-busqueda");
const botonSeccionComics = document.getElementById("boton-seccion-comics");
const todasLasSecciones = document.querySelectorAll(".secciones");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");
const siguientePagina = document.getElementById("next");
const paginaAnterior = document.getElementById("prev");
const primeraPagina = document.getElementById("first-page");
const ultimaPagina = document.getElementById("last-page");
const contenedorPersonajeSeleccionado = document.getElementById("contenedor-personaje-seleccionado");
const contenedor = document.getElementById("contenedor-comics-personaje-seleccionado");
const contenedorBordeBlanco = document.getElementById("contenedor-borde-blanco")

//FUNCIONES Y VARIABLES AUXILIARES
let calculoUltimaPagina = 1540;
let offset = 0;



//Comienzo de pagina
paginaAnterior.style.backgroundColor = "grey";
primeraPagina.style.backgroundColor = "grey";

//

const desactivarBotonDesplazamiento = (boton1, boton2) => {
    boton1.disabled = true;
    boton2.disabled = true;
    boton1.style.backgroundColor = "grey";
    boton2.style.backgroundColor = "grey";
}

const activarBotonesDesplazamiento = (boton1,boton2) => {
    boton1.disabled = false;
    boton2.disabled = false;
    boton1.style.backgroundColor = "#ffbf0f";
    boton2.style.backgroundColor = "#ffbf0f";
}



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
    mostrarListaPersonajes()
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
        listaPersonajesHTML(data.data.results)
        asignarClickTarjetaPersonaje()
           const tarjetas = document.querySelectorAll(".tarjeta-personaje");
           setTimeout (()=> {
            tarjetas.forEach((tarjeta)=> {
                tarjeta.classList.add("rotacion-y")
        },500)
        })
    })
}

const asignarClickTarjetaPersonaje = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje");
    tarjetas.forEach((personaje)=> {
        personaje.onclick = () => {
            contenedorBordeBlanco.classList.remove("ocultar");
            const idPersonaje = personaje.dataset.id;
            obtenerInfoPersonaje(idPersonaje)
        }
    })
    return tarjetas
}

const listaPersonajesHTML = (personaje) => {
    const contenedorTarjetasPersonajes = document.getElementById("contenedor-tarjetas-personajes");
    const html = personaje.reduce((acc,element) => {
        return acc + `
        <div class="tarjeta-personaje" data-id=${element.id}>
            <div class="contenedor-imagen-lista-personajes">
                <img class="imagen-personaje-lista-personajes" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
            </div>
            <h4 class="nombre-personaje">${element.name}</h4>
        </div>
        `
    },"")

    contenedorTarjetasPersonajes.innerHTML = html;
}


const obtenerInfoPersonaje = (id) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=1fd738e2dc343485449632dfe8caffa1`)
    .then(res => res.json())
    .then(data => {
        imprimirPersonajeHTML(data.data.results)
    })
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=4&apikey=1fd738e2dc343485449632dfe8caffa1`)
    .then(res => res.json())
    .then(data => {
        imprimirComicsDePersonaje(data.data.results)
    })
}


const imprimirPersonajeHTML = (personaje) => {
    const html = personaje.reduce((acc,element) => {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-personaje-seleccionado">
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="imagen de ${element.name}">
                </div>
                <div class="contenedor-nombre-descripcion">
                    <h3>${element.name}</h3>
                    <p class="texto-descripcion">${element.description}</p>
                </div>
            </div>
        </div>`
        
    },"")
    contenedorPersonajeSeleccionado.innerHTML = html
}


const imprimirComicsDePersonaje = (comic) => {
    const html = comic.reduce((acc,element)=> {
        return acc + `
        <div class="comic-texto">
            <div>
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="Comic: ${element.title}">
            </div>
                <h5>${element.title}</h5>
        </div>
        `
    },`<h3>Comics donde se encuentra</h3><div class="row">`)

    contenedor.innerHTML = html + `</div><div class="width-100"><button type ="button" class="boton-desplazamiento" id="abajo"><i class="fas fa-angle-down"></i></button></div>`
}



mostrarListaPersonajes()

siguientePagina.onclick = () => {
    activarBotonesDesplazamiento(primeraPagina, paginaAnterior)
    if (offset !== calculoUltimaPagina) {
        offset += 20
        mostrarListaPersonajes()
     
        if (offset === calculoUltimaPagina) {
            desactivarBotonDesplazamiento(siguientePagina, ultimaPagina)
        }
    }
}

ultimaPagina.onclick = () => {
    activarBotonesDesplazamiento(primeraPagina,paginaAnterior)
    if (offset !== calculoUltimaPagina) {
        offset = calculoUltimaPagina
        desactivarBotonDesplazamiento(siguientePagina, ultimaPagina)
        mostrarListaPersonajes()
    }
}

paginaAnterior.onclick = () => {
    activarBotonesDesplazamiento(siguientePagina, ultimaPagina)
    if (offset !== 0 ) {
         offset -= 20;
        mostrarListaPersonajes()
        if (offset === 0) {
            desactivarBotonDesplazamiento(primeraPagina,paginaAnterior)
        }
    }
}

primeraPagina.onclick = () => {
    activarBotonesDesplazamiento(siguientePagina,ultimaPagina)
  if (offset!== 0) {
      offset = 0
      desactivarBotonDesplazamiento(primeraPagina,paginaAnterior)
      mostrarListaPersonajes()
  }
  
}