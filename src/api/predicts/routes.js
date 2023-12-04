const routes = (handler) => [
    {
        method: 'POST',
        path: '/predict',
        handler: handler.classificationHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
            }
        }
    }
]