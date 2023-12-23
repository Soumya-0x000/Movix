import React, { useRef } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import noImg from '../../../assets/no-poster.png'
import Img from '../../../components/lazyLoadImage/Img'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import {navigation} from '../../../components/navigationIcon/navigation'
import { useNavigate } from 'react-router-dom'

const PopularPerson = () => {
    const { data: personData, loading: isPersonLoading } = useFetch(`/person/popular`)
    const { url } = useSelector((state) => state.home)
    const containerRef = useRef()
    const navigate = useNavigate()

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="skeleton w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 "></div>
                <div className="skeleton w-full h-5 rounded-full mb-3"></div>
                <div className="skeleton w-2/4 h-5 rounded-full mx-auto"></div>
            </div>
        )
    }

    return (
        <div className='mb-9'>
            <ContentWrapper>
                <div className='flex items-center justify-between mb-[20px] relative '>
                    <span className='text-[24px] text-white font-medium'>
                        Popular Person
                    </span>

                    <div className='gap-x-2 hidden md:flex absolute right-6'>
                        <BsFillArrowLeftCircleFill 
                            className='cursor-pointer text-green-300 w-7 h-7' 
                            onClick={() => navigation({dir:'left', carouselContainer:containerRef, pixels:5})}
                        />
                        <BsFillArrowRightCircleFill 
                            className='cursor-pointer text-green-300 w-7 h-7' 
                            onClick={() => navigation({dir:'right', carouselContainer:containerRef, pixels:5})}
                        />
                    </div>
                </div>

                {!isPersonLoading ? (
                    <div 
                    className='flex gap-[10px] md:gap-5 overflow-x-auto mb-8'
                    ref={containerRef}>
                        {personData?.results?.map((item, index) => {
                            const posterUrl = item?.profile_path
                                ? url.poster + item?.profile_path 
                                : noImg;
                            return(
                                <div 
                                key={index} 
                                className='text-white flex flex-col items-center justify-center'
                                onClick={() => navigate(`/person/${item?.id}`)}>
                                    
                                    <div className='w-[125px] md:w-[175px] h-[125px] md:h-[175px] object-cover object-center rounded-full overflow-hidden '>
                                        <Img src={posterUrl} className={`w-full h-full `}/>
                                    </div>
                                    <div className="name mt-4 text-[14px] md:text-[18px] leading-5 font-bold truncate ">
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
                    <div className="castSkeleton flex gap-5 ">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default PopularPerson