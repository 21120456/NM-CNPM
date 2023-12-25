/*
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("aaaaa")
  switch (message.action) {
    case 'summarize':
      handleSummarize(message.text);
      break;
    case 'detail':
      handleDetail(message.text);
      break;
    case 'translate':
      handleTranslate(message.text);
      break;
    default:
      break;
  }
});

function handleSummarize(text) {
  const apiKey = 'YOUR_OPENAI_API_KEY';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  // Send the selected text to OpenAI GPT-3 API for summarization
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 50  // Adjust as needed for desired summary length
    })
  })
    .then(response => response.json())
    .then(data => {
      // Handle the summarized text
      const summarizedText = data.choices[0].text;
      sendMessageToPopup(summarizedText);
    })
    .catch(error => {
      console.error('Error:', error);
      sendMessageToPopup('Error occurred during summarization.');
    });
  
  console.log('Summarizing:', text);

  // Simulate a simple response for now
  const summarizedText = 'This is a summarized version of the text.';
  sendMessageToPopup(summarizedText);
}

function handleDetail(text) {
  // Implement your logic for detailing
  // You can use additional APIs or libraries for more detailed analysis
  console.log('Detailing:', text);

  // Simulate a simple response for now
  const detailedText = 'This is a detailed analysis of the text.';
  sendMessageToPopup(detailedText);
}

function handleTranslate(text) {
  // Implement your logic for translation
  // You can use translation APIs like Google Translate or others
  console.log('Translating:', text);

  // Simulate a simple response for now
  const translatedText = 'This is a translated version of the text.';
  sendMessageToPopup(translatedText);
}

function sendMessageToPopup(message) {
  chrome.runtime.sendMessage({ action: 'response', text: message });
}
*/

let selectedText

// Lắng nghe thông điệp từ content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // Kiểm tra xem thông điệp có được gửi từ content script không
  if (message.sender === "content_script" && message.message != "") {
    selectedText = message;
    // Phản hồi cho content script (có thể không cần thiết)
  } else if (message.sender === "popup") {
    // Gửi thông điệp tới popup.js
    //chrome.runtime.sendMessage({ dataFromContentScript: message.dataFromContentScript });
    sendResponse({ message: selectedText.message, sender: selectedText.sender });
  }
});