import bcrypt from "bcryptjs";
const data = {
    users: [
        {
            name:"Santhosh",
            email: 'santhosh@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name:"user",
            email: 'user@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ],
    products : [
        {

            name:"Nike Slim Shirt",
            slug: 'nike-slim-shirt1',
            category: 'shirt',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand:'NIKE',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality shirt',
        },
        {
            // _id:"2",
            name:"Adidas Fit Pant",
            slug: 'nike-slim-shirt2',
            category: 'shirt',
            image: '/images/p2.jpg',
            price: 120,
            countInStock: 10,
            brand:'NIKE',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality shirt',
        },
        {
            // _id:"3",
            name:"Adidas Slim Shirt",
            slug: 'nike-slim-shirt3',
            category: 'shirt',
            image: '/images/p3.jpg',
            price: 120,
            countInStock: 10,
            brand:'NIKE',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality shirt',
        },
        {
            // _id:"4",
            name:"Nike Slim Pants",
            slug: 'nike-slim-shirt4',
            category: 'shirt',
            image: '/images/p4.jpg',
            price: 120,
            countInStock: 10,
            brand:'NIKE',
            rating: 4.5,
            numReviews: 10,
            description: 'High Quality shirt',
        },
    ]
}


export default data;