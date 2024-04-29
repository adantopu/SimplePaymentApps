require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// api routes
app.use(express.static('public'));

//deposit POST
app.post('/payment/deposit',(req,res)=>{

    //console.log(typeof req.body);
    //console.log(req.body['deposit_amount']); //for testing purpose

    const deposit_amount=req.body['deposit_amount']

    // console.log(typeof deposit_amount);
    // console.log(deposit_amount);

    //Deposit
    const deposit = {
        order_id:Date.now(),
        amount:deposit_amount,
        timestamp: new Date().toUTCString()
    }

    //send above as payload
    jwt.sign({deposit},'AlexanderDandyHartonoPutra',(err,token)=>{
        res.json({
            token
        })
    })
})

//withdraw POST
app.post('/payment/withdraw',(req,res)=>{

    //console.log(typeof req.body);
    //console.log(req.body['withdraw_amount']); //for testing purpose

    const withdraw_amount=req.body['withdraw_amount']

    // console.log(typeof withdraw_amount);
    // console.log(withdraw_amount);

    //Withdraw
    const withdraw = {
        order_id:Date.now(),
        amount:withdraw_amount,
        timestamp: new Date().toUTCString()
    }

    //send above as payload
    jwt.sign({withdraw},'AlexanderDandyHartonoPutra',(err,token)=>{
        res.json({
            token
        })
    })
})

app.get('/payment/paymentStatus',verifyToken,(req,res)=>{

    jwt.verify(req.token,'AlexanderDandyHartonoPutra',(err,authData)=>{
        if(err){
            res.json({
                message:"Payment Failed",
                status: 2
            });
            res.sendStatus(403);
        }else{
            res.json({
                message:"Payment Succeed",
                status: 1,
                userData:authData
            })
        }
    })
  
});

//Verify Token
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');    
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();

    }else{
        //Forbidden
        res.sendStatus(403);
    }
}



app.listen(3000, () =>{
    console.log("App listening on port 3000");
    console.log(new Date().toUTCString());
})