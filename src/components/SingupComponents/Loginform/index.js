import React, { useState } from 'react';
import InputComponent from '../../common/input';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';


function LoginForm() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    
    const [loading, setLoading]=useState(false);

    const dispatch=useDispatch();
    const navigate =useNavigate();

    const handleLogin=async()=>{
        console.log("hey im btn of login");
        setLoading(true);

        if(email && password){
          try{
            //creating user account
              const userCredential=await signInWithEmailAndPassword(
                  auth,
                  email,
                  password
              );
              const user=userCredential.user;
              console.log(user);

              //set user details to firebase
              const userDoc=await getDoc(doc(db, "users", user.uid));
              const userData=userDoc.data();
              console.log(userData);

              //save data into redux or call the redux action
              dispatch(
                  setUser({
                    name:userData.name,
                    email:user.email,
                    uid:user.uid,
                    profilePic:userData.profilePic,

              }))

              toast.success("Log in successful!"); 
              setLoading(false);
              navigate("/profile");

              

          }catch(e){
                console.log(e);
                setLoading(false);
                toast.error(e.message);
          }
        }
        else{
          setLoading(false);
          toast.error("Please fill email and Password");

        }

          
      }

  return (
    <>
         
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
       
        <Button text={loading?"Loading...":"Login"} onClick={handleLogin} disabled={loading}/>
    </>
  )
}

export default LoginForm