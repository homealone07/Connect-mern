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
            return {...state,categories: action.payload,loading:false};
        case 'FETCH_FAIL':
            return {...state,loading:false,error:action.payload};
        default:
            return state;
    }
}

const HomeScreen = () => {

    // const [products,setProducts] = useState([]);
    const [{loading,error,categories},dispatch] = useReducer(reducer,{
        loading:true,
        error:'',
        categories:[]
    })

    useEffect(()=>{
        const fetchData = async ()=>{

            dispatch({type:'FETCH_REQUEST'});
            try{
                // const result = await axios.get("/api/products/product");
                const cat = await axios.get("/api/products/product/categories");
                dispatch({type:'FETCH_SUCCESS',payload:cat.data});
            }catch(error){
                dispatch({type:'FETCH_FAIL',payload: error.message});
            }
            // setProducts(result.data);
        };
        fetchData();
    },[])
  return (
    <div>
        <Helmet><title>Connect</title></Helmet>
        <h1>Featured products</h1>
        { loading ?  (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : 
            <Row>

           
          {
            categories.map((cat) => (
                <>
                <h3 className='heading text-white'>{cat.toUpperCase()}</h3>
                    <Product key={cat} product={cat} />
                </>
            )
           
          )}
          </Row>
        }
    </div>
  )
}

export default HomeScreen