import React, { createContext,useReducer } from 'react'

export const Store = createContext();

const initialState = {
    cart: {
        paymentMethod: localStorage.getItem('paymentMethod')?
            localStorage.getItem('paymentMethod') : '',
        shippingAddress: localStorage.getItem('shippingAddress')?
            JSON.parse(localStorage.getItem('shippingAddress')) : {fullName:'',address:'',city:'',postalCode:'',country:''},
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')): [],
    },
    userInfo : localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')): null,
    SMEInfo : localStorage.getItem('SMEInfo') ? JSON.parse(localStorage.getItem('SMEInfo')):null,
};

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':
            // add to cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item)=>item._id===newItem._id);

            const cartItems = existItem ? state.cart.cartItems.map((item)=>
                item._id ===existItem._id ? newItem :item 
            ) : [...state.cart.cartItems,newItem];

            localStorage.setItem('cartItems',JSON.stringify(cartItems));

            return {...state,cart:{...state.cart,cartItems}}
        case 'CART_REMOVE_ITEM':{
            const cartItems = state.cart.cartItems.filter(
                (item)=>item._id !==action.payload._id
            );
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            return {...state,cart:{...state.cart,cartItems}}
        }
        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        case 'USER_SIGNIN':
            return {...state,userInfo:action.payload};
        case 'USER_SIGNUP':
            return {...state,userInfo:action.payload};
        case 'SME_SIGNIN':
            return {...state,SMEInfo:action.payload};
        case 'SME_SIGNUP':
            return {...state,SMEInfo:action.payload};
        case 'USER_SIGNOUT':
            localStorage.clear();
            return {...state,userInfo:null,SMEInfo:null,cart:{cartItems:[],shippingAddress:{},paymentMethod:''}};
        case 'SAVE_SHIPPING_ADDRESS':
            return {...state,cart:{...state.cart,shippingAddress:action.payload}}
        case 'SAVE_PAYMENT_METHOD':
            return {...state,cart:{...state.cart,paymentMethod:action.payload}}
        default:
            return state;
    }
}

export function StoreProvider(props){
    const [state,dispatch] = useReducer(reducer,initialState);
    const value = {state,dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
