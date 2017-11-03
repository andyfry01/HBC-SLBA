window.onload = function(){

  (function(){
    const root = null;
    const useHash = false; // Defaults to: false
    const router = new Navigo(root, useHash);
    const numImages = 4

    router.on({
      '*': function () {
        getTargetDivDimensions()
        .then(dimensions => {
          loadPage(dimensions)
          .then(() => {
            $('#target').toggleClass('hidden')
            $('footer').toggleClass('hidden')
          })
        })
      },
      'test2': function () {
        console.log('hello');
      },
    }).resolve();

    $('#who').click(() => { console.log('hello');})
    $('#what').click(() => { console.log('hello');})
    $('#whom').click(() => { console.log('hello');})

    window.setTimeout(function(){
      sequentiallyToggle(1, 2)
    }, 7000);
  })();

  function getTargetDivDimensions(){
    return new Promise((resolve, reject) => {
      let windowHeight = $(window).height()
      let headerHeight = $('.pageHeader').height()
      let targetDivHeight = windowHeight - headerHeight
      let dimensions = {
        height: targetDivHeight
      }
      resolve(dimensions)
    })
  }

  function loadPage(dimensions){
    return new Promise((resolve, reject) => {
      $('#target').height(dimensions.height)
      $('.scrollingImg').height(dimensions.height)
      $('#mainPageContent').appendTo('#target')
      $('#mainPageContent').height(dimensions.height)
      $('#mainPageContent').toggleClass('hidden')
      resolve()
    })
  }

  function sequentiallyToggle(current, next){
    let currentPic = '.mover-' + current
    let nextPic = '.mover-' + next
    $(currentPic).toggleClass('onTop')
    $(currentPic).toggleClass('hidden')
    $(nextPic).toggleClass('onTop')
    $(nextPic).toggleClass('hidden')
    window.setTimeout(function() {
      if (next < numImages) {
        currentImage = next
        let nextImage = next += 1
      } else {
        currentImage = numImages
        nextImage = 1
      }
      sequentiallyToggle(currentImage, nextImage)
    }, 7000)
  }

}
