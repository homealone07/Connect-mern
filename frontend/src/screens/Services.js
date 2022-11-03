import React, { useEffect, useReducer, useState } from 'react';
// import data from '../data';
import { Link } from 'react-router-dom';
import axios from "axios";
import logger from "use-reducer-logger";
import { Col, Row } from 'react-bootstrap';
import Product from "../Components/Product";
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';

const reducer = (state,action)=>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state,loading:true};
        case 'FETCH_SUCCESS':
            return {...state,services: action.payload,loading:false};
        case 'FETCH_FAIL':
            return {...state,loading:false,error:action.payload};
        default:
            return state;
    }
}

const Services = () => {

    // const [services,setServices] = useState([]);
    const [{loading,error,services},dispatch] = useReducer(reducer,{
        loading:true,
        error:'',
        services:[]
    })

    useEffect(()=>{
        const fetchData = async ()=>{

            dispatch({type:'FETCH_REQUEST'});
            try{
                const result = await axios.get("/api/products/service");
                dispatch({type:'FETCH_SUCCESS',payload:result.data});
            }catch(error){
                dispatch({type:'FETCH_FAIL',payload: error.message});
            }
            // setservices(result.data);
        };
        fetchData();
    },[])
  return (
    <div>
        <Helmet><title>Connect Services</title></Helmet>
        <h1>Services</h1>
        <div className="services">
        { loading ?  (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : 
            <Row>

           {
            services.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product} />
                </Col>
            )
           
          )}
          </Row>
        }
        </div>
    </div>
  )
}

export default Services
