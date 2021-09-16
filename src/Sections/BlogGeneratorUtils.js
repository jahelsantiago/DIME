const kinds = {titulo : "titulo", parrafo : "parrafo", imagen : "imagen", inicio : "inicio de seccion", fin: "fin de seccion" }

function generateUrl(pageNumber, domain = "152"){
    return(`/apex/f?p=${domain}:${pageNumber}`)
}

export const generateCodigoResumen = (inputs) => {
    let afiliacion = ""
    if (inputs.afiliacion !== ""){
        afiliacion = `<p class="blog-afiliation"><strong>AFILIACION</strong> ${inputs.afiliacion}</p>`
    }

    
    return `    
        <div class="blog-container">
            <p class="blog-date">
                ${inputs.fecha}
            </p>
            <p class="blog-kind">
                ${inputs.categoria}
            </p>
            <img src="${inputs.imagen}"/> 
            <a href=${generateUrl(inputs.url)}>
                <h2 class="blog-title">
                    ${inputs.titulo}
                </h2>
            </a>
            ${afiliacion}
            <p class="blog-summary">
                ${inputs.resumen}
            </p>        
            <p class="blog-author">
                ${inputs.autores}
            </p>
            
            <hr/>
        </div>`
}


export const generateCodigoPaginaCompleta = (inputs) => {
    console.log(inputs)
    return `
    <style>
        .limits{
            max-width: 800px;
            margin-left: auto;
            margin-right: auto; 
            padding-top: 30px;            
            padding-bottom: 30px;              
        }
        
        .title-section{
            background-color: rgb(243, 244, 243);            
        }

        .blog-date{
            color: gray;
        }

        .blog-author{
            color: #002f53;
        }        

        .blog-container{
            text-align: center;
        }

        .blog-container img{
            max-width: 100%;                                    
            margin-left: auto;
            margin-right: auto;    
            margin-bottom: 50px;       
            background-color: white;              
        }

        .blog-container iframe{
            height: 500px;
        }
        .blog-kind{
            font-weight: bold;
        }
        .blog-title {
            color: #002f53;
            font-size: 3rem;
            text-align: center;
            margin-bottom: 4rem;
        }
        
    </style>
    
    <div class="title-section">
    <div class="limits">
        <h2 class="blog-title">
            ${inputs.titulo}
        </h2>
        <p class="blog-kind">
        ${inputs.categoria}
        </p>
        <p class="blog-date">
        ${inputs.fecha}
        </p>
        <p class="blog-author">
            ${inputs.autores}
        </p>            
        <p>
            ${inputs.resumen}
        </p>
    </div>
</div>
<div class="blog-container">
    <img src="${inputs.gif}"/>
    ${getSectionsCode(inputs.sections)}    
</div>`
}

function getSectionsCode(sections = []){
    console.log(sections)
    let code = ""
    sections.forEach(item => {        
        code = code.concat(getSection(item))
    })
    console.log(code)
    return code
}

function getSection(section){
    if (section.kind === kinds.parrafo){
        return getParagraph(section.payload)
    }
    if(section.kind === kinds.titulo){
        return getTitle(section.payload)
    }
    if(section.kind === kinds.imagen){
        return getBlogImage(section.payload)
    }
    if (section.kind === kinds.inicio){
        return getSectionStart(section.payload.back, section.payload.color)
    }
    if (section.kind === kinds.fin){
        return getSectionEnd()
    }
}

function getTitle(title){
    return `<h3>${title}</h3>`
}

function getParagraph(p){
    return `<p>${p}</p>`
}

function getBlogImage(src){
    return `<img src="${src}" class="image-blog" />`
}

function getSectionStart(background, color){
    return `<div class="blog-section" style="background-color: ${background}; color: ${color};">`
}

function getSectionEnd(){
    return `</div>`
}