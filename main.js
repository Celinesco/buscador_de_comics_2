
const seccionInicio = document.getElementById("seccion-inicio")
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");


botonDeslizarSeccionAbajo.onclick = () => {
    seccionInicio.classList.add("trasladar-hacia-arriba");
    setTimeout (()=> {
        seccionInicio.style.display = "none"
    },900)
}