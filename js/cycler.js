window.onload= function(){
  (function(){
    window.setTimeout(function(){
      sequentiallyToggle(1, 2)
    }, 7000);
  })();

  const numImages = 3

  function sequentiallyToggle(current, next){
    var currentPic = '.mover-' + current
    var nextPic = '.mover-' + next
    $(currentPic).toggleClass('onTop')
    $(currentPic).toggleClass('hidden')
    $(nextPic).toggleClass('onTop')
    $(nextPic).toggleClass('hidden')
    window.setTimeout(function() {
      if (next < 3) {
        current = next
        var nextPlusOne = next += 1
      } else {
        current = 3
        nextPlusOne = 1
      }
      sequentiallyToggle(current, nextPlusOne)
    }, 7000)
  }
}
