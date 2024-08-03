import express from "express";
import Person from "../Person.js";
import {jwtAuthMiddleware, generateToken} from "../jwt.js";

const router = express.Router();

       

  router.delete("/:id",async (req,res)=> {
    try {
  const personId = req.params.id;
  console.log(personId);
  const response = await Person.findByIdAndDelete(personId);
  if(!response) {
    return res.status(404).json({error: "Person not found"});
  }
  console.log("data deleted");
  res.status(200).json({Info:"Data deleted"});
    }catch(err) {
       console.log(err);
       res.status(500).json({error: "Internal server Error"});
    }
  });


  router.post('/signup', async (req, res) =>{
    try{
        console.log("fgdfewdgevdgev");
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Login Route
router.post('/login', async(req, res) => {
    try{
        // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



  export default router;