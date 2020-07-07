var Spotify = require('spotify-web-api-js');
var auth = require('spotify-personal-auth')
auth.config({
  clientId: '2328048ae2af4a0ba41c6f75f943a1ac',
  clientSecret: '7c78c305e0624c43b1326b3e5aabaee4',
  scope: ['streaming', 'user-read-playback-state']
})
var enabled = false;
var s = new Spotify();
//var access_token = 'BQC7OGmaNQLNXfhFzx7otSorpOU3FzJTvZO5gs0_ElMRQ7ws212uBmT98FIBeXLlkOpi8KWUT9LkRCKqWOir_J8YMpugCTyuaj92jaN4RXkHxncfsRXOxSYyEwMeasrnmSC_uF439dzipHzVqvnTGpc7e2j3CKzeEL74Y2TFpXzW'
auth.token().then(([token, refresh]) => {
  s.setAccessToken(token)
  setAlbumCover()
  createPlaylistList();
  win.setAlwaysOnTop(true,"floating",1);
})
//s.setAccessToken(access_token);
function setAlbumCover(){
  s.getMyCurrentPlayingTrack().then(function(data) {
    //console.log("the Data",data);
    setTimeout(function(){
    document.getElementsByClassName('albumArt')[0].style.backgroundImage = "url(" + data.item.album.images[0].url + ")"
    document.getElementsByClassName('songInfo')[0].innerHTML = data.item.name + "<br>" + data.item.artists[0].name;
    },100);
    //console.log(data.item.name + "<br>" + data.item.artists[0].name);
  }, function(err) {
    console.error(err);
  });
}

function createPlaylistList(){
  s.getUserPlaylists().then(function(data) {
    console.log(data.items);
    var playlists = data.items;
    for(var i = 0; i < playlists.length; i++){
      var playlist = document.createElement('div');
      playlist.className = "playlist";

      var cover = document.createElement('div');
      cover.className = "image";
      cover.style.backgroundImage = "url(" + playlists[i].images[0].url + ")";
      playlist.appendChild(cover);

      var title = document.createElement('div');
      title.innerHTML = playlists[i].name;
      title.className = "title"
      playlist.appendChild(title);

      document.getElementsByClassName('playlists')[0].appendChild(playlist);
      
    }
    var elems = document.getElementsByClassName("playlist");
    for(var i = 0; i < elems.length; i++){
      elems[0].addEventListener("click", playPlaylist(i))
    }
    enabled = true;
  }, function(err) {
    console.error(err);
  });
}

function playPlaylist(playlist){
  if(enabled){
    s.getUserPlaylists().then(function(data) {
      console.log(data.items)
      //s.addTracksToQueue()
      s.getPlaylistTracks(data.items[playlist].id).then(function(data) {
        console.log(data);
        //var i = 0; i < data.items.length; i++
        var i = 0
        data.items.forEach((item) =>{
          setTimeout(s.addTracksToQueue("spotify:track:"+item.track.id),100*i)
        i++
        })
        //skipSong();
      }, function(err) {
        console.error(err);
      });
    }, function(err) {
      console.error(err);
    });
  }
}