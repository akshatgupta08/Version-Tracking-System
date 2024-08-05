import mongoose from "mongoose";

/*This is a separate collection for storing all the different lender versions to be sent to the drop-down menu in the front-end.*/
const AllLendersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    version: {
        type: Number,
        required: true
    },
   
});

const AllLenders = mongoose.model("AllLenders",AllLendersSchema);

export default AllLenders;