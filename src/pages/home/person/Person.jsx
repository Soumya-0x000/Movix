import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import noImg from '../../../assets/no-poster.png'
import Img from '../../../components/lazyLoadImage/Img'

const Person = () => {
    const { data, loading } = useFetch(`/person/changes`)
    const { data: personData, loading: isPersonLoading } = useFetch(`/person/popular`)
    const { url } = useSelector((state) => state.home)
    // console.log(data);
    console.log(personData);
    console.log(url?.poster);

    return (
        <div>
            <ContentWrapper>
                <div className='flex items-center justify-between mb-[20px] '>
                    <span className='text-[24px] text-white font-medium'>
                        Popular Person
                    </span>
                </div>

                {!isPersonLoading ? (
                    <div className='flex gap-[10px] md:gap-5 overflow-x-auto mb-8'>
                        {personData?.results?.map((item, index) => {
                            console.log(item);
                            const posterUrl = item?.profile_path
                                ? url.poster + item?.profile_path 
                                : noImg;
                            return(
                                <div key={index} className='text-white'>
                                    <div className='w-[125px] md:w-[175px] h-[125px] md:h-[175px] object-cover object-center rounded-full overflow-hidden '>
                                        <Img src={posterUrl} className={`w-full h-full `}/>
                                    </div>
                                    <div className="name mt-4 text-[14px] md:text-[18px] leading-5 md:left-6 font-bold ">
                                        {item.name}
                                    </div>
                                    <div className="character text-[14px] md:text-[16px] leading-5 mt-2 md:left-6 opacity-50">
                                        {item.known_for_department}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Person