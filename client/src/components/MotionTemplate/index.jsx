import { easeInOut, motion } from "framer-motion";
/* eslint-disable react/prop-types */
const MotionTemplate = ({
  children,
  bounce,
  type = "",
  x,
  y,
  delay,
  duration,
  vh,
  inf,
  opacity,
  rotate,
  scale,
  initScale,
  ease = easeInOut,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: vh }}
      transition={{
        type: { type },
        stiffness: 100,
        bounce: bounce,
        duration: duration,
        delay: delay,
        repeat: inf,
        repeatType: "reverse",
        ease: ease,
      }}
      variants={{
        hidden: {
          opacity: opacity,
          x: x,
          y: y,
          rotate: rotate,
          scale: initScale,
        },
        visible: { opacity: 1, x: 0, y: 0, scale: scale },
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionTemplate;
