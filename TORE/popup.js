/*
document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chat-box');
    const inputMessage = document.getElementById('inputMessage');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const detailBtn = document.getElementById('detailBtn');
    const translateBtn = document.getElementById('translateBtn');

    function sendMessage() {
        let messageText = inputMessage.value;
        // Get event listener
        messageText = summarizeBtn.addEventListener('click', () => handleTask('Summarize'));
        messageText = detailBtn.addEventListener('click', () => handleTask('Detailing'));
        messageText = translateBtn.addEventListener('click', () => handleTask('Translate'));

        if (messageText && messageText.trim() !== '') {
            appendMessage('You', messageText);
            inputMessage.value = '';

            // Simulate a simple response for now
            const responseText = 'This is a sample response from ChatGPT.';
            appendMessage('TORE', responseText);
        }
    }

    function handleTask(task) {
        const selectedText = inputMessage.value;
        let result = '';
        if (selectedText !== '') {
            result = `<${task}> ${selectedText}`;
        }
        return result;
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
    }
    // Handling responses from background.js
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'response') {
            appendMessage('TORE', message.text);
        }
    });
});
*/

document.addEventListener('DOMContentLoaded', function() {
    
    var textarea = document.querySelector('#chat-box textarea');
    const translateBtn = document.getElementById('translateBtn');
    translateBtn.addEventListener('click', () => handleTask('Translate'));

    //const apiKey2 = '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';

    function translateText(textToTranslate, sourceLanguage, targetLanguage) {
        const apiKey = "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";
        const apiUrl = "https://api.openai.com/v1/completions";
        const url = new URL(window.location.href)
        const search = url.search;
        const searchParam = new URLSearchParams(search);
        const q = `Translate from ${sourceLanguage} to ${targetLanguage}: ${textToTranslate}`
        return new Promise((resolve, reject) => {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    "model": "text-davinci-003",
                    "prompt": q,
                    "max_tokens": 100,
                    "temperature": 0,
                }),
            })
            .then(response => response.json())
            .then(data => resolve(data.choices[0].text))
            .catch(error => reject(error));
        });
    }

    chrome.runtime.sendMessage({ message: "", sender: "popup" }, function(selectedText) {
        textarea.value = selectedText.message;
    });

    function handleTask(task) {
        if(task=='Translate'){
            translateText(textarea.value, 'vi', 'en')
            .then(result => {
                textarea.value = result;
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
});


