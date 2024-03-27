// Array to store all songs
let songs = [
  { id: 1, name: 'Shape of You', artist: 'Ed Sheeran', img: 'images/shape_of_you.jpg', genre: 'Pop', source: 'songs/shape_of_you.mp3' },
  { id: 2, name: 'Blinding Lights', artist: 'The Weeknd', img: 'images/blinding_lights.jpg', genre: 'Pop', source: 'songs/blinding_lights.mp3' },
  { id: 3, name: 'Dance Monkey', artist: 'Tones and I', img: 'images/dance_monkey.jpg', genre: 'Pop', source: 'songs/dance_monkey.mp3' },
  { id: 4, name: 'Don\'t Stop Believin\'', artist: 'Journey', img: 'images/dont_stop_believin.jpg', genre: 'Rock', source: 'songs/dont_stop_believing.mp3' },
  { id: 5, name: 'Bohemian Rhapsody', artist: 'Queen', img: 'images/bohemian_rhapsody.jpg', genre: 'Rock', source: 'songs/bohemian_rhapsody.mp3' },
  { id: 6, name: 'Hotel California', artist: 'Eagles', img: 'images/hotel_california.jpg', genre: 'Rock', source: 'songs/hotel_california.mp3' },
  { id: 7, name: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee', img: 'images/despacito.jpg', genre: 'Latin', source: 'songs/despacito.mp3' },
  { id: 8, name: 'Bailando', artist: 'Enrique Iglesias ft. Sean Paul', img: 'images/bailando.jpg', genre: 'Latin', source: 'songs/bailando.mp3' },
  { id: 9, name: 'La La La', artist: 'Shakira', img: 'images/la_la_la.jpg', genre: 'Latin', source: 'songs/la_la_la.mp3' },
  { id: 10, name: 'Champion', artist: 'Dj Bravo', img: 'images/champion.jpg', genre: 'Pop', source: 'songs/champion_dj_bravo.mp3' },
  { id: 11, name: 'Hysteria', artist: 'Def Leppard', img: 'images/hysteria_def.jpg', genre: 'Rock', source: 'songs/def_leppard_hysteria.mp3' },
];

const playLists = new Map();

let currentSongId = 1;

let currentPlayList = "";

showSongs('All');

const genre = document.querySelector('.genreOptions');
genre.addEventListener('change', function(){
  showSongs(this.value);
})

const songList = document.querySelector('.song-list');
songList.addEventListener('click', (event) => {
  currentSongId = event.target.value;
  renderCurrentSong(event.target.value);
});

renderCurrentSong(1);


showAllPlayLists();
createPlayListEvent();

//event listener for playlists

// Function to toggle theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  const container = document.querySelector('.container');

  console.log(container.style.backgroundColor);

  if('lightgray' === container.style.backgroundColor) {
    container.style.backgroundColor = 'white'; 
  }
  else {
    container.style.backgroundColor = 'lightgray';
  }

  const divsInContainer = document.querySelectorAll('.container > div');
  divsInContainer.forEach(div => {

      if(div.className === 'playlist') {
        if(div.style.backgroundColor === 'lightgray') {
          div.style.backgroundColor = 'white';
        }
        else {
          div.style.backgroundColor = 'lightGray';
        }
      }
      else if(div.style.backgroundColor === 'gray') {
        div.style.backgroundColor = '#67B7D1';
        if(div.className === 'playlist') {
          div.style.backgroundColor = 'white';
        }
      }
      else {
        div.style.backgroundColor = 'gray';
      }

      const buttons = document.querySelectorAll('button');

      buttons.forEach(button => {
          if (button.style.backgroundColor === 'darkgray') {
            button.style.backgroundColor = '#338BA8';
          } else {
            button.style.backgroundColor = 'darkgray';
          }
      });

      const genre = document.querySelector('.genreOptions');
      if (genre.style.backgroundColor === 'darkgray') {
        genre.style.backgroundColor = '#338BA8';
      } else {
        genre.style.backgroundColor = 'darkgray';
      }

  });

  const playListDiv = document.querySelector('#playlist-div');

  if(playListDiv.style.backgroundColor == 'gray') {
    playListDiv.style.backgroundColor = '#67B7D1';
  }
  else {
    playListDiv.style.backgroundColor = 'gray';
  }
}

// Function to render all songs based on selected genre
function showSongs(genre) {

  const songList = document.querySelector('.song-list');
  songList.innerHTML = '';

  songs.forEach((song) => {
    if(genre === 'All' || song.genre === genre) {
      const songItem = document.createElement('button');
      songItem.textContent = song.name;
      songItem.value = song.id;
      songItem.classList.add("song-button");
      songItem.style.display = 'block';
      songItem.style.width = '200px';
      songItem.style.height = '40px';
      songItem.style.marginBottom = '5px';
      songItem.style.marginRight = '35px';
      songItem.style.textAlign = 'center';
      songItem.style.backgroundColor = '#338BA8';
      songList.appendChild(songItem);
    }
  })
}

// Function to render the currently playing song in the song card
function renderCurrentSong(songId) {
  // Render current song in the song card
  const songObject = findById(songId);
  
  const songCard = document.querySelector('.song-card');
  songCard.innerHTML = '';

  const songImg = document.createElement('img');
  songImg.src = songObject.img;
  songImg.style.width = '80%'; // Adjust the width as needed
  songImg.style.height = 'auto'; 
  songImg.style.alignItems = 'center';
  songImg.style.marginTop = '20px';
  songImg.style.borderRadius = '10px';

  songCard.appendChild(songImg);

  const songName = document.createElement('h2');
  songName.className = 'songClass';
  songName.textContent = songObject.name;

  const artist = document.createElement('h3');
  artist.className = 'songArtist';
  artist.textContent = songObject.artist;

  songCard.appendChild(songName);
  songCard.appendChild(artist);

  const audio = document.createElement('audio');
  audio.src = songObject.source;
  audio.className = 'audio-class';
  audio.controls = true;

  songCard.appendChild(audio);

  const prevButton = document.createElement('button');
  prevButton.className = 'prev-button';
  prevButton.textContent = '◀️';
  prevButton.style.marginTop = '20px';
  prevButton.addEventListener('click', playPreviousSong);

  const nextButton = document.createElement('button');
  nextButton.className = 'next-button';
  nextButton.textContent = '▶️';
  nextButton.addEventListener('click', playNextSong);
  nextButton.style.marginTop = '20px';
  nextButton.style.marginLeft = '50px';

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'next-prev-button';
  buttonDiv.style.display = 'flex';

  buttonDiv.appendChild(prevButton);
  buttonDiv.appendChild(nextButton);

  songCard.appendChild(buttonDiv);

  const playListButton = document.createElement('button');
  playListButton.className = 'playlist-button';
  playListButton.textContent = 'Add To PlayList';
  playListButton.style.backgroundColor = '#338BA8';
  playListButton.style.marginTop = '20px';

  const isDarkModeActive = document.body.classList.contains('dark-mode');
  if(isDarkModeActive) {
    playListButton.style.backgroundColor = 'darkgray';
  }

  songCard.appendChild(playListButton);

  createPlaylistButton();

  audio.play();
}

// Function to add a song to a playlist
function addToPlaylist() {
  // Add song to playlist logic
  const playListSongs = playLists.get(currentPlayList);

  if(playListSongs) {
    const index = playListSongs.findIndex((id) => id == currentSongId);
    
    if(index == -1) {
      playListSongs.push(currentSongId);
    }

    showAllPlayLists()
  }
}

// Function to create a new playlist
function createPlaylist(name) {
  // Create new playlist logic
  if(playLists.has(name)) {
    alert("This playlist already exist! please create a new one.");
  }
  else {
    playLists.set(name, []);
    console.log("added element: " + playLists.get(name));
  }
}

function showAllPlayLists() {

  const isDarkModeActive = document.body.classList.contains('dark-mode');

  const playlistDiv = document.querySelector('#playlist-div');

  playlistDiv.innerHTML = '';

  //current playlist
  const currentPayListDiv = document.createElement('div');
  currentPayListDiv.className = 'current-playlist-div';
  currentPayListDiv.style.display = 'flex';
  currentPayListDiv.style.flexDirection = 'column';
  currentPayListDiv.style.marginTop = '20px';

  const currentPlaylistTitle = document.createElement('h2');
  currentPlaylistTitle.className = "current-playlist-titiel";
  currentPlaylistTitle.textContent = "Current Playlist";
  currentPlaylistTitle.style.textAlign = 'center';
  currentPayListDiv.appendChild(currentPlaylistTitle);

  const currentSongList = document.createElement('ul');
  currentSongList.className = 'current-playlist-ul';

  const songIds = playLists.get(currentPlayList);

  if(songIds) {
    songIds.forEach((id) => {

      const song = findById(id);

      const songItem = document.createElement('button');
      songItem.textContent = song.name;
      songItem.value = song.id;
      songItem.classList.add("playlist-song");
      songItem.style.display = 'block';
      songItem.style.width = '200px';
      songItem.style.height = '40px';
      songItem.style.marginBottom = '5px';
      songItem.style.marginRight = '25px';
      songItem.style.textAlign = 'center';
      songItem.style.backgroundColor = '#338BA8';

      if(isDarkModeActive) {
        songItem.style.backgroundColor = 'darkgray';
      }
      
      // Add event listener to each button
      songItem.addEventListener('click', function() {
        currentSongId = song.id;
        renderCurrentSong(song.id);
      });
      
      currentSongList.appendChild(songItem);
      console.log(playlistDiv);
    });

    currentPayListDiv.appendChild(currentSongList);
  }

  playlistDiv.appendChild(currentPayListDiv);

  //All PlayLists
  const allPlaylists = document.createElement('div');
  allPlaylists.className = 'allPlaylists';
  allPlaylists.style.display = 'flex';
  allPlaylists.style.flexDirection = 'column';
  allPlaylists.style.marginTop = '20px';

  const playlistTitle = document.createElement('h2');
  playlistTitle.className = "platlist-title";
  playlistTitle.textContent = "All Playlists";
  playlistTitle.style.textAlign = 'center';
  allPlaylists.appendChild(playlistTitle);

  const htmlList = document.createElement('ul');
  htmlList.className = "playlist-ul";

  playLists.forEach(function(value, key){
    const showPlayList = document.createElement('button');
    showPlayList.textContent = key;
    showPlayList.classList.add("new-playlist");
    showPlayList.style.display = 'block';
    showPlayList.style.width = '200px';
    showPlayList.style.height = '40px';
    showPlayList.style.marginRight = '25px';
    showPlayList.style.marginBottom = '5px';
    showPlayList.style.marginTop = '5px';
    showPlayList.style.textAlign = 'center';
    showPlayList.style.backgroundColor = '#338BA8';

    if(isDarkModeActive) {
      showPlayList.style.backgroundColor = 'darkgray';
    }

      // Add event listener to each button
      showPlayList.addEventListener('click', function() {
        console.log("Button clicked:", key);
        currentPlayList = key;
        showAllPlayLists();
      });

    htmlList.appendChild(showPlayList);
  });

  allPlaylists.appendChild(htmlList);
  playlistDiv.appendChild(allPlaylists);
}

// Function to handle play next song
function playNextSong() {
  // Play next song logic
  if(currentPlayList.length > 0) {
    const getPlayList = playLists.get(currentPlayList);
    const index = getPlayList.findIndex((ind) => ind == currentSongId);
    console.log(index);
    if(index+1 < getPlayList.length) {
      currentSongId = getPlayList[index+1];
      renderCurrentSong(getPlayList[index+1]);
    }
  }
  else {
    if(currentSongId+1 <= songs.length) {
      currentSongId = currentSongId+1;
      renderCurrentSong(currentSongId);
    }
  }
}

// Function to handle play previous song
function playPreviousSong() {
  // Play previous song logic
  if(currentPlayList.length > 0) {
    const getPlayList = playLists.get(currentPlayList);
    const index = getPlayList.findIndex((ind) => ind == currentSongId);
    console.log(index);
    if(index-1 >= 0) {
      currentSongId = getPlayList[index-1];
      renderCurrentSong(getPlayList[index-1]);
    }
  }
  else {
    if(currentSongId - 1 > 0) {
      currentSongId = currentSongId - 1;
      renderCurrentSong(currentSongId);
    }
  }
}

function findById(id) {
  return songs.find(song => song.id == id);
}

function createPlaylistButton() {
  const playListButton = document.querySelector('.playlist-button');
  playListButton.addEventListener('click', addToPlaylist);
}

function createPlayListEvent() {
  const playListButton = document.querySelector('#playlist-button');
  const playListInput = document.querySelector('#playlistInput');
  
  playListButton.addEventListener('click', function() {
    if(playListInput.value.trim() !== '') {
      createPlaylist(playListInput.value);
      playListInput.value = '';
      showAllPlayLists();
    }
    else {
      alert("empty playlist!");
    }
  });
}

// Additional functions (search functionality, etc.) can be added as needed
