import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import noResults from '../../assets/no-results.png'
import MovieCard from '../../components/movieCard/MovieCard'
import Img from '../../components/lazyLoadImage/Img'

const ExplorePerson = () => {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const {mediaType} = useParams()


    const fetchInitialData = () => {
        setLoading(true)

        fetchDataFromApi(`/person/popular`).then((res) => {
            setLoading(false)
            setData(res)
            setPageNum((prev) => prev + 1)
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/person/popular?page=${pageNum}`).then((res) => {
            if(data?.results) {
                setData({...data, results: [...data.results, ...res.results]}) 
            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1)
        })
    }

    useEffect(() => {
        setData(null)
        setPageNum(1)
        fetchInitialData()
    }, [mediaType])

    return (
        <div className='explorePage min-h-[700px] pt-[85px]'>
            <ContentWrapper>
                <div className="pageHeader flex mb-6 flex-col md:flex-row justify-between">
                    <div className="pageTitle text-white text-[24px] leading-[34px] mb-5 md:mb-0 ">
                        Explore People
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
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType='person'
                                        />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <>
                                <div className='flex flex-col items-center justify-center'>
                                    <Img className={`w-[400px]`} src={noResults}/>
                                    
                                    <div className='text-[18px] sm:text-[28px] md:text-[40px] text-slate-400 '>
                                        Sorry, no result found !🙃
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

export default ExplorePerson