const { nanoid } = require('nanoid');
const predictClassification = require('./service/inferenceService');
const load_model = require('./service/loadModel');

async function postPredictHandler(request, h) {
    try {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();

        // Load model
        const model = await load_model();

        // Make Predictions
        const { image } = request.payload;
        const {confidenceScore, label} = await predictClassification(model, image);

        const result = {
            "id": id,
            "result": label,
            "confidenceScore": confidenceScore,
            "createdAt": createdAt
        }

        const response = h.response({
            status: 'success',
            message: confidenceScore > 0.6 ? 'Model is predicted successfully.': 'Model is predicted successfully but under threshold. Please use the correct picture',
            data: result
        })
        response.code(201);
        return response;
    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: "Maximum file is 1MB."
        })

        response.code(400);
        return response;
    }

}

module.exports = postPredictHandler;