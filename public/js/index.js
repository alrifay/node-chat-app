const socket = io();

socket.on('connect', () => {
    console.info('Connnected to server! :)');
});

socket.on('newMessage', (msg) => {
    message(msg.Sender, msg.Message, msg.CreatedAt);
});

socket.on('disconnect', () => {
    console.warn('Disconnnected from server! :(');
});
window.onload = () => {
    let sendMsg = document.getElementById('sendMsg');
    document.msg.msg.onkeypress = function (evt) {
        if (evt.key === "Enter") {
            sendMsg.click();
        }
    };
    sendMsg.onclick = () => {
        let msg = {
            Sender: document.msg.name.value,
            Message: document.msg.msg.value,
        };
        document.msg.msg.value = "";
        socket.emit('createMessage', msg);
    };
};

function message(Sender, Message, CreatedAt) {
    let chat = document.getElementById('messages');
    chat.innerHTML = template('msgTemplate', {
        Sender,
        Message,
        CreatedAt
    }) + chat.innerHTML;
}

function template(id, data) {
    let html = document.getElementById(id).innerHTML;
    for (let key in data) {
        html = html.replace(new RegExp('\{\{\\s*' + key + '\\s*\}\}'), data[key]);
    }
    return html;
}