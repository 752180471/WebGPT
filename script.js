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

sendButton.addEventListener('click', sendMessage);

inputField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = inputField.value;
  inputField.value = ''; // Clear the input field
  
if (!apiKey) {
  console.error("API Key is missing.");
  return;  // 结束函数，避免继续发送请求
}
  
  // Display the user's message in the chat container
  const userMessageElement = document.createElement('div');
  userMessageElement.classList.add('message', 'user-message');
  userMessageElement.innerHTML = `<span><img src="images/user-avatar.jpg"> <b>You</b></span>`;

  const userMessageText = document.createElement('p');
  userMessageText.innerText = userMessage;
  userMessageElement.appendChild(userMessageText);
  chatContainer.appendChild(userMessageElement);

  // 拼接用户消息到 prompt
  const promptWithUserMessage = prompt + "\n" + userMessage;

  // 设置请求体
  options.body = JSON.stringify({
    prompt: promptWithUserMessage,
    model,
    max_tokens,
    stop: null,  // 处理停止符
  });

  // 发送请求到 OpenAI API
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const aiMessage = data.choices[0].message.content; // 获取 AI 消息

      // Display the AI's response in the chat container
      const aiMessageElement = document.createElement('div');
      aiMessageElement.classList.add('message', 'ai-message');
      aiMessageElement.innerHTML = `<span id="ai-avatar-name"><img src="images/openai-avatar.png"> <b>WebGPT</b></span>`;

      const aiMessageText = document.createElement('p');
      aiMessageText.innerText = aiMessage;
      aiMessageElement.appendChild(aiMessageText);
      chatContainer.appendChild(aiMessageElement);
    })
    .catch((error) => console.log(error));
}
