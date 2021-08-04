import React, { useState, useEffect } from 'react'
import './Likes.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import firebase from 'firebase'
import { db } from '../../firebase'


function Likes({ likes, user, movieId }) {

    const [liked, setLiked] = useState(false);
    
    
    useEffect(() => {
       if(likes){
           likes.forEach((e)=> {
               if(e === user.displayName){
                   setLiked(true)
               }
           })
       }
    }, [liked, user, likes])

    const handleFavorite=()=>{
        if(liked === false) {
            db.collection('videos').doc(movieId.trim()).update({
                likes: firebase.firestore.FieldValue.arrayUnion(user.displayName)
                
            })
            setLiked(true)
        } else if(liked === true) {
            db.collection('videos').doc(movieId.trim()).update({
                likes: firebase.firestore.FieldValue.arrayRemove(user.displayName)
            })
            setLiked(false)
        }   
    }
   
   
    return (
        <div>
            {liked ? (
                <FavoriteIcon 
                  fontSize="large"
                  onClick={handleFavorite}
                />
                ):(
                <FavoriteBorderIcon 
                  onClick={handleFavorite}
                />
                )}
                <p>{likes ? likes.length : 0 }</p>
        </div>
    )
}

export default Likes
