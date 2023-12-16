import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data, onPage}) => {
    const { genres } = useSelector((state) => state.home)

    return (
        <div className={`genres flex gap-x-1 gap-y-1 items-center justify-end ${onPage === 'details' ? '' : 'z-10'} flex-wrap flex-shrink-0`}>
            {data?.map((item) => {
                if (!genres[item]?.name) return
                return (
                    <div key={item} className="genre text-white bg-pink text-[13px] rounded-md px-1 lg:px-2 ">
                        {genres[item]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres