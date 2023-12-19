import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Person from './person/Person'

const Home = () => {
    return (
        <div>
            <HeroBanner/>
            <Trending/>
            <Popular/>
            <TopRated/>
            <Person/>
        </div>
    )
}

export default Home