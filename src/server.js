require('dotenv').config();

const Hapi = require('@hapi/hapi');
const PredictionService = require('./service/predicts/PredictionService');

const init = async () => {
    const service = new PredictionService();
    const server = Hapi.server({
        port:3000,
        host:'localhost',
    })

    await server.register({
        plugin: 'classification',
        options: {
            service: service,
            model: process.env.MODEL
        }
    });

    server.route();

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
};

init()