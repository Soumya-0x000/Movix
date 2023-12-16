import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PosterFallBack from '../../assets/no-poster.png'
import Img from '../lazyLoadImage/Img'
import  './MovieCard.scss'
import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'
import dayjs from 'dayjs'

const MovieCard = ({data, fromSearch}) => {
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallBack
    // console.log(media_type);

    return (
        <div 
        className='movieCard mb-6 cursor-pointer flex-shrink-0 '
        onClick={() => navigate(`/${data?.media_type}/${data?.id}`)}>
            <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[20px] sm:mb-[30px] flex items-end justify-between p-[0px] transition-all duration-500 hover:opacity-50">
                <Img src={posterUrl} className={`posterImg w-full h-full object-cover object-center`} />
                {fromSearch && (
                    <>
                        <div className='absolute hidden xsm:block left-3 bottom-2 z-20 '>
                            <CircleRating rating={data?.vote_average?.toFixed(1)} onPage='searchResult'/>
                        </div>
                        <div className='z-10 absolute right-2 bottom-2 w-[70%] hidden sm:block '>
                            <Genres data={data?.genre_ids?.slice(0,2)} onPage='searchResult'/>
                        </div>
                    </>
                )}
            </div>

            <div className="textBlock text-white flex flex-col gap-y-1">
                <span className='text-[20px] md:text-[17px] truncate'>
                    {data?.title || data?.name}
                </span>
                <span className='opacity-50 text-[15px] md:text-[14px]'>
                    {dayjs(data?.release_date).format('MMM DD, YYYY')}
                </span>
            </div>
        </div>
    )
}

export default MovieCard