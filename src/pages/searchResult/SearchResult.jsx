import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import noResults from '../../assets/no-results.png'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/movieCard/MovieCard'
import Img from '../../components/lazyLoadImage/Img'

const SearchResult = () => {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const { query } = useParams()
    
    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}`).then((res) => {
            setData(res)
            setPageNum((prev) => prev + 1)
            setLoading(false)
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            if(data?.results) {
                setData({...data, results: [...data.results, ...res.results]})
            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1)
        })
    }
    
    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [query])

    return (
        <div className='searchResultsPage min-h-[700px] pt-[100px]'>
            {loading ? (
                <Spinner initial={true} />
            ) : (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle text-[24px] leading-[34px] text-white mb-6">
                                {`Search ${data?.total_results > 1 ? 'results' : 'result'} for '${query}'`}
                            </div>

                            <InfiniteScroll
                            className='content flex flex-wrap gap-[10px] md:gap-5'
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                            loader={<Spinner/>}>
                                {data?.results?.map((item, index) => {
                                    if(item.media_type === 'person') return
                                    return (
                                        <MovieCard 
                                            key={index} 
                                            data={item} 
                                        />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <Img className={`w-[400px]`} src={noResults}/>
                            
                            <div className='text-[18px] sm:text-[28px] md:text-[40px] text-slate-400 '>
                                Sorry, no result found for '{query}'!🙃
                            </div>
                        </div>
                    )}
                </ContentWrapper>
            )}
        </div>
    )
}

export default SearchResult