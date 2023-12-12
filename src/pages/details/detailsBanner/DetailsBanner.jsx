import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const DetailsBanner = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    return (
        <div className='detailsBanner'>
            {!loading ? (
                <div>Details Content</div>
            ) : (
                <div className='detailsBannerSkeleton'>
                    <ContentWrapper>
                        <div className='contentWrapper'>
                            <div className='left skeleton'></div>
                            <div className='right'>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    )
}

export default DetailsBanner