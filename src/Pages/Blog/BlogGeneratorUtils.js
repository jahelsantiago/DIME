export const kinds = {titulo : "titulo", imagen : "imagen", inicio : "inicio de seccion", fin: "fin de seccion", embed: "Embebido", pdf:"pdf"}

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
        ${style}            
        <div class="title-section">
            <div class="limits">
                <h2 class="blog-title">
                    ${inputs.titulo}
                </h2>
                ${getParagraph(inputs.categoria, "blog-kind")}                
                ${getParagraph(inputs.fecha, "blog-date")}                
                ${getParagraph(inputs.autores, "blog-author")}                                                                                             
            </div>
        </div>
        <div class="blog-container limits">            
            ${getSectionsCode(inputs.sections)}    
        </div>`
}

function getSectionsCode(sections = []){    
    let code = ""
    sections.forEach(item => {        
        code = code.concat(getSection(item))
    })    
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
        return getImage(section.payload, "image-blog")
    }
    if (section.kind === kinds.inicio){
        return getSectionStart(section.payload.back, section.payload.letra)
    }
    if (section.kind === kinds.fin){
        return getSectionEnd()
    }
    if (section.kind === kinds.embed){
        return getEmbed(section.payload)
    }
}

function getEmbed(code){
    return code
}

function getTitle(title, className = ""){
    if(!title){
        return ""
    }
    return `<h3 class = "${className}">${title}</h3>`
}

function getParagraph(p, className = ""){
    if(p === ""){
        return ""
    }
    return `<p class = "${className}">${p}</p>`
}

function getImage(src, className = ""){
    if(!src){
        return ""
    }
    return `<img src="${src}" class="${className}" />`
}

function getSectionStart(background, color){
    return `<div class="blog-section" style="background-color: ${background}; color: ${color};">`
}

function getSectionEnd(){
    return `</div>`
}

const style = `
<style>
    *{
        box-sizing: border-box;
    }

    .limits{
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;         
        padding-bottom: 30px;              
        text-align: justify;
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

    .blog-container p{
        text-align: justify;
    }

    .blog-container h3 {
        text-align: justify;
        margin-left: 1rem;
        color: #002f53;
        margin-top: 4rem;
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
    .blog-section{            
        padding: 3rem;
    }

    .blog-section h3 {
        color: inherit;
        margin-top: 0;
    }

    .blog-fechas{
        display: flex;
        justify-content: space-around;
    }

    .blog-pdf:hover{
        text-decoration: underline;
    }
    
    .blog-pdf{
        background-color: #ac0707;
        padding: 0.5rem;
        color: white;
        font-weight: bolder;
        text-align: center;
        text-decoration: none;
    }
</style>
`