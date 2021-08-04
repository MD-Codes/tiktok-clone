import React, { useState } from 'react'
import "./VideoAdd.css"
import firebase from 'firebase'
import { storage, db } from '../../firebase'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

    function getModalStyle() {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        };
    }

    const useStyle = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            border: '2px solid pink',
            boxShadow: theme.shadows[5],
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            padding: theme.spacing(2, 4, 3),
            
        }
    }));

    const VideoAdd = (user) => {
        const classes = useStyle();
        const [modalStyle] = useState(getModalStyle)
        const [open, setOpen] = useState(false)
        const [file, setFile] = useState(null)
        const [uploading, setUploading] = useState(false)
        const [desc, setDesc] = useState()
        
    
    
    const handleOpen = () => {
        setOpen(true);
       
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const handleChange=(e)=>{
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const hadnleChangeDesc=(e)=>{
        setDesc(e.target.value)
       
    }
    const handleUpload=()=>{
        setUploading(true);
        storage.ref(`movies/${file.name}`).put(file).then(snapshot=>{
            storage.ref(`movies`).child(file.name).getDownloadURL().then(url=>{
                db.collection('videos').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    channel: user.user.displayName,
                    description: desc,
                    likes: 0,
                    messages: [],
                    shares: 0,
                    song: 'title song',
                    url: url,
                    size: snapshot._delegate.bytesTransferred
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    db.collection('videos').doc(docRef.id).update({movieId: docRef.id})
                })
                setUploading(false)
                setOpen(false)
                setFile(null)
            })
        })
    }
    

    return (
        <div className="videoAdd">
            <div className="newFile__container" onClick={handleOpen} >
                <AddBoxOutlinedIcon />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                
                <div style={modalStyle} className={classes.paper}>
                    <p>Add your new file</p>
                    <hr /><br />
                    {
                        uploading ? (
                            <p>Uploading...</p>
                        ) : (
                            <>
                            <p>Description</p>                            
                            <TextareaAutosize
                                rowsMax={4}
                                aria-label="maximum height"
                                placeholder="Maximum 254 characters"
                                onChange={hadnleChangeDesc}
                                />
                            <br />
                            <input type="file" onChange={handleChange} />
                            <button onClick={handleUpload}>Upload</button>
                            </>
                        )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default VideoAdd
