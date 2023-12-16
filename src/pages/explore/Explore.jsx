import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import noResults from '../../assets/no-results.png'
import MovieCard from '../../components/movieCard/MovieCard'
import Img from '../../components/lazyLoadImage/Img'
import './Explore.scss'

const Explore = () => {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const {mediaType} = useParams()

    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/discover/${mediaType}`).then((res) => {
            setLoading(false)
            setData(res)
            setPageNum((prev) => prev + 1)
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`).then((res) => {
            if(data?.results) {
                setData({...data, results: [...data.results, ...res.results]})            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1)
        })
    }

    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [mediaType])

    return (
        <div className='explorePage min-h-[700px] pt-[100px]'>
            <ContentWrapper>
                <div className="pageHeader flex mb-6 flex-col md:flow-row justify-between">
                    <div className="pageTitle text-white text-[24px] leading-[34px] mb-5 md:mb-0 ">
                        Explore {mediaType === 'tv' ? (
                            'TV Shows'
                        ) : (
                            'Movies'
                        )}
                    </div>
                    <div className="filters">

                    </div>
                </div>

                {loading ? (
                    <Spinner initial={true}/>
                ) : (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                            className='content flex flex-wrap gap-[10px] md:gap-5 mb-[50px] '
                            dataLength={data?.results?.length}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                            loader={<Spinner/>}>
                                {data?.results?.map((item, index) => {
                                    if(item?.mediaType === 'person') return
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <>
                                <div className='flex flex-col items-center justify-center'>
                                    <Img className={`w-[400px]`} src={noResults}/>
                                    
                                    <div className='text-[18px] sm:text-[28px] md:text-[40px] text-slate-400 '>
                                        Sorry, no result found for !🙃
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Explore