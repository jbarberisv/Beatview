var apiKey = "<key>";
var prompt = "create a music playlist for happy mood";

function getMoodResponse(prompt){
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{role: 'user', content: `${prompt}`}],
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    };


getMoodResponse(prompt)