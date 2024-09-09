const express = require("express");
const mongoose = require("mongoose");
const Note = require("./noteSchema");
const port = process.env.PORT || 3000;

const app = express();

const cors = require("cors"); //
app.use(cors({ origin: ["http://localhost:4200"] }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const url = "mongodb+srv://ForgotPassword:XHlQyfs4TTV9xyem@cluster0.zbtcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url);


app.get("/api/get-notes", async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://angular-notes-app-1.onrender.com/');
    res.json(await Note.find());
});

app.post("/api/new-note", async (req, res) => {
    try {
        const newNote = await Note.create({
            title: req.body.title,
            description: req.body.description,
        });
	res.set('Access-Control-Allow-Origin', 'https://angular-notes-app-1.onrender.com/');
        res.json(newNote);
    } catch (err) {
        console.log(err);
    }
});

app.delete("/api/delete/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.set('Access-Control-Allow-Origin', 'https://angular-notes-app-1.onrender.com/');
    res.json("Deleted succesfully");
});

app.put("/api/update/:id", async (req, res) => {
    await Note.findByIdAndUpdate(req.params.id, req.body);
    res.set('Access-Control-Allow-Origin', 'https://angular-notes-app-1.onrender.com/');
    res.json("Updated succesfully");
});

app.listen(port, () => {
    console.log(`Example API listening on port ${port}`);
});
module.exports = app;
