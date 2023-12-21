import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import "./DetailsBanner.scss"
import { useSelector } from 'react-redux';
import Img from "../../../components/lazyLoadImage/Img"
import PosterFallback from "../../../assets/no-poster.png"
import Genres from "../../../components/genres/Genres"
import CircleRating from "../../../components/circleRating/CircleRating"
import {PlayIcon} from '../PlayBtn'
import dayjs from 'dayjs';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const DetailsBanner = ({videos, crew}) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector((state) => state.home)

    const _genres = data?.genres?.map((g) => g.id)

    const director = crew?.filter((f) => f.job === 'Director')
    const writer = crew?.filter((f) => f.job === 'Story' || f.job === 'Screenplay' || f.job === 'Writer')

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = (totalMinutes % 60)
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
    }

    return (
        <div className='detailsBanner w-full bg-black pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] min-h-[700px] '>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden ">
                                <Img src={url.backdrop + data?.backdrop_path} className={`w-full h-full object-cover object-center`} />
                            </div>

                            <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0 "></div>
                            
                            <ContentWrapper>
                                <div className="content flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row ">
                                    <div className="left flex-shrink-0 ">
                                        {data.poster_path ? (
                                            <Img className={`posterImg w-full md:max-w-[350px] block rounded-xl h-full `} src={url.backdrop + data.poster_path} />
                                            ) : (
                                            <Img className={`posterImg w-full md:max-w-[350px] block rounded-xl h-full `} src={PosterFallback} />
                                        )}
                                    </div>

                                    <div className="right text-white ">
                                        {/* Title */}
                                        <div className="title text-[28px] md:text-[34px] leading-10 md:leading-[44px] ">
                                            {`${
                                                data?.name || data?.title
                                            } (${dayjs(data?.release_date).format('YYYY')})`}
                                        </div>
                                        
                                        {/* Tagline */}
                                        <div className="subtitle text-[16px] md:text-[20px] md:leading-7 leading-6 mb-[15px] italic opacity-50 ">
                                            {data?.tagline}
                                        </div>
                                       
                                        {/* Genres */}
                                        <div className="genres flex flex-wrap mb-[20px]">
                                            <Genres data={_genres} onPage={'details'} />
                                        </div>
                                        
                                        {/* Rating & Trailer */}
                                        <div className='row flex flex-row items-center gap-[25px] mb-[25px]'>
                                            <CircleRating rating={data?.vote_average?.toFixed(1)} onPage={'details'} />
                                            <div 
                                            className="playbtn flex items-center gap-[20px] cursor-pointer"
                                            onClick={() => {
                                                setShow(true)
                                                setVideoId(videos?.key)
                                            }}>
                                                <PlayIcon/>
                                                <span className="text ">Watch Trailer</span>
                                            </div>
                                        </div>
                                       
                                        {/* Overview */}
                                        <div className="overview mb-[25px] ">
                                            <div className="heading text-[24px] mb-3 ">Overview</div>
                                            <div className="description leading-[24px] md:pr-[10px] text-justify ">
                                                {data.overview}
                                            </div>
                                        </div>

                                        {/* Status, Release date, Runtime */}
                                        <div className={`info flex py-4 border-b-[1px] border-b-[#ffffff25] `}>
                                            {data?.status && (
                                                <div className="infoItem mr-[10px] flex flex-wrap ">
                                                    <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                        Status: {" "}
                                                    </span>
                                                    <span className="text opacity-50 leading-6 mr-[10px] ">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.release_date && (
                                                <div className="infoItem flex flex-wrap mr-3 ">
                                                    <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                        Release Date: {" "}
                                                    </span>
                                                    <span className="text opacity-50 leading-6 mr-[10px]">
                                                        {dayjs(data.release_date).format('MMM DD, YYYY')}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.runtime ? (
                                                <div className="infoItem flex flex-wrap mr-3 ">
                                                    <span className="text bold font-bold opacity-100 mr-[10px]">
                                                        Runtime: {" "}
                                                    </span>
                                                    <span className="text opacity-50 leading-6 mr-[10px]">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            ) : ''}
                                        </div>
                                        
                                        {/* Language */}
                                        <div className='flex flex-col sm:flex-row gap-x-6 border-b-[1px] border-b-[#ffffff25]'>
                                            {data?.spoken_languages.length > 0 && (
                                                <div className={`info flex py-4 border-b-[1px] border-b-[#ffffff25] sm:border-none`}>
                                                    <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                        Language: {" "}
                                                    </span>
                                                    <span className="text opacity-50 leading-6 mr-[10px] ">
                                                        {data?.spoken_languages?.[0].english_name}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.number_of_episodes > 0 && data?.number_of_seasons && (
                                                <div className={`info flex py-4 `}>
                                                    <div>
                                                        <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                            Seasons: {" "}
                                                        </span>
                                                        <span className="text opacity-50 leading-6 mr-[10px] ">
                                                            {data?.number_of_seasons}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                            Episodes: {" "}
                                                        </span>
                                                        <span className="text opacity-50 leading-6 mr-[10px] ">
                                                            {data?.number_of_episodes}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Director */}
                                        {director?.length > 0 && (
                                            <div className={`info flex py-4 border-b-[1px] border-b-[#ffffff25] `}>
                                                <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                    Director: {" "}
                                                </span>
                                                <span className="text opacity-50 leading-6 mr-[10px] ">
                                                    {director?.map((item, index) => (
                                                        <span key={index}>
                                                            {item.name}
                                                            {index !== director.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {/* Writer */}
                                        {writer?.length > 0 && (
                                            <div className={`info flex py-4 border-b-[1px] border-b-[#ffffff25] `}>
                                                <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                    Writer: {" "}
                                                </span>
                                                <span className="text opacity-50 leading-6 mr-[10px] ">
                                                    {writer?.map((item, index) => (
                                                        <span key={index}>
                                                            {item.name}
                                                            {index !== writer.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {/* Created by */}
                                        {data?.created_by?.length > 0 && (
                                            <div className={`info flex py-4 border-b-[1px] border-b-[#ffffff25] `}>
                                                <span className="text bold font-bold opacity-100 mr-[10px] ">
                                                    Creator: {" "}
                                                </span>
                                                <span className="text opacity-50 leading-6 mr-[10px] ">
                                                    {data?.created_by?.map((item, index) => (
                                                        <span key={index}>
                                                            {item.name}
                                                            {index !== writer?.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className='detailsBannerSkeleton flex relative gap-[25px] md:gap-[50px] '>
                    <ContentWrapper>
                        <div className='contentWrapper flex flex-col md:flex-row gap-[25px] md:gap-[50px] '>
                            <div className='left skeleton flex-shrink-0 w-full block rounded-xl aspect-[1/1.5] md:w-[350px] '></div>
                            <div className='right w-full hidden md:block'>
                                <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                <div className="row skeleton w-1/2 h-[25px] mb-14 rounded-[50px] "></div>
                                <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                <div className="row skeleton w-3/4 h-[25px] mb-14 rounded-[50px] "></div>
                                <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner