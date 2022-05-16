const Bill = require("./bill.model");
const amqp = require("amqplib");
const axios = require("axios");

exports.funduser = async (id, amount) => {
  let bill;
  try {

    bill = await Bill.create({
      customer_id:id,
      amount:amount,
      status:"pending"
    });

    const connection = await amqp.connect("amqp://localhost:5673");
    const channel = await connection.createChannel();
    await channel.assertQueue("bills");
    channel.sendToQueue("bills",Buffer.from(JSON.stringify(bill)))
    const response = await axios.post('http://localhost:3000/blusalt/service/bill',
    bill
    );

    return {
      error: !bill,
      message: !bill ? "Failed to register " : "Uploaded successful",
      data: !bill ? null : bill,
    };
  } catch (err) {
    bill && bill.deleteOne();
    console.log(err?.response?.data || err);
    return {
      error: true,
      message: "Error registering user",
      data: err?.response?.data || err,
    };
  }
};



