import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import PopularPerson from './popularPerson/PopularPerson'

const Home = () => {
    return (
        <div>
            <HeroBanner/>
            <Trending/>
            <Popular/>
            <TopRated/>
            <PopularPerson/>
        </div>
    )
}

export default Home