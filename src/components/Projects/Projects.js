
import React, { useEffect, useState } from "react";
import "./Projects.scss";
import { fetchData, checkProjectLink } from "../../api"
import { Container } from "react-bootstrap";
export const Projects = () => {
  const [project, setProjects] = useState([]);
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
  console.log(project)
  // when click on button to load project 
  const loadProject = async (projectLink) => {
    console.log(projectLink)
    const isValidLink = await checkProjectLink(projectLink)
    if(!isValidLink) {
      console.log("yes")
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

  const [ProjectType, setProjectType] = useState("react");

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
            <img
              className="card__img"
              src={projects.img && projects.img}
              alt="img"
            />
          </div>
          <button
            className="card__link"
            onClick={() => loadProject(project.link)}
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
    <div className="projectsHolder">
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
        <div className="content-section"> {ProjectsByFilter} </div>
      </Container>
    </div>
  );
};
