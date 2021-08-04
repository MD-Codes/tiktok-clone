import React, { useRef, useState } from 'react'
import './Video.css'
import VideoFooter from './videoFooter/VideoFooter';
import VideoSideBar from './sidebar/VideoSideBar';

function Video({
    url,
    channel,
    description,
    song,
    likes,
    messages,
    shares,
    user,
    movieId
}) {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
        
    };
    
    return (
        <div className="video">
            
            <video className="video__player"
                    loop
                    
                    onClick={onVideoPress}
                    ref={videoRef}
                    src={url}>
            </video>
            <VideoFooter channel={channel} description={description} song={song} />
            <VideoSideBar likes={likes} messages={messages} shares={shares} user={user} movieId={movieId}/>
        </div>
    )
}

export default Video
