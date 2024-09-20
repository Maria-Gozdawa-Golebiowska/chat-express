
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login = function(event) {
  event.preventDefault(); 
  

  if (userNameInput.value.trim() === '') {
    alert('Podaj nazwę uzytkownika!');
  } else {
    userName = userNameInput.value.trim(); 
    
    loginForm.classList.remove('show');
    
    messagesSection.classList.add('show');
  }
};

loginForm.addEventListener('submit', login);

function sendMessage(event) {
  event.preventDefault();

  const messageInput = messageContentInput.value;
  if (!messageInput.length) {
    alert("Wpisz treść wiadomości");
  } else {
    addMessage(userName, messageInput);
    messageContentInput.value = "";
  }
}

addMessageForm.addEventListener("submit", sendMessage);

function addMessage(author, content) {
  const message = document.createElement("li");
  message.classList.add("message");
  message.classList.add("message--received");
  if (author === userName) message.classList.add("message--self");
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? "You" : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  messagesList.appendChild(message);
}