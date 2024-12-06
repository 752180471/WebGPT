const inputField = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatContainer = document.getElementById('chat-container');
const model = 'gpt-3.5-turbo-0125';
const max_tokens = 500;
const apiKey = localStorage.getItem('apiKey'); // Your OpenAI API Key
const url = `https://api.openai.com/v1/chat/completions`;



let prompt = [
  `You are a web chat bot inside of the website: https://example.com`,
  ``,
  `If users ask you for code, return any code in code format`,
].join('\n');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
};

sendButton.addEventListener('click', () => {
  const message = inputField.value;
  sendMessages(message);
});

inputField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const message = inputField.value
    sendMessages(message);
  }
});


const apiURLToText = 'https://api.openai.com/v1/chat/completions';

async function sendMessages(message) {
    const data = await fetch(apiURLToText, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            n: 1,
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "Make 720 Great Again" },
                { "role": "user", "content": `${message}` }
            ]
        })
    }).then(res => res.json()).catch(reason => reason);

    textContent.textContent = data?.choices?.[0]?.message?.content || data?.error?.message;
}

