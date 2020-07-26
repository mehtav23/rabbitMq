const express = require('express');
const app = express();
const appConstants = require('./appConstants');
const bodyParser = require('body-parser');
const publisher = require('./direct/publisher');
const subscriptions = require('./direct/subscriber');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
subscriptions();
// app.use('/', (req,res)=>{
//     res.send('Hello world');
//     //publisher(req, res);


// });

app.use('/publish',(req,res)=>{
    res.send('publishing');
    publisher(req, res);


});

app.listen(appConstants.port, function(err){
    if(err) {
        console.log(`error occured while creating server`, err);
    }
    console.log(`listening to server at${appConstants.port}`);
});

