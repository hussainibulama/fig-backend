const amqp = require("amqplib");

async function rabbitConnect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5673");
        // const channel = await connection.createChannel();
        // const result = await channel.assertQueue("jobs");
        // channel.sendToQueue("jobs",Buffer.from(JSON.stringify({"id":10})))
        //  console.log("job sent");
        //  channel.consume("jobs", message=>{
        //      console.log(message.content.toString());
        //      channel.ack(message);
        //  })
        return connection;

    }catch(ex){
        console.log(ex);
    }
}
module.exports = rabbitConnect;