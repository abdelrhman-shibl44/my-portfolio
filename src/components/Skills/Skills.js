import React, { useEffect, useState } from 'react'
import "./Skills.scss"
import { AnimatedLetters } from '../utilities/utils';
import { Container } from 'react-bootstrap';
import BallCanvas from './BallCanvas';
import variables from  "../../variables.scss"
import skillsData from '../../assests/skillsData/skillsData';
export let Skills = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const nameArray = ["M","y","","S","k","i","l","l","s"]
  useEffect(()=> {
    setTimeout(() => {
      setLetterClass("text-animate-hover")
    },3000)
  },[])
  
  return (
    <div className='skills'>
      <Container fluid className='text-center skills-container'>
      <h2 style={{color:variables.lightColor}}  className='my-5'>
        <AnimatedLetters
          strArray={nameArray}
          idx={15} 
          letterClass={letterClass}
          />
      </h2>
      <div      
      className='tecnologies d-flex justify-content-center flex-wrap align-items-center gap-50'>
        {
          skillsData.map((skills) => (
            <BallCanvas key={skills.id} icon={skills.icon}/>
          ))
        }
      </div>
      </Container>
    </div>
  )
}; 
    
export default Skills;
