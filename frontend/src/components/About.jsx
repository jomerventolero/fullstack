import React from 'react';
import { motion } from 'framer-motion';
import video0 from '../assets/video.webm';


const About = () => {
  return (
    <section id="about" className="absolute top-[800px] bg-white w-full object-fill flex flex-col">
        <div className="flex flex-row">
            <div className="flex flex-col gap-4 p-8">
                <motion.div
                    initial={{ x: "150vw" }}
                    animate={{ x:0 }}
                    transition={{ type: "spring", stiffness: 60, delay: 0.4}}
                    className="flex flex-col justify-start pl-10 font-poppins font-semibold text-black"
                    >
                    <span>
                        <h1 className="text-3xl"><br/>Welcome to Celina Plains Subdivision, where peaceful living begins! </h1>
                        <br/>Our community is dedicated to providing a serene haven for families and individuals alike. 
                        <br/>With beautiful homes surrounded by lush greenery, Celina Plains is the perfect place to call home.
                    </span>
                </motion.div>
                <motion.div
                    initial={{ x: "150vw" }}
                    animate={{ x:0 }}
                    transition={{ type: "spring", stiffness: 40, delay: 0.4}}
                    className="flex flex-col justify-start pl-10 font-poppins font-semibold text-black"
                    >
                    <span>
                        <br/>Our community is located in a prime location, with easy access to schools, hospitals, and shopping centers. 
                        <br/>We understand that convenience is important to our residents, and we aim to make daily life as hassle-free as possible.
                    </span>
                </motion.div>
                <motion.div
                    initial={{ x: "150vw" }}
                    animate={{ x:0 }}
                    transition={{ type: "spring", stiffness: 40, delay: 0.4}}
                    className="flex flex-col justify-start pl-10 font-poppins font-semibold text-black"
                    >
                    <span>
                    At Celina Plains, we take pride in our commitment to creating a safe and secure environment for our residents. We have a dedicated security team that works around the clock to ensure the safety of our community. We also have a strict set of rules and regulations that help maintain the tranquility of our surroundings.
                    </span>
                </motion.div>
                <motion.div
                    initial={{ x: "150vw" }}
                    animate={{ x:0 }}
                    transition={{ type: "spring", stiffness: 40, delay: 0.4}}
                    className="flex flex-col justify-start pl-10 font-poppins font-semibold text-black"
                    >
                    <span>
                    We offer a wide range of amenities to our residents, including a swimming pool, playground, and basketball court. We also have a clubhouse that is perfect for hosting events and social gatherings.
                    </span>
                </motion.div>
            </div>
            <div>
                <motion.div
                    initial={{ x: "150vw" }}
                    animate={{ x:0 }}
                    transition={{ type: "spring", stiffness: 40, delay: 0.4}}
                    className="flex flex-col justify-start pl-10 font-poppins font-semibold p-4 text-black"
                    >
                    <h1 className="font-poppins text-black py-8 text-3xl">Find us here </h1>
                    <iframe src="https://www.google.com/maps/d/u/7/embed?mid=1rSKTnKNq9Kuo62S8eeERRZf2f0pTW5c&ehbc=2E312F" width="640" height="480"></iframe>
                </motion.div>
            </div>
        </div>
        <div className="flex flex-row justify-center">
            <h1>CELINA PLAINS IMUS</h1>
            <video src={video0} alt="video" className="h-3/4 w-full " autoPlay loop/>
        </div>
    </section>
  )
}

export default About
