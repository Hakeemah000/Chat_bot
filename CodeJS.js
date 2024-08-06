//*********************************************

//Code to talk to chatbot.


app.use(express.static(path.join(__dirname, 'index.html')));//Here is a link to the HTML page for this work.
app.use(express.json());

app.post('/api', async (req, res) => {
  const userInput = req.body.input;
  
  try {
    const response = await axios.post(
    // The link to the model that you will put, the links of the models differ from each other and you will find the links on the official website of Openai
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-4', // Use the correct model
        prompt: userInput,
        max_tokens: 100
      },
      
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,//Here is the variable where you will put your private key for openai.
          'Content-Type': 'application/json'
        }
      }
      )
  }

});

//To verify and enter the page you created
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



//*********************************************

//This code is inside the HTML.



      const userInput = document.getElementById('userInput').value;

      try {
          const response = await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
  },
            body: JSON.stringify({ input: userInput })
});

          const data = await response.json();
          document.getElementById('response').textContent = data.response;
}           catch (error) {
          console.error('Error:', error);
          document.getElementById('response').textContent = 'Something went wrong??';
}

