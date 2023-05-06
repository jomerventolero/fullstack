import React from 'react'
import herobg from '../assets/herobg.jpg'
import { motion } from 'framer-motion'
import celina from '../assets/celina-bg.jpg'

const Hero = () => {
  return (
    <div className=" ">
      <img src={celina} alt="celina" draggable="false" className="w-screen fixed -z-50 blur-sm" autoPlay loop/>
      <motion.div
        initial={{ y: "-50vw" }}
        animate={{ y:0 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.4}}
        className="-z-10"
        >
        <img src={herobg} draggable="false" alt="hero" className="w-1/4 absolute top-[140px] left-20 -z-10"/>
      </motion.div>  
      <motion.h1 
        initial={{ x: "-50vw"}}
        animate={{ x:0 }}
        transition={{ type: "spring", stiffness: 40, delay: 0.4}}
        className="absolute top-[290px] left-[45px] text-[128px] font-poppins font-semibold text-blue-500 drop-shadow-2xl">C E L I N A</motion.h1>
      <motion.h1 
          initial={{ y: "150vw"}}
          animate={{ y:0 }}
          transition={{ type: "spring", stiffness: 40, delay: 0.4}}
          className="absolute top-[390px] left-[195px] text-[64px] font-poppins font-semibold text-white drop-shadow-2xl z-30">P L A I N S</motion.h1>
      <motion.p 
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1}}
        className="text-white text-2xl absolute top-[350px] left-[55%] font-poppins font-semibold z-10">
        Discover Your Serene Haven at Celina Plains <br/> Where Peaceful Living Begins
      </motion.p>
      <motion.div 
        initial={{ y: "150vw"}}
        animate={{ y:0 }}
        transition={{ type: "spring", stiffness: 40, delay: 0.4}}
        className="absolute top-[200px] left-[40px] bg-blue-300 h-1/2 w-1/4 -z-20">
      </motion.div>
    </div>
  )
}

export default Hero
