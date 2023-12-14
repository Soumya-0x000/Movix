import React, { useRef, useState } from 'react'
import './VideosSection.scss'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { PlayIcon } from '../PlayBtn';
import Img from '../../../components/lazyLoadImage/Img';
import { navigation } from '../../../components/navigationIcon/navigation'
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const VideosSection = ({data, loading}) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const videoContainer = useRef()

    const videoSkeleton = () => {
        return (
            <div className="skItem w-[150px] flex-shrink-0 md:w-[275px] ">
                <div className="thumb skeleton w-full aspect-video rounded-xl mb-3"></div>
                <div className="row skeleton w-full h-5 rounded-[10px] mb-[10px] "></div>
                <div className="row2 skeleton h-5 w-3/4 rounded-[10px]"></div>
            </div>
        )
    }

    return (
        <>
            {data?.results?.length > 0 && (
                <div className='videosSection relative mb-[50px] '>
                    <ContentWrapper>
                        <div className="sectionHeading flex items-center justify-between mr-3 mt-6 text-[24px] text-white mb-[25px]">
                            <span>Official Videos</span>
                            <div className='gap-x-2 hidden md:flex'>
                                <BsFillArrowLeftCircleFill 
                                    className='cursor-pointer text-green-300' 
                                    onClick={() => navigation({dir:'left', carouselContainer:videoContainer, pixels:10})}
                                />
                                <BsFillArrowRightCircleFill 
                                    className='cursor-pointer text-green-300' 
                                    onClick={() => navigation({dir:'right', carouselContainer:videoContainer, pixels:10})}
                                />
                            </div>
                        </div>
                        {!loading ? (
                            <div 
                            className="videos flex gap-[10px] md:gap-5 overflow-x-auto " 
                            ref={videoContainer}>
                                {data?.results?.map((video) => (
                                    <div 
                                    className='videoItem mb-4 w-[150px] flex-shrink-0 md:w-[275px] cursor-pointer '
                                    key={video.id}
                                    onClick={() => {
                                        setVideoId(video.key)
                                        setShow(true)
                                    }}>
                                        <div className="videoThumbnail mb-[15px] relative">
                                            <Img
                                                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                                className={`rounded-xl w-full block transition-all`}
                                            />
                                            <PlayIcon/>
                                        </div>

                                        <div className="videoTitle text-white text-[14px] md:text-[16px] leading-5 md:leading-6 ">
                                            {video.name}
                                        </div>
                                        
                                        <div className="videoTitle text-white text-[14px] md:text-[15px] leading-5 md:leading-6 opacity-50">
                                            {video.type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="videoSkeleton flex gap-2 overflow-x-auto md:gap-5 ">
                                {videoSkeleton()}
                                {videoSkeleton()}
                                {videoSkeleton()}
                                {videoSkeleton()}
                                {videoSkeleton()}
                                {videoSkeleton()}
                            </div>
                        )}
                    </ContentWrapper>
                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                    />
                </div> 
            )}
        </>
    )
}

export default VideosSection