import mongoose from "mongoose";
import bcrypt from "bcrypt";
/*This is  the schema for the people collection, which stores the user credentials.*/
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

/*Before new user information is saved to the database, the hashed password is assigned.*/
personSchema.pre("save", async function(next) {
    const person = this;
   
         
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

/*Once the user logs in, the function verifies the password.*/
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