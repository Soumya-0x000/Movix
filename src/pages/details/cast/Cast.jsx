import React from 'react'
// import './Cast.scss'
import { useSelector } from 'react-redux'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import avatar from '../../../assets/avatar.png'
import Img from '../../../components/lazyLoadImage/Img'

const Cast = ({data, loading}) => {
    const { url } = useSelector((state) => state.home)

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full mb-4 "></div>
                <div className="row skeleton w-full h-5 rounded-full mb-3"></div>
                <div className="row2 skeleton w-3/4 h-5 rounded-full mx-auto"></div>
            </div>
        )
    }

    return (
        <div className='castSection relative mb-[50px] '>
            <ContentWrapper>
                <div className="sectionHeading text-[24px] text-white mb-[25px] ">Top Cast</div>
                {loading ? (
                    <div className="castSkeleton flex gap-5 ">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                ) : (
                    <div className="listItems flex overflow-y-hidden gap-5 mx-2 md:m-0 md:p-0">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path 
                                ? url.profile + item.profile_path 
                                : avatar
                            return (
                                <div 
                                className="listItem text-center text-white"
                                key={item.id}>
                                    <div className="profileImg w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full overflow-hidden mb-4 md:mb-6">
                                        <Img src={imgUrl}/>
                                    </div>
                                    <div className="name text-[14px] md:text-[18px] leading-5 md:left-6 font-bold ">
                                        {item.name}
                                    </div>
                                    <div className="character text-[14px] md:text-[16px] leading-5 mt-2 md:left-6 opacity-50">
                                        {item.character}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Cast