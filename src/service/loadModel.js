require('dotenv').config();

const tf = require('@tensorflow/tfjs-node');

async function load_model() {
    const modelUrl = process.env.MODEL;
    return tf.loadLayersModel(modelUrl);
}

module.exports = load_model;