import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Explore = () => {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(false)
    const {mediaType} = useParams()
    console.log(mediaType);
    return (
        <div>explore</div>
    )
}

export default Explore