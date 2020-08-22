const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.getElementById('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');


const songs = [
  {
      name: 'jacinto-1',
      displayName: 'Boom',
      artist: 'NoName',
  },
  {
      name: 'jacinto-2',
      displayName: 'Pow',
      artist: 'NoName',
  },
  {
      name: 'jacinto-3',
      displayName: 'Pow-Boom',
      artist: 'NoName',
  },
  {
      name: 'metric-1',
      displayName: 'seven nation',
      artist: 'NoName',
  },
];


let isPlaying = false;


// play a song
function playSong(){
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause')
  music.play();
}
// pause
function pauseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}




playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()) );


// load song
function loadSong(song){
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;

}


// currentSong
let songIndex = 0;

// previous song
function prevSong(){
  songIndex--
  if(songIndex < 0){
    songIndex = songs.length -1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong(){
  songIndex++
  if(songIndex > songs.length -1){
    songIndex = 0
  }
  loadSong(songs[songIndex]);
  playSong();
}

//on load
loadSong(songs[songIndex]);

// update progressbar
function updateProgressBar(e){
  if(isPlaying){
    const{ duration, currentTime } = e.srcElement;
    // console.log(duration);
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // calc display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log('minutes', durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`;
    }
    // console.log('seconds', durationSeconds);

    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}: ${durationSeconds}`;
    }

    // calc display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    // console.log('minutes', currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10){
      currentSeconds = `0${currentSeconds}`;
    }
    // console.log('seconds', currentSeconds);
    if(currentSeconds){
      currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
    }
  }

}

// set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}





// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
