const Bill = require("../billing/bill.model");
const User = require("../customer/user.model");
const amqp = require("amqplib");

exports.funduser = async (data) => {
  let bill,user;
  try {

    const connection = await amqp.connect("amqp://localhost:5673");
    const channel = await connection.createChannel();
    await channel.assertQueue("bills");
    let user = await User.findOne({ _id: data.customer_id});
    if(user){
      channel.consume("bills", message=>{
        let know = JSON.parse(message.content.toString());
        if(know._id == data._id){
         setTimeout(function(){
          app(know._id,data,user.wallet);
         },100);
         channel.ack(message);
       }
       })
    }else {
      console.log("no user");
    }
 
    return {
      error: false,
      message:"transaction completed",
      data:[],
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
async function app(id, data,wallets){
  try{
    await Bill.findOneAndUpdate({_id:id }, { status: "success" });
    await User.findOneAndUpdate({_id: data.customer_id }, { wallet:parseInt(wallets)+parseInt(data.amount) });

  }catch(ex){

  }

}

