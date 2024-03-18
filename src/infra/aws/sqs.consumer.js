const AWS = require("aws-sdk");

const mercadoPagoApi = require("../apis/mercadoPagoApi");

AWS.config.update({
  region: "us-east-1",
  // accessKeyId: "dummy",
  // secretAccessKey: "dummy",
});

const sqs = new AWS.SQS();

const QueueUrl = process.env.QUEUE_URL;

async function deleteMessage(receiptHandle) {
  const deleteParams = {
    QueueUrl,
    ReceiptHandle: receiptHandle,
  };
  console.log(deleteMessage)
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
      console.log(queueData)
    if (queueData && queueData.Messages && queueData.Messages.length > 0) {
      const [firstMessage] = queueData.Messages;
      console.log("Processing message", firstMessage);
      await mercadoPagoApi.processPayment(JSON.parse(JSON.parse(firstMessage.Body).Message));
      await deleteMessage(firstMessage.ReceiptHandle);
    } else {
      console.log("No messages in the queue");
    }
  } catch (e) {
    console.error("Error receiving message", e);
  }
}

module.exports = { receive };

