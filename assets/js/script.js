var apiKey = "sk-";
var mood;
var prompt;

var playListIfNoPrivateKey = {
    "playlist_name": "Heavy Metal Mood",
    "tracks": [
      {
        "artist": "Metallica",
        "title": "Master of Puppets",
        "duration": "8:36"
      },
      {
        "artist": "Slayer",
        "title": "Raining Blood",
        "duration": "4:12"
      },
      {
        "artist": "Pantera",
        "title": "Cowboys from Hell",
        "duration": "4:07"
      },
      {
        "artist": "Black Sabbath",
        "title": "Paranoid",
        "duration": "2:47"
      }
      ]
    }

var elChatResponse = document.querySelector("#chatResponse");

//Grab Users input
function formHandler(event) {
    event.preventDefault();
    mood = event.target.elements.mood.value;
    generatePrompt(mood);
}
//Generate prompt to fetch function
function generatePrompt(mood) {
    prompt = "create a music playlist for" + mood + "mood. And return it in a json format";
    getMoodResponse(prompt);
}
//Fetch to API
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
        var elResponse = document.createElement("p");
        elResponse.textContent = data.choices[0].message.content;
        elChatResponse.appendChild(elResponse);

        // send response to spotify function
        spotifyPlaylist(data.choices[0].message.content);
      })
      .catch((error) => {
        return spotifyPlaylist(playListIfNoPrivateKey);
      });
    };



//Recieve playlist JSHON and transform it to a object
function spotifyPlaylist(playlist) {
    if (typeof playlist === 'string') {
        playlist = JSON.parse(playlist); // transform to object
    }
    console.log(playlist);
    //work from this point on
    // here connect spotify API and use maybe playlist.tracks.foreach(fetch to spotify...);
}



document.addEventListener("submit" , formHandler)