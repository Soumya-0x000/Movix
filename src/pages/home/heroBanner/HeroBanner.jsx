import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import './style.scss'
import Img from '../../../components/lazyLoadImage/Img'

const HeroBanner = () => {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home)

    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bg)
    }, [data])

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='heroBanner w-full h-[450px] md:h-[700px] bg-black flex items-center relative'>
            {!loading && (
                <div className='backdrop-img w-full h-[100%] absolute top-0 left-0 opacity-50 overflow-hidden object-cover object-center '>
                    <Img src={background} className='w-full h-full object-cover object-center'/>
                </div>
            )}
            
            <div className='opacity-layer w-full h-[250px] absolute bottom-0 left-0'></div>

            <ContentWrapper>
                <div className="heroBannerContent flex flex-col items-center text-white text-center relative max-w-[800px] mx-auto">
                    <span className="title text-[50px] font-bold mb-[10px] md:mb-0 md:text-[90px]">Welcome.</span>
                   
                    <span className="subTitle text-[18px] text-md mb-10 md:text-[24px]">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    
                    <div className="searchInput flex items-center justify-center w-full">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            className='w-[calc(100%-50px)] h-[50px] bg-white text-black outline-none border-none rounded-l-full px-4 text-[14px] md:w-[calc(100%-200px)] md:h-[60px] md:text-[20px] md:px-[30px] '
                        />

                        <button 
                        className='w-[100px] md:w-[150px] h-[50px] md:h-[60px] bg-gradient-to-r from-orange to-pink rounded-r-full text-[16px] md:text-[20px] '
                        onClick={() => navigate(`/search/${query}`)}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner