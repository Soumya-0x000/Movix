import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img'
import PosterFallback from "../../../assets/no-poster.png"
import dayjs from 'dayjs';

const PersonDetails = () => {
    const {url} = useSelector((state) => state.home)
    const personId = useParams()
    const { data, loading } = useFetch(`/person/${personId?.id}/movie_credits`)
    const { data: personData, loading: isPersonLoading } = useFetch(`/person/${personId?.id}`)

    console.log(personData)
    
    return (
        <div className='pt-[120px] text-white'>
            <ContentWrapper>
                <div>
                    <div>
                        {loading || isPersonLoading ? (
                            <div className='detailsBannerSkeleton flex relative gap-[25px] md:gap-[50px] '>
                                <ContentWrapper>
                                    <div className='contentWrapper flex flex-col md:flex-row gap-[25px] md:gap-[50px] '>
                                        <div className='left skeleton flex-shrink-0 w-full block rounded-xl aspect-[1/1.5] md:w-[350px] '></div>
                                        <div className='right w-full hidden md:block'>
                                            <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                            <div className="row skeleton w-1/2 h-[25px] mb-14 rounded-[50px] "></div>
                                            <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                            <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                            <div className="row skeleton w-3/4 h-[25px] mb-14 rounded-[50px] "></div>
                                            <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                            <div className="row skeleton w-full h-[25px] mb-5 rounded-[50px] "></div>
                                        </div>
                                    </div>
                                </ContentWrapper>
                            </div>
                        ) : (
                            <div className='flex flex-col md:flex-row'>
                                <div className="left flex-shrink-0 ">
                                    {personData?.profile_path ? (
                                        <Img className={`posterImg w-full md:max-w-[350px] block rounded-xl h-full `} src={url.profile + personData?.profile_path} />
                                        ) : (
                                        <Img className={`posterImg w-full md:max-w-[350px] block rounded-xl h-full `} src={PosterFallback} />
                                    )}
                                </div>

                                <div className='mt-[20px] md:mt-0 md:ml-14'>
                                    <div>
                                        <div className=' text-4xl'>
                                            {personData?.name} 
                                        </div>
                                        <div className='opacity-50 text-xl mt-2 italic'>
                                            {personData?.deathday ? (
                                                <>
                                                    {dayjs(personData?.birthday).format('MMM DD YYYY')} - {dayjs(personData?.deathday).format('MMM DD YYYY')}
                                                </>
                                            ) : (
                                                <div>
                                                    {dayjs(personData?.birthday).format('MMM DD YYYY')}
                                                </div>
                                            )}
                                        </div>
                                        <div className='mt-2 text-lg'>
                                            Gender: {(() => {
                                                switch(personData?.gender) {
                                                    case 0: return 'Not Specified';
                                                    case 1: return 'Female';
                                                    case 2: return 'Male';
                                                    default: return 'Non Binary';
                                                }
                                            })()}
                                        </div>
                                        {personData?.also_known_as?.length > 0 && (
                                            <div className='text-lg text-blue-300 mt-[15px] '>
                                                Also known as : {personData?.also_known_as?.slice(0, 4)?.join(',  ')}
                                            </div>
                                        )}
                                    </div>

                                    <div className='text-sm mt-[20px] text-justify max-h-[240px] overflow-y-scroll '>
                                        {personData?.biography?.split('\n')}
                                    </div>
                                    <div className='text-md text-green-300 mt-[20px] text-justify '>
                                        Popularity: <span className='font-bold'>{personData?.popularity}</span>
                                    </div>
                                    <div className='text-green-300 mt-2'>
                                        Birth Place: {personData?.place_of_birth}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default PersonDetails