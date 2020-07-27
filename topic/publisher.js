const Broker = require('../broker');

const publisher = async (req, resp) =>{


    const broker = await Broker.getBroker();
    const payload = {
        message: 'Message will be send to exchanges matching the routing key pattern'
    };
    console.log('Publishing new message');
    const pub = await broker.publish('demo_topic_pub', JSON.stringify(payload));
    pub.on('error', error=>{
        console.error('Error occured while publishing the message', error);
    });

    
}

module.exports = publisher;