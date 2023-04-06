
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./GeneralLinks.scss"
export const GeneralLinks = () => {
    return (
        <div className='general__Links  d-flex  '>
            <a href="https://github.com/abdelrhman-shibl44" className="link">
                <FontAwesomeIcon icon={faGithub} size="1x" />
                <span className="text">Github</span>
            </a>
            <a href="https://linkedin.com/in/abdelrhman-shibl/" className="link">
                <FontAwesomeIcon icon={faLinkedin} size="1x" />
                <span className="text">LinkedIn</span>
            </a>
        </div>
    )
}
