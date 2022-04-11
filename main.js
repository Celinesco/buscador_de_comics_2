import { qs } from './domUtils.js';

// seccion Inicio
const seccionInicio = qs("#seccion-inicio");
const botonDeslizarSeccionAbajo = qs("#boton-deslizar-seccion-abajo");

//Nav 
const nav = qs("nav");
const volverSeccionPrincipal = qs("#volver-seccion-principal");
const abrirSeccionPersonajes = qs("#abrir-seccion-personajes");
const abrirSeccionComics = qs("#abrir-seccion-comics");
const abrirSeccionBusqueda = qs("#abrir-seccion-busqueda");
const botonMenuHamburguesa = qs("#boton-menu-hamburguesa");
const iconoMenuHamburguesa = qs("#icono-menu-hamburguesa");

//Seccion Principal
const main = qs("main");
const seccionPrincipal = qs("#seccion-principal");
const botonOnomatopeyaSeccionPersonajes = qs("#boton-seccion-personajes");
const botonOnomatopeyaSeccionBusqueda = qs("#boton-seccion-busqueda");
const botonOnomatopeyaSeccionComics = qs("#boton-seccion-comics");

//Seccion Personajes
const resultadosTotales = qs("#resultados-totales");
const seccionPersonajes = qs("#seccion-personajes");
const busquedaPersonajeInput = qs("#busqueda-personaje");
const botonBusquedaPersonaje = qs("#boton-busqueda-personaje");
const contenedorTarjetasPersonajes = qs("#contenedor-tarjetas-personajes");
const botonesPaginadoListaPersonajes = qs("#botones-paginado-lista-de-personajes");
const primeraPaginaListaPersonajes = qs("#primera-pagina-personajes");
const pagPrevListaPersonajes = qs("#pagina-previa-personajes");
const pagSgteListaPersonajes = qs("#pagina-siguiente-personajes");
const ultimaPaginaListaPersonajes = qs("#ultima-pagina-personajes");
const infoPersonaje = qs("#resultado-busqueda-personaje");
const contenedorPersonajeSeleccionado = qs("#contenedor-personaje-seleccionado");
const contenedorComicsDePersonajeSeleccionado = qs("#contenedor-comics-personaje-seleccionado");
const botonesPaginadoPersonajesBusquedaPorInput = qs("#botones-paginado-personajes-busqueda-por-input");
const pagAnteriorPersonajesBusquedaInput = qs("#pagina-anterior-personajes-por-busqueda-input");
const pagSiguientePersonajesBusuqedaInput = qs("#pagina-siguiente-personajes-por-busqueda-input");

//Seccion Busqueda
const seccionBusqueda = qs("#seccion-busqueda");
const botonBusquedaSuperHeroApi = qs("#boton-busqueda-superheroapi");
const busquedaSuperHeroApiInput = qs("#busqueda-superheroapi");
const contenedorHeroeSeleccionado = qs("#contenedor-heroe-seleccionado");

//Seccion Comics
const seccionComics = qs("#seccion-comics");
const botonBusquedaComic = qs("#boton-busqueda-comic");
const busquedaComicInput = qs("#busqueda-comic");
const contenedorTarjetasComics = qs("#contenedor-tarjetas-comics");
const botonesPaginadoListaComics = qs("#botones-paginado-lista-de-comics");
const primerPagListaComics = qs("#primer-pag-lista-comics");
const pagPrevListaComics = qs("#pag-previa-lista-comics");
const pagSgteListaComics = qs("#pag-sgte-lista-comics");
const ultimaPagListaComics = qs("#ultima-pag-lista-comics");
const infoComic = qs("#resultado-busqueda-comic");
const contenedorComicSeleccionado = qs("#contenedor-comic-seleccionado");
const contenedorPersonajesDelComicSeleccionado = qs("#contenedor-personajes-comic-seleccionado");
const botonesPaginadoComicsBusquedaInput = qs("#botones-paginado-comics-busqueda-por-input");
const pagAnteriorComicsBusquedaInput = qs("#pagina-anterior-comics-por-busqueda-input");
const pagSiguientesComicsBusquedaInput = qs("#pagina-siguiente-comics-por-busqueda-input");


//FUNCIONES Y VARIABLES AUXILIARES
const urlBase = "https://gateway.marvel.com:443/v1/public";
const apiKey = "1fd738e2dc343485449632dfe8caffa1";
let ultimaPaginaComics = 0;
let ultimaPaginaPersonajes = 0;
let personajesASaltear = 0;
let comicsASaltear = 0;
let idElementoClickeado = 0;
let totalResults = 0;


const resetearVariablesPaginado = () => {
    ultimaPaginaComics = 0
    ultimaPaginaPersonajes
    personajesASaltear = 0
    comicsASaltear = 0
};

const resetearInputs = () => {
    busquedaSuperHeroApiInput.value = "";
    busquedaComicInput.value = "";
    busquedaPersonajeInput.value = "";
}

const ocultarSecciones = (s1,s2,s3) => {
    s1.classList.add("ocultar");
    s2.classList.add("ocultar");
    s3.classList.add("ocultar");
}

const vaciarContenedores = (contenedor1, contenedor2) => {
    contenedor1.innerHTML = "";
    contenedor2.innerHTML = ""
}

const desactivarBotonDesplazamiento = (boton1, boton2) => {
    boton1.disabled = true;
    boton2.disabled = true;
    boton1.style.backgroundColor = "grey";
    boton2.style.backgroundColor = "grey";
};

const activarBotonesDesplazamiento = (boton1, boton2) => {
    boton1.disabled = false;
    boton2.disabled = false;
    boton1.style.backgroundColor = "#ffbf0f";
    boton2.style.backgroundColor = "#ffbf0f";
};

const desvanecerSeccion = (seccion) => {
    seccion.style.transitionProperty = "opacity";
    seccion.style.opacity = "0";
};

const vibrarOnomatopeya = (onomatopeya) => {
    // excelente 
    onomatopeya.style.animationName = "rotacion";
    setTimeout(() => {
        onomatopeya.style.animationName = "";
    }, 600)
};

const cerrarMenuHamburguesa = () => {
    nav.classList.add("nav-menu")
    nav.classList.remove("nav-menu-hamburguesa")
    iconoMenuHamburguesa.classList.remove("fa-times")
    iconoMenuHamburguesa.classList.add("fa-bars")
};

const funcionAbrirSeccionPersonajes = () => {
    vibrarOnomatopeya(botonOnomatopeyaSeccionPersonajes);
    desvanecerSeccion(seccionPrincipal);
    setTimeout(() => {
        ocultarSecciones(seccionPrincipal,seccionComics,seccionBusqueda)
    }, 900)
    setTimeout(() => {
        seccionPersonajes.classList.remove("ocultar");
    }, 1000)
    resetearInputs();
    vaciarContenedores(contenedorPersonajeSeleccionado,contenedorComicsDePersonajeSeleccionado);
    resetearVariablesPaginado();
    pagPrevListaPersonajes.style.backgroundColor = "grey";
    primeraPaginaListaPersonajes.style.backgroundColor = "grey";
    mostrarListaPersonajes()
};

const funcionAbrirSeccionComics = () => {
    vibrarOnomatopeya(botonOnomatopeyaSeccionComics);
    desvanecerSeccion(seccionPrincipal);
    setTimeout(() => {
        ocultarSecciones(seccionPrincipal,seccionPersonajes,seccionBusqueda)
    }, 900)
    setTimeout(() => {
        seccionComics.classList.remove("ocultar")
    }, 1000)
    resetearInputs();
    vaciarContenedores(contenedorComicSeleccionado,contenedorPersonajesDelComicSeleccionado);
    resetearVariablesPaginado();
    pagPrevListaComics.style.backgroundColor = "grey";
    primerPagListaComics.style.background = "grey";
    mostrarListaComics()
};

const funcionAbrirSeccionBusqueda = () => {
    resetearInputs();
    vaciarContenedores(contenedorHeroeSeleccionado,contenedorHeroeSeleccionado);
    vibrarOnomatopeya(botonOnomatopeyaSeccionBusqueda);
    desvanecerSeccion(seccionPrincipal);
    setTimeout(() => {
        ocultarSecciones(seccionPrincipal,seccionPersonajes,seccionComics)
    }, 900)
    setTimeout(() => {
        seccionBusqueda.classList.remove("ocultar")
    }, 1000)
};


//navegabilidad NAV y seccion ppal

volverSeccionPrincipal.onclick = () => {
    ocultarSecciones(seccionComics,seccionPersonajes,seccionBusqueda);
    seccionPrincipal.classList.remove("ocultar");
    seccionPrincipal.style.opacity = "100";
    cerrarMenuHamburguesa()
};

abrirSeccionPersonajes.onclick = () => {
    botonesPaginadoPersonajesBusquedaPorInput.classList.add("ocultar");
    botonesPaginadoListaPersonajes.classList.remove("ocultar");
    cerrarMenuHamburguesa()
    funcionAbrirSeccionPersonajes();
};

abrirSeccionComics.onclick = () => {
    botonesPaginadoComicsBusquedaInput.classList.add("ocultar");
    botonesPaginadoListaComics.classList.remove("ocultar");
    cerrarMenuHamburguesa()
    funcionAbrirSeccionComics();
};

abrirSeccionBusqueda.onclick = () => {
    funcionAbrirSeccionBusqueda()
    cerrarMenuHamburguesa()
};

botonMenuHamburguesa.onclick = () => {
    const estadoDelMenu = iconoMenuHamburguesa.getAttribute("class")
    if (estadoDelMenu === "fas fa-bars") {
        nav.classList.remove("nav-menu")
        nav.classList.add("nav-menu-hamburguesa")
        iconoMenuHamburguesa.classList.remove("fa-bars")
        iconoMenuHamburguesa.classList.add("fa-times")
    }
    else {
        cerrarMenuHamburguesa()
    }
};

botonDeslizarSeccionAbajo.onclick = () => {
    seccionInicio.classList.add("trasladar-hacia-arriba");
    setTimeout(() => {
        seccionInicio.style.display = "none"
    }, 900)
    main.classList.remove("ocultar")
    seccionPrincipal.classList.remove("ocultar");
    // no se como es esto para que se deslice con el dedo hacia arriba Male. 
    // No es tan facil, pero es con css: el elemento tiene que rebalsar su contenedor y usas
    // -webkit-overflow-scrolling: touch;
    // window.scroll({
    //     top: 0,
    //     behavior: 'smooth'
    //   });
};

botonOnomatopeyaSeccionPersonajes.onclick = () => {
    funcionAbrirSeccionPersonajes()
};

botonOnomatopeyaSeccionComics.onclick = () => {
    funcionAbrirSeccionComics()
};

botonOnomatopeyaSeccionBusqueda.onclick = () => {
    funcionAbrirSeccionBusqueda()
};

///////////////  SECCION PERSONAJES  ///////////////////////////////////  SECCION PERSONAJES  ////////////////////

const mostrarListaPersonajes = () => {
    imprimirCargando(contenedorTarjetasPersonajes)
    fetch(`${urlBase}/characters?apikey=${apiKey}&offset=${personajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            botonesPaginadoPersonajesBusquedaPorInput.classList.add("ocultar")
            botonesPaginadoListaPersonajes.classList.remove("ocultar");
            ultimaPaginaPersonajes = Math.floor(data.data.total / 20)
            totalResults = data.data.total
            resultadosTotales.innerHTML = `<p>Resultados: ${totalResults}</p>`
            listaPersonajesHTML(data.data.results)
            asignarClickTarjetaPersonaje()
            const tarjetas = document.querySelectorAll(".tarjeta-personaje");
            setTimeout(() => {
                tarjetas.forEach((tarjeta) => {
                    tarjeta.classList.add("rotacion-y")
                }, 500)
            })
        })
};

const obtenerInfoPersonajeClickeado = (id) => {
    imprimirCargando(contenedorPersonajeSeleccionado)
    fetch(`${urlBase}/characters/${id}?apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            imprimirPersonaje(data.data.results)
        })
};

const obtenerComicsDelPersonaje = (id) => {
    fetch(`${urlBase}/characters/${id}/comics?&apikey=${apiKey}&limit=8&offset=${comicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaComics = Math.floor(data.data.total / 8)
            imprimirComicsDePersonaje(data.data.results)
            comicsDelPersonajeAtras()
            comicsDelPersonajeAdelante()
        })
};

const busquedaPersonajePorNombre = (nombre) => {
    imprimirCargando(contenedorTarjetasPersonajes)
    fetch(`${urlBase}/characters?nameStartsWith=${nombre}&apikey=${apiKey}&offset=${personajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            infoPersonaje.classList.add("ocultar");
            if (!data.data.results.length) {
                imprimirBusquedaSinResultados(contenedorTarjetasPersonajes)
            }
            else {
                botonesPaginadoListaPersonajes.classList.add("ocultar");
                botonesPaginadoPersonajesBusquedaPorInput.classList.remove("ocultar")
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
};

botonBusquedaPersonaje.onclick = (e) => {
    e.preventDefault()
    resetearVariablesPaginado()
    busquedaPersonajeInput.value.length > 0
        ? busquedaPersonajePorNombre(busquedaPersonajeInput.value)
        : imprimirBusquedaSinResultados(contenedorTarjetasPersonajes)
};

const asignarClickTarjetaPersonaje = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-personaje")
    tarjetas.forEach((personaje) => {
        personaje.onclick = () => {
            comicsASaltear = 0
            infoPersonaje.classList.remove("ocultar")
            const idPersonaje = personaje.dataset.id;
            // excelente
            idElementoClickeado = idPersonaje;
            obtenerInfoPersonajeClickeado(idPersonaje)
            obtenerComicsDelPersonaje(idPersonaje)
        }
    })
};

const comicsDelPersonajeAdelante = () => {
    const botonDerecha = qs("#mas-comics-del-personaje-adelante")
    botonDerecha.onclick = () => {
        comicsASaltear === ultimaPaginaComics * 8
            ? comicsASaltear = 0
            : comicsASaltear += 8
        obtenerComicsDelPersonaje(idElementoClickeado)
    }
};

const comicsDelPersonajeAtras = () => {
    const botonIzquierda = qs("#mas-comics-del-personaje-atras")
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
};

ultimaPaginaListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    if (personajesASaltear !== ultimaPaginaPersonajes) {
        personajesASaltear = ultimaPaginaPersonajes * 20
        desactivarBotonDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
        mostrarListaPersonajes()
    }
};

pagPrevListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    if (personajesASaltear !== 0) {
        personajesASaltear -= 20;
        mostrarListaPersonajes()
        personajesASaltear === 0 && desactivarBotonDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
    }
};

primeraPaginaListaPersonajes.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaPersonajes, ultimaPaginaListaPersonajes)
    if (personajesASaltear !== 0) {
        personajesASaltear = 0
        desactivarBotonDesplazamiento(primeraPaginaListaPersonajes, pagPrevListaPersonajes)
        mostrarListaPersonajes()
    }
};
// ojo! puedo hacer click acá si estoy en la pagina 1 de busqueda, y eso me rompe la web!
pagAnteriorPersonajesBusquedaInput.onclick = () => {
    if (personajesASaltear !== 0) {
        personajesASaltear === ultimaPaginaPersonajes * 20
        ? personajesASaltear = 0
        : personajesASaltear -= 20
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
    }
  
};

pagSiguientePersonajesBusuqedaInput.onclick = () => {
    personajesASaltear === ultimaPaginaPersonajes * 20
        ? personajesASaltear = 0
        : personajesASaltear += 20
    busquedaPersonajePorNombre(busquedaPersonajeInput.value)
};



///////////////  SECCION COMICS  ///////////////////////////////////  SECCION COMICS  ////////////////////

const mostrarListaComics = () => {
    imprimirCargando(contenedorTarjetasComics)
    fetch(`${urlBase}/comics?orderBy=title&apikey=${apiKey}&offset=${comicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaComics = Math.floor(data.data.total / 20)
            listaDeComicsHTML(data.data.results)
            asignarClickTarjetaComics()
            const tarjetas = document.querySelectorAll(".tarjeta-comic")
            setTimeout(() => {
                tarjetas.forEach((tarjeta) => {
                    tarjeta.classList.add("rotacion-y")
                }, 500)
            })
        })
};

const obtenerInfoComicClickeado = (id) => {
    imprimirCargando(contenedorComicSeleccionado)
    fetch(`${urlBase}/comics/${id}?apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            imprimirComicHTML(data.data.results)
        })
};

const busquedaComicPorNombre = (nombre) => {
    imprimirCargando(contenedorTarjetasComics)
    fetch(`${urlBase}/comics?titleStartsWith=${nombre}&apikey=${apiKey}&offset=${comicsASaltear}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.results.length === 0) {
                infoComic.classList.add("ocultar")
                imprimirBusquedaSinResultados(contenedorTarjetasComics)
            }
            else {
                ultimaPaginaComics = Math.floor(data.data.total / 20)
                botonesPaginadoComicsBusquedaInput.classList.remove("ocultar")
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
};

const obtenerPersonajesDelComicClickeado = (id) => {
    fetch(`${urlBase}/comics/${id}/characters?&apikey=${apiKey}&limit=8&offset=${personajesASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPaginaPersonajes = Math.floor(data.data.total / 8)
            imprimirPersonajesDelComic(data.data.results)
            personajesDelComicAdelante()
            personajesDelComicAtras()
        })
};

const asignarClickTarjetaComics = () => {
    const tarjetas = document.querySelectorAll(".tarjeta-comic")
    tarjetas.forEach((comic) => {
        comic.onclick = () => {
            personajesASaltear = 0
            infoComic.classList.remove("ocultar")
            const idComic = comic.dataset.id;
            idElementoClickeado = idComic;
            obtenerInfoComicClickeado(idComic)
            obtenerPersonajesDelComicClickeado(idComic)
        }
    })
};

botonBusquedaComic.onclick = (e) => {
    e.preventDefault()
    resetearVariablesPaginado()
    busquedaComicInput.value.length > 0
        ? busquedaComicPorNombre(busquedaComicInput.value)
        : imprimirBusquedaSinResultados(contenedorTarjetasComics)
};

const personajesDelComicAdelante = () => {
    const botonAdelante = qs("#mas-personajes-del-comic-adelante")
    botonAdelante.onclick = () => {
        personajesASaltear === ultimaPaginaPersonajes * 8
            ? personajesASaltear = 0
            : personajesASaltear += 8
        obtenerPersonajesDelComicClickeado(idElementoClickeado)
    }
};

const personajesDelComicAtras = () => {
    const botonAtras = qs("#mas-personajes-del-comic-atras")
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
        desactivarBotonDesplazamiento(primerPagListaComics, pagPrevListaComics)
        mostrarListaComics()
    }
};

pagPrevListaComics.onclick = () => {
    activarBotonesDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
    if (comicsASaltear !== 0) {
        comicsASaltear -= 20
        mostrarListaComics()
        comicsASaltear === 0 && desactivarBotonDesplazamiento(primerPagListaComics, pagPrevListaComics)
    }
};

pagSgteListaComics.onclick = () => {
    activarBotonesDesplazamiento(primerPagListaComics, pagPrevListaComics)
    if (comicsASaltear !== ultimaPaginaComics) {
        comicsASaltear += 20
        mostrarListaComics()
        comicsASaltear === 0 && desactivarBotonDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
    }
};

ultimaPagListaComics.onclick = () => {
    activarBotonesDesplazamiento(primerPagListaComics, pagPrevListaComics)
    if (comicsASaltear !== ultimaPaginaComics) {
        comicsASaltear = ultimaPaginaComics * 20
        desactivarBotonDesplazamiento(pagSgteListaComics, ultimaPagListaComics)
        mostrarListaComics()
    }
};

pagAnteriorComicsBusquedaInput.onclick = () => {
    comicsASaltear === 0
        ? comicsASaltear = ultimaPaginaComics * 20
        : comicsASaltear -= 20
    busquedaComicPorNombre(busquedaComicInput.value)
};

pagSiguientesComicsBusquedaInput.onclick = () => {
    comicsASaltear === ultimaPaginaComics * 20
        ? comicsASaltear = 0
        : comicsASaltear += 20
    busquedaComicPorNombre(busquedaComicInput.value)
};


//SECCION BUSQUEDA
// increible que hayas usado dos apis!!
const obtenerIdSuperHeroApi = (input) => {
    fetch(`https://www.superheroapi.com/api.php/1777384219117173/search/${input}`)
        .then(res => res.json())
        .then(data => {
            if (data.response === "error") {
                imprimirBusquedaSinResultados(contenedorHeroeSeleccionado)
            }
            else {
                imprimirArrayDeHeroes(data.results)
                asignarClickTarjetasSuperHeroApi()
            }

        })
}

const imprimirArrayDeHeroes = (heroe) => {
    const html = heroe.reduce((acc, element) => {
        return acc + `
        <a href="#seccion-comics" class="tarjeta-comic tarjeta-super-hero" data-id=${element.id}>
            <div class="row">
                <img class="contenedor-imagen-superhero" src="${element.image.url}" alt="${element.name}">
            </div>
            <div class= "fondo-texto row-centrar">
                <h4>${element.name}</h4>
            </div>
         </a>`

    }, `<div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado">
                <h3>Resultado de tu búsqueda...</h3>
                <div class="row-centrar">`)

    contenedorHeroeSeleccionado.innerHTML = html + `</div></div></div>`
}

const asignarClickTarjetasSuperHeroApi = () => {
    const tarjetasSuperHero = document.querySelectorAll(".tarjeta-super-hero")
    tarjetasSuperHero.forEach((heroe) => {
        heroe.onclick = () => {
            const idHero = heroe.dataset.id
            infoSobreHeroSeleccionado(idHero)
        }
    })
}

const infoSobreHeroSeleccionado = (id) => {
    fetch(`https://www.superheroapi.com/api.php/1777384219117173/${id}`)
        .then(res => res.json())
        .then(data => {
            imprimirHeroeSeleccionado(data)
        })
}

const imprimirHeroeSeleccionado = (heroe) => {
    //tegno que reveer ese u de underline y estilarlo de css
    const html = `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-superheroe">
                    <img src="${heroe.image.url}" alt="Imagen de${heroe.name}">
                </div>
                <div class="contenedor-info-para-usuario">
                    <h3>${heroe.name}</h3>
                    <p class="info-superheroe" lang="en"><u>Nombre verdadero:</u> ${heroe.biography['full-name']}</p>
                    <p class="info-superheroe" lang="en" ><u>Raza:</u> ${heroe.appearance.race}</p>
                    <p class="info-superheroe" lang="en"><u>Lugar de nacimiento:</u> ${heroe.biography['place-of-birth']}</p>
                    <p class="info-superheroe" lang="en"><u>Ocupación:</u> ${heroe.work.occupation}</p>
                    <p class="info-superheroe" lang="en"><u>Parentescos: </u> ${heroe.connections.relatives}</p>
                </div>
            </div>
        </div>`
    contenedorHeroeSeleccionado.innerHTML = html
}

botonBusquedaSuperHeroApi.onclick = (e) => {
    e.preventDefault()
    obtenerIdSuperHeroApi(busquedaSuperHeroApiInput.value)
};


//Funciones que imprimen en HTML //

const listaDeComicsHTML = (comic) => {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <a href="#seccion-comics" class="tarjeta-comic" data-id=${element.id}>
            <div class="contenedor-imagen-lista-comics">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.title}">
            </div>
            <div class= "fondo-texto row-centrar">
                <h4>${element.title}</h4>
            </div>
        </a>
        `
    }, "")
    contenedorTarjetasComics.innerHTML = html
};

const imprimirPersonajesDelComic = (comic) => {
    if (comic.length === 0) {
       contenedorPersonajesDelComicSeleccionado.innerHTML = `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>No se encontraron personajes para mostrar en este comic</h3><div class="row-centrar">`
    }
    else {
        const html = comic.reduce((acc, element) => {
            return acc + `
            <div class="personajes-del-comic">
                <div>
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="Comic: ${element.name}">
                </div>
                    <h5>${element.name}</h5>
            </div>
            `
        }, `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>Personajes presentes en este comic</h3><div class="row-centrar">`)
    
        contenedorPersonajesDelComicSeleccionado.innerHTML = html + `</div>
        <div class="row-centrar">
            <button type ="button" class="boton-desplazamiento" id="mas-personajes-del-comic-atras" aria-label="Página siguiente"><i class="fas fa-angle-left"></i></button>
            <button type ="button" class="boton-desplazamiento" id="mas-personajes-del-comic-adelante" aria-label="Página anterior"><i class="fas fa-angle-right"></i></button></div>
        </div>
        </div>`
    }
};

const listaPersonajesHTML = (personaje) => {
    const html = personaje.reduce((acc, element) => {
        return acc + `
        <a href="#seccion-personajes" class="tarjeta-personaje column" data-id="${element.id}">
            <div class="contenedor-imagen-lista-personajes">
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
            </div>
            <div class="fondo-texto row-centrar">
                <h4>${element.name}</h4>
            </div>
        </a>
        `
    }, "")
    contenedorTarjetasPersonajes.innerHTML = html;
};

const imprimirPersonaje = (personaje) => {
    const html = personaje.reduce((acc, element) => {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-objeto-seleccionado">
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="imagen de ${element.name}">
                </div>
                <div class="contenedor-info-para-usuario">
                    <h3>${element.name}</h3>
                    <p lang="en">${element.description}</p>
                </div>
            </div>
        </div>`

    }, "")
    contenedorPersonajeSeleccionado.innerHTML = html
};

const imprimirComicHTML = (comic) => {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="borde-blanco-tarjeta-personaje">
            <div class="contenedor-elemento-seleccionado personaje-seleccionado">
                <div class="contenedor-imagen-objeto-seleccionado">
                    <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="imagen de ${element.title}">
                </div>
                <div class="contenedor-info-para-usuario">
                    <h3>${element.title}</h3>
                    <p lang="en">${element.description !== null ? element.description : ""}</p>
                </div>
            </div>
        </div>`
    }, "")
    contenedorComicSeleccionado.innerHTML = html
};

const imprimirComicsDePersonaje = (comic) => {
    if (comic.length === 0) {
        contenedorComicsDePersonajeSeleccionado.innerHTML = `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>No se encontraron comics para este personaje</h3><div class="row-centrar">`
    }
    else {
    const html = comic.reduce((acc, element) => {
        return acc + `
        <div class="comics-del-personaje">
            <div>
                <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="Comic: ${element.title}">
            </div>
                <h5>${element.title}</h5>
        </div>
        `
    }, `<div class="borde-blanco-tarjeta-personaje"><div class="contenedor-elemento-seleccionado"><h3>Comics donde se encuentra</h3><div class="row-centrar">`)

    contenedorComicsDePersonajeSeleccionado.innerHTML = html + `</div>
    <div class="row-centrar">
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-atras"><i class="fas fa-angle-left"></i></button>
        <button type ="button" class="boton-desplazamiento" id="mas-comics-del-personaje-adelante"><i class="fas fa-angle-right"></i></button></div>
    </div>
    </div>`
};}

const imprimirCargando = (elementoDom) => {
    elementoDom.innerHTML = `
     <div class = "contenedor-cargando">
        <img src="https://media.giphy.com/media/2pT3cHQSJB4tpFTYeX/giphy.gif" style= "width:80%" alt="superheroe volando">
        <img src="https://media.giphy.com/media/559nyYPxdHpJDlex5V/giphy.gif" style= "width:20%" alt="cargando-contenido">
    </div>
    `
};

const imprimirBusquedaSinResultados = (contenedorDom) => {
    const html = ` <div class="busqueda-sin-resultados">
    <div class="contenedor-imagen-sin-resultados">
        <img src="images/SinResultados.png" alt="Fantasma del espacio">
    </div>
    <div class="contenedor-info-para-usuario">
        <div class="cuadro-comic">Lo sentimos...</div>
        <p class="texto-descripcion">No se encontraron resultados para tu búsqueda. Intenta de otra forma
        </p>
    </div>
</div>`

    contenedorDom.innerHTML = html
    botonesPaginadoPersonajesBusquedaPorInput.classList.add("ocultar")
    botonesPaginadoListaPersonajes.classList.add("ocultar")
    botonesPaginadoComicsBusquedaInput.classList.add("ocultar")
    botonesPaginadoListaComics.classList.add("ocultar")
}

