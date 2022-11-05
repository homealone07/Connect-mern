import React, { useContext,useEffect,useReducer } from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Rating from "./Rating";
import axios from "axios";

const reducer = (state,action)=>{
  switch(action.type){
      case 'FETCH_REQUEST':
          return {...state,loading:true};
      case 'FETCH_SUCCESS':
          return {...state,products: action.payload,loading:false};
      case 'FETCH_FAIL':
          return {...state,loading:false,error:action.payload};
      default:
          return state;
  }
}


const Product = (props) => {

  const [{loading,error,products},dispatch] = useReducer(reducer,{
    loading:true,
    error:'',
    products:[]
})

useEffect(()=>{
    const fetchData = async ()=>{

        dispatch({type:'FETCH_REQUEST'});
        try{
            const cat = props.product;
            const result = await axios.get(`/api/products/product/${cat}`);
            dispatch({type:'FETCH_SUCCESS',payload:result.data});
        }catch(error){
            dispatch({type:'FETCH_FAIL',payload: error.message});
        }
        // setProducts(result.data);
    };
    fetchData();
},[])

    const {product}= props;
    const {state,dispatch:ctxDispatch} = useContext(Store);
    const {cart:{cartItems}} = state;
    const navigate = useNavigate();
    

    const addToCartHandler = async (product)=>{
        const existItem = cartItems.find((x)=>x._id===product._id);
        const quantity = existItem? existItem.quantity+1:1;
        const {data} = await axios.get(`/api/products/${product._id}`);
        if(data.countInStock<quantity){
            window.alert('Sorry. Product is out pf stock');
            return;
        }
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity}});
        // navigate("/cart");
    }

  return (
    products.map((product)=>(
      <Col  sm={6} md={4} lg={3} className="mb-3">
      <Card className='col-12 Card'>
      <Link to={`/product/${product.slug}`}>
        <img  src={product.image} className="card-img-top product-image" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text><i class="fa fa-inr"></i> {" "}{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
    </Col>
    ))    
  )
}

export default Product