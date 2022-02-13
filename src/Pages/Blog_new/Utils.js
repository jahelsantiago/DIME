import { uploadFile } from "../../firebase/storageActions"

export const kinds = {titulo : "titulo", imagen : "imagen", inicio : "inicio de seccion", fin: "fin de seccion", embed: "Embebido", pdf:"pdf"}

export const preProcessSections = async (section = [], titulo) => {
    for(let i = 0; i < section.length; i++){
        let item = section[i]
        if(item.kind === kinds.imagen){
            item.payload = await uploadFile(item.payload)
        }
        if(item.kind == kinds.pdf){
            item.payload.file = await uploadFile(item.payload.file)
        }
    }
}


export const generateCodigoPaginaCompleta = (titulo, categoria, fecha, autores, sections) => {    
    return `
        ${style}            
        <div class="title-section">
            <div class="limits">
                <h2 class="blog-title">
                    ${titulo}
                </h2>
                ${getParagraph(categoria, "blog-kind")}                
                ${getParagraph(fecha, "blog-date")}                
                ${getParagraph(autores, "blog-author")}                                                                                             
            </div>
        </div>
        <div class="blog-container limits">            
            ${getSectionsCode(sections)}    
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
    if (section.kind === kinds.pdf){
        return getPdf(section.payload.text, section.payload.file)
    }
}

function getPdf(titulo, file){
    return `
        <div class="pdf-container">
            <a href='${file}' target="_blank" class = "pdf-link">
                ${titulo}
            </a>
        </div>
            

    `
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