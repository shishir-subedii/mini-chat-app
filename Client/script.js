import { io } from "socket.io-client";
const name = prompt('Enter your name');
sessionStorage.setItem('name', name);
const socket = io("http://localhost:5000");
socket.on("connect", () => {
    addMessage('you joined');
    socket.emit('user-connected', name);
})

function addMessage(msg, who) {
    const messages = document.getElementById('messages');
    const message = document.createElement('li');
    if (msg == 'you joined') {
        message.style.listStyle = 'none';
        message.innerHTML = `<b>Connected to server as <i>${name}</i></b>`;
        messages.appendChild(message);
        return;
    }

    else if (who == 'someone joined') {
        message.style.listStyle = 'none';
        message.innerHTML = `<b><i>${msg}</i> joined the conversation</b>`;
        messages.appendChild(message);
        return;
    }
    else if (who == 'left') {
        message.style.listStyle = 'none';
        message.innerHTML = `<b><i>${msg}</i> left the conversation</b>`;
        messages.appendChild(message);
        return;
    }

    else if (who == 'left') {
        message.style.listStyle = 'none';
        message.innerHTML = `<b><i>${msg}</i> left the conversation</b>`;
        messages.appendChild(message);
        return;
    }

    else if (who == 'You') {
        message.innerHTML = `<b><i>${who}:</i> </b> <i>${msg}</i>`;
        messages.appendChild(message);
        return;
    }

    else {
        message.innerHTML = `<b>${who}: </b> ${msg}`;
        messages.appendChild(message);
        return
    }
}

socket.on('receive-message', (msg, who) => {
    addMessage(msg, who);
});

socket.on('user-joined-info', (name, ) => {
    addMessage(name, 'someone joined');
});

socket.on('user-exit-info', (name) => {
    addMessage(name, 'left');
});

document.getElementById('exit').addEventListener('click', () => {
    socket.emit('user-disconnected', name);
    window.location.href = window.location.href;
});


function sendMessage(e) {
    e.preventDefault();
    let msg = document.getElementById('message').value;
    // addMessage('client', msg);
    socket.emit('send-message', msg, name);
    addMessage(msg, 'You');
    document.getElementById('message').value = '';
}

document.getElementById('send').addEventListener('click', sendMessage);


