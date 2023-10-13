import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
 import { styled } from 'styled-components';
 import { CgSpinner } from "react-icons/cg";
const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
 
    const onSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setLoading(false)
            navigate('/login')
        })
        .catch((error) => {
            setLoading(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setError(errorCode)
        });
 
   
    }
 
  return (
    <Wrapper>        
            <div className='container'>
                <div className='form_box'>                                                                                      
                    <form>     
                    {error && <p className='error'>{error}</p>}                                                                                       
                        <div className='form-group'>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                           {loading && <CgSpinner className='spinner'/> }
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   <br/>
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    padding: 9rem 0;

     .form_box {
        max-width: 500px;
        margin: 0 auto;
        background: #f4f4f4;
        padding: 40px;
        border-radius: 10px;
    }

  `
 
export default Signup