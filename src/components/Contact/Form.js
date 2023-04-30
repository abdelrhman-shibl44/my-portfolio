import React, { useState } from 'react'
import {validateInput} from "../../assests/validateInput"
import { motion } from "framer-motion";
export const Form = ({setLoading,setSubmitMessage,setShow,controls3}) => {
  const [error, setError] = useState({ name: "", email: "", message:""});
  const [formData ,setFormData] = useState({ name:"", email:"", message:""});
  const port = process.env.PORT || 5050
   // handle input change 
  const handleInputChange = (e) =>{
    const {name,value} = e.target
    setFormData((prev) => ({...prev,[name]: value}))
    const error = validateInput(name,value)
    setError((prev) => ({...prev,[name]: error}));
  };
  // handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(true);
    try{
      const response = await fetch(`http://localhost:${port}/api/send-email`,{
        method:"POST",
        body:JSON.stringify(formData),
        headers:{
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if(data.status === "success"){
        setSubmitMessage([data.status,data.message])
      }else if(data.status === "error"){
        setSubmitMessage([data.status,data.message])
      };
      setShow(true)
      setFormData({name:"",email:"",message:""})
      setLoading(false)
    } catch(err){
      setLoading(false)
      setShow(true)
      console.log(err);
      setSubmitMessage(["Faild","Faild to send data"]);
    };
  };
  // onBlur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setError((prev) => ({ ...prev, [name]: error }));
  };
  return (
  <form onSubmit={handleSubmit} autoComplete='off'>
    <label htmlFor="name">Name:</label>
    <motion.div
      style={{ opacity: 0, y: "10px",width:"100%" }}
      animate={controls3}
    >
      <input style={error.name ? {marginBottom:0} : {marginBottom:"20px"} } 
        type="text" 
        id="name" 
        name="name" 
        value={formData.name} 
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="what's your name?" 
        required
      />
    </motion.div> 
    {error.name && <span className="err">{error.name}</span>}
    <label htmlFor="email">Email:</label>
    <motion.div
      style={{ opacity: 0, y: "10px",width:"100%" }}
      animate={controls3}
    >
    <input style={error.email ? {marginBottom:0} : {marginBottom:"20px"} }
      type="email" 
      id="email" 
      name="email"
      value={formData.email} 
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="what's your email?" 
      required
    />
    </motion.div>
    {error.email && <span className="err">{error.email}</span>}
    <label htmlFor="message">Message:</label>
    <motion.div
      style={{ opacity: 0, y: "10px",width:"100%" }}
      animate={controls3}
    >
    <textarea style={error.message ? {marginBottom:0} : {marginBottom:"20px"} } 
      id="message" 
      name="message" 
      value={formData.message}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="what do you want to say?"
        required>
    </textarea> 
    </motion.div>
    {error.message && <span className="err">{error.message}</span>}
    <button type="submit">Send</button>
</form> 
  )
}
