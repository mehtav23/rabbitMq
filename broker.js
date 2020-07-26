const Broker = require('rascal').BrokerAsPromised;
const Rascal = require('rascal');


let broker;

const rabbitMqConfig = 
    {
        'vhosts': {
            '/': {
                connections: {
                    url: "amqp://guest:guest@localhost"
                },
                exchanges: {
                    demo_exchange: {
                        assert: true
                    }
                },
                queues: {
                    demo_queue: {
                        assert: true,
                    }
                },
                bindings: [
                    'demo_exchange[demo_key]-> demo_queue'
                ],
                subscriptions:{
                    demo_sub: {
                        queue: 'demo_queue',
                        contentType: 'application/json'
                    }
                },
                publications: {
                    demo_pub: {
                        exchange: 'demo_exchange',
                        routingKey: 'demo_key'
                    }
                }
            }
        }
    }

const withDefaultConfig = Rascal.withDefaultConfig(rabbitMqConfig);

module.exports = {
    async getBroker() {
        if(!broker){
            try {
                console.log('creating broker with above config');
                broker = await Broker.create(withDefaultConfig);
                return broker;
            }catch(err) {
                console.error('Error occured while creating broker', err);
            }
        }
        else {
            return broker;
        }
    }
}