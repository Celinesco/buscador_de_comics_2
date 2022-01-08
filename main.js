const nav = document.getElementById("nav");
const main = document.querySelector("main");
const footer = document.querySelector("footer")
const seccionInicio = document.getElementById("seccion-inicio");
const seccionComics = document.getElementById("seccion-comics")
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
const contenedorBordeBlanco = document.getElementById("contenedor-borde-blanco");
const busquedaPesonajeInput = document.getElementById("busqueda-personaje");
const botonBuquedaPersonaje = document.getElementById("boton-busqueda-personaje");
const formularioBusquedaPersonaje = document.getElementById("formulario-busqueda-personaje")

//FUNCIONES Y VARIABLES AUXILIARES
let calculoUltimaPagina = 1540;
let paginadoListasCompletas = 0;
let paginadoComicsOPersonajesRelacionados = 0;



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

botonSeccionComics.onclick = () => {
    vibrarOnomatopeya(botonSeccionComics);
    desvanecerSeccion(seccionPrincipal)
    setTimeout (() => {
        seccionPrincipal.classList.add("ocultar");
        seccionComics.classList.remove("ocultar")
    },800)

    mostrarListaComics()
    
}

botonSeccionBusqueda.onclick = () => {
    vibrarOnomatopeya(botonSeccionBusqueda);
    setTimeout (() => {
        desvanecerSeccion(seccionPrincipal)
    },800)
}




const mostrarListaPersonajes = () => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=1fd738e2dc343485449632dfe8caffa1&offset=${paginadoListasCompletas}`)
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


const mostrarListaComics = () => {
    fetch(`https://gateway.marvel.com:443/v1/public/comics?orderBy=title&apikey=1fd738e2dc343485449632dfe8caffa1&offset=${paginadoListasCompletas}`)
    .then(res => res.json())
    .then(data => {
        listaDeComicsHTML(data.data.results)
        asignarClickTarjetaComics()
           const tarjetas = document.querySelectorAll(".tarjeta-personaje");
           setTimeout (()=> {
            tarjetas.forEach((tarjeta)=> {
                tarjeta.classList.add("rotacion-y");
        },500)
        })
    })
}

const listaDeComicsHTML = (comic) => {
    const contenedorTarjetasComics = document.getElementById("contenedor-tarjetas-comics");
    const html = comic.reduce((acc,element) => {
        return acc + `
        <div class="tarjeta-personaje" data-id=${element.id}>
            <div class="contenedor-imagen-lista-personajes">
                <img class="imagen-personaje-lista-personajes" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.title}">
            </div>
            <h4 class="nombre-personaje">${element.title}</h4>
        </div>
        `
    },"")

    contenedorTarjetasComics.innerHTML = html
}

const obtenerInfoPersonajeClickeado = (id) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=1fd738e2dc343485449632dfe8caffa1`)
    .then(res => res.json())
    .then(data => {
        imprimirPersonajeHTML(data.data.results)
    })
}

const obtenerInfoComicClickeado = (id) => {
    fetch(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=1fd738e2dc343485449632dfe8caffa1`)
    .then(res => res.json())
    .then(data => {
        imprimirComicHTML(data.data.results)
    })
}

const obtenerComicsDelPersonaje = (id) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?&apikey=1fd738e2dc343485449632dfe8caffa1&offset=${paginadoComicsOPersonajesRelacionados}`)
    .then(res => res.json())
    .then(data => {
        imprimirComicsDePersonaje(data.data.results)
    })
    .catch(()=>{

    })
}

const busquedaPersonajePorNombre = (nombre) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nombre}&apikey=1fd738e2dc343485449632dfe8caffa1`)
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
            obtenerInfoPersonajeClickeado(idPersonaje)
            obtenerComicsDelPersonaje(idPersonaje)
        }
    })
    return tarjetas
}

const asignarClickTarjetaComics = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje");
    tarjetas.forEach((comic)=> {
        comic.onclick = () => {
            contenedorBordeBlanco.classList.remove("ocultar");
            const idComic = comic.dataset.id;
            obtenerInfoComicClickeado(idComic)
         
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


const imprimirPersonajeHTML = (personaje) => {
    //if array vacio
    const html = personaje.reduce((acc,element) => {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-objeto-seleccionado">
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


const imprimirComicHTML = (comic) => {
    const contenedorComicSeleccionado = document.getElementById("contenedor-comic-seleccionado")
    const html = comic.reduce((acc,element)=> {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
        <div class="contenedor-elemento-seleccionado personaje-seleccionado">
            <div class="contenedor-imagen-objeto-seleccionado">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="imagen de ${element.title}">
            </div>
            <div class="contenedor-nombre-descripcion">
                <h3>${element.title}</h3>
                <p class="texto-descripcion">${element.description}</p>
                <h4>ISBN</h4>
                <p>${element.isbn}</p>
            </div>
        </div>
    </div>`
    },"")

    contenedorComicSeleccionado.innerHTML = html

}

const imprimirComicsDePersonaje = (comic) => {
    const html = comic.reduce((acc,element)=> {
        return acc + `
        <div class="comic-texto">
            <div class="sombra">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="Comic: ${element.title}">
            </div>
                <h5>${element.title}</h5>
        </div>
        `
    },`<h3>Comics donde se encuentra</h3><div class="row">`)

    contenedor.innerHTML = html + `</div><div class="width-100"><button type ="button" class="boton-desplazamiento" id="abajo"><i class="fas fa-angle-down"></i></button></div>`
}



// const mostrarMasComics = (elementoDelDom) => {
//     elementoDelDom.onclick = () => 
// }

// mostrarListaPersonajes()

siguientePagina.onclick = () => {
    activarBotonesDesplazamiento(primeraPagina, paginaAnterior)
    if (paginadoListasCompletas !== calculoUltimaPagina) {
        paginadoListasCompletas += 20
        mostrarListaPersonajes()
     
        if (paginadoListasCompletas === calculoUltimaPagina) {
            desactivarBotonDesplazamiento(siguientePagina, ultimaPagina)
        }
    }
}

ultimaPagina.onclick = () => {
    activarBotonesDesplazamiento(primeraPagina,paginaAnterior)
    if (paginadoListasCompletas !== calculoUltimaPagina) {
        paginadoListasCompletas = calculoUltimaPagina
        desactivarBotonDesplazamiento(siguientePagina, ultimaPagina)
        mostrarListaPersonajes()
    }
}

paginaAnterior.onclick = () => {
    activarBotonesDesplazamiento(siguientePagina, ultimaPagina)
    if (paginadoListasCompletas !== 0 ) {
         paginadoListasCompletas -= 20;
        mostrarListaPersonajes()
        if (paginadoListasCompletas === 0) {
            desactivarBotonDesplazamiento(primeraPagina,paginaAnterior)
        }
    }
}

primeraPagina.onclick = () => {
    activarBotonesDesplazamiento(siguientePagina,ultimaPagina)
  if (paginadoListasCompletas!== 0) {
      paginadoListasCompletas = 0
      desactivarBotonDesplazamiento(primeraPagina,paginaAnterior)
      mostrarListaPersonajes()
  }
  
}





formularioBusquedaPersonaje.onclick = (e) => {
    e.preventDefault()
    busquedaPersonajePorNombre(busquedaPesonajeInput.value)

}


//preguntas para Male:
// Hay alguna forma de juntar esos multiples fetch que hice?
// Promesas no cumplidas como se da una respuesta
// Hay alguna forma de que en el input de busqueda te aparezcan sugerencias?
//