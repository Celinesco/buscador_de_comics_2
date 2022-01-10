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
const contenedorComicOPersonajeSeleccionado = document.getElementById("contenedor-comics-personaje-seleccionado");
const busquedaPesonajeInput = document.getElementById("busqueda-personaje");
const botonBuquedaPersonaje = document.getElementById("boton-busqueda-personaje");
const contenedorComicSeleccionado = document.getElementById("contenedor-comic-seleccionado");
const botonBusquedaComic = document.getElementById("boton-busqueda-comic");
const busquedaComicInput = document.getElementById("busqueda-comic");
const boxInformacionAMostrar = document.getElementById("box-resultado-busqueda-usuario")
const boxBusquedaSinResultados = document.getElementById("busqueda-sin-resultados")

// nav
const volverSeccionPrincipal = document.getElementById("volver-seccion-principal");
const abrirSeccionPersonajes = document.getElementById("abrir-seccion-personajes");
const abrirSeccionComics = document.getElementById("abrir-seccion-comics")


const main = document.querySelector("main");

const todasLasSecciones = document.querySelectorAll(".secciones");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");
const botonesNavegacion = document.querySelectorAll(".boton-navegacion")

//FUNCIONES Y VARIABLES AUXILIARES
const urlBase = "https://gateway.marvel.com:443/v1/public";
const apiKey = "1fd738e2dc343485449632dfe8caffa1";

let ultimaPaginaListaDeComicsOPersonajes = 0;
let cantidadDePersonajesASaltear = 0;
let cantidadDeComicsASaltear = 0;
let idPersonajeClickeado = 0;


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
    vibrarOnomatopeya(botonSeccionPersonajes);
    setTimeout(() => {
        desvanecerSeccion(seccionPrincipal);
    }, 800)
    setTimeout(() => {
        seccionPrincipal.classList.add("ocultar")
        seccionComics.classList.add("ocultar");
        // falta seccion busqueda

    }, 1500)

    seccionPersonajes.classList.remove("ocultar");
    mostrarListaPersonajes()
}

const funcionAbrirSeccionComics = () => {
    resetearVariablesPaginado()
    vibrarOnomatopeya(botonSeccionComics);
    setTimeout(() => {
        desvanecerSeccion(seccionPrincipal)
    }, 800)
    setTimeout(() => {
        seccionPrincipal.classList.add("ocultar");
        seccionPersonajes.classList.add("ocultar");
        //falta seccion busqueda

    }, 1500)
    seccionComics.classList.remove("ocultar")
    mostrarListaComics()
}

//Comienzo de pagina
paginaAnteriorPersonajes.style.backgroundColor = "grey";
primeraPaginaPersonajes.style.backgroundColor = "grey";

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
    funcionAbrirSeccionPersonajes()
}

abrirSeccionComics.onclick = () => {
    desactivarBotonesNavTemporalmente()
    seccionPersonajes.classList.add("ocultar")
    funcionAbrirSeccionComics()
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



botonSeccionPersonajes.onclick = () => {
    desactivarBotonesNavTemporalmente()
    funcionAbrirSeccionPersonajes()
}

botonSeccionComics.onclick = () => {
    desactivarBotonesNavTemporalmente()
    funcionAbrirSeccionComics()
}

botonSeccionBusqueda.onclick = () => {
    vibrarOnomatopeya(botonSeccionBusqueda);
    setTimeout(() => {
        desvanecerSeccion(seccionPrincipal)
    }, 800)
}

//FETCH

const mostrarListaPersonajes = () => {
    fetch(`${urlBase}/characters?apikey=${apiKey}&offset=${cantidadDePersonajesASaltear}`)
        .then(res => res.json())
        .then(data => {
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

const mostrarListaComics = () => {
    fetch(`${urlBase}/comics?orderBy=title&apikey=${apiKey}&offset=${cantidadDePersonajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            listaDeComicsHTML(data.data.results)
            asignarClickTarjetaComics()
            const tarjetas = document.querySelectorAll(".tarjeta-personaje");
            setTimeout(() => {
                tarjetas.forEach((tarjeta) => {
                    tarjeta.classList.add("rotacion-y");
                }, 500)
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

const masComicsDelPersonajeDerecha = () => {
    const botonDerecha = document.getElementById("mas-comics-del-personaje-derecha");
    botonDerecha.onclick = () => {
        cantidadDeComicsASaltear === ultimaPaginaListaDeComicsOPersonajes * 8
            ? cantidadDeComicsASaltear = 0
            : cantidadDeComicsASaltear += 8
        obtenerComicsDelPersonaje(idPersonajeClickeado)
    }

}

const masComicsDelPersonajeIzquierda = () => {
    const botonIzquierda = document.getElementById("mas-comics-del-personaje-izquierda");
    botonIzquierda.onclick = () => {
        cantidadDeComicsASaltear === 0
            ? cantidadDeComicsASaltear = ultimaPaginaListaDeComicsOPersonajes * 8
            : cantidadDeComicsASaltear -= 8
        obtenerComicsDelPersonaje(idPersonajeClickeado)
    }
}


//Si hago lo de los inputs.. podria reducir esto (creo)
const busquedaPersonajePorNombre = (nombre) => {
    fetch(`${urlBase}/characters?nameStartsWith=${nombre}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            boxInformacionAMostrar.classList.add("ocultar");
            if (data.data.results.length === 0) {
                boxBusquedaSinResultados.classList.remove("ocultar");
            }
            else {
                boxBusquedaSinResultados.classList.add("ocultar")
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

const busquedaComicPorNombre = (nombre) => {
    fetch(`${urlBase}/comics?titleStartsWith=${nombre}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.results.length === 0) {
                boxInformacionAMostrar.classList.add("ocultar")
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


const asignarClickTarjetaPersonaje = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje");
    tarjetas.forEach((personaje) => {
        personaje.onclick = () => {
            boxInformacionAMostrar.classList.remove("ocultar");
            boxBusquedaSinResultados.classList.add("ocultar")
            const idPersonaje = personaje.dataset.id;
            idPersonajeClickeado = idPersonaje;
            obtenerInfoPersonajeClickeado(idPersonaje)
            obtenerComicsDelPersonaje(idPersonaje)
        }
    })

}

const asignarClickTarjetaComics = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje");
    tarjetas.forEach((comic) => {
        comic.onclick = () => {
            boxInformacionAMostrar.classList.remove("ocultar");
            const idComic = comic.dataset.id;
            obtenerInfoComicClickeado(idComic)

        }
    })
}



//Funciones que imprimen en HTML //

const listaDeComicsHTML = (comic) => {
    const contenedorTarjetasComics = document.getElementById("contenedor-tarjetas-comics");
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="tarjeta-personaje" data-id=${element.id}>
            <div class="contenedor-imagen-lista-personajes">
                <img class="imagen-personaje-lista-personajes" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.title}">
            </div>
            <h4 class="nombre-personaje">${element.title}</h4>
        </div>
        `
    }, "")

    contenedorTarjetasComics.innerHTML = html
}


const listaPersonajesHTML = (personaje) => {
    const contenedorTarjetasPersonajes = document.getElementById("contenedor-tarjetas-personajes");
    const html = personaje.reduce((acc, element) => {
        return acc + `
        <div class="tarjeta-personaje" data-id=${element.id}>
            <div class="contenedor-imagen-lista-personajes">
                <img class="imagen-personaje-lista-personajes" src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
            </div>
            <h4 class="nombre-personaje">${element.name}</h4>
        </div>
        `
    }, "")

  
    contenedorTarjetasPersonajes.innerHTML = html;
}


const imprimirPersonajeHTML = (personaje) => {
    const html = personaje.reduce((acc, element) => {
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
                    <p class="texto-descripcion">${element.description}</p>
                    <h4>ISBN</h4>
                    <p>${element.isbn}</p>
                </div>
            </div>
        </div>`
    }, "")

    contenedorComicSeleccionado.innerHTML = html
}

const imprimirComicsDePersonaje = (comic) => {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="comic-texto">
            <div>
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" class="sombra" alt="Comic: ${element.title}">
            </div>
                <h5>${element.title}</h5>
        </div>
        `
    }, `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>Comics donde se encuentra</h3><div class="row">`)

    contenedorComicOPersonajeSeleccionado.innerHTML = html + `</div>
    <div class="width-100">
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-izquierda"><i class="fas fa-angle-left"></i></button>
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-derecha"><i class="fas fa-angle-right"></i></button></div>
    </div>
    </div>`
}


// const imprimirNoHayResultados = (contenedor) => {
//     contenedor.innerHTML = `
//     <div class="contenedor-elemento-seleccionado personaje-seleccionado elemento-no-encontrado">
//         <div class="contenedor-imagen-sin-resultados">
//             <img src="images/SinResultados.png" alt="Fantasma del espacio">
//         </div>
//         <div class="contenedor-nombre-descripcion">
//             <div class="cuadro-comic">Lo sentimos...</div>
//             <p class= "texto-descripcion">No se encontraron resultados para tu busqueda. Intenta de otra forma</p>
//          </div>
//     </div>`
// }


paginaSiguientePersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaPersonajes, paginaAnteriorPersonajes)
    if (cantidadDePersonajesASaltear !== ultimaPaginaListaDeComicsOPersonajes) {
        cantidadDePersonajesASaltear += 20
        mostrarListaPersonajes()
        if (cantidadDePersonajesASaltear === ultimaPaginaListaDeComicsOPersonajes * 20) {
            desactivarBotonDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
        }
    }
}

ultimaPaginaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaPersonajes, paginaAnteriorPersonajes)
    if (cantidadDePersonajesASaltear !== ultimaPaginaListaDeComicsOPersonajes) {
        cantidadDePersonajesASaltear = ultimaPaginaListaDeComicsOPersonajes * 20
        desactivarBotonDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
        mostrarListaPersonajes()
    }
}

paginaAnteriorPersonajes.onclick = () => {
    activarBotonesDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
    if (cantidadDePersonajesASaltear !== 0) {
        cantidadDePersonajesASaltear -= 20;
        mostrarListaPersonajes()
        if (cantidadDePersonajesASaltear === 0) {
            desactivarBotonDesplazamiento(primeraPaginaPersonajes, paginaAnteriorPersonajes)
        }
    }
}

primeraPaginaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(paginaSiguientePersonajes, ultimaPaginaPersonajes)
    if (cantidadDePersonajesASaltear !== 0) {
        cantidadDePersonajesASaltear = 0
        desactivarBotonDesplazamiento(primeraPaginaPersonajes, paginaAnteriorPersonajes)
        mostrarListaPersonajes()
    }

}


// const botonHaciaAbajo = (boton) => {
//     boton.onclick = () => {
//         cantidadDeComicsASaltear +=
//     }
// }





botonBuquedaPersonaje.onclick = (e) => {
    e.preventDefault()
    busquedaPersonajePorNombre(busquedaPesonajeInput.value);

}

botonBusquedaComic.onclick = (e) => {
    e.preventDefault()
    busquedaComicPorNombre(busquedaComicInput.value)
}


//preguntas para Male:
// Hay alguna forma de juntar esos multiples fetch que hice?
// Promesas no cumplidas como se da una respuesta
// Hay alguna forma de que en el input de busqueda te aparezcan sugerencias?
//
