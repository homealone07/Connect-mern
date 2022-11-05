import  axios from 'axios'
import React, { useContext, useState,useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import getError from '../utils'

const SignupScreens = () => {

    const [onUserToggle,setOnUserToggle] = useState(true);

    const {search} = useLocation();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [SMEname,setSMEname] = useState("");
    const [image,setImage] = useState("");
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [postalCode,setPostalCode] = useState("");
    const [country,setCountry] = useState("");

    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl: "/";
    const navigate = useNavigate();

    const uploadImage = async (e)=>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        // console.log(base64)
        setImage(base64);
    }

    const convertBase64 = (file)=>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = ()=>{
                resolve(fileReader.result);
            }

            fileReader.onerror = (error)=>{
                reject(error);
            }
        })
    }

    const {state,dispatch:ctxDispatch} = useContext(Store);
    const {userInfo,SMEInfo} = state
    const submitHandler = async (e)=>{
        e.preventDefault();
        
        
        
        if(password!==confirmPassword){
            toast.error('Passwords do not match');
            return;
        }

        try{
            if(onUserToggle){
                const {data} = await axios.post("/api/users/signup",{
                    name,
                    email,
                    password
                });
                ctxDispatch({type:'USER_Signup',payload:data});
                localStorage.setItem('userInfo',JSON.stringify(data));
                navigate(redirect || '/');
            }else{
                const {data} = await axios.post("/api/SME/signup",{
                    name,
                    email,
                    password,
                    image,
                    SMEname,
                    address,
                    city,
                    postalCode,country
                });
                ctxDispatch({type:'SME_Signup',payload:data});
                localStorage.setItem('SMEInfo',JSON.stringify(data));
                navigate(redirect || '/Enterprise');
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
      if(userInfo || SMEInfo){
        navigate(redirect);
      }
    }, [navigate,redirect,userInfo])
    
  return (
    <Container className='small-container'>
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <h3 className="my-3"> Sign Up</h3>

        <Button className={onUserToggle?'button-active':'button secondary'} onClick={userHandler} >User</Button> {" "}
        <Button className={onUserToggle?'button secondary':'button-active'} onClick={smeHandler}>SME</Button>
            

        <Form onSubmit={submitHandler} >
        <Form.Group className='mb-3' controlId="name">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" onChange={(e)=>setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className='mb-3' controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} required />
            </Form.Group>
            {
                onUserToggle? <></> :
                    <>
                    <Form.Group className='mb-3' controlId="email">
                        <Form.Label>Enterprise Name</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setSMEname(e.target.value)} required />
                    </Form.Group>
                    <div className='row'>
                    <Form.Group className='mb-3 col-12 col-md-6' controlId="name">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setAddress(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className='mb-3 col-md-6' controlId="email">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setPostalCode(e.target.value)} required />
                    </Form.Group>
                    </div>

                    <div className='row'>
                    <Form.Group className='mb-3 col-12 col-md-6' controlId="name">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setCity(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className='mb-3 col-md-6' controlId="email">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" onChange={(e)=>setCountry(e.target.value)} required />
                    </Form.Group>
                    </div>

                    <Form.Group className='mb-3' controlId="email">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={(e)=> uploadImage(e)} required />
                    </Form.Group>

                    </>

                
            }

            <Form.Group className='mb-3' controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} required />  
            </Form.Group>

            <Form.Group className='mb-3' controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={(e)=>setConfirmPassword(e.target.value)} required />  
            </Form.Group>




            <div className='mb-3'>
                <Button type="submit" className='primary'>Sign Up</Button>
            </div>
            <div className='mb-3'>
                Already have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div>
        </Form>
    </Container>
  )
}

export default SignupScreens