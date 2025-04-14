const messageInput = document.getElementById("msg");
const btnSend = document.getElementById("send");
const chatBox = document.getElementById("chatbox");
const onlineClients = document.getElementById("online");

const myWebSocket = new WebSocket("ws://localhost:4600");

myWebSocket.addEventListener("message", (serverMsg) => {
  try {
    const data = JSON.parse(serverMsg.data);
    if (data.onlineUsers !== undefined) {
      onlineClients.textContent = `Online users: ${data.onlineUsers}`;
    } else if (data.type === 'message' && data.user && data.message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('admin'); 
        messageDiv.textContent = `${data.user}: ${data.message}`;
        chatBox.appendChild(messageDiv);
    } else {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('admin');
        messageDiv.textContent = serverMsg.data;
        chatBox.appendChild(messageDiv);
    }
  } catch (e) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('admin');
    messageDiv.textContent = serverMsg.data;
    chatBox.appendChild(messageDiv);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});

const sendMessage = () => {
  const message = messageInput.value;
  if (message.trim() !== "") {
    myWebSocket.send(message);
    chatBox.innerHTML += '<div class="client">' + message + "</div>";
    chatBox.scrollTop = chatBox.scrollHeight;
    messageInput.value = "";
  }
};

btnSend.addEventListener("click", sendMessage);

messageInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
