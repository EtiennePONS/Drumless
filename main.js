let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    src: "https://cdnaws.recis.io/i/img/00/52/dc/f3_850447_lg130.jpg",
    name: "Eyes Without a Face",
    artist: "Billy Idol",
    music:
      "assets/Audio/Billy_Idol_Eyes_Without_a_Face(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e3/9d_e1482d_lg130.jpg",
    name: "In The Army Now",
    artist: "Status Quo",
    music: "assets/Audio/Status_Quo_In_The_Army_Now(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/76/a8_2afa74_lg130.jpg",
    name: "Don't You",
    artist: "Simple Minds",
    music:
      "assets/Audio/Simple_Minds_Don_t_You_(Forget_About_Me)(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e5/b9_2788f8_lg130.jpg",
    name: "Jesus He Knows Me",
    artist: "Genesis",
    music: "assets/Audio/Genesis_Jesus_He_Knows_Me(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/fd/d9/c8_cef4e6_lg130.jpg",
    name: "Eye of the Tiger",
    artist: "Survivor",
    music: "assets/Audio/Survivor_Eye_of_the_Tiger(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/16_9693e4_lg130.jpg",
    name: "Vertigo",
    artist: "U2",
    music: "assets/Audio/U2_Vertigo(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/c5_4d8cc9_lg130.jpg",
    name: "New Year's Day",
    artist: "U2",
    music: "assets/Audio/U2_New_Year_s_Day(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/c5_4d8cc9_lg130.jpg",
    name: "Personal Jesus",
    artist: "Depeche Mode",
    music:
      "assets/Audio/Depeche_Mode_Personal_Jesus(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/86/d9_bb5e6a_lg130.jpg",
    name: "In the Air Tonight",
    artist: "Phil Collins",
    music:
      "assets/Audio/Phil_Collins_In_the_Air_Tonight(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/7e_e82970_lg130.jpg",
    name: "Urgent",
    artist: "Foreigner",
    music: "assets/Audio/Foreigner_Urgent(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d3/fd_61a2aa_lg130.jpg",
    name: "A Forest",
    artist: "The Cure",
    music: "assets/Audio/The_Cure_A_Forest(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d1/ee_cd8b8f_lg130.jpg",
    name: "Just What I Needed",
    artist: "The Cars",
    music:
      "assets/Audio/The_Cars_Just_What_I_Needed(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/df/bf_d76af0_lg130.jpg",
    name: "Need You Tonight",
    artist: "INXS",
    music: "assets/Audio/INXS_Need_You_Tonight(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/7c/ae_5c07b0_lg130.jpg",
    name: "Mama",
    artist: "Genesis",
    music: "assets/Audio/Genesis_Mama(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/3f_68176c_lg130.jpg",
    name: "I Was Made 4 Lovin'U",
    artist: "Kiss",
    music:
      "assets/Audio/Kiss_I_Was_Made_For_Lovin_You(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/88/e5_3c5a48_lg130.jpg",
    name: "Dancing in the Dark",
    artist: "Bruce Springsteen",
    music:
      "assets/Audio/Bruce_Springsteen_Dancing_in_the_Dark(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/88/e5_3c5a48_lg130.jpg",
    name: "Born in the USA",
    artist: "Bruce Springsteen",
    music:
      "assets/Audio/Bruce_Springsteen_Born_in_the_USA(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/88/e5_3c5a48_lg130.jpg",
    name: "Born in the USA",
    artist: "Bruce Springsteen",
    music:
      "assets/Audio/Bruce_Springsteen_Born_in_the_USA(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/b3_b2a662_lg130.jpg",
    name: "Born in the USA",
    artist: "Bruce Springsteen",
    music:
      "assets/Audio/Bruce_Springsteen_Born_in_the_USA(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/de/89_aef7b3_lg130.jpg",
    name: "It's a Long Way",
    artist: "AC/DC",
    music:
      "assets/Audio/AC_DC_It_s_a_Long_Way_to_the_Top_(If_You_Wanna_Rock_n_Roll)(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/8c/f5/1e_440371_lg130.jpg",
    name: "Born to Be Wild",
    artist: "Steppenwolf",
    music:
      "assets/Audio/Steppenwolf_Born_to_Be_Wild(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/74/ff_277646_lg130.jpg",
    name: "Gimme All Your Lovin",
    artist: "ZZ Top",
    music:
      "assets/Audio/ZZ_Top_Gimme_All_Your_Lovin(Playback_Personnalise).mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].src + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;

  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;
  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekTo = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekTo;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );

    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
