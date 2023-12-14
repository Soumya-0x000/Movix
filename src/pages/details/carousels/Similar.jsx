import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Similar = ({mediaType, id}) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)

    const title = mediaType === 'tv' ? 'Similar TV shows' : 'Similar Movies'

    return (
        <div>
            {data?.results?.length > 0 && (
                <Carousel
                    data={data?.results}
                    loading={loading}
                    endPointShowType={mediaType}
                    title={title}
                />
            )}
        </div>
    )
}

export default Similar