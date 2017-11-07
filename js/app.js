$(document).ready(function(){
  console.log('hi');
  (function(){

    // Router config
    const root = null;
    const hash = '#!'
    const useHash = true;

    // Router init
    const router = new Navigo(root, useHash, hash);

    // Home route definition
    router.on(() => {
      loadPage('#target', '../pages/home/home.html')
      // Start animation for home page
      window.setTimeout(function(){
        sequentiallyToggle(1, 2)
      }, 7000);
    });

    // More route definitions
    router.on({
      '/:folder/:url': function(params){
        console.log('hitting folder route');
        loadPage('#target', `../pages/${params.folder}/${params.url}.html`)
      }
    })

    // Start router
    router.resolve();

  })();

  function loadPage(targetDiv, pageRoute) {
    Promise.all([
      getDimensions(window, 'first'),
      getDimensions('.pageHeader', 'second')
    ]).then(dimensions => {
      let dimensionsObj = transformDimensionsArrayIntoObject(dimensions)
      getTargetDivDimensions(dimensionsObj)
      .then(dimensions => {
        setTargetDivHeight(targetDiv, dimensions.height)
        .then(() => {
          $(targetDiv).empty()
          $(targetDiv).load(pageRoute, () => {
            $('#currentPage').addClass('height100')
          })
        })
      })
    })
  }

  function transformDimensionsArrayIntoObject(dimensions){
    return dimensions.reduce(function(accumulator, current) {
      accumulator[current.position] = current;
      return accumulator;
    }, {});
  }
  function getDimensions(target, positionInEquation) {
    return new Promise((resolve, reject) => {
      let targetName = undefined
      if (target.console) {
        targetName = 'window'
      } else {
        targetName = target
      }
      resolve({
        name: targetName,
        position: positionInEquation,
        height: $(target).height(),
        width: $(target).width()
      })
    })
  }
  function getTargetDivDimensions(dimensionsObject){
    return new Promise((resolve, reject) => {
      let height = dimensionsObject['first'].height - dimensionsObject['second'].height
      resolve({height: height})
    })
  }

  function setTargetDivHeight(targetDiv, height){
    return new Promise((resolve, reject) => {
      $(targetDiv).height(height)
      resolve()
    })
  }

  function sequentiallyToggle(current, next){
    const numImages = 4
    let currentImageIndex = undefined
    let nextImageIndex = undefined
    let currentPic = '.mover-' + current
    let nextPic = '.mover-' + next
    $(currentPic).toggleClass('onTop')
    $(currentPic).toggleClass('hidden')
    $(nextPic).toggleClass('onTop')
    $(nextPic).toggleClass('hidden')
    window.setTimeout(function() {
      if (next < numImages) {
        currentImageIndex = next
        nextImageIndex = next + 1
      } else {
        currentImageIndex = numImages
        nextImageIndex = 1
      }
      sequentiallyToggle(currentImageIndex, nextImageIndex)
    }, 7000)
  }

})
