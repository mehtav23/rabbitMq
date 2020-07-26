const Broker = require('../broker');

const publisher = async (req, resp) =>{


    const broker = await Broker.getBroker();
    const payload = {
        name: 'Varun',
        age: 30,
        gender: 'Male'
    };
    console.log('Publishing new message');
    const pub = await broker.publish('demo_pub', JSON.stringify(payload));
    pub.on('error', error=>{
        console.error('Error occured while publishing the message', error);
    });

    
}

module.exports = publisher;