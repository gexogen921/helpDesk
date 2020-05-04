const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://127.0.0.1:27017/helpdesk', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    let greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
};

let Kitten = mongoose.model('Kitten', kittySchema);

let silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

let fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

