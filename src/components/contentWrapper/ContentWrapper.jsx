import React from 'react'

const ContentWrapper = ({children}) => {
    return (
        <div className='w-full max-w-[1300px] mx-auto px-2 sm:px-4 lg:px-5 '>
            {children}
        </div>
    )
}

export default ContentWrapper