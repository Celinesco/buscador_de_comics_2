
const seccionInicio = document.getElementById("seccion-inicio")
const botonDeslizarSeccionAbajo = document.getElementById("boton-deslizar-seccion-abajo");
const botonOnomatopeya = document.querySelectorAll(".boton-onomatopeya");


botonDeslizarSeccionAbajo.onclick = () => {
    seccionInicio.classList.add("trasladar-hacia-arriba");
    setTimeout (()=> {
        seccionInicio.style.display = "none"
    },900)
}



botonOnomatopeya.forEach((onomatopeya) => {
    onomatopeya.onclick = () => {
        onomatopeya.style.animationName = "rotacion";
        setTimeout(() => {
            onomatopeya.style.animationName = ""
        }, 600)
    }
})


