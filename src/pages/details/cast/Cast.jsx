import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import avatar from '../../../assets/avatar.png'
import Img from '../../../components/lazyLoadImage/Img'
import {navigation} from '../../../components/navigationIcon/navigation'

const Cast = ({data, loading}) => {
    const { url } = useSelector((state) => state.home)
    const castContainer = useRef()

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 "></div>
                <div className="row skeleton w-full h-5 rounded-full mb-3"></div>
                <div className="row2 skeleton w-3/4 h-5 rounded-full mx-auto"></div>
            </div>
        )
    }

    return (
        <>
            {data?.length > 0 && (
                <div className='castSection relative mb-[50px] '>
                    <ContentWrapper>
                        <div className="sectionHeading flex items-center justify-between mr-3 mt-6 text-[24px] text-white mb-[25px] ">
                            <span>Top Cast</span>
                            <div className='gap-x-2 hidden md:flex'>
                                <BsFillArrowLeftCircleFill 
                                    className='cursor-pointer text-green-300' 
                                    onClick={() => navigation({dir:'left', carouselContainer:castContainer, pixels:10})}
                                />
                                <BsFillArrowRightCircleFill 
                                    className='cursor-pointer text-green-300' 
                                    onClick={() => navigation({dir:'right', carouselContainer:castContainer, pixels:10})}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <div className="castSkeleton flex gap-5 ">
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                                {skeleton()}
                            </div>
                        ) : (
                            <div className="listItems flex overflow-y-hidden gap-[20px] mx-[] md:m0 md:p-0"
                            ref={castContainer}>
                                {data?.map((item) => {
                                    let imgUrl = item.profile_path 
                                        ? url.profile + item.profile_path 
                                        : avatar
                                    return (
                                        <div 
                                        className="listItem flex flex-col justify-between w-[125px] md:w-[175px] h-[325px] md:h-[250px] text-white"
                                        key={item.id}>
                                            <div className="profileImg w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full overflow-hidden mb-4 md:mb-6">
                                                <Img src={imgUrl}/>
                                            </div>
                                            <div className="name text-[14px] md:text-[18px] text-center leading-5 md:left-6 font-bold truncate ">
                                                {item.name}
                                            </div>
                                            <div className="character text-[14px] md:text-[16px] leading-5 mt-2 opacity-50 truncate text-center ">
                                                {item.character}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </ContentWrapper>
                </div>
            )}
        </>
    )
}

export default Cast