import React, { useReducer, useRef, useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
import noImg from '../../../assets/no-poster.png'
import Img from '../../../components/lazyLoadImage/Img'
import { useSelector } from 'react-redux'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import {navigation} from '../../../components/navigationIcon/navigation'
import { useNavigate } from 'react-router-dom'


const Trending = () => {
    const [endPointShowType, setEndPointShowType] = useState('movie')
    const [endPointTime, setEndPointTime] = useState('day')
    const navigate = useNavigate()

    const {data, loading} = useFetch(`/trending/${endPointShowType}/${endPointTime}`)
    const { url } = useSelector((state) => state.home)
    const containerRef = useRef()
    
    const onTabChangeTime = (tab) => {
        setEndPointTime(tab === 'Day' ? 'day' : 'week')
    }

    const onTabChangeShowType = (tab) => {
        if (tab === 'Movie' || tab === 'TV Shows') {
            if (tab === "Movie") {
                setEndPointShowType('movie')
            } else {
                setEndPointShowType('tv')
            }
        } else if (tab === 'Person') {
            setEndPointShowType('person')
        } else {
            setEndPointShowType('all')
        }
    }

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="skeleton w-[125px] md:w-[210px] h-[180px] md:h-[300px] rounded-xl mb-4"></div>
                <div className="skeleton w-full h-5 rounded-full mb-3"></div>
                <div className="skeleton w-2/4 h-5 rounded-full mx-auto"></div>
            </div>
        )
    }

    return (
        <div className='carouselSection relative mb-[70px] -translate-y-7 sm:translate-y-0 '>
            <ContentWrapper>
                <div className='flex flex-col md:flex-row gap-y-2 items-center justify-between mb-[20px] '> 
                    <span className="carouselTitle text-[24px] text-white font-medium ">Trending</span>
                    
                    <div className='flex flex-col sm:flex-row items-center gap-y-3 gap-x-3'>
                        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChangeTime} size='100px' />
                        <SwitchTabs data={['Movie', 'TV Shows', 'Person']} onTabChange={onTabChangeShowType} size='100px' />
                    </div>
                </div>
            </ContentWrapper>

            {endPointShowType === 'person' ? (
                <ContentWrapper>
                    <div className='relative'>
                        <div className='gap-x-2 hidden md:flex justify-between w-full absolute z-20 bottom-[200px] px-1'>
                            <BsFillArrowLeftCircleFill 
                                className='cursor-pointer text-green-300 w-7 h-7 opacity-70 hover:opacity-100 hover:ring-2 hover:ring-green-600 hover:rounded-full'
                                onClick={() => navigation({dir:'left', carouselContainer:containerRef, pixels:20})}
                            />
                            <BsFillArrowRightCircleFill 
                                className='cursor-pointer text-green-300 w-7 h-7 opacity-70 hover:opacity-100 hover:ring-2 hover:ring-green-600 hover:rounded-full'
                                onClick={() => navigation({dir:'right', carouselContainer:containerRef, pixels:20})}
                            />
                        </div>
                        
                        {!loading ? (
                            <div 
                            className='flex gap-[10px] md:gap-5 overflow-x-auto mb-8'
                            ref={containerRef}>
                                {data?.results?.map((item, index) => {
                                    const posterUrl = item?.profile_path
                                        ? url.poster + item?.profile_path 
                                        : noImg;
                                    return(
                                        <div 
                                        key={index} 
                                        className='text-white flex flex-col items-center justify-center cursor-pointer'
                                        onClick={() => navigate(`/person/${item?.id}`)}>
                                            <div className='w-[125px] md:w-[256px] h-[180px] md:h-[330px] object-cover object-center rounded-xl overflow-hidden '>
                                                <Img src={posterUrl} className={`w-full h-full `}/>
                                            </div>
                                            <div className="name mt-4 text-[14px] md:text-[18px] leading-5 md:left-6 font-bold ">
                                                {item.name}
                                            </div>
                                            <div className="character text-[14px] md:text-[16px] leading-5 mt-2 md:left-6 opacity-50">
                                                {item.known_for_department}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="castSkeleton flex gap-5 overflow-hidden ">
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                            </div>
                        )}
                    </div>
                </ContentWrapper>
            ) : (
                <Carousel data={data?.results} loading={loading} />
            )}
        </div>
    )
}

export default Trending