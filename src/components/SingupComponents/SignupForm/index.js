import React, { useState } from 'react';
import InputComponent from '../../common/input';
import Button from '../../common/Button';


import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function SingupForm() {
    const [fullname, setFullname]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");

    const [loading, setLoading]=useState(false);

    const dispatch=useDispatch(); 
    const navigate=useNavigate();  


    const handleSingup=async ()=>{
        console.log("handle singup...");
        setLoading(true);
        
        if(password===confirmPassword && password.length>=6 && fullname && email){
            //inside this try catch code given by firebase inbuilt
            try{
               //creating user account
                  const userCredential=await createUserWithEmailAndPassword(
                     auth,
                     email,
                     password
                  );
                  const user=userCredential.user;
                  console.log(user);

                  //set user details to firebase
                  await setDoc(doc(db, "users", user.uid),{
                     name:fullname,
                     email:user.email,
                     uid:user.uid,
                     // profilePic:fileURL
                  });

                  //save data into redux or call the redux action
                  dispatch(
                     setUser({
                        name:fullname,
                        email:user.email,
                        uid:user.id

                  }))

                  toast.success("User has been created Successfully");
                  
                  setLoading(false);

                  navigate("/profile");

                  

            }catch(e){
                  console.log(e);
                  toast.error(e.message);
                  setLoading(false);
            }

        }else{
            //throw an error
            if(password!==confirmPassword){
               toast.error("Password and Confirm Password doesn't match");
            }
            else if(password.length<6){
               toast.error("Password should be more than 6 letter");
            }

            setLoading(false);

        }
        
      }

  return (
    <>
         <InputComponent
           state={fullname} 
           setState={setFullname} 
           placeholder={"Full name"} 
           type={"text"} 
           required={true}
        />
        <InputComponent
           state={email} 
           setState={setEmail} 
           placeholder={"Email"} 
           type={"text"} 
           required={true}
        />
        <InputComponent
           state={password}  
           setState={setPassword} 
           placeholder={"Password"} 
           type={"password"} 
           required={true}
        />
        <InputComponent
           state={confirmPassword} 
           setState={setConfirmPassword} 
           placeholder={"Confirm Password"} 
           type={"password"} 
           required={true}
        />
        <Button 
            text={loading?"Loading...":"Signup"} 
            disabled={loading} 
            onClick={handleSingup}
         />
    </>
  )
}

export default SingupForm