const Broker = require('../broker');

const subscriber = async ()=>{
    const broker = await Broker.getBroker();
    const subscription = await broker.subscribe('demo_sub');
    subscription.on('message', async(message, content, ackOrNack)=>{
        console.log('There is a new message');
        console.log(message,content);
        ackOrNack();
    });
}

module.exports = subscriber;