import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
    const [endPointShowType, setEndPointShowType] = useState('movie')
    const [endPointTime, setEndPointTime] = useState('day')
    
    const {data, loading} = useFetch(`/trending/${endPointShowType}/${endPointTime}`)
    
    const onTabChangeTime = (tab) => {
        setEndPointTime(tab === 'Day' ? 'day' : 'week')
    }

    const onTabChangeShowType = (tab) => {
        if (tab === 'Movie' || tab === 'TV Shows') {
            if (tab === "Movie") {
                setEndPointShowType('movie')
            } else {
                setEndPointShowType('tv')
            }
        } else {
            setEndPointShowType('all')
        }
    }

    return (
        <div className='carouselSection relative mb-[70px] -translate-y-7 sm:translate-y-0 '>
            <ContentWrapper>
                <div className='flex flex-col md:flex-row gap-y-2 items-center justify-between mb-[20px] '> 
                    <span className="carouselTitle text-[24px] text-white font-medium ">Trending</span>
                    
                    <div className='flex flex-col sm:flex-row items-center gap-y-3 gap-x-3'>
                        <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChangeTime} size={100} />
                        <SwitchTabs data={['Movie', 'TV Shows', 'Both']} onTabChange={onTabChangeShowType} size={100} />
                    </div>
                </div>
            </ContentWrapper>
            <div></div>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending