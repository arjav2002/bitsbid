require('dotenv').config()

const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')

app.use(express.json())
app.use(cors())

//connect to mongodb
const dbURL = process.env.MONGO_URL
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => console.log("Connected to the database"))
  .catch(err => console.log(err))

//google-auth
const {OAuth2Client} = require('google-auth-library');
CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join("client", "build")));

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join("client", "build", "index.html"), {root: 'app'});
 });

 async function findOrCreateUser(obj) {
    return await User.findOneAndUpdate({email: obj.email}, {$setOnInsert: {name: obj.name, email: obj.email, picture: obj.picture}}, {upsert: true, new: true});
 }

app.post('/login', async(req,res)=> {
    let token = req.body.token;
    const ticket = await client.verifyIdToken({idToken: token, audience: CLIENT_ID});
    const payload = ticket.getPayload();
    let user = {};
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
    const userobj = {
        name : user.name,
        email : user.email,
        picture : user.picture,
    };
    await findOrCreateUser(userobj);
    
    res.cookie('session-token',token);
    res.send('/dashboard');
})

app.get('/dashboard',checkAuthenticate ,(req,res)=>{
    console.log(req.user);
    res.send('/dashboard');
})

app.get('/signout',(req,res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')
})

function checkAuthenticate(req,res,next){
    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({idToken: token, audience: CLIENT_ID});
        user = await User.findOne({email: ticket.getPayload().email});
    }

      verify()
      .then(()=>{
          req.user = user
          next();
      })
      .catch(err =>{
          console.log(err);
          res.redirect('/login')
      });
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))