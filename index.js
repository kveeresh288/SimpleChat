const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");

const mongoose = require("mongoose");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static( path.join(__dirname,"public")) );
app.use(express.urlencoded({extended: true}));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.listen(8080,()=>{
    console.log("Listening at port 8080");
});main().then(()=>{
    console.log("DB Connection Succesfull");
}).catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ChatsApp');
}

app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
});

app.get("/chats/new", (req,res)=> {
    res.render("new.ejs");
});

app.post("/chats",(req,res)=> {

    let{from,msg,to} = req.body;

    let newChat = new Chat({
        from : from,
        to: to,
        msg: msg,
        created_at: new Date()
    });

    newChat.save()
    .then((res)=> console.log("Inserted new chat to DB"))
    .catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");
} );

app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;

    await Chat.findByIdAndUpdate(id, { msg });
    console.log(msg);
    res.redirect(`/chats`);
});

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect(`/chats`);
});

// const chat1 = new chat({
//     from: "K Veeresh",
//     to: "Karan",
//     msg: "ok",
//     created_at: new Date() //UTC format Date
// })

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });
