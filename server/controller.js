const fortune = require("./fortune.json");
const positive = require("./positive.json");
const axios = require("axios");

const toDoDb = [];
module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    let randomIndex = Math.floor(Math.random() * fortune.length);
    let randomFortune = fortune[randomIndex].fortune;

    res.status(200).send(randomFortune);
  },

  getDescription: (req, res) => {
    console.log("received");

    const words = [];

    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * positive.length);
      let postiveWord = positive[randomIndex];
      words.push(postiveWord);
    }

    res.status(200).send(words);
  },

  postToDo: (req, res) => {
    let toDo = req.body;
    toDoDb.push(toDo.list);

    res.status(200).send(toDoDb);
  },

  editToDo: (req, res) => {
    let toDo = req.body;
    let index = toDoDb.indexOf(toDo.list);
    toDoDb[index] = `${toDo.list} - DONE`;

    res.status(200).send(toDoDb);
  },

  deleteList: (req, res) => {
    let toDo = req.body;
    let index = toDoDb.indexOf(toDo.list);
    toDoDb.splice(index, 1);

    res.status(200).send(toDoDb);
  },
};
