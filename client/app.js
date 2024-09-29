const socket = io();
const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName = "";

socket.on("message", ({ author, content }) => addMessage(author, content));
socket.on("newUser", (userName) => {
  addMessage("Chat Bot", userName + " dołączył do czatu:)", true);
});
socket.on("userLeft", (userName) => {
  addMessage("Chat Bot", userName + " opuścił czat... :(", true);
});
function login(event) {
  event.preventDefault();

  const username = userNameInput.value.trim();

  if (username === "") {
    alert("Nazwa użytkownika nie może być pusta!");
    return;
  }
  userName = username;
  socket.emit("join", userName);
  loginForm.classList.remove("show");

  messagesSection.classList.add("show");

  console.log("Witaj,", userName);
}
loginForm.addEventListener("submit", login);

function sendMessage(event) {
  event.preventDefault();

  const messageInput = messageContentInput.value;
  if (!messageInput.length) {
    alert("Pole nie moe być puste!");
  } else {
    addMessage(userName, messageInput);
    socket.emit("message", { author: userName, content: messageInput });
    messageContentInput.value = "";
  }
}
addMessageForm.addEventListener("submit", sendMessage);

function addMessage(author, content) {
  const message = document.createElement("li");
  message.classList.add("message");
  message.classList.add("message--received");
  if (author === userName) message.classList.add("message--self");
  if (author === "Chat Bot") {
    message.classList.add("message--bot");
  }
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? "You" : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  messagesList.appendChild(message);
}

userNameInput.setAttribute("autoComplete", "off");
messageContentInput.setAttribute("autoComplete", "off");