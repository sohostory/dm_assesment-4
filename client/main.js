const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.querySelector("#fortuneButton");
const dadJokeBtn = document.querySelector("#dadJokeButton");
const jokeDisplay = document.querySelector(".jokeDisplay");
const describeMe = document.querySelector("#describeMe");
const nameInput = document.querySelector("#name");
const postiveWords = document.querySelector(".describeMe");
const toDoInput = document.querySelector("#toDo");
const addToDoBtn = document.querySelector("#addToDo");
const theList = document.querySelector(".theList");

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getDadJoke = () => {
  const config = {
    method: "get",
    url: "https://icanhazdadjoke.com/",
    headers: {
      Accept: "application/json",
    },
  };

  const response = axios(config).then((res) => {
    const joke = res.data.joke;
    jokeDisplay.textContent = joke;
  });
};

const getDescription = () => {
  axios.get("http://localhost:4000/api/describe/").then((res) => {
    const data = res.data;
    postiveWords.textContent = `${nameInput.value} is...`;
    let ul = document.createElement("ul");
    for (let word of data) {
      let li = document.createElement("li");
      li.textContent = word;
      ul.append(li);
    }
    postiveWords.append(ul);
  });
};

const addTodo = () => {
  let body = { list: toDoInput.value };

  axios.post("http://localhost:4000/api/todo", body).then((res) => {
    const data = res.data;
    updateList(data);
  });
  toDoInput.value = "";
};

function done(event) {
  const toEdit = event.target.lastChild;

  let body = { list: toEdit.textContent };
  axios.put("http://localhost:4000/api/todo", body).then((res) => {
    const data = res.data;
    updateList(data);
  });
}

function removeMe(event) {
  const toRemove = event.target.parentNode.lastChild.textContent;

  let body = { list: toRemove };
  axios.delete("http://localhost:4000/api/todo", body).then((res) => {
    const data = res.data;
    updateList(data);
  });
}

function updateList(data) {
  theList.textContent = "";
  let ul = document.createElement("ul");
  for (let item of data) {
    let button = document.createElement("button");
    button.textContent = "X";
    button.addEventListener("click", removeMe);
    let li = document.createElement("li");
    li.append(button);
    const textNode = document.createTextNode(item);
    li.appendChild(textNode);
    li.addEventListener("click", done);
    ul.append(li);
  }
  theList.append(ul);
}

complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
dadJokeBtn.addEventListener("click", getDadJoke);
describeMe.addEventListener("click", getDescription);
addToDoBtn.addEventListener("click", addTodo);
