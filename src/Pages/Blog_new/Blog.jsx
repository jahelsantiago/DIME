import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { addResume } from '../../firebase/fireActions'
import useArray from '../../Hooks/useArray'
import PaginaCompleta from './BlogSections'
import "./Blog.css"
import { generateCodigoPaginaCompleta, preProcessSections } from './Utils'
import { CopyButton } from '../../components/CopyButton'


const Blog = () => {

    const [titulo, setTitle] = useState("Titulo")
    const [fecha, setFecha] = useState("2020-01-01")
    const [autores, setAutores] = useState("estos son los autores")
    const [resumen, setResumen] = useState("esto es el resumen")
    const [categoria, setCategorias] = useState("esti es ka ategoria")
    const [pagina, setPagina] = useState("")

    const [sections , push, remove, edit, up, down] = useArray() //array to sabe de sections

    const [codigoPaginaCompleta, setCodigoPaginaCompleta] = useState("")

    const [disableResumenButton, setdisableResumenButton] = useState(false)

    //funcion para publicar el resumen en Firebase
    async function postResume(){
        setdisableResumenButton(true)
        const wasSuccesfull = await addResume(resumen, autores, titulo, fecha, categoria, pagina)
        setdisableResumenButton(false)
    }

    //funcion para generar el resumen de la pagina completa
    async function generarResumen(){
        await preProcessSections(sections, titulo)
        const codigo = generateCodigoPaginaCompleta(titulo, categoria, fecha, autores, sections)
        setCodigoPaginaCompleta(codigo)

    }


    return (
        <div className='blog-container'>
            <h1>Blog</h1>
            {/* create a multiline imput field using material UI */}
            <label className='blog-label'>
                Titulo
            </label>
            <textarea rows="4" cols="90" placeholder="Titulo" value={titulo} onChange = {(e=>{setTitle(e.target.value)})}/>

            <label className='blog-label'>
                Fecha
            </label>
            <input type="date" placeholder="Fecha" onChange={(e)=>{setFecha(e.target.value)}}/>

            <label className='blog-label'>
                Autores
            </label>
            <textarea rows="2" cols="70" placeholder="Autores" onChange={(e)=>{setAutores(e.target.value)}}/>

            <label className='blog-label'>
                Resumen
            </label>
            <textarea rows="20" cols="90" placeholder="Resumen" onChange={(e)=>{setResumen(e.target.value)}}/>


            <label htmlFor="categorias">Categoria</label>
            <select name="cars" id="categorias" onChange={(e)=>{setCategorias(e.target.value)}}>
                <option value="Opinión">Opinión</option>
                <option value="Policy Brief">Policy Brief</option>
                <option value="Boletin">Boletin</option>
            </select>

            {/* Create an input flied that only accepts numbers */}
            <label className='blog-label'>
                Numero de la pagina en Oracle
            </label>
            <input type="number" placeholder="Numero de paginas" onChange={(e)=>{setPagina(e.target.value)}}/>

            <Button variant="contained" color="primary" onClick={postResume} disabled = {disableResumenButton}>Publicar codigo del resumen</Button>

            <PaginaCompleta sections={sections} push={push} remove={remove} edit={edit} up={up} down={down}/>

            <Button onClick = {generarResumen} variant="contained" color="primary">Generar Codigos</Button>

            <CopyButton text = {codigoPaginaCompleta}/>

            <p className='seccion-codigo'>
                {codigoPaginaCompleta}
            </p>
        </div>
    )
}

export default Blog