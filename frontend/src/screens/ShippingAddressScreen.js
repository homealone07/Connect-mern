import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Navigate, useNavigate } from 'react-router-dom';
import CheckOutSteps from '../Components/CheckOutSteps';
import { Store } from '../Store';

const ShippingAddressScreen = () => {
    const {state,dispatch:ctxDispatch} = useContext(Store);
    const navigate = useNavigate();
    const {userInfo,SMEInfo,cart:{shippingAddress}} = state;
    
    const [fullName,setFullName] = useState(shippingAddress.fullName);
    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
    const [country,setCountry] = useState(shippingAddress.country);
    const submitHandler = (e)=>{
        e.preventDefault();
        ctxDispatch({
            type:"SAVE_SHIPPING_ADDRESS",
            payload: {fullName,address,city,postalCode,country}
        });
        localStorage.setItem('shippingAddress',JSON.stringify({fullName,address,city,postalCode,country}))
        navigate("/payment")
    }

    useEffect(()=>{
        if(!userInfo){
            navigate("/signin?redirect=/shipping");
        }
    },[userInfo,navigate])
  return (
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckOutSteps step1 step2 ></CheckOutSteps>
        <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    value={fullName}
                    onChange={(e)=> setFullName(e.target.value)}
                    required />
                
                <Form.Label>Address</Form.Label>
                <Form.Control
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                    required />
                
                <Form.Label>City</Form.Label>
                <Form.Control
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    required />
                
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    value={postalCode}
                    onChange={(e)=> setPostalCode(e.target.value)}
                    required />

                <Form.Label>Country</Form.Label>
                <Form.Control
                    value={country}
                    onChange={(e)=> setCountry(e.target.value)}
                    required />
            </Form.Group>
            <div className='mb-3 mt-3'>
                <Button variant="primary" type="submit">
                    Continue
                </Button>
            </div>
        </Form>
        </div>
    </div>
  )
}

export default ShippingAddressScreen