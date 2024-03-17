const AWS = require("aws-sdk");
const mercadoPagoApi = require("../apis/mercadoPagoApi");
AWS.config.update({
  region: "eu-central-1",
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
});

const sqs = new AWS.SQS({
  endpoint: "http://localhost:4566",
});

const QueueUrl = process.env.QUEUE_URL;

async function deleteMessage(receiptHandle) {
  const deleteParams = {
    QueueUrl,
    ReceiptHandle: receiptHandle,
  };
  await sqs.deleteMessage(deleteParams).promise();
}

async function receive() {
  try {
    const queueData = await sqs
      .receiveMessage({
        QueueUrl,
        MaxNumberOfMessages: 1,
      })
      .promise();
    if (queueData && queueData.Messages && queueData.Messages.length > 0) {
      const [firstMessage] = queueData.Messages;
      const send  = await mercadoPagoApi.processPayment(JSON.parse(JSON.parse(firstMessage.Body).Message));
      console.log(send);
      await deleteMessage(firstMessage.ReceiptHandle);
    } else {
      console.log("waiting...");
    }
  } catch (e) {
    console.log("ERROR: ", e);
  }
}

module.exports = { receive };

