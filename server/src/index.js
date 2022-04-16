require('dotenv').config()

const Pusher = require("pusher");
const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const User = require('./models/user')
const Item = require('./models/item')
const SoldItem = require('./models/solditem')
const watchingUsers = require('./models/watchlist')
const biddingUsers = require('./models/bidlist')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const cron = require('node-cron')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'f20190112@hyderabad.bits-pilani.ac.in',
        pass: 'djzgxeqqwvjizgso'
    }
});

var mailOptions = {
    from: 'f20190112@hyderabad.bits-pilani.ac.in',
    subject: 'Bitsbid No-Reply',
};

cron.schedule('0 7 * * *', () => {
    User.find({}, { email: 1, items: 1})
    .then(async(infoUsrs) => {
        infoUsrs.forEach(async(infoUsr) => {
            var obj, text="";
            console.log("sending to : "+infoUsr.email);
            var It = infoUsr.items;
            for(var i=0 ;i<It.length; i++){
                console.log(It[i]);
                obj = await changeToItem(It[i]);
                text+="you object "+obj.name+" has got highest bid of : "+obj.highestBid+"\n";
            }

            mailOptions.text = text;
            mailOptions.to= infoUsr.email;
            //send an email
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
        })
    })
    .catch((err) => {
        console.log(err)
    })
});

app.use(express.json({limit: '15mb'}))
app.use(cors())
app.use(bodyParser.urlencoded({limit: '15mb', extended: true }));
app.use(bodyParser.json())

//connect to mongodb
const dbURL = process.env.MONGO_URL
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log("Connected to the database"))
  .catch(err => console.log(err))

//google-auth
const {OAuth2Client} = require('google-auth-library');
const watchlist = require('./models/watchlist');
const { query } = require('express');
CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });

app.use(cookieParser());
app.use(express.static(path.join("client", "build")));

//routes
async function findOrCreateUser(obj) {
    return await User.findOneAndUpdate({email: obj.email}, {$setOnInsert: {name: obj.name, email: obj.email, picture: obj.picture}}, {upsert: true, new: true});
}

app.post('/login', async(req,res)=> {
    let token = req.body.token;
    console.log(token)
    console.log(CLIENT_ID)
    try {
        const ticket = await client.verifyIdToken({idToken: token, requiredAudience: CLIENT_ID});
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
                        name: req.body.name,
                        description: req.body.description,
                        endTime: req.body.endTime,
                        photo: req.body.photo,
                        minBid: req.body.minBid,
                        category: req.body.category
                    })
    }
    else {
        item = await Item.findOneAndUpdate({_id: req.item.id}, {
            name: req.body.name,
            description: req.body.description,
            endTime: req.body.endTime,
            photo: req.body.photo,
            minBid: req.body.minBid,
            category: req.body.category
        }, {new: true})
    }

    await User.findOneAndUpdate({email: req.user.email}, {$addToSet: {items: item.id}})
    res.status(200).send(item.id);
})

app.get('/watchlist', checkAuthenticate, async(req, res) => {
    return res.send(req.user.watchlist)
})

app.post('/watchlist', checkAuthenticate, async(req, res)=> {
    try {
        obj = await Item.findById(req.query.id);
    } catch(err) {
        return res.status(500).send("Internal sever error occurred")
    }
    if(!obj) return res.status(404).send("Item with given id does not exist.");
    await User.findByIdAndUpdate(req.user.id, {$addToSet: {watchlist: obj.id}});
    await watchingUsers.findOneAndUpdate({itemId: obj.id}, {$addToSet: {watchingUsers: req.user.email}}, {upsert: true})

    var Usr = await User.findById(req.user.id);
    mailOptions.to = Usr.email;    
    mailOptions.text = obj.name+" with id : "+obj.id+" has been added to your watchlist";

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
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

    if(req.query.bid <= obj.minBid) {
        return res.status(400).send('bid is lesser than or equal to minimum bid')
    }
    else {
        item = await Item.findOneAndUpdate({_id: obj.id}, {
            highestBid: req.query.bid
        }, {new: true})

        pusher.trigger('item-bid', 'my-event', {
            bidAmount: req.query.bid,
            id: item._id
        })

        await User.findOneAndUpdate({email: req.user.email}, {$pull: {bids: {itemId: item._id}}})
        await User.findOneAndUpdate({email: req.user.email}, {$push: {bids: {itemId : item._id, bidAmount:req.query.bid}}})
        
        await biddingUsers.findOneAndUpdate({itemId: item._id}, {$addToSet: { biddingUsers: req.user.email}}, {upsert: true})
        return res.status(200).send('updated user bids');
    }
})

app.get('/myitems',checkAuthenticate, async(req,res) =>{
    try {
        obj = await User.findById(req.user.id);
    } catch(err) {
        return res.status(500).send("Internal sever error occurred")
    }

    if(!obj) return res.status(404).send("No user with given ID exists..");

    itemList = obj.items;
    return res.send(itemList);
})

app.get('/signout',(req,res)=>{
    res.clearCookie('session-token');
    return res.send('/')
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
        const ticket = await client.verifyIdToken({idToken: token, requiredAudience: CLIENT_ID});
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

async function changeToItem(itemId){
    return await Item.findById(itemId);
}

const PAGE_SIZE = 9
app.get("/itemspage", checkAuthenticate, async(req, res) => {
    const pgno = Number(req.query.pgno)
    if(!Number.isInteger(pgno) || pgno <= 0) {
        return res.status(400).send("Page Number is not a Positive Integer")
    }

    return res.json({
        items: await Item.find().skip((pgno-1)*PAGE_SIZE).limit(PAGE_SIZE),
        totalPages: Math.ceil((await Item.count())/PAGE_SIZE)})
});

app.get("/search", checkAuthenticate, async(req, res) => {
    const searchString = req.query.searchString
    const categoryFilters = req.query.categoryFilters
    const pgno = Number(req.query.pgno)
    if(!Number.isInteger(pgno) || pgno <= 0) {
        return res.status(400).send("Page Number is not a Positive Integer")
    }

    const queryObj = {}
    if(searchString.length) queryObj.name = { $regex: searchString }
    if(categoryFilters) queryObj.category = { $in: categoryFilters }

    const count = await Item.count(queryObj)
    const items = await Item.find(queryObj).skip((pgno-1)*PAGE_SIZE).limit(PAGE_SIZE)

    const sortBy = req.query.sortBy
    if(sortBy == "Title") items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    else if(sortBy == "Current Bid") items.sort((a,b) => (a.highestBid.bidAmount > b.highestBid.bidAmount) ? 1 : ((b.highestBid.bidAmount > a.highestBid.bidAmount) ? -1 : 0))
    else if(sortBy == "Min Bid") items.sort((a,b) => (a.minBid > b.minBid) ? 1 : ((b.minBid > a.minBid) ? -1 : 0))
    else if(sortBy == "Time Left") items.sort((a,b) => (a.endTime.getTime() > b.endTime.getTime()) ? 1 : ((b.endTime.getTime() > a.endTime.getTime()) ? -1 : 0))

    return res.json({
        items: items,
        totalItems: count,
        totalPages: Math.ceil(count/PAGE_SIZE)})
})

app.post("/postQuestion", checkAuthenticate, async(req, res) => {
    const newQuestionId = new mongoose.Types.ObjectId()
    await Item.findOneAndUpdate({_id: req.query.id}, 
        {$push: {questions: {_id: newQuestionId, questionText: req.query.ques, userId: req.user.email}}})
    
    var ItemObj = await Item.findById(req.query.id);
    mailOptions.to = ItemObj.sellerId;    
    mailOptions.text = req.user.email+" has asked a question under you obj "+ItemObj.name+" : "+req.query.ques;

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    res.status(200).send(newQuestionId)
})

app.post("/postAnswer", checkAuthenticate, async(req, res) => {
    const sellerId = (await Item.findOne({_id: req.query.id})).sellerId
    if(sellerId !== req.user.email) {
        return res.status(401).send("User is not a seller.")
    }
    try {
        await Item.findOneAndUpdate({_id: req.query.id, questions: { $elemMatch: {_id: req.query.quesId}}},
            {$set: {'questions.$.answerText': req.query.ans}})
    }
    catch(err) {
        return res.status(500).send(err)
    }
    return res.status(200).send("Answer posted")
})

app.delete('/deleteQues', checkAuthenticate, async(req, res) => {
    if(req.body.id) {
        await Item.findOneAndUpdate({_id: req.body.id}, 
            {$pull: {questions: {_id: req.body.quesId}}})
        
        res.status(200).send("Item deleted successfully")
    }
    else {
        res.status(400).send('item id cannot be undefined.');
    }
})

app.get('/currentUser', checkAuthenticate, (req, res) => {
    return res.status(200).send(req.user.email)
})

app.get("/", (req, res) => {
    res.sendFile(path.join("client", "build", "index.html"), {root: path.resolve(__dirname, '..')});
});

app.get("*", checkAuthenticate, (req, res) => {
    res.sendFile(path.join("client", "build", "index.html"), {root: path.resolve(__dirname, '..')});
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))
