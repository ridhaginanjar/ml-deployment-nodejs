const ClassificationHandler = require("./handler");
const routes = require("./routes");

const predictClassification = {
    name: 'classification',
    version: '1.0.0',
    register: async (server, {service, model}) => {
        const classificationHandler = new ClassificationHandler(service, model);
        server.route(routes(classificationHandler));
    }
}