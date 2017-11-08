$(document).ready(function(){
  let imgTimer = undefined;
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
      // clear any remaining timers from previous page loads
      window.clearTimeout(imgTimer)
      // Start animation for home page
      sequentiallyToggle(1, 2)
    });

    // More route definitions
    router.on({
      '/:folder/:file': function(params){
        if (params.folder !== 'sub_categories') {
          loadPage('#target', `../pages/${params.folder}/${params.file}.html`)
          return true
        }
        loadSubCategory('#subcategoryTarget', `../pages/${params.folder}/${params.file}.html`)
        return true
      }
    })

    // Start router
    router.resolve();

    function loadSubCategory(targetDiv, pageRoute) {
      if ($('.homePage').length < 1) {
        loadPage('#target', '../pages/home/home.html', () => {
          loadCategoryPane('#subcategoryTarget', pageRoute)
          return true
        })
      }
      loadCategoryPane('#subcategoryTarget', pageRoute)
      return true
    }

    function loadCategoryPane(targetDiv, pageRoute){
      $(targetDiv).load(pageRoute, () => {
        $('.close').click(() => {
          router.navigate('/')
        })
      })
    }

    function loadPage(targetDiv, pageRoute, next) {
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
              console.log('pageRoute is', pageRoute);
              if (pageRoute === '../pages/home/home.html') {
                $('#currentPage').addClass('height100')
              }
              if (next) {
                next()
              }
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
      imgTimer = window.setTimeout(function() {
        console.log('timeout fired?');
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
  })();


})
