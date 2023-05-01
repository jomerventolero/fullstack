import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="absolute top-[800px]">
        <div className="flex flex-col gap-4">
            <motion.div
                initial={{ x: "150vw" }}
                animate={{ x:0 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.4}}
                >
                <span>
                    <br/>Welcome to Celina Plains Subdivision, where peaceful living begins! 
                    <br/>Our community is dedicated to providing a serene haven for families and individuals alike. 
                    <br/>With beautiful homes surrounded by lush greenery, Celina Plains is the perfect place to call home.
                </span>
            </motion.div>
            <motion.div
                initial={{ x: "150vw" }}
                animate={{ x:0 }}
                transition={{ type: "spring", stiffness: 40, delay: 0.4}}
                >
                <span>
                    <br/>Our community is located in a prime location, with easy access to schools, hospitals, and shopping centers. 
                    <br/>We understand that convenience is important to our residents, and we aim to make daily life as hassle-free as possible.
                </span>
            </motion.div>
        </div>
    </section>
  )
}

export default About
