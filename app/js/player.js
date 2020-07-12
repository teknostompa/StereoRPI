function playMusic(){
  api.play()
  .then(function(data) {
    setAlbumCover();
    document.getSelection(".playPause i").anchorNode.className = "fas fa-pause";
    document.getElementsByClassName("playPause")[0].removeEventListener("click",playMusic);
    document.getElementsByClassName("playPause")[0].addEventListener("click",pauseMusic);
  }, function(err) {
    console.error(err);
  });
}

function pauseMusic(){
  api.pause()
  .then(function(data) {
    setAlbumCover(false);
    document.getSelection(".playPause i").anchorNode.className = "fas fa-play";
    document.getElementsByClassName("playPause")[0].removeEventListener("click",pauseMusic);
    document.getElementsByClassName("playPause")[0].addEventListener("click",playMusic);
  }, function(err) {
    console.error(err);
  });
}

function prevSong(){
    api.skipToPrevious()
    .then(function(data) {
        setTimeout(function(){
        setAlbumCover();
        },1000)
    }, function(err) {
        console.error(err);
    });
}

function skipSong(){
    api.skipToNext()
    .then(function(data) {
        setTimeout(function(){
        setAlbumCover();
        },10)
        setTimeout(function(){
          setAlbumCover();
          },1000)
    }, function(err) {
        console.error(err);
    });
}

window.addEventListener('load', function(){
    document.getElementsByClassName("playPause")[0].addEventListener("click",pauseMusic);
})

