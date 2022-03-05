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

//middlewares
// app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', '.hbs');

// app.set('view engine','.ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join("client", "build")));


//routes
app.get("/", (req, res) => {
  res.sendFile(path.join("client", "build", "index.html"), {root: 'app'});
 });

// app.get('/login', (req,res) =>{
//     res.render('login')
// })

app.post('/login', async(req,res)=> {
    //sending token to server
    // console.log("in post func");
    let token = req.body.token;
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID, 
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
    }
    await verify()
    .then(()=>{
         
        res.cookie('session-token',token);
        res.redirect('/dashboard');
        res.send('success');
        
    })
    .catch(console.error);
    console.log("returning");
})

app.get('/dashboard',checkAuthenticate ,(req,res)=>{
    req.send('/dashboard');
})

app.get('/signout',(req,res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')
})

function checkAuthenticate(req,res,next){
    let token = req.cookies['session-token'];

    let user = {};

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
        console.log(user.picture);
        const userobj = new User({
            name : user.name,
            email : user.email,
            picture : user.picture
        })
        userobj.save();
        console.log(userobj);
        // userobj.picture.data : fs.readFileSync(user.picture);
      }
      verify()
      .then(()=>{
          req.user = user
          next();
      })
      .catch(err =>{
          res.redirect('/login')
      });
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))