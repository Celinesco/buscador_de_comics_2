export const qs = (selector)=> {
    return document.querySelector(selector);
};

export const qsa = (selector) => {
    return document.querySelectorAll(selector)
};


const fetchListas = (endpoint, elementosASaltear, ultimaPagina, fcHTML, fcAsignarClick ) => {
    fetch(`${urlBase}${endpoint}?${apiKey}&offset=${elementosASaltear}`)
        .then(res => res.json())
        .then(data => {
            ultimaPagina = Math.floor(data.data.total / 20)
            fcHTML(data.data.results)
            fcAsignarClick()
        })
}

