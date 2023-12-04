const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image) {
    const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224,224])
    .expandDims()
    .toFloat()

    const classes = ['Melanocytic nevus', 'Squamous cell carcinoma', 'Vascular lesion' ];

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const classResult = prediction.argMax().dataSync()[0];
    const label = classes[classResult];

    return {confidenceScore, label};
}

module.exports = predictClassification;