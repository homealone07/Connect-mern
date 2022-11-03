import express from "express";
import SME from "../models/SMEModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { isAuth, generateToken } from "../utils.js";

const smeRouter = express.Router();

smeRouter.post('/signin',expressAsyncHandler(async (req,res)=>{
    const sme = await SME.findOne({email: req.body.email});

    if(sme){
        if (bcrypt.compareSync(req.body.password,sme.password)){
            res.send({
                _id:sme._id,
                name:sme.name,
                email:sme.email,
                image:sme.image,
                address:sme.address,
                city:sme.city,
                postalCode:sme.postalCode,
                country:sme.country,
                token:generateToken(sme)

            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid email or password'});

}));


smeRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const sme = await SME.findById(req.sme._id);
      if (sme) {
        sme.name = req.body.name || sme.name;
        sme.email = req.body.email || sme.email;
        sme.SMEname= req.body.SMEname || sme.SMEname;
        sme.image=req.body.image|| sme.image;
        sme.address=req.body.address||sme.address;
        sme.city=req.body.city||sme.city;
        sme.postalCode=req.body.postalCode||sme.postalCode;
        sme.country=req.body.country||sme.country;

        if (req.body.password) {
          sme.password = bcrypt.hashSync(req.body.password, 8);
        }
  
        const updatedSME = await sme.save();
        res.send({
          _id: updatedSME._id,
          name: updatedSME.name,
          email: updatedSME.email,
          image:sme.image,
            address:sme.address,
            city:sme.city,
            postalCode:sme.postalCode,
            country:sme.country,
          token: generateToken(updatedSME),
        });
      } else {
        res.status(404).send({ message: 'SME not found' });
      }
    })
  );

smeRouter.post('/signup',expressAsyncHandler(async (req,res)=>{
    const newSME = await SME({
        name: req.body.name,
        email: req.body.email,
        SMEname: req.body.SMEname,
        password: bcrypt.hashSync(req.body.password),    
        image:req.body.image,
        address:req.body.address,
        city:req.body.city,
        postalCode:req.body.postalCode,
        country:req.body.country,
    });
    // console.log(newSME);
    const sme = await newSME.save();

    try {
        // const sme = await newSME.save();
        res.send({
            _id:sme._id,
            name:sme.name,
            email:sme.email,
            SMEname: sme.SMEname,
            image:sme.image,
            address:sme.address,
            city:sme.city,
            postalCode:sme.postalCode,
            country:sme.country,
            token:generateToken(sme)

        });   
    } catch (error) {
        res.status(error.status).send({message: error.message});   
    }

}))


export default smeRouter;