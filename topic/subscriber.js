const Broker = require('../broker');

const subscriber = async ()=>{
    const broker = await Broker.getBroker();

    const subscriptionOne = await broker.subscribe('demo_topic1_sub');

    subscriptionOne.on('message', async(message, content, ackOrNack)=>{
        console.log('There is a new message in demo_topic1_sub');
        console.log(message, content);
        //ackOrNack();
    });

    const subscriptionTwo = await broker.subscribe('demo_topic2_sub');

    subscriptionTwo.on('message', async(message, content, ackOrNack)=>{
        console.log('There is a new message in demo_topic2_sub');
        console.log(message, content);
        //ackOrNack();
    });
}

module.exports = subscriber;