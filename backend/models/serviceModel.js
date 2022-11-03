import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name: {type: String,required:true,unique:true},
        slug:{type: String,required:true,unique:true},
        image: {type: String,required:true},
        smeBrand: { type: mongoose.Schema.Types.ObjectId, ref: 'SME', required: true },
        category:{type: String,required:true},
        description:{type: String,required:true},
        price:{type: Number,required:true},
        rating:{type: Number,required:true},
        numReviews:{type: Number,required:true},
    },
    {
        timestamps:true
    }
);

const Service = mongoose.model('Service',serviceSchema);
export default Product;