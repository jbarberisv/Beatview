var openaiApiKey = "sk";
var mood;
var prompt;

var elChatResponse = document.querySelector("#chatResponse");

//Grab Users input
function formHandler(event) {
  event.preventDefault();
  mood = event.target.elements.mood.value;
  generatePrompt(mood);
}
//Generate prompt to fetch function
function generatePrompt(mood) {
  prompt =
    "create a 5 song playlist for " +
    mood +
    " mood with only song names in JSON format as song: title";
  getMoodResponse(prompt);
}
//Fetch to API
function getMoodResponse(prompt) {
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}` }],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //Returns data and stores in a Json format
      var jsonString = data.choices[0].message.content;
      const playlist = JSON.parse(jsonString);
      console.log(playlist)
      //Stores data for each song in the playlist and stores in a variable and then stored each variable in an array
      var song1 = playlist.song1;
      var song2 = playlist.song2;
      var song3 = playlist.song3;
      var song4 = playlist.song4;
      var song5 = playlist.song5;
      var songs = [song1, song2, song3, song4, song5];
      //For loop to go through each song in the array based on index
      ytCall(songs, 0);
      {
        for (let i = 1; i < songs.length; i++) {
          ytCall(songs, i);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  //function to pass playlist created by the openai API
  function ytCall(songs, index) {
    var youtubeApiKey = "AI"
    const query = songs[index];
    const maxResults = 1;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&maxResults=${maxResults}&type=video&videoCategoryId=10&key=${youtubeApiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('YOUTUBE', data);
        var title = document.createElement("p");
        title.textContent = data.items[0].snippet.title;
        document.body.appendChild(title);
        var videoId = data.items[0].id.videoId;
        var videoLink = document.createElement("a");
        videoLink.href = "https://www.youtube.com/watch?v="+videoId;
        videoLink.textContent = videoLink.href
        document.body.appendChild(videoLink);
      });
  }
}
document.addEventListener("submit" , formHandler)
