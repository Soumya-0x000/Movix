import React from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedin,
    FaGithub
} from "react-icons/fa";
import './Footer.scss'
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerContent = [
        {title: 'Terms of use'}, 
        {title: 'Privacy Policy'}, 
        {title: 'About'}, 
        {title: 'Blog'}, 
        {title: 'FAQ'}
    ]

    const iconMenu = [
        {icon: <FaFacebookF />, link: 'https://www.facebook.com/profile.php?id=100013009510929'}, 
        {icon: <FaInstagram />, link: 'https://www.instagram.com/soumya_s_das/'},  
        {icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/soumya-sankar-das-874085221/'}, 
        {icon: <FaGithub />, link: 'https://github.com/Soumya-0x000'}, 
    ]

    return (
        <footer className='bg-black3 py-[2rem]'>
            <ContentWrapper>
                <div className='text-white text-sm md:text-[16px] flex flex-col items-center justify-center gap-y-10'>
                    <div className='flex gap-x-5 md:gap-x-8'>
                        {footerContent.map((item, index) => (
                            <div className='footerButton hover:text-pink sm:hover:ring-2 hover:ring-pink hover:rounded-full sm:hover:px-1 md:hover:px-2 transition-all cursor-pointer'
                            key={index}>
                                {item.title}
                            </div>
                        ))}
                    </div>
                    
                    <div className='text-slate-400 text-justify px-[1rem] lg:px-0 w-full md:max-w-[800px] lg:max-w-[1200px] leading-[22px] '>
                        Passionate frontend developer skilled in HTML5, CSS, and JavaScript, with expertise in React JS for building scalable and interactive user interfaces. Proficient in Tailwind CSS, SASS for efficient styling and Redux Toolkit for state management in large-scale applications. Experienced in integrating Firebase for versatile backend functionalities. Adept at collaborative development using Git and GitHub. Dedicated to crafting visually appealing and responsive web experiences.
                    </div>
                    
                    <div className='flex gap-x-7'>
                        {iconMenu.map((item, index) => (
                            <Link to={item.link} key={index}>    
                                <span 
                                className='icon text-[1.5rem] bg-black text-white hover:text-pink p-3 rounded-full flex items-center justify-center cursor-pointer transition-all '>
                                    {item.icon}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </ContentWrapper>
        </footer>
    )
}

export default Footer