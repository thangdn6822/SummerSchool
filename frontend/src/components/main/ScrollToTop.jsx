"use client";
import React from 'react';
import { useEffect } from 'react';
import { useScroll, motion, useAnimation } from 'framer-motion'; 
import { IoIosArrowDropupCircle } from "react-icons/io"; 



const ScrollToTopContainerVariants = {
    hide: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
};


function ScrollToTopButton() {
    const { scrollYProgress } = useScroll();
    const controls = useAnimation();

    useEffect(() => {
        
        return scrollYProgress.on('change', (latestValue) => {
           
            if (latestValue > 0.5) {
               
                controls.start('show');
            } else {
                
                controls.start('hide');
            }
        });
    }, [scrollYProgress, controls]); 

  
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

   
    return (
        <motion.button
            className="fixed bottom-0 right-0 mr-[14px] mb-4 z-10"
            variants={ScrollToTopContainerVariants}
            initial="hide" 
            animate={controls} 
            onClick={scrollToTop}>
            <IoIosArrowDropupCircle className='w-[55px] h-[55px] text-[#2c31cf]'/> 
        </motion.button>
    );
}

export default ScrollToTopButton; // Export the component
