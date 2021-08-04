import './App.css';
import React, { useState, useEffect } from 'react'
import Video from './Video'
import { db } from "./firebase.js"
import { auth, provider } from './firebase'


function App() {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState()

  useEffect(() => {
    db.collection('videos').onSnapshot(snapshot => (
      setVideos(snapshot.docs.map(doc => doc.data()))
  ))
}, [videos])

  const handleLogin=()=>{
    if(!user) {
      auth.signInWithPopup(provider).then((result)=>{
        setUser(result.user)
      })
    }
  }

  return (
    <div className="app">
      { user ? (
        <div className="app__videos">

        { videos.map(
          ({movieId, url, channel, description, song, likes, messages, shares}) => (
          
        <Video 
          key={movieId}
          user={user}
          url={url}
          channel={channel}
          song={song}
          likes={likes}
          messages={messages}
          description={description}
          shares={shares}
          movieId={movieId}
          
        />
        ))}
        
      </div>
      ):(
        <div className='app__login'>
          <h1>Tik Tok Clone</h1>
          <button onClick={handleLogin}>Log in to Tik Tok Clone</button>
        </div>

      )
      
    }
      

    </div>
  );
}

export default App;
