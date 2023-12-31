import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import { useLocation, useNavigate } from 'react-router-dom';
import "./Header.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/movix-logo.svg"

const Header = () => {
    const [show, setShow] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const [isPink, setIsPink] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const controlNavbar = () => {
        const scrollAmount = window.scrollY
        if (scrollAmount > 200) {
            if (scrollAmount > lastScrollY && !mobileMenu) {
                setShow('hide')
            } else {
                setShow('show')
            }
        } else {
            setShow('top')
        }
        setLastScrollY(scrollAmount)
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrollY])

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
        setShowSearch(false)
        setMobileMenu(true)
    }

    const searchQueryHandler = (event) => {
        if(event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {
                setShowSearch(false)
            }, 1000);
        }
    }

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie")
        } else if (type === 'tv') {
            navigate("/explore/tv")
        } else {
            navigate('/person/popular')
        }
        setMobileMenu(false)
    }

    const navigationContent = (alignment) => {
        return (
            <div className={`flex flex-row items-center justify-around md:gap-x-6 ring-2 py-2 md:py-1.5 md:px-6 md:rounded-full ${isPink ? 'ring-pink' : 'ring-cyan-500 '} text-cyan-300`}>
                <div 
                className='menuItem cursor-pointer hover:text-pink'
                onClick={() => navigationHandler('movie')}
                onMouseEnter={() => setIsPink(true)}
                onMouseLeave={() => setIsPink(false)}>
                    Movies
                </div>
                <div 
                className='menuItem cursor-pointer hover:text-pink'
                onClick={() => navigationHandler('tv')}
                onMouseEnter={() => setIsPink(true)}
                onMouseLeave={() => setIsPink(false)}>
                    TV Shows
                </div>
                <div 
                className='menuItem cursor-pointer hover:text-pink'
                onClick={() => navigationHandler('person')}
                onMouseEnter={() => setIsPink(true)}
                onMouseLeave={() => setIsPink(false)}>
                    Person
                </div>
            </div>
        )
    }

    return (
        <header className={`header z-50 fixed translate-y-0 w-full h-[60px] flex items-center text-white ${mobileMenu ? 'bg-[#020c1b]' : 'bg-[#00000040]'} transition-all ease-in-out backdrop-blur-[3px] ${show}`}>
            <ContentWrapper>
                <div className='flex items-center justify-between'>
                    <div className='logo' onClick={() => navigate('/')}>
                        <img src={logo} className='h-[50px] cursor-pointer'/>
                    </div>

                    <div className='menuItems list-none hidden md:flex flex-row-reverse sm:flex-row gap-x-6 items-center'>
                        {navigationContent('row')}
                        <div className='menuItem hover:text-pink text-[1.2rem] '>
                            <HiOutlineSearch onClick={openSearch} className='cursor-pointer'/>
                        </div>
                    </div>

                    <div className='mobileMenuItems flex gap-x-4 items-center justify-center text-lg md:hidden'>
                        <HiOutlineSearch  onClick={openSearch} className='cursor-pointer'/>
                        {!mobileMenu ? (
                            <SlMenu 
                            className='md:hidden cursor-pointer'
                            onClick={openMobileMenu}/>
                        ) : (
                            <>
                                <VscChromeClose onClick={() => setMobileMenu(!mobileMenu)} className='cursor-pointer'/>
                                <div className='mobileMenuItem bg-black absolute left-0 top-[60px] w-full '>
                                    {navigationContent('col')}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </ContentWrapper>

            {showSearch && (
                <div className='searchBar w-full h-[60px] bg-white absolute top-[60px] '>
                    <ContentWrapper>
                        <div className='searchInput w-full h-[60px] flex items-center justify-center'>
                            <input 
                                type="text"
                                placeholder='Search for a movie or tv show....'
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                                onKeyUp={searchQueryHandler}
                                className='w-full text-black h-full pl-3 border-none outline-none text-lg'
                                autoFocus={true}
                            />
                            <VscChromeClose 
                                onClick={() => setShowSearch(false)}
                                className='text-black bg-white h-full w-7 cursor-pointer '
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    )
}

export default Header