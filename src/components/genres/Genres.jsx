import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data, onPage}) => {
    const { genres } = useSelector((state) => state.home)

    return (
        <div className={`genres flex gap-x-1 gap-y-1 items-center justify-end ${onPage === 'carousel' ? 'z-10' : ''} flex-wrap`}>
            {data?.map((item) => {
                if (!genres[item]?.name) return
                return (
                    <div key={item} className="genre text-white bg-pink text-[13px] rounded-md px-1 ">
                        {genres[item]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres