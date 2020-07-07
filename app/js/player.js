function playMusic(){
  s.play()
  .then(function(data) {
    setAlbumCover();
    console.log(data);
    document.getSelection(".playPause i").anchorNode.className = "fas fa-pause";
    document.getElementsByClassName("playPause")[0].removeEventListener("click",playMusic);
    document.getElementsByClassName("playPause")[0].addEventListener("click",pauseMusic);
  }, function(err) {
    console.error(err);
  });
}

function pauseMusic(){
  s.pause()
  .then(function(data) {
    setAlbumCover();
    console.log(data);
    document.getSelection(".playPause i").anchorNode.className = "fas fa-play";
    document.getElementsByClassName("playPause")[0].removeEventListener("click",pauseMusic);
    document.getElementsByClassName("playPause")[0].addEventListener("click",playMusic);
  }, function(err) {
    console.error(err);
  });
}

function prevSong(){
    s.skipToPrevious()
    .then(function(data) {
        setTimeout(function(){
        setAlbumCover();
        },1000)
    }, function(err) {
        console.error(err);
    });
}

function skipSong(){
    s.skipToNext()
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
    console.log(document.getSelection(".playPause").anchorNode)
    document.getElementsByClassName("playPause")[0].addEventListener("click",pauseMusic);
})

