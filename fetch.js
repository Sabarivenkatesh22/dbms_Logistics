const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
// const { reset } = require('nodemon');
const app = express();
// 1) MIDDLEWARES
app.use(express.json());

app.use((req,res,next)=>{
console.log(req.headers);
next();
});

var cors = require('cors');
app.use(cors());

app.post('/posts',(req,res,next)=>{
    console.log("from post request");
    console.log(req.body);
    res.status(200).json({
      status:'success'
  });
    // res.send('done');
    next();
});

app.get('/',(req,res)=>{
  res.send("Hello iam Jack here");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
