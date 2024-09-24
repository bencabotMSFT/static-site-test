fetch('https://ai-nebulaaihub541980892123.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'api-key': '6a783eba417f47d9a2738ace6694dac8'
    },
    body: JSON.stringify({
        "messages": [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You are an AI assistant that helps people find information."
                    }
                ]
            }
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "max_tokens": 800
    })
})
.then(response => response.json())
.then(data => {
    const content = data.choices[0].message.content;
    document.getElementById('response-content').innerText = content;
})
.catch(error => console.error('Error:', error));