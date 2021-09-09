export function  getCodigoSlides(inputs){    
    console.log(inputs)
    return(`
    <div class="container-inicio-slides ">
        <div class="right-inicio-slides child-continer">
            <img alt="" src="${inputs.imagen}">
        </div>
        <div class="left-inicio-slides child-continer">
            <h1>${inputs.titulo}</h1>
            <p>${inputs.descripcion}</p>            
            <div class="button">
                <a href="${inputs.destinoBoton}">
                    ${inputs.boton}
                </a>
            </div>
            
        </div>
    </div>
    `)
}