import React, { useRef } from 'react'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import dayjs from 'dayjs'
import Img from '../lazyLoadImage/Img'
import PosterFallback from '../../assets/no-poster.png'
import './carousel.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'
import { navigation } from '../navigationIcon/navigation'

const Carousel = ({data, loading, endPointShowType, title}) => {
    const carouselContainer = useRef()
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()
    
    const skItem = () => {
        return (
            <div className="skeletonItem w-[125px] flex-shrink-0 ">
                <div className="posterBlock skeleton rounded-xl w-full aspect-[1/1.5] mb-[30px] "></div>
                <div className="textBlock flex flex-col space-y-[10px]">
                    <div className="title skeleton w-full h-5 rounded-md"></div>
                    <div className="date skeleton w-3/4 h-5 rounded-md"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='carousel mb-[50px] '>
            <ContentWrapper>
                {title && <div className="carouselTitle text-[24px] text-white mb-5 ">{title}</div>}
                <div className='contentWrapper relative'>
                    <BsFillArrowLeftCircleFill
                        className='carouselLeftNav arrow text-3xl text-black absolute left-[10px] top-[44%] -translate-y-[50%] cursor-pointer opacity-60 hover:opacity-90 transition-all z-10 hidden md:block bg-green-300 rounded-full '
                        onClick={() => navigation({dir:'left', carouselContainer, pixels:20})}
                    />
                    <BsFillArrowRightCircleFill
                        className='carouselRightNav arrow text-3xl text-black absolute right-[10px] top-[44%] -translate-y-[50%] cursor-pointer opacity-60 hover:opacity-90 transition-all z-10 hidden md:block bg-green-300 rounded-full '
                        onClick={() => navigation({dir:'right', carouselContainer, pixels:20})}
                    />
                    {loading ? (
                        <div className='loadingSkeleton flex gap-x-[10px] md:gap-x-[20px] overflow-y-hidden md:overflow-hidden '>
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    ) : (
                        <div 
                        className='carouselItems flex gap-[10px] overflow-y-hidden md:gap-[20px] md:overflow-hidden' 
                        ref = {carouselContainer}>
                            {data?.map((item, index) => {
                                const posterUrl = item?.poster_path 
                                    ? url.poster + item?.poster_path 
                                    : PosterFallback
                                return (
                                    <div 
                                    key={index}
                                    className={`carouselItem w-[125px] cursor-pointer flex-shrink-0 `} 
                                    onClick={() => navigate(`/${item?.media_type || endPointShowType}/${item?.id}`)}>
                                        <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px]">
                                            <Img 
                                                src={posterUrl} 
                                                className={`w-full h-full object-cover object-center`} 
                                            />
                                            <CircleRating rating={item?.vote_average?.toFixed(1)} onPage={'carousel'} />
                                            <div className='hidden md:flex '>
                                                <Genres data={item?.genre_ids?.slice(0, 2)} onPage={'carousel'}/>
                                            </div>
                                        </div>

                                        <div className="textBlock flex flex-col text-white">
                                            <span className="title text-[16px] mb-[10px] leading-6 md:text-[20px] ">
                                                {item?.title || item?.name}
                                            </span>
                                            <span className="date text-[14px] opacity-50">
                                                {dayjs(item?.release_date).format("MMM DD YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Carousel
