const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image) {
    const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224,224])
    .expandDims()
    .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const label = prediction.argMax().dataSync()[0];

    return {confidenceScore, label};
}

module.exports = predictClassification;