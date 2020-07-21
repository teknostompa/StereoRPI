const SpotifyWebApi = require('spotify-web-api-node')
const api = new SpotifyWebApi()
var auth = require('spotify-personal-auth')
var enabled = false;
var intervalID;
var playtime;
var songtime;

setApiKeys();

function setAlbumCover(setprogress){
  api.getMyCurrentPlaybackState().then(function(data1) {
    var data = data1.body;
    console.log(data);
    document.getElementsByClassName('albumArt')[0].style.backgroundImage = "url(" + data.item.album.images[0].url + ")"
    document.getElementsByClassName('songInfo')[0].innerHTML = data.item.name + "<br>" + data.item.artists[0].name;
    playtime = data.progress_ms;
    songtime = data.item.duration_ms;
    clearInterval(intervalID);
    if(data.is_playing==true){
      intervalID = setInterval(function(){
        playtime += 1000;
        document.getElementsByClassName("progressBar")[0].style.width = playtime/songtime*100 + "%";
      },1000)
    }
    document.getElementsByClassName("progressBar")[0].style.width = playtime/songtime*100 + "%";      
    setTimeout(function(){
      clearInterval(intervalID);
      setAlbumCover();
    },(data.item.duration_ms - data.progress_ms) + 1000)
    
  }, function(err) {
    console.error(err);
  });
}

function createPlaylistList(){
  // Playlists
  var dailymixes = ['37i9dQZF1E38dQFE3VMK9y'];
  api.getUserPlaylists()
  .then(function(data1) {
    var data = data1.body;
    var playlists = data.items;
    for(var i = 0; i < playlists.length; i++){
      var playlist = document.createElement('div');
      playlist.className = "playlist";
      playlist.id = "a" + i;
      playlist.addEventListener("click",playPlaylist);
      var cover = document.createElement('div');
      cover.className = "image";
      cover.style.backgroundImage = "url(" + playlists[i].images[0].url + ")";
      cover.id = "a" + i;
      playlist.appendChild(cover);

      var title = document.createElement('div');
      title.innerHTML = playlists[i].name;
      title.className = "title"
      title.id = "a" + i;
      playlist.appendChild(title);
      enabled = true;
      document.getElementsByClassName('playlists')[0].appendChild(playlist);
      
    }
  },function(err) {
    console.log('Something went wrong!', err);
  });
  //Queue

}

function playPlaylist(playlist){
  var index = window.event.target.id.split("a")[1];
  if(enabled){
  api.getUserPlaylists()
  .then(function(data1) {
    var data = data1.body;
    api.getPlaylist(data.items[index].id)
    .then(function(data) {
      api.play({
        uris: data['body']['tracks']['items'].map(item => item['track']['uri'])
      })
      setTimeout(function(){
        setAlbumCover();
      },1000)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }, function(err) {
    console.error(err);
  });
  }
}

function setApiKeys(){
  auth.config({
    clientId: '2328048ae2af4a0ba41c6f75f943a1ac',
    clientSecret: '7c78c305e0624c43b1326b3e5aabaee4',
    scope: ['streaming', 'user-library-read', 'user-read-playback-state','user-modify-playback-state', 'user-top-read']
  })
  auth.token().then(([token, refresh]) => {
    api.setAccessToken(token)
    api.setRefreshToken(refresh);
    setAlbumCover()
    createPlaylistList();
    win.setAlwaysOnTop(true,"floating",1);
  })
  setTimeout(function(){
    setApiKeys();
  },3600*1000)
}