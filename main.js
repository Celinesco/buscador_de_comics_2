const nav = document.getElementById("nav");
const seccionInicio = document.getElementById("seccion-inicio");
const seccionComics = document.getElementById("seccion-comics")
const seccionPrincipal = document.getElementById("seccion-principal");
const seccionPersonajes = document.getElementById("seccion-personajes");
const seccionBusqueda = document.getElementById("seccion-busqueda");
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");
const botonOnomatopeyaSeccionPersonajes = document.getElementById("boton-seccion-personajes");
const botonOnomatopeyaSeccionBusqueda = document.getElementById("boton-seccion-busqueda");
const botonOnomatopeyaSeccionComics = document.getElementById("boton-seccion-comics");
const pagSgteListaPersonajes = document.getElementById("pagina-siguiente-personajes");
const pagPrevListaPersonajes = document.getElementById("pagina-previa-personajes");
const primeraPaginaListaPersonajes = document.getElementById("primera-pagina-personajes");
const ultimaPaginaListaPersonajes = document.getElementById("ultima-pagina-personajes");
const contenedorPersonajeSeleccionado = document.getElementById("contenedor-personaje-seleccionado");
const contenedorComicsDePersonajeSeleccionado = document.getElementById("contenedor-comics-personaje-seleccionado");
const contenedorPersonajesDelComicSeleccionado = document.getElementById("contenedor-personajes-comic-seleccionado")
const busquedaPersonajeInput = document.getElementById("busqueda-personaje");
const botonBuquedaPersonaje = document.getElementById("boton-busqueda-personaje");
const contenedorComicSeleccionado = document.getElementById("contenedor-comic-seleccionado");
const botonBusquedaComic = document.getElementById("boton-busqueda-comic");
const busquedaComicInput = document.getElementById("busqueda-comic");
const infoPersonaje = document.getElementById("resultado-busqueda-personaje");
const infoComic = document.getElementById("resultado-busqueda-comic");
const boxBusquedaSinResultados = document.getElementById("busqueda-sin-resultados");
const botonesPaginadoListaPersonajes = document.getElementById("botones-paginado-lista-de-personajes");
const botonesPaginadoPersonajesBusquedaPorInput = document.getElementById("botones-paginado-personajes-busqueda-por-input");
const pagAnteriorPersonajesBusquedaInput = document.getElementById("pagina-anterior-personajes-por-busqueda-input");
const pagSiguientePersonajesBusuqedaInput = document.getElementById("pagina-siguiente-personajes-por-busqueda-input");


const primerPagListaComics = document.getElementById("primer-pag-lista-comics")
const pagPrevListaComics = document.getElementById("pag-previa-lista-comics");
const pagSgteListaComics = document.getElementById("pag-sgte-lista-comics");
const ultimaPagListaComics = document.getElementById("ultima-pag-lista-comics");


// nav
const volverSeccionPrincipal = document.getElementById("volver-seccion-principal");
const abrirSeccionPersonajes = document.getElementById("abrir-seccion-personajes");
const abrirSeccionComics = document.getElementById("abrir-seccion-comics");
const abrirSeccionBusqueda = document.getElementById("abrir-seccion-busqueda");


const main = document.querySelector("main");

const todasLasSecciones = document.querySelectorAll(".secciones");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");
const botonesNavegacion = document.querySelectorAll(".boton-navegacion");

//FUNCIONES Y VARIABLES AUXILIARES
const urlBase = "https://gateway.marvel.com:443/v1/public";
const apiKey = "1fd738e2dc343485449632dfe8caffa1";

let ultimaPaginaListaDeComicsOPersonajes = 0;
let cantidadDePersonajesASaltear = 0;
let cantidadDeComicsASaltear = 0;
let idElementoClickeado = 0;



const resetearVariablesPaginado = () => {
    ultimaPaginaListaDeComicsOPersonajes = 0;
    cantidadDePersonajesASaltear = 0;
    cantidadDeComicsASaltear = 0;
}

const desactivarBotonesNavTemporalmente = () => {
    botonesNavegacion.forEach((boton)=> {
        boton.disabled = true;
        setTimeout(()=> {
            boton.disabled = false;
        },1550)
    })
}



const funcionAbrirSeccionPersonajes = () => {
    resetearVariablesPaginado()
    vibrarOnomatopeya(botonOnomatopeyaSeccionPersonajes);
    desvanecerSeccion(seccionPrincipal);

    setTimeout(() => {
        seccionPrincipal.classList.add("ocultar");
        seccionComics.classList.add("ocultar");
        seccionBusqueda.classList.add("ocultar");
    }, 900)

    setTimeout(() => {
        seccionPersonajes.classList.remove("ocultar");
    }, 1000)
    
    mostrarListaPersonajes()
}

const funcionAbrirSeccionComics = () => {
    resetearVariablesPaginado()
    vibrarOnomatopeya(botonOnomatopeyaSeccionComics);
    desvanecerSeccion(seccionPrincipal)

    setTimeout(() => {
        seccionPrincipal.classList.add("ocultar");
        seccionPersonajes.classList.add("ocultar");
        seccionBusqueda.classList.add("ocultar");
    }, 900)

    setTimeout (() => {
        seccionComics.classList.remove("ocultar")
    }, 1000)
    
    mostrarListaComics()
}

const funcionAbrirSeccionBusqueda = () => {
    vibrarOnomatopeya(botonOnomatopeyaSeccionBusqueda);
    desvanecerSeccion(seccionPrincipal)

    setTimeout(() => {
        seccionPrincipal.classList.add("ocultar");
        seccionPersonajes.classList.add("ocultar");
        seccionComics.classList.add("ocultar")
    }, 900)

    setTimeout(() => {
        seccionBusqueda.classList.remove("ocultar")
    }, 1000)
    
}

//Comienzo de pagina
pagPrevListaPersonajes.style.backgroundColor = "grey";
primeraPaginaListaPersonajes.style.backgroundColor = "grey";
pagPrevListaComics.style.backgroundColor = "grey";
primerPagListaComics.style.background = "grey";

//


//navegabilidad NAV 
volverSeccionPrincipal.onclick = () => {
    seccionComics.classList.add("ocultar");
    seccionPersonajes.classList.add("ocultar");
    seccionPrincipal.classList.remove("ocultar");
    seccionPrincipal.style.opacity = "100"
}

abrirSeccionPersonajes.onclick = () => {
    desactivarBotonesNavTemporalmente()
    seccionComics.classList.add("ocultar")
    seccionBusqueda.classList.add("ocultar")
    funcionAbrirSeccionPersonajes()
}

abrirSeccionComics.onclick = () => {
    desactivarBotonesNavTemporalmente()
    seccionPersonajes.classList.add("ocultar");
    seccionBusqueda.classList.add("ocultar")
    funcionAbrirSeccionComics()
}

abrirSeccionBusqueda.onclick = () => {
    seccionComics.classList.add("ocultar");
    seccionPersonajes.classList.add("ocultar");
    desactivarBotonesNavTemporalmente()
    funcionAbrirSeccionBusqueda()
}

const desactivarBotonDesplazamiento = (boton1, boton2) => {
    boton1.disabled = true;
    boton2.disabled = true;
    boton1.style.backgroundColor = "grey";
    boton2.style.backgroundColor = "grey";
}

const activarBotonesDesplazamiento = (boton1, boton2) => {
    boton1.disabled = false;
    boton2.disabled = false;
    boton1.style.backgroundColor = "#ffbf0f";
    boton2.style.backgroundColor = "#ffbf0f";
}


const desvanecerSeccion = (seccion) => {
    seccion.style.transitionProperty = "opacity";
    seccion.style.opacity = "0";
}


///

botonDeslizarSeccionAbajo.onclick = () => {
    seccionInicio.classList.add("trasladar-hacia-arriba");
    setTimeout(() => {
        seccionInicio.style.display = "none"
    }, 900)
    main.classList.remove("ocultar")
    seccionPrincipal.classList.remove("ocultar");
}

const vibrarOnomatopeya = (onomatopeya) => {
    onomatopeya.style.animationName = "rotacion";
    setTimeout(() => {
        onomatopeya.style.animationName = "";
    }, 600)
}



botonOnomatopeyaSeccionPersonajes.onclick = () => {
    desactivarBotonesNavTemporalmente()
    funcionAbrirSeccionPersonajes()
}

botonOnomatopeyaSeccionComics.onclick = () => {
    desactivarBotonesNavTemporalmente()
    funcionAbrirSeccionComics()
}

botonOnomatopeyaSeccionBusqueda.onclick = () => {
   desactivarBotonesNavTemporalmente()
   funcionAbrirSeccionBusqueda()
}



///////////////  FETCH   ///////////////  FETCH  /////////////// FETCH  ///////////////

////////////// seccion Personajes

const mostrarListaPersonajes = () => {
    fetch(`${urlBase}/characters?apikey=${apiKey}&offset=${cantidadDePersonajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            botonesPaginadoPersonajesBusquedaPorInput.classList.add("ocultar")
            botonesPaginadoListaPersonajes.classList.remove("ocultar");
            ultimaPaginaListaDeComicsOPersonajes = Math.floor(data.data.total / 20)
            listaPersonajesHTML(data.data.results)
            asignarClickTarjetaPersonaje()
            const tarjetas = document.querySelectorAll(".tarjeta-personaje");
            setTimeout(() => {
                tarjetas.forEach((tarjeta) => {
                    tarjeta.classList.add("rotacion-y")
                }, 500)
            })
        })
}

const obtenerInfoPersonajeClickeado = (id) => {
    fetch(`${urlBase}/characters/${id}?apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            imprimirPersonaje(data.data.results)
        })
}

const obtenerComicsDelPersonaje = (id) => {
    fetch(`${urlBase}/characters/${id}/comics?&apikey=${apiKey}&limit=8&offset=${cantidadDeComicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaListaDeComicsOPersonajes = Math.floor(data.data.total / 8)
            imprimirComicsDePersonaje(data.data.results)
            masComicsDelPersonajeDerecha()
            masComicsDelPersonajeIzquierda()
        })
        .catch(() => {

        })
}

//Si hago lo de los inputs.. podria reducir esto (creo)
const busquedaPersonajePorNombre = (nombre) => {
    fetch(`${urlBase}/characters?nameStartsWith=${nombre}&apikey=${apiKey}&offset=${cantidadDePersonajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            infoPersonaje.classList.add("ocultar");
            if (data.data.results.length === 0) {
                boxBusquedaSinResultados.classList.remove("ocultar");
            }
            else {
                botonesPaginadoListaPersonajes.classList.add("ocultar");
                botonesPaginadoPersonajesBusquedaPorInput.classList.remove("ocultar")
                boxBusquedaSinResultados.classList.add("ocultar");
                ultimaPaginaListaDeComicsOPersonajes = Math.floor(data.data.total / 20)
                listaPersonajesHTML(data.data.results)
                asignarClickTarjetaPersonaje()
                const tarjetas = document.querySelectorAll(".tarjeta-personaje");
                setTimeout(() => {
                    tarjetas.forEach((tarjeta) => {
                        tarjeta.classList.add("rotacion-y")
                    }, 500)
                })
            }
        })
}


botonBuquedaPersonaje.onclick = (e) => {
    e.preventDefault()
    resetearVariablesPaginado()
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
};


const asignarClickTarjetaPersonaje = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje")
    tarjetas.forEach((personaje) => {
        personaje.onclick = () => {
            infoPersonaje.classList.remove("ocultar")
            boxBusquedaSinResultados.classList.add("ocultar")
            const idPersonaje = personaje.dataset.id;
            idElementoClickeado = idPersonaje;
            obtenerInfoPersonajeClickeado(idPersonaje)
            obtenerComicsDelPersonaje(idPersonaje)
        }
    })
};

const masComicsDelPersonajeDerecha = () => {
    const botonDerecha = document.getElementById("mas-comics-del-personaje-derecha")
    botonDerecha.onclick = () => {
        cantidadDeComicsASaltear === ultimaPaginaListaDeComicsOPersonajes * 8
            ? cantidadDeComicsASaltear = 0
            : cantidadDeComicsASaltear += 8
        obtenerComicsDelPersonaje(idElementoClickeado)
    }
};

const masComicsDelPersonajeIzquierda = () => {
    const botonIzquierda = document.getElementById("mas-comics-del-personaje-izquierda")
    botonIzquierda.onclick = () => {
        cantidadDeComicsASaltear === 0
            ? cantidadDeComicsASaltear = ultimaPaginaListaDeComicsOPersonajes * 8
            : cantidadDeComicsASaltear -= 8
        obtenerComicsDelPersonaje(idElementoClickeado)
    }
};


pagSgteListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    if (cantidadDePersonajesASaltear !== ultimaPaginaListaDeComicsOPersonajes) {
        cantidadDePersonajesASaltear += 20
        mostrarListaPersonajes()
        cantidadDePersonajesASaltear === ultimaPaginaListaDeComicsOPersonajes * 20 && desactivarBotonDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    }
}

ultimaPaginaListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    if (cantidadDePersonajesASaltear !== ultimaPaginaListaDeComicsOPersonajes) {
        cantidadDePersonajesASaltear = ultimaPaginaListaDeComicsOPersonajes * 20
        desactivarBotonDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
        mostrarListaPersonajes()
    }
}

pagPrevListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    if (cantidadDePersonajesASaltear !== 0) {
        cantidadDePersonajesASaltear -= 20;
        mostrarListaPersonajes()
        cantidadDePersonajesASaltear === 0 && desactivarBotonDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    }
}

primeraPaginaListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    if (cantidadDePersonajesASaltear !== 0) {
        cantidadDePersonajesASaltear = 0
        desactivarBotonDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
        mostrarListaPersonajes()
    }
}


pagAnteriorPersonajesBusquedaInput.onclick = () => {
    cantidadDePersonajesASaltear === ultimaPaginaListaDeComicsOPersonajes * 20
    ? cantidadDePersonajesASaltear = 0
    : cantidadDePersonajesASaltear +=20
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
}

pagSiguientePersonajesBusuqedaInput.onclick = () => {
    cantidadDePersonajesASaltear === ultimaPaginaListaDeComicsOPersonajes * 20
    ? cantidadDePersonajesASaltear = 0
    : cantidadDePersonajesASaltear += 20
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
}




///////////////  SECCION COMICS  ///////////////////////////////////  SECCION COMICS  ////////////////////


const mostrarListaComics = () => {
    fetch(`${urlBase}/comics?orderBy=title&apikey=${apiKey}&offset=${cantidadDeComicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaListaDeComicsOPersonajes = Math.floor(data.data.total / 20)
            listaDeComicsHTML(data.data.results)
            asignarClickTarjetaComics()
            const tarjetas = document.querySelectorAll(".tarjeta-personaje")
            setTimeout(() => {
                tarjetas.forEach((tarjeta) => {
                    tarjeta.classList.add("rotacion-y")
                }, 500)
            })
        })
}

const obtenerInfoComicClickeado = (id) => {
    fetch(`${urlBase}/comics/${id}?apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            imprimirComicHTML(data.data.results)
        })
}

const busquedaComicPorNombre = (nombre) => {
    fetch(`${urlBase}/comics?titleStartsWith=${nombre}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.results.length === 0) {
                infoComic.classList.add("ocultar")
                boxBusquedaSinResultados.classList.remove("ocultar")
            }
            else {
                boxBusquedaSinResultados.classList.add("ocultar")
                listaDeComicsHTML(data.data.results)
                asignarClickTarjetaComics()
                const tarjetas = document.querySelectorAll(".tarjeta-personaje");
                setTimeout(() => {
                    tarjetas.forEach((tarjeta) => {
                        tarjeta.classList.add("rotacion-y")
                    }, 500)
                })
            }
        })
}


const obtenerPersonajesDelComicClickeado = (id) => {
    fetch(`${urlBase}/comics/${id}/characters?&apikey=${apiKey}&limit=8&offset=${cantidadDePersonajesASaltear}`)
    .then (res => res.json())
    .then(data => {
        ultimaPaginaListaDeComicsOPersonajes = Math.floor(data.data.total / 8)
        imprimirPersonajesDelComic(data.data.results)
        // masComicsDelPersonajeDerecha()
        // masComicsDelPersonajeIzquierda()
    })
}


const asignarClickTarjetaComics = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-comic")
    tarjetas.forEach((comic) => {
        comic.onclick = () => {
            infoComic.classList.remove("ocultar")
            boxBusquedaSinResultados.classList.add("ocultar")
            const idComic = comic.dataset.id;
            idElementoClickeado = idComic;
            obtenerInfoComicClickeado(idComic)
            obtenerPersonajesDelComicClickeado(idComic)
        }
    })
};



botonBusquedaComic.onclick = (e) => {
    e.preventDefault()
    busquedaComicPorNombre(busquedaComicInput.value)
}

primerPagListaComics.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
    if (cantidadDeComicsASaltear !== 0) {
        cantidadDeComicsASaltear = 0
        desactivarBotonDesplazamiento(primerPagListaComics,pagPrevListaComics)
        mostrarListaComics()
    }
}

pagPrevListaComics.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
    if (cantidadDeComicsASaltear !== 0) {
        cantidadDeComicsASaltear -= 20
        mostrarListaComics()
        cantidadDeComicsASaltear === 0 && desactivarBotonDesplazamiento(primerPagListaComics, pagPrevListaComics)
    }
}

pagSgteListaComics.onclick = () => {
    activarBotonesDesplazamiento(primerPagListaComics, pagPrevListaComics)
    if (cantidadDeComicsASaltear !== ultimaPaginaListaDeComicsOPersonajes) {
        cantidadDeComicsASaltear += 20
        mostrarListaComics()
        cantidadDeComicsASaltear === 0 && desactivarBotonDesplazamiento(pagSgteListaComics,ultimaPagListaComics)
    }
}


ultimaPagListaComics.onclick = () => {
    activarBotonesDesplazamiento(primerPagListaComics, pagPrevListaComics)
    if(cantidadDeComicsASaltear !== ultimaPaginaListaDeComicsOPersonajes) {
        cantidadDeComicsASaltear = ultimaPaginaListaDeComicsOPersonajes * 20
        desactivarBotonDesplazamiento(pagSgteListaComics,ultimaPagListaComics)
        mostrarListaComics()
    }
}


//Funciones que imprimen en HTML //

const listaDeComicsHTML = (comic) => {
    const contenedorTarjetasComics = document.getElementById("contenedor-tarjetas-comics");
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="tarjeta-comic" data-id=${element.id}>
            <div class="contenedor-imagen-lista-comics">
                <img class="imagen-personaje-lista-comics" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.title}">
            </div>
            <div class= "fondo-texto row-centrar">
                <h4 class="nombre-personaje">${element.title}</h4>
            </div>
        </div>
        `
    }, "")

    contenedorTarjetasComics.innerHTML = html
}

const imprimirPersonajesDelComic = (comic) => {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="personajes-del-comic">
            <div>
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="sombra" alt="Comic: ${element.name}">
            </div>
                <h5>${element.name}</h5>
        </div>
        `
    }, `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>Personajes presentes en este comic</h3><div class="row-centrar">`)

    contenedorPersonajesDelComicSeleccionado.innerHTML = html + `</div>
    <div class="width-100">
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-izquierda"><i class="fas fa-angle-left"></i></button>
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-derecha"><i class="fas fa-angle-right"></i></button></div>
    </div>
    </div>`
}


const listaPersonajesHTML = (personaje) => {
    const contenedorTarjetasPersonajes = document.getElementById("contenedor-tarjetas-personajes");
    const html = personaje.reduce((acc, element) => {
        return acc + `
        <div class="tarjeta-personaje" data-id=${element.id}>
            <div class="contenedor-imagen-lista-personajes">
                <img class="imagen-personaje-lista-personajes" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
            </div>
            <div class="fondo-texto row-centrar">
                <h4 class="nombre-personaje">${element.name}</h4>
            </div>
        </div>
        `
    }, "")
    contenedorTarjetasPersonajes.innerHTML = html;
}



const imprimirPersonaje = (personaje) => {
    const html = personaje.reduce((acc, element) => {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-objeto-seleccionado">
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="imagen de ${element.name}">
                </div>
                <div class="contenedor-nombre-descripcion">
                    <h3 class="nombre-elemento">${element.name}</h3>
                    <p class="texto-descripcion">${element.description}</p>
                </div>
            </div>
        </div>`

    }, "")
    contenedorPersonajeSeleccionado.innerHTML = html
}


const imprimirComicHTML = (comic) => {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-objeto-seleccionado">
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="imagen de ${element.title}">
                </div>
                <div class="contenedor-nombre-descripcion">
                    <h3>${element.title}</h3>
                    <p class="texto-descripcion">${element.description !== null ? element.description : "" }</p>
                </div>
            </div>
        </div>`
    }, "")
    contenedorComicSeleccionado.innerHTML = html
}

const imprimirComicsDePersonaje = (comic) => {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="comics-del-personaje">
            <div>
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="sombra" alt="Comic: ${element.title}">
            </div>
                <h5>${element.title}</h5>
        </div>
        `
    }, `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>Comics donde se encuentra</h3><div class="row-centrar">`)

    contenedorComicsDePersonajeSeleccionado.innerHTML = html + `</div>
    <div class="width-100">
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-izquierda"><i class="fas fa-angle-left"></i></button>
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-derecha"><i class="fas fa-angle-right"></i></button></div>
    </div>
    </div>`
}





// const botonHaciaAbajo = (boton) => {
//     boton.onclick = () => {
//         cantidadDeComicsASaltear +=
//     }
// }





