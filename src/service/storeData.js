const { Firestore } = require('@google-cloud/firestore');

async function storeDataToFireStore(id, data) {
  // Initialize Database
  const db = new Firestore();

  // Create collections and push data.
  const predictCollection = db.collection('prediction');
  return await predictCollection.doc(id).set(data);
}

module.exports = storeDataToFireStore;