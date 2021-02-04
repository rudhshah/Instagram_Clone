import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import firebase from "firebase";
import {storage, db} from "./firebase";
import "./ImageUpload.css";

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const handleChange= (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUpload= ()=>{
        //making and refrencing the folder images/{image_name} and then putting the image into the image_name
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //proggress fucntion ...  
                const progress = Math.round(
                    (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //Error function ...
                console.log(error);
                alert(console.error.message);
            },
            () => {
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post the image in DB
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );

        
    };

    
    return (
        <div className="imageupload">
            <progress className= "imageupload__progress"value = {progress} max = "100"/>
            <input type="text" placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>


        </div>
    )
}

export default ImageUpload
