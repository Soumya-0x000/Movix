import React from 'react'
import ReactPlayer from 'react-player'

const VideoPopup = ({show, setShow, videoId, setVideoId}) => {
    const hidePopup = () => {
        setShow(false)
        setVideoId(null)
    }

    return (
        <div className={`videoPopup flex justify-center items-center w-full h-full fixed top-0 left-0 z-50 ${show ? 'opacity-100 visible ' : 'opacity-0 invisible'}`}>
            <div 
            className={`opacityLayer ${show ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-[#00000041] transition-all duration-400 `} 
            onClick={hidePopup}></div>
            
                <div className={`videoPlayer w-[800px] bg-blue-950 ${show ? 'scale-100' : 'scale-0'} transition-all duration-[250ms] rounded-md overflow-hidden `}>
                    {videoId?.length > 0 ? (
                        <>
                            <div 
                            className="text-red-500 font-semibold text-end pr-1 cursor-pointer" 
                            onClick={hidePopup}>
                                Close
                            </div>
                            <div className='aspect-video'>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${videoId}`}
                                    controls
                                    width='100%'
                                    height='100%'
                                />
                            </div>
                        </>

                    ) : (
                        <span className='text-white text-6xl h-[200px] flex items-center justify-center opacity-100'>Nothing to watch</span>
                    )}
                </div> 
            
        </div>
    )
}

export default VideoPopup