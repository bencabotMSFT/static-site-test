// Load environment variables from .env file
// require('dotenv').config();

document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('prompt-input').value;
    if (!userInput) return;

    // Add user's message to the chat log
    addMessageToChatLog(userInput, 'user-message');

    // Clear the input field
    document.getElementById('prompt-input').value = '';

    // Send the user's message to the GPT-4o model
    fetch('https://ai-nebulaaihub541980892123.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.GPT4O_API_KEY
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": userInput
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 800
        })
    })
    .then(response => response.json())
    .then(data => {
        const assistantMessage = data.choices[0].message.content;
        addMessageToChatLog(assistantMessage, 'assistant-message');
    })
    .catch(error => console.error('Error:', error));
}

function addMessageToChatLog(message, className) {
    const chatLog = document.getElementById('message-container');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    
    const timestamp = new Date().toLocaleTimeString();
    messageElement.innerHTML = `<span class="timestamp">${timestamp}</span> ${message}`;
    
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
}