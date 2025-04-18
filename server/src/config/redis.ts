import { createClient } from 'redis';


export const client = createClient({
    username: 'default',
    password: 'elPTrnzbtW5QRSQoZXUj5TeY1vcrMmW2',
    socket: {
        host: 'redis-17695.c8.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 17695
    }
});
export const subscriber = createClient({
    username: 'default',
    password: 'elPTrnzbtW5QRSQoZXUj5TeY1vcrMmW2',
    socket: {
        host: 'redis-17695.c8.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 17695
    }
});

client.on('error', err => console.log('Redis Client Error', err));
