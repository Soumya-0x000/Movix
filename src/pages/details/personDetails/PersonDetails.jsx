import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';

const PersonDetails = () => {
    const {url} = useSelector((state) => state.home)
    const personId = useParams()
    const { data, loading } = useFetch(`/person/${personId?.id}/movie_credits`)
    console.log(data)
    
    return (
        <div className='pt-[80px] text-white'>
            <ContentWrapper>
                PersonDetails
            </ContentWrapper>
        </div>
    )
}

export default PersonDetails