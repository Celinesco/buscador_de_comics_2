const nav = document.getElementById("nav");
const actualizarPagina = document.getElementById("boton-actualizar-pagina");
const seccionInicio = document.getElementById("seccion-inicio");
const seccionComics = document.getElementById("seccion-comics");
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
const contenedorPersonajesDelComicSeleccionado = document.getElementById("contenedor-personajes-comic-seleccionado");
const busquedaPersonajeInput = document.getElementById("busqueda-personaje");
const botonBusquedaPersonaje = document.getElementById("boton-busqueda-personaje");
const contenedorComicSeleccionado = document.getElementById("contenedor-comic-seleccionado");
const botonBusquedaComic = document.getElementById("boton-busqueda-comic");
const busquedaComicInput = document.getElementById("busqueda-comic");
const infoPersonaje = document.getElementById("resultado-busqueda-personaje");
const infoComic = document.getElementById("resultado-busqueda-comic");
const boxBusquedaSinResultados = document.getElementById("busqueda-sin-resultados");
const botonesPaginadoListaPersonajes = document.getElementById("botones-paginado-lista-de-personajes");
const botonesPaginadoListaComics = document.getElementById("botones-paginado-lista-de-comics");
const botonesPaginadoPersonajesBusquedaPorInput = document.getElementById("botones-paginado-personajes-busqueda-por-input");
const botonesPaginadoComicsBusquedaInput = document.getElementById("botones-paginado-comics-busqueda-por-input");
const pagAnteriorPersonajesBusquedaInput = document.getElementById("pagina-anterior-personajes-por-busqueda-input");
const pagSiguientePersonajesBusuqedaInput = document.getElementById("pagina-siguiente-personajes-por-busqueda-input");
const pagAnteriorComicsBusquedaInput = document.getElementById("pagina-anterior-comics-por-busqueda-input");
const pagSiguientesComicsBusquedaInput = document.getElementById("pagina-siguiente-comics-por-busqueda-input");


const primerPagListaComics = document.getElementById("primer-pag-lista-comics");
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
let ultimaPaginaComics = 0;
let ultimaPaginaPersonajes = 0;
let personajesASaltear = 0;

let comicsASaltear = 0;

let idElementoClickeado = 0;



const resetearVariablesPaginado = () => {
    ultimaPaginaComics = 0
    ultimaPaginaPersonajes
    personajesASaltear = 0
    comicsASaltear = 0
};

const desactivarBotonesNavTemporalmente = () => {
    botonesNavegacion.forEach((boton)=> {
        boton.disabled = true
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
};

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
};

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

actualizarPagina.onclick = () => {
    location.reload()
}

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
    fetch(`${urlBase}/characters?apikey=${apiKey}&offset=${personajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            botonesPaginadoPersonajesBusquedaPorInput.classList.add("ocultar")
            botonesPaginadoListaPersonajes.classList.remove("ocultar");
            ultimaPaginaPersonajes = Math.floor(data.data.total / 20)
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
    fetch(`${urlBase}/characters/${id}/comics?&apikey=${apiKey}&limit=8&offset=${comicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaComics = Math.floor(data.data.total / 8)
            imprimirComicsDePersonaje(data.data.results)
            comicsDelPersonajeAtras()
            comicsDelPersonajeAdelante()
        })
        .catch(() => {

        })
}

//Si hago lo de los inputs.. podria reducir esto (creo)
const busquedaPersonajePorNombre = (nombre) => {
    fetch(`${urlBase}/characters?nameStartsWith=${nombre}&apikey=${apiKey}&offset=${personajesASaltear}`)
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
                ultimaPaginaPersonajes = Math.floor(data.data.total / 20)
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


botonBusquedaPersonaje.onclick = (e) => {
    comicsASaltear = 0
    personajesASaltear = 0
    e.preventDefault()
    resetearVariablesPaginado()
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
};


const asignarClickTarjetaPersonaje = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje")
    tarjetas.forEach((personaje) => {
        personaje.onclick = () => {
            comicsASaltear = 0
            infoPersonaje.classList.remove("ocultar")
            boxBusquedaSinResultados.classList.add("ocultar")
            const idPersonaje = personaje.dataset.id;
            idElementoClickeado = idPersonaje;
            obtenerInfoPersonajeClickeado(idPersonaje)
            obtenerComicsDelPersonaje(idPersonaje)
        }
    })
};


const comicsDelPersonajeAdelante = () => {
    const botonDerecha = document.getElementById("mas-comics-del-personaje-adelante")
    botonDerecha.onclick = () => {
        comicsASaltear === ultimaPaginaComics * 8
            ? comicsASaltear = 0
            : comicsASaltear += 8
        obtenerComicsDelPersonaje(idElementoClickeado)
    }
};

const comicsDelPersonajeAtras = () => {
    const botonIzquierda = document.getElementById("mas-comics-del-personaje-atras")
    botonIzquierda.onclick = () => {
        comicsASaltear === 0
            ? comicsASaltear = ultimaPaginaComics * 8
            : comicsASaltear -= 8
        obtenerComicsDelPersonaje(idElementoClickeado)
    }
};


pagSgteListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    if (personajesASaltear !== ultimaPaginaPersonajes) {
        personajesASaltear += 20
        mostrarListaPersonajes()
        personajesASaltear === ultimaPaginaPersonajes * 20 && desactivarBotonDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    }
}

ultimaPaginaListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    if (personajesASaltear !== ultimaPaginaPersonajes) {
        personajesASaltear = ultimaPaginaPersonajes * 20
        desactivarBotonDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
        mostrarListaPersonajes()
    }
}

pagPrevListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    if (personajesASaltear !== 0) {
        personajesASaltear -= 20;
        mostrarListaPersonajes()
        personajesASaltear === 0 && desactivarBotonDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    }
}

primeraPaginaListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    if (personajesASaltear !== 0) {
        personajesASaltear = 0
        desactivarBotonDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
        mostrarListaPersonajes()
    }
}


pagAnteriorPersonajesBusquedaInput.onclick = () => {
    personajesASaltear === ultimaPaginaPersonajes * 20
    ? personajesASaltear = 0
    : personajesASaltear -=20
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
}

pagSiguientePersonajesBusuqedaInput.onclick = () => {
    personajesASaltear === ultimaPaginaPersonajes * 20
    ? personajesASaltear = 0
    : personajesASaltear += 20
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
}

pagAnteriorComicsBusquedaInput.onclick = () => {
    comicsASaltear === 0 
    ? comicsASaltear = ultimaPaginaComics * 20
    : comicsASaltear -= 20
    busquedaComicPorNombre(busquedaComicInput.value)
}

pagSiguientesComicsBusquedaInput.onclick = () => {
    comicsASaltear === ultimaPaginaComics * 20
    ? comicsASaltear = 0
    : comicsASaltear += 20
    busquedaComicPorNombre(busquedaComicInput.value)
}


///////////////  SECCION COMICS  ///////////////////////////////////  SECCION COMICS  ////////////////////


const mostrarListaComics = () => {
    fetch(`${urlBase}/comics?orderBy=title&apikey=${apiKey}&offset=${comicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaComics = Math.floor(data.data.total / 20)
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
    fetch(`${urlBase}/comics?titleStartsWith=${nombre}&apikey=${apiKey}&offset=${comicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.results.length === 0) {
                infoComic.classList.add("ocultar")
                boxBusquedaSinResultados.classList.remove("ocultar")
            }
            else {
                boxBusquedaSinResultados.classList.add("ocultar")
                ultimaPaginaComics = Math.floor(data.data.total / 20)
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
    fetch(`${urlBase}/comics/${id}/characters?&apikey=${apiKey}&limit=8&offset=${personajesASaltear}`)
    .then (res => res.json())
    .then(data => {
        ultimaPaginaPersonajes = Math.floor(data.data.total / 8)
        imprimirPersonajesDelComic(data.data.results)
        personajesDelComicAdelante()
        personajesDelComicAtras()
    })
}


const asignarClickTarjetaComics = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-comic")
    tarjetas.forEach((comic) => {
        comic.onclick = () => {
            personajesASaltear = 0
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
    comicsASaltear = 0
    personajesASaltear = 0
    botonesPaginadoListaComics.classList.add("ocultar")
    botonesPaginadoComicsBusquedaInput.classList.remove("ocultar")
    busquedaComicPorNombre(busquedaComicInput.value)
}



const personajesDelComicAdelante = () => {
    const botonAdelante = document.getElementById("mas-personajes-del-comic-adelante")
    botonAdelante.onclick = () => {
        personajesASaltear === ultimaPaginaPersonajes * 8
            ? personajesASaltear = 0
            : personajesASaltear += 8
        obtenerPersonajesDelComicClickeado(idElementoClickeado)
    }
};

const personajesDelComicAtras = () => {
    const botonAtras = document.getElementById("mas-personajes-del-comic-atras")
    botonAtras.onclick = () => {
        personajesASaltear === 0
            ? personajesASaltear = ultimaPaginaPersonajes * 8
            : personajesASaltear -= 8
        obtenerPersonajesDelComicClickeado(idElementoClickeado)
    }
};

primerPagListaComics.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
    if (comicsASaltear !== 0) {
        comicsASaltear = 0
        desactivarBotonDesplazamiento(primerPagListaComics,pagPrevListaComics)
        mostrarListaComics()
    }
}

pagPrevListaComics.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
    if (comicsASaltear !== 0) {
        comicsASaltear -= 20
        mostrarListaComics()
        comicsASaltear === 0 && desactivarBotonDesplazamiento(primerPagListaComics, pagPrevListaComics)
    }
}

pagSgteListaComics.onclick = () => {
    activarBotonesDesplazamiento(primerPagListaComics, pagPrevListaComics)
    if (comicsASaltear !== ultimaPaginaComics) {
        comicsASaltear += 20
        mostrarListaComics()
        comicsASaltear === 0 && desactivarBotonDesplazamiento(pagSgteListaComics,ultimaPagListaComics)
    }
}


ultimaPagListaComics.onclick = () => {
    activarBotonesDesplazamiento(primerPagListaComics, pagPrevListaComics)
    if(comicsASaltear !== ultimaPaginaComics) {
        comicsASaltear = ultimaPaginaComics * 20
        desactivarBotonDesplazamiento(pagSgteListaComics,ultimaPagListaComics)
        mostrarListaComics()
    }
}



//Funciones que imprimen en HTML //

const listaDeComicsHTML = (comic) => {
    const contenedorTarjetasComics = document.getElementById("contenedor-tarjetas-comics");
    const html = comic.reduce((acc, element) => {
        return acc + `
        <a href="#seccion-comics">
            <div class="tarjeta-comic" data-id=${element.id}>
                <div class="contenedor-imagen-lista-comics">
                    <img class="imagen-personaje-lista-comics" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.title}">
                </div>
                <div class= "fondo-texto row-centrar">
                    <h4 class="nombre-personaje">${element.title}</h4>
                </div>
            </div>
        </a>
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
        <button type ="button" class="boton-desplazamiento" id="mas-personajes-del-comic-atras"><i class="fas fa-angle-left"></i></button>
        <button type ="button" class="boton-desplazamiento" id="mas-personajes-del-comic-adelante"><i class="fas fa-angle-right"></i></button></div>
    </div>
    </div>`
}


const listaPersonajesHTML = (personaje) => {
    const contenedorTarjetasPersonajes = document.getElementById("contenedor-tarjetas-personajes");
    const html = personaje.reduce((acc, element) => {
        return acc + `
        <a href="#seccion-personajes">
            <div class="tarjeta-personaje" data-id=${element.id}>
                <div class="contenedor-imagen-lista-personajes">
                    <img class="imagen-personaje-lista-personajes" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
                </div>
                <div class="fondo-texto row-centrar">
                    <h4 class="nombre-personaje">${element.name}</h4>
                </div>
            </div>
        </a>
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
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-atras"><i class="fas fa-angle-left"></i></button>
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-adelante"><i class="fas fa-angle-right"></i></button></div>
    </div>
    </div>`
}





// const botonHaciaAbajo = (boton) => {
//     boton.onclick = () => {
//         cantidadDeComicsASaltear +=
//     }
// }





