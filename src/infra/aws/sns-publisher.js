const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    // accessKeyId: "dummy",
    // secretAccessKey: "dummy",
});

const sns = new AWS.SNS();


async function publish(msg) {
    const publishParams = {
        TopicArn: process.env.PAYMENT_TOPIC,
        Message: msg,
    };
    try {
        await sns.publish(publishParams).promise();
    } catch (e) {
        console.log("TOPIC Error: ", e);
    }
}

module.exports = {publish};

