import React, { useEffect, useState } from 'react'
import "./Contact.scss"
import { Button, Container, Modal } from 'react-bootstrap';
import variables from "../../variables.scss"
import { AnimatedLetters } from '../utilities/utils';
import { motion, useAnimation } from "framer-motion";
import { Loader } from '../Loader/Loader';
import { Form } from './Form';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {useStars} from "../../assests/startsCanvas"
import {AnimateSequence} from "../../assests/animateSequence"


export const Contact = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [show, setShow] = useState(false);
  const [submitMessage, setSubmitMessage] = useState([])
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const canvasRef = useStars()
  const [controls,controls2,controls3] = AnimateSequence(useAnimation) 
  const nameArray = ["C", "o", "n", "t", "a", "c", "t", "", "M", "e"]
  useEffect(() => {
    setTimeout(() => {
      setLetterClass("text-animate-hover")
    }, 3000)
  }, [])
  // solve ignored attempt to cancel a touchmove event with cancelable= false
  function handleTouchMove(event) {
    // Check if the touchmove event occurred inside the MapContainer component
    if (event.target.closest('.leaflet-container')) {
      event.preventDefault(); // Prevent the default touchmove behavior
    }
  }

  useEffect(() => {
    // Add the touchmove event listener to the document object
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      // Remove the touchmove event listener when the component unmounts
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  // handle submit 

  
  return (
    <div className='Contact'>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{pointerEvents:"none"}} id="star-canvas"></canvas>
      <Container fluid className='text-cente contact-container'>
        <h2 style={{ color: variables.lightColor }} className='my-5 text-center'>
          <AnimatedLetters
            strArray={nameArray}
            idx={15}
            letterClass={letterClass}
          />
        </h2>
        <div className="contact-section d-flex justify-content-between align-items-center">
        <motion.div
          style={{ opacity: 0, scale:0.8, x: "-400px" }}
          className='motionDiv'
          initial="hidden"
          animate={controls}
        > 
            <div className='contact-form'>
              <p className="subHead">GET IN TOUCH</p>
              <h2>Contact.</h2>
              <Form
                setLoading={setLoading}
                setSubmitMessage={setSubmitMessage}
                setShow={setShow}
                controls3 ={controls3}
                />
            </div>
        </motion.div>
                
        <motion.div 
          className='motion_map'
          style={{ opacity: 0, x: "100%", scale: 0.7 }}
          initial="hidden"
          animate={controls2}
          
        >
            <div id='map'>
              <MapContainer center={[30.0352073, 31.563370237647135]} zoom={10}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[30.0352073, 31.563370237647135]}>
                  <Popup>
                    Abdelrhman. <br /> Lives here.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
        </motion.div>
          </div>
        {/* Success modal */}
        {show && <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{submitMessage[0]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={submitMessage[0] === "error" || submitMessage[0] === "Faild" ? { color: variables.purpleColor } : { color: variables.primaryColor }}>{submitMessage[1]}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>}
        {loading &&
          <>
            <div className='modal-backdrop fade show'></div>
            <Loader width="25" height="25" color={variables.purpleColor} />
          </>
        }
      </Container>

    </div>
  )
};

export default Contact;
