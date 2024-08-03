import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import personRoutes from "./routes/personRoutes.js";
import lenderRoutes from "./routes/lenderRoutes.js";
import verificationRoutes from "./routes/verificationRoutes.js";
import cors from "cors";



const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE"]
}))






app.get("/",function(req, res) {
    res.send("Welcome to our Hotel.");
});
app.use("/person",personRoutes);

console.log("ding ding ding");


app.use("/verifyAuthentication",verificationRoutes);
app.use("/lender",lenderRoutes); 

app.listen(3000,()=>{
 console.log("The server is listening on the port 3000");   
});



  

  