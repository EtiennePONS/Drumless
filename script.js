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
    music: "Audio/Billy_Idol_Eyes_Without_a_Face(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e3/9d_e1482d_lg130.jpg",
    name: "In The Army Now",
    artist: "Status Quo",
    music: "Audio/Status_Quo_In_The_Army_Now(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/76/a8_2afa74_lg130.jpg",
    name: "Don't You",
    artist: "Simple Minds",
    music:
      "Audio/Simple_Minds_Don_t_You_(Forget_About_Me)(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e5/b9_2788f8_lg130.jpg",
    name: "Jesus He Knows Me",
    artist: "Genesis",
    music: "Audio/Genesis_Jesus_He_Knows_Me(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/fd/d9/c8_cef4e6_lg130.jpg",
    name: "Eye of the Tiger",
    artist: "Survivor",
    music: "Audio/Survivor_Eye_of_the_Tiger(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/16_9693e4_lg130.jpg",
    name: "Vertigo",
    artist: "U2",
    music: "Audio/U2_Vertigo(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/c5_4d8cc9_lg130.jpg",
    name: "New Year's Day",
    artist: "U2",
    music: "Audio/U2_New_Year_s_Day(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/c5_4d8cc9_lg130.jpg",
    name: "Personal Jesus",
    artist: "Depeche Mode",
    music: "Audio/Depeche_Mode_Personal_Jesus(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/86/d9_bb5e6a_lg130.jpg",
    name: "In the Air Tonight",
    artist: "Phil Collins",
    music: "Audio/Phil_Collins_In_the_Air_Tonight(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/7e_e82970_lg130.jpg",
    name: "Urgent",
    artist: "Foreigner",
    music: "Audio/Foreigner_Urgent(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d3/fd_61a2aa_lg130.jpg",
    name: "A Forest",
    artist: "The Cure",
    music: "Audio/The_Cure_A_Forest(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d1/ee_cd8b8f_lg130.jpg",
    name: "Just What I Needed",
    artist: "The Cars",
    music: "Audio/The_Cars_Just_What_I_Needed(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/df/bf_d76af0_lg130.jpg",
    name: "Need You Tonight",
    artist: "INXS",
    music: "Audio/INXS_Need_You_Tonight(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/7c/ae_5c07b0_lg130.jpg",
    name: "Mama",
    artist: "Genesis",
    music: "Audio/Genesis_Mama(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/3f_68176c_lg130.jpg",
    name: "I Was Made 4 Lovin'U",
    artist: "Kiss",
    music: "Audio/Kiss_I_Was_Made_For_Lovin_You(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/88/e5_3c5a48_lg130.jpg",
    name: "Dancing in the Dark",
    artist: "Bruce Springsteen",
    music:
      "Audio/Bruce_Springsteen_Dancing_in_the_Dark(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/b3_b2a662_lg130.jpg",
    name: "Born in the USA",
    artist: "Bruce Springsteen",
    music: "Audio/Bruce_Springsteen_Born_in_the_USA(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/de/89_aef7b3_lg130.jpg",
    name: "It's a Long Way",
    artist: "AC/DC",
    music:
      "Audio/AC_DC_It_s_a_Long_Way_to_the_Top_(If_You_Wanna_Rock_n_Roll)(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/8c/f5/1e_440371_lg130.jpg",
    name: "Born to Be Wild",
    artist: "Steppenwolf",
    music: "Audio/Steppenwolf_Born_to_Be_Wild(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/74/ff_277646_lg130.jpg",
    name: "Gimme All Your Lovin",
    artist: "ZZ Top",
    music: "Audio/ZZ_Top_Gimme_All_Your_Lovin(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/7c/d5_d46276_lg130.jpg",
    name: "Money for Nothing",
    artist: "Dire Straits",
    music:
      "Audio/Dire_Straits_Money_for_Nothing_(single_edit)(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d4/bf_888dc4_lg130.jpg",
    name: "Walking on the Moon",
    artist: "The Police",
    music: "Audio/The_Police_Walking_on_the_Moon(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/df/c8_f3268b_lg130.jpg",
    name: "La Grange",
    artist: "ZZ Top",
    music: "Audio/ZZ_Top_La_Grange(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/a1/da/8c_d1d1c7_lg130.jpg",
    name: "Paranoid",
    artist: "Black Sabbath",
    music: "Audio/Black_Sabbath_Paranoid(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e2/cc_26808c_lg130.jpg",
    name: "Who Can It Be Now",
    artist: "Men at Work",
    music: "Audio/Men_at_Work_Who_Can_It_Be_Now(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d1/56_ad0b6a_lg130.jpg",
    name: "In Between Days",
    artist: "The Cure",
    music: "Audio/The_Cure_In_Between_Days(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e6/be_38eba7_lg130.jpg",
    name: "Talk",
    artist: "Coldplay",
    music: "Audio/Coldplay_Talk(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/76/86_fa76fc_lg130.jpg",
    name: "Lost!",
    artist: "Coldplay",
    music: "Audio/Coldplay_Lost(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d3/b1_fe256c_lg130.jpg",
    name: "Charlie Brown",
    artist: "Coldplay",
    music: "Audio/Coldplay_Charlie_Brown(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/d4_dda8d4_lg130.jpg",
    name: "A Sky Full of Stars",
    artist: "Coldplay",
    music: "Audio/Coldplay_A_Sky_Full_of_Stars(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d4/61_8bfed0_lg130.jpg",
    name: "The Scientist",
    artist: "Coldplay",
    music: "Audio/Coldplay_The_Scientist(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/98/d4_6f8679_lg130.jpg",
    name: "Viva La Vida",
    artist: "Coldplay",
    music: "Audio/Coldplay_Viva_La_Vida(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/42_a3cc9d_lg130.jpg",
    name: "Fix You",
    artist: "Coldplay",
    music: "Audio/Coldplay_Fix_You(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e1/f7_704571_lg130.jpg",
    name: "The Hardest Part",
    artist: "Coldplay",
    music: "Audio/Coldplay_The_Hardest_Part(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/df/8b_142936_lg130.jpg",
    name: "Yellow",
    artist: "Coldplay",
    music: "Audio/Coldplay_Yellow(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/e5/5e/24_3a04e9_lg130.jpg",
    name: "My Universe",
    artist: "Coldplay & BTS",
    music: "Audio/Coldplay_My_Universe(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/fa/b1_89e46e_lg130.jpg",
    name: "God Put a Smile",
    artist: "Coldplay",
    music:
      "Audio/Coldplay_God_Put_a_Smile_Upon_Your_Face(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/de/c3_a94b9e_lg130.jpg",
    name: "In My Place",
    artist: "Coldplay",
    music: "Audio/Coldplay_In_My_Place(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e1/ed_6d80e8_lg130.jpg",
    name: "Paradise",
    artist: "Coldplay",
    music: "Audio/Coldplay_Paradise(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d5/4a_bb0be9_lg130.jpg",
    name: "Speed of Sound",
    artist: "Coldplay",
    music: "Audio/Coldplay_Speed_of_Sound(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/f1/af_810b0b_lg130.jpg",
    name: "Trouble",
    artist: "Coldplay",
    music: "Audio/Coldplay_Trouble(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/e2_b69f94_lg130.jpg",
    name: "Adventure of ...",
    artist: "Coldplay",
    music: "Audio/Coldplay_Adventure_of_a_Lifetime(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e6/5f_e6f34b_lg130.jpg",
    name: "Politik",
    artist: "Coldplay",
    music: "Audio/Coldplay_Politik(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d9/99_c673b4_lg130.jpg",
    name: "Clocks",
    artist: "Coldplay",
    music: "Audio/Coldplay_Clocks(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/64_b8d159_lg130.jpg",
    name: "Every Teardrop Is ...",
    artist: "Coldplay",
    music:
      "Audio/Coldplay_Every_Teardrop_Is_a_Waterfall(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d2/12_58be51_lg130.jpg",
    name: "Magic",
    artist: "Coldplay",
    music: "Audio/Coldplay_Magic(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e0/e2_b69f94_lg130.jpg",
    name: "Hymn for the Weekend",
    artist: "Coldplay",
    music: "Audio/Coldplay_Hymn_for_the_Weekend(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d7/f0_848778_lg130.jpg",
    name: "Higher Power",
    artist: "Coldplay",
    music: "Audio/Coldplay_Higher_Power(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/81/80_3cf2aa_lg130.jpg",
    name: "Arabesque",
    artist: "Coldplay & Stromae",
    music: "Audio/Coldplay_Arabesque(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/ed/c1_7a735f_lg130.jpg",
    name: "Violet Hill",
    artist: "Coldplay",
    music: "Audio/Coldplay_Violet_Hill(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/e1/8f_731c7b_lg130.jpg",
    name: "Machistador",
    artist: "Matthieu Chedid",
    music: "Audio/Matthieu_Chedid_(_M_)_Machistador(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/8b/2c_9ffc5f_lg130.jpg",
    name: "Symph of Destruction",
    artist: "Megadeth",
    music: "Audio/Megadeth_Symphony_of_Destruction(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/91/0a/59_267c89_lg130.jpg",
    name: "I Will Always Love You",
    artist: "Whitney Houston",
    music: "Audio/Bodyguard_I_Will_Always_Love_You(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/fa/46_b269c8_lg130.jpg",
    name: "Do You, Saint-Tropez",
    artist: "Geneviève Grad",
    music:
      "Audio/Genevieve_Grad_Do_You_Do_You_Do_You_Saint_Tropez(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/d8/db_df8be3_lg130.jpg",
    name: "Disco Inferno",
    artist: "The Trammps",
    music: "Audio/The_Trammps_Disco_Inferno(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/8d/ae_a9ecad_lg130.jpg",
    name: "Blood on Dance Floor",
    artist: "Michael Jackson",
    music:
      "Audio/Michael_Jackson_Blood_on_the_Dance_Floor(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/de/6d_68c2cc_lg130.jpg",
    name: "Pretty Young Thing",
    artist: "Michael Jackson",
    music:
      "Audio/Michael_Jackson_P_Y_T_(Pretty_Young_Thing)(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/72/53/27_6a38f1_lg130.jpg",
    name: "Billie Jean",
    artist: "Michael Jackson",
    music: "Audio/Michael_Jackson_Billie_Jean(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/75/14_7e3b3d_lg130.jpg",
    name: "Boogie Wonderland",
    artist: "Earth, Wind & Fire",
    music:
      "Audio/Earth_Wind_&_Fire_Boogie_Wonderland(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/72/53/40_93ce72_lg130.jpg",
    name: "September",
    artist: "Earth, Wind & Fire",
    music: "Audio/Earth_Wind_&_Fire_September(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/98/ce_1bca16_lg130.jpg",
    name: "Bad Girls",
    artist: "Donna Summer",
    music: "Audio/Donna_Summer_Bad_Girls(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/90/0f/cd_908888_lg130.jpg",
    name: "Think",
    artist: "Aretha Franklin",
    music: "Audio/The_Blues_Brothers_Think(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/01/72/52/8f_60dd3f_lg130.jpg",
    name: "Uptown Funk",
    artist: "Bruno Mars",
    music: "Audio/Bruno_Mars_Uptown_Funk(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/de/a9_5ade90_lg130.jpg",
    name: "Blame It on the Boogie",
    artist: "The Jackson 5",
    music:
      "Audio/The_Jackson_5_Blame_It_on_the_Boogie(Playback_Personnalise).mp3",
  },
  {
    src: "https://cdnaws.recis.io/i/img/00/52/85/1e_f4116a_lg130.jpg",
    name: "I Got You (I Feel Good)",
    artist: "James Brown",
    music:
      "Audio/James_Brown_I_Got_You_(I_Feel_Good)(Playback_Personnalise).mp3",
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
