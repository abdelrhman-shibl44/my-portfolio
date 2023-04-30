import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { disableRightClick, AnimatedLetters } from "../utilities/utils"
import "./Home.scss"
import { useStars } from '../../assests/startsCanvas';

export const Home = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  useEffect(() => {
    setTimeout(() => setLetterClass("text-animate-hover"), 4000);
  }, []);
  const nameArray = ["A", "b", "d", "e", "l", "r", "h", "m", "a", "n"];
  const jobArray = ["w", "e", "b", " ", "D", "e", "v", "e", "l", "o", "p", "e", "r"];
  // const canvasRef = useRef(null);
  const canvasRef = useStars();
    return (
        <div className='HomeHolder'>
                <canvas ref={canvasRef}  width={window.innerWidth} height={window.innerHeight} id="star-canvas"></canvas>
            <Container fluid >
                <Row className='rowHolder justify-content-center align-items-center gap-5'>
                    <Col xs={11} md={10} lg={7} className='myInfo d-flex justify-content-center align-items-center'>
                        <section className="hero">
                            <div className="bounce-in">
                                <h2>
                                    <span className={letterClass}>H</span>
                                    <span className={`${letterClass} _12`}>i,</span>
                                    <br />
                                    <span className={`${letterClass} _13`}>I</span>
                                    <span className={`${letterClass} _14`}>,m</span>
                                    <br />
                                    <AnimatedLetters
                                        letterClass={letterClass}
                                        strArray={nameArray}
                                        idx={15} />
                                    <br />
                                    <AnimatedLetters
                                        letterClass={letterClass}
                                        strArray={jobArray}
                                        idx={25} />
                                </h2>
                            </div>
                            <p>
                                I'm a skilled front-end developer with 2 years of experience
                                in building modern, user-friendly websites and web applications
                                using HTML, CSS, and JavaScript.
                                I'm passionate about delivering high-quality work
                                and constantly exploring new web technologies and techniques
                                to stay ahead of the curve.
                            </p>
                            <Link to="/Projects" className="btn m-0">View My Work</Link>
                        </section>
                    </Col>

                    <Col className='imgHolder' xs={11} md={10} lg={5}>
                        <div className="personalImg">
                            <img className='img-fluid' width="100%" height="100%" src='images/personalImg.jpg' alt="personalImg" onContextMenu={disableRightClick} />
                        </div>
                    </Col>
                </Row>
                {/* wavy background at the bottom of body */}
                <div className="custom-shape-divider-bottom-1678488528">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </Container>
        </div>
    )

};
