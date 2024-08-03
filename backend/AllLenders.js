import mongoose from "mongoose";


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