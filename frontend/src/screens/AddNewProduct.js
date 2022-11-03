import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Button, Container,Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import getError from '../utils'

const AddNewProduct = () => {

    const [onProductToggle,setOnProductToggle] = useState(true);

    const [name,setName] = useState('');
    const [slug,setSlug] = useState('');
    const [type,setType] = useState("product");
    const [brand,setBrand] = useState("");
    const [rating,setRating] = useState(4.5);
    const [numReviews,setNumReviews] = useState(10);
    const [category,setCategory] = useState("");
    const [image,setImage] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState(0);
    const [countInStock,setCountInStock] = useState(0);

    const navigate = useNavigate();

    const uploadImage = async (e)=>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
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
    const {SMEInfo} = state
    const submitHandler = async (e)=>{
        e.preventDefault();

        try{
            if(onProductToggle){
                const {data} = await axios.post("/api/products/product",{
                   name,slug,type,brand,category,image,description,price,countInStock,rating,numReviews,
                   
                },{headers: { Authorization: `Bearer ${SMEInfo.token}`} });
                // navigate(redirect || '/');
            }else{
                const {data} = await axios.post("/api/products/services",{
                    name,slug,type,category,image,description,price,rating,numReviews,
                },{headers: { Authorization: `Bearer ${SMEInfo.token}`} });
            }
            toast.success("Item added successfully");
        }catch(err){
            toast.error(getError(err));
        }
    }

    const userHandler = ()=>{
        if(onProductToggle){
            return;
        }
        setType("product");
        setOnProductToggle((prev)=>!prev);
    }

    const smeHandler =()=>{
        if(onProductToggle){
            setType("service");
            setOnProductToggle((prev)=>!prev);
        }
        return;
    }


  return (
    <Container className='small-container'>
    <Helmet>
        <title>Add Item</title>
    </Helmet>

    
    <Button className={onProductToggle?'button-active':'button secondary'} onClick={userHandler} >Add Product</Button> {" "}
        <Button className={onProductToggle?'button secondary':'button-active'} onClick={smeHandler}>Add Service</Button>
          
    <br /><br />
    <Form onSubmit={submitHandler}  >
    <Form.Group className='mb-3' controlId="name">
            <Form.Label>{onProductToggle? 'Product':'Service'} Name</Form.Label>
            <Form.Control type="text" onChange={(e)=>setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className='mb-3' controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control type="text" onChange={(e)=>setSlug(e.target.value)} required />
        </Form.Group>
       

                <Form.Group className='mb-3 col-12 ' controlId="desc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setDescription(e.target.value)} required />
                </Form.Group>

                {!onProductToggle ? <></>:
                    <>
                    <div className='row'>
                        <Form.Group className='mb-3 col-md-6' controlId="stock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="Number" onChange={(e)=>setCountInStock(e.target.value)} required />  
                        </Form.Group>

                        <Form.Group className='mb-3 col-md-6' controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" onChange={(e)=>setBrand(e.target.value)} required />
                        </Form.Group>
                    </div>
                    </>
                }
                



                <div className='row'>
                <Form.Group className='mb-3 col-12 col-md-6' controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" onChange={(e)=>setCategory(e.target.value)} required />
                </Form.Group>

                <Form className='mb-3 col-md-6' controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="Number" onChange={(e)=>setPrice(e.target.value)} required />
                </Form>
                </div>

                <Form.Group className='mb-3' controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(e)=> uploadImage(e)} required />
                </Form.Group>

            





        <div className='mb-3'>
            <Button type="submit" className='primary'>Add {onProductToggle? ' Product':' Service'} </Button>
        </div>
    </Form>
</Container>
  )
}

export default AddNewProduct