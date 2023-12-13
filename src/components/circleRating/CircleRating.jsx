import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import './CircleRating.scss'

const CircleRating = ({rating, onPage}) => {
    return (
        <div className={`circleRating rounded-full p-[2px] relative  flex-shrink-0 ${onPage === 'carousel' ? 'top-[23px] w-[40px] md:w-[50px] h-[40px] md:h-[50px] bg-white' : 'w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-black2' } `}>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
                    textSize: '2rem',
                    textColor: onPage === 'carousel' ? 'black' : 'white',
                    trailColor: onPage === 'carousel' ? '' : '#041226',             
                })}
                strokeWidth={8}
            />
        </div>
    )
}

export default CircleRating
