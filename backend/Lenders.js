import mongoose from "mongoose"; /*Maybe I do not need this.*/

const lenderSchema = new mongoose.Schema(
  {
  lender:{
    type: String,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  filters: [
    {
      name: {
        type: String,
        required: true
      },
      expressions: {
        type: String,
        required: true
      }
    }
  ]

});

const Lenders = mongoose.model("Lenders",lenderSchema);
export default Lenders;