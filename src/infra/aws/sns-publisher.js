const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
});

const sns = new AWS.SNS({
  endpoint: "http://localhost:4566",
});

const TopicArn = 'arn:aws:sns:eu-central-1:000000000000:payment-creation-response';

async function publish(msg) {
  const publishParams = {
    TopicArn,
    Message: msg,
  };
  try {
    const topicRes = await sns.publish(publishParams).promise();
    console.log("TOPIC Response: ", topicRes);
  } catch (e) {
    console.log("TOPIC Error: ", e);
  }
}

module.exports = { publish };

