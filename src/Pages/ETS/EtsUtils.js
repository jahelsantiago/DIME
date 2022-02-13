import { uploadFile } from "../../firebase/storageActions"

const styles = `<style>
.box-container{
    display: flex;
    gap: 1px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;                             
    overflow-x: auto;     
    margin: 1rem;       
    min-width: min-content; 
    justify-content: center;     
}
.ets-option{            
    background-color: #dadddf;            
    font-weight: bolder;
    padding: 1rem;
    display: flex;            
    align-items: center;                     
}
.ets-choosen-option{
    background-color: #2fabd8;
    color: #ffffff;            
}        
.archivo-text{            
    background-color: #dadddf;
    padding: 0.5rem;
    font-weight: 800;
}
.archivo-icon{
    background-color: #dadddf;
    display: flex;
    align-items: center;
}
.archivos-container{
    display: flex;
    justify-content: center;
}
.archivo-text{
    flex: auto;
}
.justify{
    text-align: justify;
}
@media only screen and (max-width: 600px) {
    .archivos-container{
        flex-direction: column;                
    }
}
</style>`

function getEtsOption(option, chossen){
    console.log(option, chossen)
    return `
    <div class="ets-option ${option === chossen?"ets-choosen-option":""}">
        ${option}
    </div>
    `
}

function getFormRadioButton(button, chossen){
    let code = `<div class="box-container">`
    button.options.forEach(option => {
        code += getEtsOption(option, chossen)         
    })
    code += `</div>`
    return code
}

function getConclusion(button, chossen){
    let conclusion =  `<h2>${button.name}</h2>`    
    conclusion += getFormRadioButton(button, chossen)     
    return conclusion
}

async function getFiles(values){
    const resumen = await uploadFile(values.resumen)
    const informe = await uploadFile(values.informe)
    
    return `<div class="archivos-container">
            <div class="box-container">
                <div class="archivo-text">
                    RESUMEN PARA TOMADORES DE DECISIONES (FORMATO DECIDE)
                </div>
                <div class="archivo-icon">
                    <a href="${resumen}" target="_blank">
                        <img alt="" height="35" src="https://pdime.s3.amazonaws.com/media/images/Down.original.png" width="34">
                    </a>    
                </div>                        
            </div>                 
            <div class="box-container">            
                <div class="archivo-text">
                    INFORME FINAL
                </div>
                <div class="archivo-icon">
                    <a href="${informe}" target="_blank">
                        <img alt="" height="35" src="https://pdime.s3.amazonaws.com/media/images/Down.original.png" width="34">
                    </a>
                </div>
            </div>            
        </div>`        
    }

function getButtons(values, radioButtons = []){
    let code = ""
    radioButtons.forEach(button => {
        code += getFormRadioButton(button, values[button.name])
    })
    return code
}

export default async function generarCodigo(values, radioButtons, conclusionButton){
    let code = ""

    code += styles
    code += `<div class="enfermedades-container">`

        code += getConclusion(conclusionButton, values["CONCLUSIÓN"])
        code += await getFiles(values)
        code += `<p class="justify">${values.conclusion}</p>`
        code += `<h2>Resultados Generales</h2> <p>A continuación se indica de manera muy breve los resultados obtenidos; la justificación y datos que soportan cada dominio pueden ser consultados en el informe final.</p>`
        code += getButtons(values, radioButtons)    
    
    code +=`</div>`

    return code
}