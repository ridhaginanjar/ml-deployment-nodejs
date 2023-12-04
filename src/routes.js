const postPredictHandler = require("./handler");

const routes = [
    {
        path: '/predicts',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            },
        }
    }
]

module.exports = routes;