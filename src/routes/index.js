const { Router } = require("express");
const router = Router();

const webpush = require("../webpush");
let pushSubscription;

router.post("/subscription",  async (req, res) => {
  pushSubscripton = req.body;  
    res.status(201).json();


    
  });
  

router.post('/new-message', async (req, res)=>{


const{message}=req.body;


  const payload = JSON.stringify({
    title: "Bienvenido",
    message : message
  });

  try{
    await webpush.sendNotification(pushSubscripton, payload);

  } catch(error){
    console.log(error)
  }
})
module.exports=router;