import express from "express";
import mongoose from "mongoose";
import AllLenders from "../AllLenders.js";
import {jwtAuthMiddleware, generateToken} from "../jwt.js";

const router =  express.Router();
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

router.post("/",async(req,res)=> {
    try {
    
      let obj = {};
      console.log("It works till here.");
        let lenderName = req.body.lender;
        console.log("Well Well Well.");
        const lenderVersion =  mongoose.model(lenderName, lenderSchema); 
        console.log(lenderName);
        /*const highVers = await lenderVersion.findOne({}, { sort: { version: -1 } });*/
        const highVers = await lenderVersion
  .find({})
  .sort({ version: -1 })
  .limit(1)
  .exec();
        console.log(highVers);
        console.log("dfddcfwdcgwe");
        if(highVers.length === 0) {
          req.body.version = 1;
             obj = {
              name: req.body.lender,
              version: 1
            }
           const allLenders = new AllLenders(obj);
           await allLenders.save();
        } else {
          console.log(highVers[0]);
          const document = await lenderVersion.findById((highVers[0]._id).toString());
          
          console.log("chale raha hai\n");
          console.log(document);
          console.log("old town road");
          
          req.body.version = document.version + 1;
          var num = req.body.version;
          obj = {
            name: req.body.lender,
            version: req.body.version
          }
          const allLenders = new AllLenders(obj);
          await allLenders.save();
        }
        console.log("Something is working.");
        // const lenderVersion =  mongoose.model(lenderName, lenderSchema); 
        //req.body.version = num;
        let lenderVers = new lenderVersion(req.body);
        await lenderVers.save();
        res.status(201).json({ message: "Document saved successfully"});
       
    }
  catch(err) {
        console.log(err);
      
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/",async(req,res)=> {
  try{
  
    const  displayInfo = await AllLenders.find({});
    res.json(displayInfo);

  } catch(err) {
    res.status(500).json({error: "Internal server error"});
  }
})

router.get("/:lenderName/:versionNum",async(req,res)=> {
  try {
  const LenderModel = mongoose.model(req.params.lenderName,lenderSchema);
  const document = await LenderModel.findOne({version: req.params.versionNum});
  res.status(200).json(document);
  } catch(err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
}) 

router.delete("/:lenderName/:versionNum", async(req,res)=> {
 try{
  const LenderModel = mongoose.model(req.params.lenderName,lenderSchema);
    let obj = await LenderModel.findOneAndDelete({version: req.params.versionNum});
    await AllLenders.findOneAndDelete({version: req.params.versionNum,
      name: req.params.lenderName
    });
    res.status(200).json({obj});
 } catch(err) {
  res.status(500).json({error: "Internal server error"});
 }

})

export default router;