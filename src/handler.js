const crypto = require('crypto');
const predictClassification = require('./service/inferenceService');

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

    const response = h.response({
        status: 'success',
        message: confidenceScore > 0.6 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
    })
    response.code(201);
    return response;
}

module.exports = postPredictHandler;