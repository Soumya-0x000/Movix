import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Upcoming = () => {
    const [endPointShowType, setEndPointShowType] = useState('movie')
    
    const {data, loading} = useFetch(`/${endPointShowType}/upcoming`)

    const onTabChangeShowType = (tab) => {
        setEndPointShowType(tab === "Movies" ? 'movie' : 'tv')
    }

    return (
        <div className='carouselSection relative mb-[70px] -translate-y-7 sm:translate-y-0 '>
            <ContentWrapper>
                <div className='flex items-center justify-between mb-[20px] '> 
                    <span className="carouselTitle text-[24px] text-white font-medium hidden sm:block">Upcoming</span>
                    <span className="carouselTitle text-[24px] text-white font-medium block sm:hidden">Popular</span>
                    <SwitchTabs data={['Movies']} onTabChange={onTabChangeShowType} size={100} />
                </div>
            </ContentWrapper>
            <div></div>
            <Carousel data={data?.results} loading={loading} endPointShowType={endPointShowType} />
        </div>
    )
}

export default Upcoming