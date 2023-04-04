const apiKey = "";
const prompt = "";

fetch("https://api.openai.com/v1/engines/davinci/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    prompt: prompt,
    max_tokens: 5,
    n: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data.choices[0].text);
  })
  .catch((error) => {
    console.error(error);
  });