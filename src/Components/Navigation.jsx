import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaWindowClose } from "react-icons/fa";
import { useState } from 'react';
import ListMenu from '../Data/ListMenu';
import '../css/Navigation.css'
function Navigation() {
    const [showmenu, setShowMenu] = useState(false)
    const toggleMenu=()=>setShowMenu(!showmenu)
  return (
    <aside>
        <div className='navbar'>
            <div className='navbar-toggle'>
                <Link to='#'>
                    <FaBars onClick={toggleMenu}/>
                </Link>
            </div>
        </div>
        <nav className={showmenu ? "nav-menu active" : "nav-menu"}>
            <ul className='nav-menu-items' onClick={toggleMenu}>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bar'>
                        <FaWindowClose onClick={toggleMenu}/>
                    </Link>
                </li>
                {ListMenu.map((menu, index) => {
                    return (
                        <li className='menu-text' key={index}>
                            <Link to={menu.path}>{menu.icon}<span>{menu.titile}</span></Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </aside>
  )
}

export default Navigation