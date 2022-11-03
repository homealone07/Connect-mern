import  axios from 'axios'
import React, { useContext, useState,useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import getError from '../utils';
import Toggle from 'react-bootstrap-toggle';

const SignInScreens = () => {

    const [onUserToggle,setOnUserToggle] = useState(true);

    const {search} = useLocation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState("");
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl: "/";
    const navigate = useNavigate();

    const {state,dispatch:ctxDispatch} = useContext(Store);
    const {userInfo} = state
    const submitHandler = async (e)=>{
        e.preventDefault();

        try{
            if(onUserToggle){
                const {data} = await axios.post("/api/users/signin",{
                    email,
                    password
                });
                ctxDispatch({type:'USER_SIGNIN',payload:data});
                localStorage.setItem('userInfo',JSON.stringify(data));
                navigate(redirect || '/');
            }else{
                const {data} = await axios.post("/api/SME/signin",{
                    email,
                    password
                });
                console.log(data);
                ctxDispatch({type:'SME_SIGNIN',payload:data});
                localStorage.setItem('SMEInfo',JSON.stringify(data));
                navigate(redirect || '/');
            }
            
        }catch(err){
            toast.error(getError(err));
        }
    }

    const userHandler = ()=>{
        if(onUserToggle){
            return;
        }
        setOnUserToggle((prev)=>!prev);
    }

    const smeHandler =()=>{
        if(onUserToggle){
            setOnUserToggle((prev)=>!prev);
        }
        return;
    }

    useEffect(() => {
      if(userInfo){
        navigate(redirect);
      }
    }, [navigate,redirect,userInfo])
    
  return (
    <Container className='small-container'>
        <Helmet>
            <title>Sign In</title>
        </Helmet>

        <h2 className="my-3"> Sign In</h2><br />
       
            <Button className={onUserToggle?'button-active':'button secondary'} onClick={userHandler} >User</Button> {" "}
            <Button className={onUserToggle?'button secondary':'button-active'} onClick={smeHandler}>SME</Button>
            
        <Form onSubmit={submitHandler} >
            <Form.Group className='mb-3' controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3' controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} required />  
            </Form.Group>
            <div className='mb-3'>
                <Button type="submit" className='primary'>Sign In</Button>
            </div>
            <div className='mb-3'>
                New Customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
            </div>
        </Form>
    </Container>
  )
}

export default SignInScreens