import mongoose from "mongoose"; /*Maybe I do not need this.*/
/*The schema for each lender collection has benn stated. There is a separate collection for each lender which
holds the lender versions and their corresponding paramaters in the filters array.*/
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