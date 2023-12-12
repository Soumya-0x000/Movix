import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import "./DetailsBanner.scss"

const DetailsBanner = () => {
    const { mediaType, id } = useParams();
    console.log(mediaType, id);
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    return (
        <div className='detailsBanner w-full bg-black pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] min-h-[700px] '>
            {!loading ? (
                <div>
                    Details Content
                </div>
            ) : (
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
            )}
        </div>
    )
}

export default DetailsBanner