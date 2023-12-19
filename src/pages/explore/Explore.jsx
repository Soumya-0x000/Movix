import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import noResults from '../../assets/no-results.png'
import MovieCard from '../../components/movieCard/MovieCard'
import Img from '../../components/lazyLoadImage/Img'
import Select from 'react-select'
import useFetch from '../../hooks/useFetch'
import './Explore.scss'

let filters = {}

const sortByData = [
    {value: 'popularity.desc', label: 'Popularity Descending'},
    {value: 'popularity.asc', label: 'Popularity Ascending'},
    {value: 'vote_average.desc', label: 'Rating Descending'},
    {value: 'vote_average.asc', label: 'Rating Ascending'},
    {value: 'primary_release_date.desc', label: 'Release Date Descending'},
    {value: 'primary_release_date.asc', label: 'Release Date Ascending'},
    {value: 'original_title.asc', label: 'Title (A-Z)'},
    {value: 'original_title.desc', label: 'Title (Z-A)'},
]

const Explore = () => {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const [genre, setGenre] = useState(null)
    const [sortBy, setSortBy] = useState(null)
    const {mediaType} = useParams()

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`)

    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/discover/${mediaType}?include_adult=true`, filters).then((res) => {
            setLoading(false)
            setData(res)
            setPageNum((prev) => prev + 1)
        })
    }

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?include_adult=true&page=${pageNum}`, filters).then((res) => {
            if(data?.results) {
                setData({...data, results: [...data.results, ...res.results]}) 
            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1)
        })
    }

    const handleFilterOptions = (selectedItems, action) => {
        if (action.name === 'sortBy') {
            setSortBy(selectedItems)
            if (action.action === 'clear') {
                delete filters.sort_by
            } else {
                filters.sort_by = selectedItems.value
            }
        }

        if (action.name === 'genres') {
            setGenre(selectedItems)
            if (action.action === 'clear') {
                delete filters.with_genres
            } else {
                let genreId = selectedItems.map((items) => items.id)
                genreId = JSON.stringify(genreId).slice(1, -1)
                filters.with_genres = genreId
            }
        }

        setPageNum(1)
        fetchInitialData()
    }

    useEffect(() => {
        filters = {}
        setData(null)
        setPageNum(1)
        setGenre(null)
        setSortBy(null)
        fetchInitialData()
    }, [mediaType])

    return (
        <div className='explorePage min-h-[700px] pt-[85px]'>
            <ContentWrapper>
                <div className="pageHeader flex mb-6 flex-col md:flex-row justify-between">
                    <div className="pageTitle text-white text-[24px] leading-[34px] mb-5 md:mb-0 ">
                        Explore {mediaType === 'tv' ? (
                            'TV Shows'
                        ) : (
                            'Movies'
                        )}
                    </div>

                    <div className="filters flex flex-col md:flex-row gap-x-4 gap-y-3 ">
                        <Select
                            isMulti
                            name='genres'
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={handleFilterOptions}
                            placeholder='Select Genres'
                            className='react-select-container genresDD'
                            classNamePrefix='react-select'
                        />
                        <Select
                            name='sortBy'
                            value={sortBy}
                            options={sortByData}
                            onChange={handleFilterOptions}
                            isClearable={true}
                            placeholder='Sort by'
                            className='react-select-container sortByDD'
                            classNamePrefix='react-select'
                        />
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