import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

const pages = ["slides", "blog"]

export default function NavBar() {
    return (
        <div className = "navBar-container">
            {pages.map(item => (
                <Link to = {`/${item}`} className = "nav-links">
                    {item}
                </Link>
            ))}            
        </div>
    )
}
