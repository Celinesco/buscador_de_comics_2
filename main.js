const nav = document.getElementById("nav");
const seccionInicio = document.getElementById("seccion-inicio");
const seccionComics = document.getElementById("seccion-comics")
const seccionPrincipal = document.getElementById("seccion-principal");
const seccionPersonajes = document.getElementById("seccion-personajes");
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");
const botonSeccionPersonajes = document.getElementById("boton-seccion-personajes");
const botonSeccionBusqueda = document.getElementById("boton-seccion-busqueda");
const botonSeccionComics = document.getElementById("boton-seccion-comics");
const paginaSiguientePersonajes = document.getElementById("pagina-siguiente-personajes");
const paginaAnteriorPersonajes = document.getElementById("pagina-anterior-personajes");
const primeraPaginaPersonajes = document.getElementById("primera-pagina-personajes");
const ultimaPaginaPersonajes = document.getElementById("ultima-pagina-personajes");
const contenedorPersonajeSeleccionado = document.getElementById("contenedor-personaje-seleccionado");
const contenedor = document.getElementById("contenedor-comics-personaje-seleccionado");
const contenedorBordeBlanco = document.getElementById("contenedor-borde-blanco");
const busquedaPesonajeInput = document.getElementById("busqueda-personaje");
const botonBuquedaPersonaje = document.getElementById("boton-busqueda-personaje");
const formularioBusquedaPersonaje = document.getElementById("formulario-busqueda-personaje");

const main = document.querySelector("main");
const footer = document.querySelector("footer");

const todasLasSecciones = document.querySelectorAll(".secciones");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");

//FUNCIONES Y VARIABLES AUXILIARES
const urlBase = "https://gateway.marvel.com:443/v1/public";
const apiKey = "1fd738e2dc343485449632dfe8caffa1";
let ultimaPaginaListaDeComics = 0;
let cantidadDePersonajesASaltear = 0;
let paginadoComicsOPersonajesRelacionados = 0;



//Comienzo de pagina
paginaAnteriorPersonajes.style.backgroundColor = "grey";
primeraPaginaPersonajes.style.backgroundColor = "grey";

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
    mostrarListaPersonajes()
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

//FETCH

const mostrarListaPersonajes = () => {
    fetch(`${urlBase}/characters?apikey=${apiKey}&offset=${cantidadDePersonajesASaltear}`)
    .then(res => res.json())
    .then(data => {
        ultimaPaginaListaDeComics = Math.floor(data.data.total/20)
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
    fetch(`${urlBase}/comics?orderBy=title&apikey=${apiKey}&offset=${cantidadDePersonajesASaltear}`)
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

const obtenerInfoPersonajeClickeado = (id) => {
    fetch(`${urlBase}/characters/${id}?apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        imprimirPersonajeHTML(data.data.results)
    })
}

const obtenerInfoComicClickeado = (id) => {
    fetch(`${urlBase}/comics/${id}?apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        imprimirComicHTML(data.data.results)
    })
}

const obtenerComicsDelPersonaje = (id) => {
    fetch(`${urlBase}/characters/${id}/comics?&apikey=${apiKey}&offset=${paginadoComicsOPersonajesRelacionados}`)
    .then(res => res.json())
    .then(data => {
        imprimirComicsDePersonaje(data.data.results)
    })
    .catch(()=>{

    })
}

const busquedaPersonajePorNombre = (nombre) => {
    fetch(`${urlBase}/characters?nameStartsWith=${nombre}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        if(data.data.results.length === 0) {
            imprimirNoHayResultados(contenedorPersonajeSeleccionado)
        }
        else {
            listaPersonajesHTML(data.data.results)
            asignarClickTarjetaPersonaje()
            const tarjetas = document.querySelectorAll(".tarjeta-personaje");
            setTimeout (()=> {
             tarjetas.forEach((tarjeta)=> {
                 tarjeta.classList.add("rotacion-y")
         },500)
         })
        }
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

//Funciones que imprimen en HTML //

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


const imprimirNoHayResultados = (contenedor) => {
    contenedor.innerHTML = `
    <div class="contenedor-elemento-seleccionado personaje-seleccionado elemento-no-encontrado">
        <div class="contenedor-imagen-sin-resultados">
            <img src="images/SinResultados.png" alt="Fantasma del espacio">
        </div>
        <div class="contenedor-nombre-descripcion">
            <div class="cuadro-comic">Lo sentimos...</div>
            <p class= "texto-descripcion">No se encontraron resultados para tu busqueda. Intenta de otra forma</p>
         </div>
    </div>`
}



// const mostrarMasComics = (elementoDelDom) => {
//     elementoDelDom.onclick = () => 
// }

// mostrarListaPersonajes()

paginaSiguientePersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaPersonajes, paginaAnteriorPersonajes)
    if (cantidadDePersonajesASaltear !== ultimaPaginaListaDeComics) {
        cantidadDePersonajesASaltear += 20
        mostrarListaPersonajes()
     
        if (cantidadDePersonajesASaltear === ultimaPaginaListaDeComics) {
            desactivarBotonDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
        }
    }
}

ultimaPaginaPersonajes.onclick = () => {
    console.log(ultimaPaginaListaDeComics)
    console.log(cantidadDePersonajesASaltear)
    activarBotonesDesplazamiento(primeraPaginaPersonajes,paginaAnteriorPersonajes)
    if (cantidadDePersonajesASaltear !== ultimaPaginaListaDeComics) {

        cantidadDePersonajesASaltear = ultimaPaginaListaDeComics*20
        console.log(cantidadDePersonajesASaltear)
        desactivarBotonDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
        mostrarListaPersonajes()
    }
}

paginaAnteriorPersonajes.onclick = () => {
    activarBotonesDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
    if (cantidadDePersonajesASaltear !== 0 ) {
         cantidadDePersonajesASaltear -= 20;
        mostrarListaPersonajes()
        if (cantidadDePersonajesASaltear === 0) {
            desactivarBotonDesplazamiento(primeraPaginaPersonajes,paginaAnteriorPersonajes)
        }
    }
}

primeraPaginaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(paginaSiguientePersonajes,ultimaPaginaPersonajes)
  if (cantidadDePersonajesASaltear!== 0) {
      cantidadDePersonajesASaltear = 0
      desactivarBotonDesplazamiento(primeraPaginaPersonajes,paginaAnteriorPersonajes)
      mostrarListaPersonajes()
  }
  
}





botonBuquedaPersonaje.onclick = (e) => {
    e.preventDefault()
    busquedaPersonajePorNombre(busquedaPesonajeInput.value)
}


//preguntas para Male:
// Hay alguna forma de juntar esos multiples fetch que hice?
// Promesas no cumplidas como se da una respuesta
// Hay alguna forma de que en el input de busqueda te aparezcan sugerencias?
//
