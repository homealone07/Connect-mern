import mongoose from "mongoose";

const smeSchema = new mongoose.Schema(
    {
        name: {type: String,required:true},
        email:{type: String,required:true,unique:true},
        SMEname:{type:String,required:true,unique:true},
        image:{type:String},
        password: {type: String,required:true},
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    {
        timestamps:true
    }
);

const SME = mongoose.model('SME',smeSchema);
export default SME;