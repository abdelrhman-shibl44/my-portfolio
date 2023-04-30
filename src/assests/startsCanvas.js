import { useEffect,useRef } from "react";

export const useStars = () => {
  const canvasRef = useRef(null);

  const numStars = 100;
  const maxStarSize = 2;
  const minStarSize = 1;
  const maxSpeed = 0.5;
  const minSpeed = 0.1;
  const maxOpacity = 1;
  const minOpacity = 0.3;
  const maxDistance = 100;
useEffect(() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  const stars = [];

  // Initialize stars
  const initializeStars = () => {
    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * (maxStarSize - minStarSize) + minStarSize;
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
      stars.push({ x, y, size, speed, opacity });
    }
  };
  initializeStars();

  // Draw stars
  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
      context.closePath();
      context.globalAlpha = star.opacity;
      context.fill();
    }
  };

  // Move stars
  const move = () => {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.x += star.speed;
      if (star.x > canvas.width + maxDistance) {
        star.x = -maxDistance;
      }
    }
  };

  // Animate stars
  const animate = () => {
    move();
    draw();
    requestAnimationFrame(animate);
  };
  animate();

  // Handle click events
  const handleClick = (event) => {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    const size = Math.random() * (maxStarSize - minStarSize) + minStarSize;
    const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
    stars.push({ x, y, size, speed, opacity });
  };
  canvas.addEventListener('click', handleClick);

    // Handle window resize events
const handleResize = () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// initializeStars()
};
window.addEventListener('resize', handleResize);
// Clean up
return () => {
canvas.removeEventListener('click', handleClick);
window.addEventListener('resize', handleResize);
  };
}, []);
return canvasRef;
}