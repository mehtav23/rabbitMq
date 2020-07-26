const express = require('express');
const app = express();
const appConstants = require('./appConstants');
const bodyParser = require('body-parser');
const directPublisher = require('./direct/publisher');
const fanoutPublisher = require('./fanout/publisher');
const subscriptions = require('./direct/subscriber');
const fanoutSubscription = require('./fanout/subscriber');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


subscriptions();
fanoutSubscription();


app.use('/publish',(req, res)=>{
    res.send('publishing');
    directPublisher(req, res);


});

app.use('/fanout', (req, res)=>{
    res.send('Fan out ');
    fanoutPublisher(req, res);


});

app.listen(appConstants.port, function(err){
    if(err) {
        console.log(`error occured while creating server`, err);
    }
    console.log(`listening to server at${appConstants.port}`);
});

