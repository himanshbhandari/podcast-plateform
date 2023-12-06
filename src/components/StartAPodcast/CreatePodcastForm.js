import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../common/input';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import FileInput from '../common/input/FileInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function CreatePodcastForm() {
    const [title, setTitle]=useState("");
    const [desc, setDesc]=useState("");
    const [displayImage, setDisplayImage]=useState();
    const [bannerImage, setBannerImage]=useState();

    const [loading, setLoading]=useState(false);

    const dispatch=useDispatch(); 
    const navigate=useNavigate();  

    const handleSubmit =async()=>{
       if(title && desc && displayImage && bannerImage){
         setLoading(true);
          //1. upload files -> get downloadable link
          try{
            const bannerImageRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(bannerImageRef,bannerImage);
            
            toast.success("File uploaded");

            const bannerImageUrl=await getDownloadURL(bannerImageRef);
            console.log("banner image url", bannerImageUrl);

            //for display image do same above thing
             const displayImageRef=ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`);
            await uploadBytes(displayImageRef,displayImage);
            

            const displayImageUrl=await getDownloadURL(displayImageRef);
            console.log("banner image url", bannerImageUrl);

           const podcastData={
               title:title,
               description:desc,
               bannerImage:bannerImageUrl,
               displayImage:displayImageUrl,
               createdBy:auth.currentUser.uid,
            };

            const docRef=await addDoc(collection(db, "podcasts"), podcastData);
            toast.success("Podcast created");
            setLoading(false);

          }catch(e){
            toast.error(e.message);
            console.log(e);
            setLoading(false);
          }
          
         //2. create new doc in a new collection called podcasts
         //3. save this new podcast episodes state in our podcasts         
        }else{
         toast.error("Please Enter All values");
        }

    }

    const displayImageHandle=(file)=>{
      setDisplayImage(file);
      
    }

    const bannerImageHandle=(file)=>{
      setBannerImage(file);
    }

  return (
    <>
        <InputComponent
           state={title} 
           setState={setTitle} 
           placeholder={"Title"} 
           type={"text"} 
           required={true}
        />
        <InputComponent
           state={desc} 
           setState={setDesc} 
           placeholder={"Description"} 
           type={"text"} 
           required={true}
        />
         <FileInput 
            accept={"image/*"} 
            id={"display-image-input"} 
            fileHandleFnc={displayImageHandle} 
            text={"Display Image Upload"}
         />
         <FileInput 
            accept={"image/*"} 
            id={"banner-image-input"} 
            fileHandleFnc={bannerImageHandle} 
            text={"Banner Image Upload"}
         />
         <Button 
            text={loading?"Loading...":"Create Podcast"} 
            disabled={loading} 
            onClick={handleSubmit}
         />
    </>
  )
}

export default CreatePodcastForm