import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GeneralLinks } from './GeneralLinks';
import './NavLinks.scss';
import { links } from "./NavLinks"
import "./Sidebar.scss"
import { NavLink, useNavigate } from 'react-router-dom';
import { disableRightClick } from '../utilities/utils';
export const Sidebar = () => {
    const burgerContainer = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                burgerContainer.current.classList.add("burger-container")
            } else {
                burgerContainer.current.classList.remove("burger-container")
            }
        })
    })
    return (
        <>
            <div className={`sidebar d-flex justify-content-center flex-column align-items-center ${showMenu ? "open" : "close"}`}>
                <div onClick={() => navigate("/")} className='logo d-flex flex-column justify-content-center align-items-center'>
                    <img
                        style={{ mixBlendMode: "darken" }}
                        src="images/logo.png"
                        alt="Lion"
                        width="100"
                        height="100"
                        onContextMenu={disableRightClick} />
                    <h1 className='d-flex aling-items-center'>
                        <span>
                            <img style={{ 
                                mixBlendMode: "darken",
                                objectPosition: '0 -5px',
                                textShadow: '0 0 20px red' 
                            }}
                            src="images/logo.png"
                            alt="Lion"
                            width="40"
                            height="40"
                            onContextMenu={disableRightClick} />
                        </span>
                        bdo
                    </h1>
                </div>
                <div className="links">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            className="link"
                            to={link.path}
                            activeclassname="active"
                            onClick={() => setShowMenu(false)}
                        >
                            <FontAwesomeIcon icon={link.icon} size="2x" />
                            <span className="text">{link.text}</span>
                        </NavLink>
                    ))}
                </div>
                <GeneralLinks />
            </div>
            <div ref={burgerContainer}>
                <div className={`burger-icon ${showMenu && "open"}`} onClick={() => setShowMenu(prev => !prev)}>
                    <div className="burger-menu-line"></div>
                    <div className="burger-menu-line"></div>
                    <div className="burger-menu-line"></div>
                </div>
            </div>
        </>
    );
}






