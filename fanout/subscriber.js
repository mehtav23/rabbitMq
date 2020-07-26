const Broker = require('../broker');

const subscriber = async ()=>{
    const broker = await Broker.getBroker();

    const subscriptionOne = await broker.subscribe('demo_fan1');

    subscriptionOne.on('message', async(message, content, ackOrNack)=>{
        console.log('There is a new message in demo_fan1');
        console.log(message, content);
        ackOrNack();
    });

    const subscriptionTwo = await broker.subscribe('demo_fan2');

    subscriptionTwo.on('message', async(message, content, ackOrNack)=>{
        console.log('There is a new message in demo_fan2');
        console.log(message, content);
        ackOrNack();
    });
}

module.exports = subscriber;