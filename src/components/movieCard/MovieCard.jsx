import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PosterFallBack from '../../assets/no-poster.png'

const MovieCard = ({key, data, fromSearch}) => {
    console.log(data);
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallBack

    return (
        <div 
        className='movieCard'
        onClick={() => navigate(`/${data.media_type || media_type}/${data.id}`)}>
            
        </div>
    )
}

export default MovieCard