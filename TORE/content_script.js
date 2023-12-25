/*
const apiUrl = 'https://api.openai.com/v1/completions';
const apiKey = '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';

//const url = new URL(window.location.href);
//const search = url.search;
//const searchParams = new URLSearchParams(search);
//const prompt = searchParams.get('q');

let selectedText = '';
let myDiv;


document.addEventListener('mouseup', function() {
  const selection = window.getSelection();
  selectedText = selection.toString().trim();

  // Fetch request options
  if (selectedText.length > 0) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        "model": 'text-davinci-003',
        "prompt": selectedText,
        "max_tokens": 100, // Adjust as needed
        "temperature": 0,
      }),
    };

    // Make the Fetch request
    fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        const ans = data.choices[0].text;

        // remove previous if it exists
        if (myDiv) {
          myDiv.remove();
        }

        myDiv = document.createElement('div');
        myDiv.textContent = ans;

        const divStyles = {
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100',
          backgroundColor: 'white',
          color: 'black',
          padding: '10px',
          fontSize: '20px',
        };

        Object.assign(myDiv.style, divStyles);

        document.body.appendChild(myDiv);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
  }
  else {
    console.log("Empty text selection!");

    if (myDiv) {
      myDiv.remove();
    }
  }
});
*/

function getSelectedText() {
  let selectedText = '';

  // window.getSelection
  if (window.getSelection) {
      selectedText = window.getSelection().toString();
  }
  // document.getSelection
  else if (document.getSelection) {
      selectedText = document.getSelection().toString();
  }
  // document.selection
  else if (document.selection) {
      selectedText =
          document.selection.createRange().text;
  } else return "";

  return selectedText;
}

let selectedText = ""


document.addEventListener('mouseup', function() {
  selectedText = getSelectedText()  
  // Gửi thông điệp tới background.js
  chrome.runtime.sendMessage({ message: selectedText, sender: "content_script" }, function(response) {
  });

});

