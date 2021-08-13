
const mongoose= require('mongoose');

const imageSchema= mongoose.Schema(
    {
        image:{
            type: String,
            required: true
        }
    },
    { collection: "image" }
);


module.exports=mongoose.model("Images",imageSchema)