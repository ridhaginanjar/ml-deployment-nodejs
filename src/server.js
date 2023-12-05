require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const InputError = require('./exceptions/InputError');
const loadModel = require('./service/loadModel');

(async () => {
    const server = Hapi.server({
        port:3000,
        host:'localhost',
    })

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);

    server.ext('onPreResponse', function(request, h) {
        const response = request.response;

        if(response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: `${response.message} Silakan gunakan foto lain.`
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }

        if(response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode)
            return newResponse;
        }

        return h.continue;
    })

    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();