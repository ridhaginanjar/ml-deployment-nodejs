## Directories structures:

    ```
        ├── src
        │   ├── services
        │   │   │   inferenceService.js
        │   │   └── loadModel.js
        │   │   handler.js
        │   │   routes.js  
        │   └── server.js
        ├── package.json
        ├── .env (hidden)
        └── README.md
    ```

# Depdendency
```
  "dependencies": {
    "@hapi/hapi": "^21.3.2",
    "@tensorflow/tfjs-node": "^4.14.0",
    "dotenv": "^16.3.1",
    "eslint": "^8.55.0",
    "nanoid": "^3.1.20",
    "nodemon": "^3.0.2"
  }
```