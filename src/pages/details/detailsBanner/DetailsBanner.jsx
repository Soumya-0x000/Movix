import React from 'react'
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

const DetailsBanner = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state) => state.home)

    const _genres = data?.genres?.map((g) => g.id)

    return (
        <div className='detailsBanner w-full bg-black pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] min-h-[700px] '>
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden ">
                                <Img src={url.backdrop + data?.backdrop_path} className={`w-full h-full object-cover object-center`} />
                            </div>

                            <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0"></div>
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
                                        <div className="title text-[28px] md:text-[34px] leading-10 md:leading-[44px] ">
                                            {`${
                                                data?.name || data?.title
                                            } (${dayjs(data?.release_date).format('YYYY')})`}
                                        </div>
                                        
                                        <div className="subtitle text-[16px] md:text-[20px] md:leading-7 leading-6 mb-[15px] italic opacity-50 ">
                                            {data?.tagline}
                                        </div>
                                       
                                        <div className="genres flex flex-wrap mb-[20px]">
                                            <Genres data={_genres} />
                                        </div>
                                        
                                        <div className='row flex flex-row items-center gap-[25px] mb-[25px]'>
                                            <CircleRating rating={data.vote_average.toFixed(1)} onPage={'details'} />
                                            <div 
                                            className="playbtn flex items-center gap-[20px] cursor-pointer"
                                            onClick={() => {}}>
                                                <PlayIcon/>
                                                <span className="text ">Watch Trailer</span>
                                            </div>
                                        </div>
                                       
                                        <div className="overview mb-[25px] ">
                                            <div className="heading text-[24px] mb-3 ">Overview</div>
                                            <div className="description leading-[24px] md:pr-[100px] text-justify ">
                                                {data.overview}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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