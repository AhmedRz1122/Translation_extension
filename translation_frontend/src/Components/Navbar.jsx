import React from 'react'
import Translate_logo from "../assets/Translation_logo.jpg"
import "./Navbar.css"

const Navbar = () => {
    return (

    <nav className='Navbar'>
            <div className='Navbar_left'>
     <img src={Translate_logo} alt="" className='logo'/>
            </div>
            <div className='Navbar_center'>
                <h1 className='Navbar_heading'>Alpha Translation</h1>
            </div>
            <div className='Navbar_right'>

            </div>

        </nav>
    )
}

export default Navbar