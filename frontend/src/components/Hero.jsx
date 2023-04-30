import React from 'react'
import herobg from '../assets/herobg.jpg'
import keys from '../assets/keys.png'
import { motion } from 'framer-motion'
import herobg2 from '../assets/herobg2.png'

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
        className="absolute top-[280px] left-[100px] text-[64px] font-poppins font-semibold text-white drop-shadow-2xl">C E L I N A</motion.h1>
      <motion.h1 
          initial={{ y: "150vw"}}
          animate={{ y:0 }}
          transition={{ type: "spring", stiffness: 40, delay: 0.4}}
          className="absolute top-[280px] left-[440px] text-[64px] font-poppins font-semibold text-black">P L A I N S</motion.h1>
      <motion.p 
        initial={{ x: "150vw"}}
        animate={{ x:0 }}
        transition={{ type: "spring", stiffness: 20, delay: 0.2}}
        className="text-black absolute top-[350px] left-[444px] font-poppins font-semibold z-10">
        Discover Your Serene Haven at Celina Plains <br/> Where Peaceful Living Begins
      </motion.p>
      <motion.div 
        initial={{ y: "150vw"}}
        animate={{ y:0 }}
        transition={{ type: "spring", stiffness: 40, delay: 0.4}}
        className="absolute top-[200px] left-[40px] bg-blue-300 h-1/2 w-1/4 -z-20">
      </motion.div>
      <motion.div
        initial={{ y: "-50vw" }}
        animate={{ y:0 }}
        transition={{ type: "spring", stiffness: 60, delay: 0.1}}
        className="-z-40"
        >
        <img src={keys} alt="keys" className="w-1/4 absolute top-[100px] left-[20px]"/>
      </motion.div>
      <motion.div
        initial={{ x: "50vw" }}
        animate={{ x:0 }}
        transition={{ type: "spring", stiffness: 80, delay: 0.8}}
        className="-z-40"
        >
        <img src={herobg2} alt="hero" className="w-1/2 absolute top-[60px] right-2 -z-10"/>
      </motion.div>  
    </div>
  )
}

export default Hero
