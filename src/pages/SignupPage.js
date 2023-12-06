import React, { useState } from 'react'
import Header from '../components/common/Header'
import SingupForm from '../components/SingupComponents/SignupForm';
import LoginForm from '../components/SingupComponents/Loginform';

function SignUp() {
  
  const [flag, setFlag]=useState(false);

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        {!flag?<h1>Signup</h1>:<h1>Login</h1>}
        {!flag?<SingupForm/>:<LoginForm/>}
        {!flag? 
          <p  style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>
            Already have an Account? Click here to Login.
          </p>
            :
          <p style={{cursor:"pointer"}}  onClick={()=>setFlag(!flag)}>
            Don't have an account? Click here to signup.
          </p>
        }
        
      </div>
    </div>
  )
}

export default SignUp