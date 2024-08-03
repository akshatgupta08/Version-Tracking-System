import mongoose from "mongoose";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
   
   
    username: {
        required: true, 
        unique: true,                  
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

personSchema.pre("save", async function(next) {
    const person = this;
    if(!person.isModified("password")) {
        return next();
    }
         
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    } catch(err) {
       return next(err);
    }
});
let indicator = 0;
/*personSchema.pre("findOneAndUpdate", async function(next) {
    const person = this;
    console.log("This runs");
    if(indicator == false) {
        return next();
    }
         
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    } catch(err) {
       return next(err);
    }
});*/
/*personSchema.methods.comparePassword = async function(candidatesPassword) {
    try {
        const isMatch = await bcrypt.compare(candidatesPassword,this.password);
        return isMatch;
    } catch(err) {
         throw err;
    }
}
personSchema.methods.comparePassForPut = async function(candidatesPassword,pass) {
    
    try {
      const isMatch = await bcrypt.compare(candidatesPassword, pass);
      console.log("This should be printed");
      if (!isMatch) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        console.log(hashedPassword);
        return hashedPassword;

      }
      return isMatch; // Return the comparison result
    } catch (err) {
      throw err; // Rethrow the error to be handled by the calling code
    }
  };*/

  personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
  
const Person = mongoose.model("Person",personSchema);
export default Person;