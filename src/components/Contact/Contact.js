import React, { useEffect, useState } from 'react'
import "./Contact.scss"
import { Container } from 'react-bootstrap';
import variables from  "../../variables.scss"
import { AnimatedLetters } from '../utilities/utils';
import {motion, useAnimation} from "framer-motion"

export const Contact = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [formData ,setFormData] = useState({
    name:"",
    email:"",
    message:""
  })
  // handle input change 
  const handleInputChange = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }
  console.log("name" + formData.name, "email" + formData.email,formData.message)
  const nameArray = ["C","o","n","t","a","c","t","","M","e"]
  useEffect(()=> {
    setTimeout(() => {
      setLetterClass("text-animate-hover")
    },3000)
  },[])

  const controls = useAnimation();

  useEffect(() => {
    const animateSequence = async () => {
      await controls.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      });
      await controls.start({
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      });
    };
    animateSequence();
  }, [controls]);

// handle submit 
const handleSubmit = async(e) => {
  e.preventDefault();
  try{
    await fetch("http://localhost:5050/api/send-email",{
      method:"POST",
      body:JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json',
      },
    });
    alert("Email sent successfully");
    setFormData({name:"",email:"",message:""})
  } catch(err){
    console.log(err);
  }

}

  return (
  <div className='Contact'>
  <Container fluid className='text-center skills-container'> 
    <h2 style={{color:variables.lightColor}}  className='my-5'> 
          <AnimatedLetters 
          strArray={nameArray}
          idx={15} 
          letterClass={letterClass}
          />
    </h2>
    <motion.div
      style={{ opacity: 0, x: -50, scale: 0.7 }}
      className='motionDiv'
      initial="hidden"
      animate={controls}
      // variants={formVariants}
    >
      <div className="contact-section">
            <p className ="subHead">GET IN TOUCH</p>
            <h2>Contact.</h2>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <label htmlFor="name">Name:</label>
                <input  type="text" id="name" name="name" value={formData.name}  onChange={handleInputChange}  placeholder="what's your name?"  required/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="what's your email?" required/>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="what do you want to say?" required></textarea> 
                <button type="submit">Send</button>
          </form> 
        </div> 
    </motion.div>
    </Container>
  </div>
  )
}

export default Contact;
