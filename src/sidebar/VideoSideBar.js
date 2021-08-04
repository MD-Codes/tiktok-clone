import React from 'react'
import "./VideoSideBar.css"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Message from './message/Message'
import Likes from './likes/Likes';
import firebase from 'firebase'
import VideoAdd from './videoAdd/VideoAdd'



function VideoSideBar({ likes, messages, user, movieId}) {
   
    const handleLogout=()=>{
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.reload(true)
        console.log('Good bay')
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
        
    }
    
    return (
        <div className="videoSidebar">
            <div className="videoSidebar__button" onClick={handleLogout}>
                <AccountCircleIcon />
                <p>Log out</p>
            </div>
            <div className="videoSidebar__button">
                <Likes likes={likes} user={user} movieId={movieId}/>
            </div>
            <div className="videoSidebar__button">
                <Message comments={messages} user={user} movieId={movieId}/>
            </div>
            <div className="videoSidebar__button">
                <VideoAdd user={user}/>
            </div>
        </div>
    )
}

export default VideoSideBar
