import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import './CircleRating.scss'

const CircleRating = ({rating}) => {
    return (
        <div className='circleRating rounded-full p-[2px] w-[40px] md:w-[50px] h-[40px] md:h-[50px] relative top-[20px] left-3 bg-white flex-shrink-0 '>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
                    textSize: '2rem',
                    textColor: 'black',             
                })}
                strokeWidth={8}
            />
        </div>
    )
}

export default CircleRating
