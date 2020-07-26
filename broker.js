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
                        assert: true,
                        type: 'direct'
                    },
                    demo_fanout_exchange: {
                        assert: true,
                        type: 'fanout'
                    }
                },
                queues: {
                    demo_queue: {
                        assert: true,
                    },
                    demo_fan1:{
                        assert: true,
                    },
                    demo_fan2:{
                        assert: true,
                    },
                },
                bindings: [
                    'demo_exchange[demo_key]-> demo_queue',
                    'demo_fanout_exchange->demo_fan1',
                    'demo_fanout_exchange->demo_fan2',

                ],
                subscriptions:{
                    demo_sub: {
                        queue: 'demo_queue',
                        contentType: 'application/json'
                    },
                    demo_fan1: {
                        queue: 'demo_fan1'
                    },
                    demo_fan2: {
                        queue: 'demo_fan2'
                    }
                },
                publications: {
                    demo_pub: {
                        exchange: 'demo_exchange',
                        routingKey: 'demo_key'
                    },
                    demo_fan_pub: {
                        exchange: 'demo_fanout_exchange'
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