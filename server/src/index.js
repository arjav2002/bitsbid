require('dotenv').config()

const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
const Item = require('./models/item')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(cors())

//connect to mongodb
const dbURL = process.env.MONGO_URL
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => console.log("Connected to the database"))
  .catch(err => console.log(err))

//google-auth
const {OAuth2Client} = require('google-auth-library');
const item = require('./models/item');
CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join("client", "build")));

//routes
async function findOrCreateUser(obj) {
    return await User.findOneAndUpdate({email: obj.email}, {$setOnInsert: {name: obj.name, email: obj.email, picture: obj.picture}}, {upsert: true, new: true});
}

app.post('/login', async(req,res)=> {
    let token = req.body.token;
    console.log(token)
    try {
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
        res.status(200).send('/home');
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
    
    
})

app.get('/item', checkAuthenticate, async(req, res)=> {
    if(req.query.id) {
        Item.findById(req.query.id)
        .then(obj => res.status(200).send(obj))
        .catch(err => res.status(500).send(err))
    }
    else {
        res.status(400).send('item id cannot be undefined.');
    }
})

app.delete('/item', checkAuthenticate, checkSeller, async(req, res) => {
    if(req.query.id) {
        let item = await Item.findOneAndDelete({_id: req.query.id})
        await User.findOneAndUpdate({email: req.user.email}, {$pull: {items: item.id}})
        res.status(200).send("Item deleted successfully")
    }
    else {
        res.status(400).send('item id cannot be undefined.');
    }
})

app.post('/item', checkAuthenticate, checkSeller, async(req, res)=> {
    let item;
    if(!req.query) res.status(400).send("Invalid query.")

    if(!req.query.id) {
        item = await Item.create({ 
                        sellerId: req.user.email,
                        name: req.query.name,
                        description: req.query.description,
                        endTime: req.query.endTime,
                        photo: req.query.photo,
                        minBid: req.query.minBid
                    })
    }
    else {
        item = await Item.findOneAndUpdate({_id: req.item.id}, {
            name: req.query.name,
            description: req.query.description,
            endTime: req.query.endTime,
            photo: req.query.photo,
            minBid: req.query.minBid
        }, {new: true})
    }

    await User.findOneAndUpdate({email: req.user.email}, {$push: {items: item.id}})
    res.status(200).send(item.id);
})

app.post('/watchlist', checkAuthenticate, async(req, res)=> {
    try {
        obj = await Item.findById(req.query.id);
    } catch(err) {
        return res.status(500).send("Internal sever error occurred")
    }
    if(!obj) return res.status(404).send("Item with given id does not exist.");
    await User.findByIdAndUpdate(req.user.id, {$addToSet: {watchlist: obj.id}});

    res.status(200).send("Item added to watchlist.")
})

app.post('/bidItem', checkAuthenticate, async(req, res)=> {
    let item;
    
    try {
        obj = await Item.findById(req.query.id);
    } catch(err) {
        return res.status(500).send("Internal sever error occurred")
    }

    if(!obj) return res.status(404).send("Item with given id does not exist.");

    if(req.query.bid < obj.minBid) {
        return res.send(400).send('bid is lesser than minimum bid')
    }
    else if(req.query.bid < 1.1*obj.highestBid){
        return res.status(400).send('increase the bid atleast by 10%')
    }
    else {
        item = await Item.findOneAndUpdate({_id: obj.id}, {
            highestBid: req.query.bid
        }, {new: true})

        await User.findOneAndUpdate({email: req.user.email}, {$push: {bids: {itemID : item.id, bidAmount:req.query.bid}}})
        return res.status(200).send('bid added to user bids');
    }
})

app.get('/signout',(req,res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')
})

async function checkSeller(req, res, next) {
    if(!req.query.id) return next();

    try {
        obj = await Item.findById(req.query.id);
        if(obj && obj.sellerId != req.user.email) {
            res.status(401).send('User not authorized to edit this item.')
        }
        else {
            req.item = obj;
            return next();
        }
    }
    catch (err) {
        res.status(404).send('Item does not exist.')
    }
}

async function checkAuthenticate(req,res,next){
    let token = req.cookies['session-token'];
    
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({idToken: token, audience: CLIENT_ID});
        return await User.findOne({email: ticket.getPayload().email});
    }
    
    try {
        user = await verify();
        req.user = user;
        return next();
    }
    catch (err) {
        console.log(err);
    }
}

app.get("/", (req, res) => {
    res.sendFile(path.join("client", "build", "index.html"), {root: path.resolve(__dirname, '..')});
});

app.get("*", checkAuthenticate, (req, res) => {
    res.sendFile(path.join("client", "build", "index.html"), {root: path.resolve(__dirname, '..')});
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))