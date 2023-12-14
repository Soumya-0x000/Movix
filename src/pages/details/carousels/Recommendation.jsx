import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Recommendation = ({mediaType, id}) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <div>
            {data?.results?.length > 0 && (
                <Carousel
                    data={data?.results}
                    loading={loading}
                    endPointShowType={mediaType}
                    title={'Recommendations'}
                />
            )}
        </div>
    )
}

export default Recommendation