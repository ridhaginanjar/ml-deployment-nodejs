const crypto = require('crypto');
const predictClassification = require('./service/inferenceService');
const storeDataToFireStore = require('./service/storeData');

async function postPredictHandler(request, h) {
  // Make Predictions
  const { image } = request.payload;
  const { model } = request.server.app;
  const { confidenceScore, label } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": label,
    "confidenceScore": confidenceScore,
    "createdAt": createdAt
  }

  // Simpan data ke Firestore
  await storeDataToFireStore(id, data);
  console.log("Data berhasil disimpan");

  const response = h.response({
    status: 'success',
    message: confidenceScore > 80 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  })
  response.code(201);
  return response;
}

module.exports = postPredictHandler;