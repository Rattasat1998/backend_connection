
const mongoose= require('mongoose');

const mulImageSchema= mongoose.Schema(
    {
        image1:{
            type: String,
            required: true
        },
        image2:{
            type: String,
            required: true
        },
        image3:{
            type: String,
            required: true
        },
        image4:{
            type: String,
            required: true
        }
    },
    { collection: "mulImage" }
);


module.exports=mongoose.model("MulImages",mulImageSchema)