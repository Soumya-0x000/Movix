import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PosterFallBack from '../../assets/no-poster.png'
import ProfilePicFallBack from '../../assets/no-poster.png'
import Img from '../lazyLoadImage/Img'
import  './MovieCard.scss'
import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'
import dayjs from 'dayjs'

const MovieCard = ({data, mediaType}) => {
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()
    
    const posterUrl = () => {
        if (mediaType === "person") {
            return data?.profile_path ? url.poster + data?.profile_path : ProfilePicFallBack
        } else {
            return data?.poster_path ? url.poster + data?.poster_path : PosterFallBack
        }
    } 

    return (
        <div 
        className='movieCard mb-6 cursor-pointer flex-shrink-0 '
        onClick={() => navigate(`/${data?.media_type || mediaType}/${data?.id}`)}>
            <div className={`posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center ${mediaType === 'person' ? 'mb-[5px] sm:mb-[10px]' : 'mb-[20px] sm:mb-[30px]' } flex items-end justify-between p-[0px] transition-all duration-500 hover:opacity-50`}>
                <Img src={posterUrl()} className={`posterImg w-full h-full object-cover object-center`} />
                {mediaType === 'person' ? (<></>
                ) : (
                    <div className='absolute hidden xsm:block left-3 bottom-2 z-20 '>
                        <CircleRating rating={data?.vote_average?.toFixed(1)} onPage='searchResult' mediaType={mediaType}/>
                    </div>
                )}
                <div className='z-10 absolute right-2 bottom-2 w-[70%] lg:w-[65%] hidden mbl:block '>
                    <Genres data={data?.genre_ids?.slice(0,2)} onPage='searchResult'/>
                </div>
            </div>

            <div className="textBlock text-white flex flex-col gap-y-1">
                <span className='text-[15px] sm:text-[20px] md:text-[17px] truncate'>
                    {data?.title || data?.name}
                </span>
                {mediaType === 'person' ? (
                    <div className='flex justify-between items-center ring-2 text-pink ring-pink rounded-md px-2 py-1 mx-1 '>
                        <span className={`opacity-90 font-bold text-[13px] sm:text-[15px] md:text-[14px] `}>
                            {data?.known_for_department}
                        </span>
                        <span className='text-pink text-sm font-bold'>
                            {Math.round(data?.popularity)}
                        </span>
                    </div>
                ) : (
                    <span className={`opacity-50 text-[13px] sm:text-[15px] md:text-[14px]`}>
                        {dayjs(data?.release_date).format('MMM DD, YYYY')}
                    </span>
                )}
            </div>
        </div>
    )
}

export default MovieCard