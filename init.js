const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main().then(()=>{
    console.log("DB Connection Succesfull");
}).catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ChatsApp');
}

const allChats = [
    {
      from: "K Veeresh",
      to: "Karan",
      msg: "ok",
      created_at: new Date()
    },
    {
      from: "Karan",
      to: "K Veeresh",
      msg: "Where are you?",
      created_at: new Date()
    },
    {
      from: "K Jeevan",
      to: "K Veeresh",
      msg: "Let's meet tomorrow",
      created_at: new Date()
    },
    {
      from: "Preetham",
      to: "Ravitej",
      msg: "Done!",
      created_at: new Date()
    },
    {
      from: "Ravitej",
      to: "Preetham",
      msg: "Okay bro",
      created_at: new Date()
    },
    {
      from: "Devadiga",
      to: "K Veeresh",
      msg: "Call me",
      created_at: new Date()
    }
  ];

  
chat.insertMany(allChats);