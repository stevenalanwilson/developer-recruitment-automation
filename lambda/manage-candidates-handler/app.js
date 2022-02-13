const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "DELETE /candidates/{id}":
                await dynamo
                    .delete({
                        TableName: "http-crud-candidates",
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                body = `Deleted candidate ${event.pathParameters.id}`;
                break;
            case "GET /candidates/{id}":
                body = await dynamo
                    .get({
                        TableName: "http-crud-candidates",
                        Key: {
                            id: event.pathParameters.id
                        }
                    })
                    .promise();
                break;
            case "GET /candidates":
                body = await dynamo
                    .scan({ TableName: "http-crud-candidates" })
                    .promise();
                break;
            case "PUT /candidates":
                let requestJSON = JSON.parse(event.body);
                await dynamo
                    .put({
                        TableName: "http-crud-candidates",
                        Item: {
                            id: requestJSON.id,
                            name: requestJSON.name,
                            github: requestJSON.githubUserName
                        }
                    })
                    .promise();
                body = `Put candidate ${requestJSON.id}`;
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};
