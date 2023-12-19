const { Firestore } = require('@google-cloud/firestore');
const predictClassification = require('./inferenceService');
const FirestoreError = require('../exceptions/FirestoreError');

async function storeDataToFireStore(id, data) {
  try {
    // Initialize Database
    const db = new Firestore();

    // Create collections and push data.
    const predictCollection = db.collection('prediction');

    const isPredict = await predictCollection.doc(id).set(data);

    return isPredict
  } catch (error) {
    throw new FirestoreError("Terjadi kegagalan dalam menyimpan data ke Cloud Firestore.")
  }
}

module.exports = storeDataToFireStore;