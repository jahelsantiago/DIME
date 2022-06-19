import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

const pages = ["Home", "slides", "blog", "ETS", "Herramientas", "Precios"]

export default function NavBar() {
    return (
        <div className = "navBar-container">
            {pages.map(item => (
                <Link to = {`/${item}`} className = "nav-links" key = {item}>
                    {item}
                </Link>
            ))}            
        </div>
    )
}
