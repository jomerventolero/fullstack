import React from 'react'
import herobg from '../assets/herobg.jpg'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className=" ">
      <motion.div
        initial={{ y: "-50vw" }}
        animate={{ y:0 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.4}}
        className="-z-40"
        >
        <img src={herobg} alt="hero" className="w-1/4 absolute top-[140px] left-20 -z-10"/>
        

      </motion.div>  
      <motion.h1 
        initial={{ x: "-50vw"}}
        animate={{ x:0 }}
        transition={{ type: "spring", stiffness: 40, delay: 0.4}}
        className="absolute top-[280px] left-[100px] text-[64px] font-poppins font-semibold text-white">C E L I N A</motion.h1>
      <motion.h1 
          initial={{ y: "150vw"}}
          animate={{ y:0 }}
          transition={{ type: "spring", stiffness: 40, delay: 0.4}}
          className="absolute top-[280px] left-[440px] text-[64px] font-poppins font-semibold text-black">P L A I N S</motion.h1>
      <motion.p className="text-black absolute top-[350px] left-[444px] font-poppins font-semibold">
        Discover Your Serene Haven at Celina Plains <br/> Where Peaceful Living Begins
      </motion.p>
    </div>
  )
}

export default Hero
