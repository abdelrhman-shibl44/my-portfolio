
import React, { useEffect, useState } from "react";
import "./Projects.scss";
import { fetchData, checkProjectLink } from "../../api"
import { Container } from "react-bootstrap";
import {AiOutlineCloseCircle} from "react-icons/ai";
import { Loader } from "../Loader/Loader";
export const Projects = () => {
  const [project, setProjects] = useState([]);
  const [valid, setValid] = useState(false);
  const [closeerrMess, setCloseErrMess] = useState(false);
  const [showOverlay,setShowOverlay] = useState(false);
  const [loading,setLoading] = useState(false);
  const [showProject,setShowProject] = useState(null);
  const [ProjectType, setProjectType] = useState("react");
  const [imagesLoaded,setImagesLoaded] = useState(true);

  const handleCloseProject = () =>{
    setShowProject(false)
    setShowOverlay(false)
  }
  useEffect(() => {
    fetchData().then((data) => {
      // order the projects
      data.sort((a, b) => a.sort_order - b.sort_order);
      setProjects(data);
    })

    // Poll every 10 seconds
    const intervalId = setInterval(() => {
      fetchData().then((data) => {
        // order the projects 
        data.sort((a, b) => a.sort_order - b.sort_order);
        setProjects(data);
      });
    }, 10000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [])
  // when click on button to load project 
  const loadProject = async (projectLink) => {
    setShowOverlay(true);
    setLoading(true)
    const isValidLink = await checkProjectLink(projectLink)
    setCloseErrMess(false)
    if(isValidLink) {
      setCloseErrMess(true)
      setLoading(true)
      setTimeout(() => setShowProject(projectLink),2000)
    }else{
      setValid(true)
      setLoading(false)
    }
  }

  const handleMouseMove = (e) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (height / 2 - y) / 8;
    const rotateY = (width / 2 - x) / 8;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetRotation = (e) => {
    e.currentTarget.style.transform = "none";
  };
  // when click on project type btn 
  const handleProjectType = (projectType) => {
    setProjectType(projectType)
    // check if image has loaded to prevent click
    switch (projectType) {
      case "react":
      case "jQuery":
      case 'javascript':
      case "bootstrap":
      case "html&css":
        break;
      default:
        break;
    }
    if(projectType === ProjectType){
      setImagesLoaded(false);
    }else setImagesLoaded(true);
  };
  const ProjectsByFilter = project
    .filter((project) => project.type === ProjectType)
    .map((projects) => (
      <div
        key={projects.id}
        className="cardHolder"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
      >
        <div className="card__content">
          <h2 className="card__title">{projects.name}</h2>
          <p className="card__description">{projects.description}</p>
          <div className="cardImg__Holder">
            {projects.img && (
            <>
            {imagesLoaded && <Loader width={10} height={10} color={"purple"}/>}
              <img
                className="card__img"
                src={`images/${projects.img}`}
                alt="img"
                style={{ opacity: imagesLoaded ? "0" : "1", transition: "1s" }}
                onError={(e) => {setTimeout(setImagesLoaded(false),2000); 
                  e.target.alt ="images not found";
                  e.target.src="images/faild-image.png";
                  e.target.parentElement.classList.add("img__Error") 
                }}
                onLoad={() => setTimeout(setImagesLoaded(false),2000)}
              />
            </>
            )}
          </div>
          <button
            className="card__link"
            onClick={() => loadProject(projects.link)}
          >
            Show Project
          </button>
        </div>
      </div>
    ));

  useEffect(() => {
    const headerSection = document.querySelector(".header-section")
    const buttons = headerSection.querySelectorAll('button')
    buttons.forEach((projectType) => {
      projectType.addEventListener('click', () => {
        buttons.forEach((button) => { button.classList.remove("active") })
        projectType.classList.add("active")
      })
    })
  })
  
  return (
    <div className={`projectsHolder`}>
      <Container fluid>
        <div className="header-section">
          <button className={ProjectType === "react" ? "active" : ""} onClick={() => handleProjectType("react")}>React</button>
          <button className={ProjectType === "jQuery" ? "active" : ""} onClick={() => handleProjectType("jQuery")}>jQuery</button>
          <button className={ProjectType === "javascript" ? "active" : ""} onClick={() => handleProjectType("javascript")}>
            JavaScript
          </button>
          <button className={ProjectType === "bootstrap" ? "active" : ""} onClick={() => handleProjectType("bootstrap")}>bootstrap</button>
          <button className={ProjectType === "html&css" ? "active" : ""} onClick={() => handleProjectType("html&css")}>Html&Css</button>
        </div>
        <div style={{display: showProject && "none"}} className="content-section"> {ProjectsByFilter} </div>
        <div className="currProjectHolder">
        {showProject && (
          <div className="currentProject">
            <button className="external__link">
              <a href = {showProject}>External Link</a>
            </button>
            <div onClick={handleCloseProject} className="close-btn">
                x
            </div> 
            <iframe
              title="projects"
              src={showProject}
              width="100%"
              height="92%"
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        )}
          {
            valid && (
          <div className={`errMessage ${closeerrMess && "close"}`}>
            The Link is invalid
            <button onClick={() => {setCloseErrMess(true); setShowOverlay(false); setLoading(false)}} >
              <AiOutlineCloseCircle />
            </button>
          </div>
          )}
        </div>
        {loading && <Loader width={25} height={25} color={"lavender"}/>}
        {
          showOverlay &&
          <div className="overlay"></div>
      } 
      </Container>
    </div>
  );
};
