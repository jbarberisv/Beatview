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
getMoodResponse(prompt)

//var apiKey = 'AIzaSyBaNkIGKJkeJ9CFgoMsQ93e7ir3zwSSwqg';
//const query = 'dogs'; // Replace with your search query
//const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(query)}`;

//fetch(apiUrl)
  //.then((response) => response.json())
  //.then((data) => console.log(data))
  //.catch((error) => console.error(error));
   // data.items.forEach((item) => {
    //console.log(item.snippet.title);
  //});
  
  var youtubeApiKey = 'AIzaSyBaNkIGKJkeJ9CFgoMsQ93e7ir3zwSSwqg';
  const query = 'happy music';
  const maxResults = 10;
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&maxResults=${maxResults}&type=video&videoCategoryId=10&key=${youtubeApiKey}`
  const numVideos = 6;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const videos = data.items;
      const randomVideos = [];
      for (let i = 0; i < numVideos; i++) {
      const randomIndex = Math.floor(Math.random() * videos.length);
      const randomVideo = videos[randomIndex];
      randomVideos.push(randomVideo);
      videos.splice(randomIndex, 1);
      }
      //const songArtistArray = [];
      randomVideos.forEach(video => {
      const title = video.snippet.title;
      const separatorIndex = title.indexOf('-');
      if (separatorIndex !== -1){
        const song = title.substring(0, separatorIndex).trim();
        const artist = title.substring(separatorIndex +1).trim();
        //songArtistArray.push(`Song: ${song} | Artist: ${artist}`)
      //videos.forEach(video => {
        //const title = video.snippet.title;
        console.log(`Song: ${song}\nArtist: ${artist}\n`);

      }
      });
      //console.log(songArtistArray);
      })
    .catch(error => console.error(error));
