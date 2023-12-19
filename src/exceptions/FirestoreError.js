const ClientError = require("./ClientError");

class FirestoreError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'FirestoreError';
    }
}

module.exports = FirestoreError;