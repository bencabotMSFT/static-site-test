// index.js

function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString();
}

function sendMessage() {
  const prompt = document.getElementById('prompt-input').value;
  if (prompt) {
    // Display the user's message immediately
    const messageContainer = document.getElementById('message-container');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
      <img class="avatar" src="images/user-avatar.png" alt="User" />
      <div class="message-contents">
        <div class="metadata">
          <span class="user-name">User</span>
          <span class="timestamp">${getCurrentTimestamp()}</span>
        </div>
        ${prompt}
      </div>
    `;
    messageContainer.appendChild(userMessage);

    // Clear the prompt input
    document.getElementById('prompt-input').value = '';

    // Proceed with the API call
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.choices && data.choices.length > 0) {
          const assistantMessage = document.createElement('div');
          assistantMessage.className = 'message assistant-message';
          assistantMessage.innerHTML = `
            <img class="avatar" src="images/assistant-avatar.png" alt="Assistant" />
            <div class="message-contents">
              <div class="metadata">
                <span class="assistant-name">Assistant</span>
                <span class="timestamp">${getCurrentTimestamp()}</span>
              </div>
              ${data.choices[0].message.content}
            </div>
          `;
          messageContainer.appendChild(assistantMessage);
        } else {
          console.error('Unexpected response structure:', data);
        }
      })
      .catch(error => console.error('Error:', error));
  }
}

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('prompt-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});