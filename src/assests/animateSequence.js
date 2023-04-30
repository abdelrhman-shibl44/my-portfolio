import { useEffect } from "react";

export const AnimateSequence = (useAnimation) => {
  const controls = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

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
          duration: 0.8,
          ease: "easeOut",
          type:"spring",
          stiffness: 400,
          // damping: 10
        },
      });
      await controls3.start({
        opacity:1,
        y:0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      });
      await controls2.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      });
      await controls2.start({
        scale: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          type:"spring",
          stiffness: 500,
          damping: 20
        },
      });
    };
    animateSequence();
  }, [controls,controls2,controls3]);
  return  [controls, controls2, controls3];
}