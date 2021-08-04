import React, { useState } from 'react'
import MessageIcon from '@material-ui/icons/Message';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FormControl, IconButton, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './Message.css'
import firebase from 'firebase'
import { db } from '../../firebase.js'

function Message({ comments, user, movieId }) {

    const [messaged, setmessaged] = useState(false);
    const [comment, setComment] = useState('');

    const handleMessagesOpen=()=>{
        setmessaged(true)
    }
    const handleMessagesClose=()=>{
        setmessaged(false)
    }
    const handleInputComment=(e)=>{
        setComment(e.target.value)
    }
    const handleSendComment=(event)=>{
        event.preventDefault();
        db.collection('videos').doc(movieId.trim()).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                userName: user.displayName,
                userComment: comment                
            })
        })
        setComment('');
    }

    return (
        <div>
            {messaged && ( 
                <div className="videoSidebar__container">
                    <div className="videoSidebar__topContainer">
                        <p>{comments ? comments.length : 0} comments</p> 
                        <button onClick={handleMessagesClose}>x</button>
                    </div>
                        {comments && comments.map(({ userName, userComment}, index) => (
                        <div className="message" key={index}>
                            <div className="user"><AccountCircleIcon /><br />{userName}</div>
                            <div className="comment">{userComment}</div>
                        </div>
                            )
                        ).reverse()}
                        <form className="videoSidebar__form">
                        <FormControl className='videoSidebar__formControl'>
                            <Input className="videoSidebar__input" placeholder="Enter a message..." value={comment} onChange={handleInputComment} />
                            <IconButton className='videoSidebar__iconButton' disabled={!comment} variant="contained" color="primary" type='submit' onClick={handleSendComment} >
                                <SendIcon />
                            </IconButton>
                        </FormControl>
                        </form> 
                    </div>
            )}
            <MessageIcon onClick={handleMessagesOpen} />
            <p>{comments ? comments.length : 0}</p>
        </div>
    )
}

export default Message
