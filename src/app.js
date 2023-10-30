const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const { loadModel, predict } = require('./ml');

(async () => {
  // load model machine learning
  const model = await loadModel();
  console.log('model loaded!');

  // initializing server
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });

  // register Inert plugin for upload feature
  await server.register(Inert);

  server.route({
    method: 'POST',
    path: '/predicts',
    handler: async (request) => {
      const { image } = request.payload;
      const predictions = await predict(model, image);
      const [paper, rock] = predictions;

      if (paper) {
        return { result: "paper" }
      }

      if (rock) {
        return { result: 'rock' }
      }

      return { result: 'scissors' }
    },
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      }
    }
  });

  // running server
  await server.start();

  console.log(`Server start at: ${server.info.uri}`);
})();
