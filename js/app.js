$(document).ready(function(){
  // github pages path:
  // const pageDomain = 'https://andyfry01.github.io/HBC-SLBA/'
  // live site:
  const pageDomain = 'https://hbc-slba.com'
  // local:
  // const pageDomain = '../'

  let imgTimer = undefined;

  (function(){

    // Router config
    const root = null;
    const hash = '#!'
    const useHash = true;

    // Router init
    const router = new Navigo(root, useHash, hash);

    // Home route definition
    router.on(() => {
      loadPage('#target', `${pageDomain}/pages/home/home.html`)
      // only start animations for desktop
      if ( $(window).width() > 768 ) {
        // clear any remaining timers from previous page loads
        window.clearTimeout(imgTimer)
        // Start animation for home page
        sequentiallyToggle(1, 2)
      }
    });

    // More route definitions
    router.on({
      '/:folder/:file': function(params){
        if (params.folder === 'what_we_do' && params.file === 'comprehensive_reviews') {
          loadPage('#target', `${pageDomain}/pages/${params.folder}/${params.file}.html`, () => {
            // initialize JS chart for desktop
            if ($(window).width() > 768) {
              buildChart()
              return true
            } else {
              // load chart PNG img for mobile
              $('#mobileChartTarget').prepend(`<img class='img-fluid' src='${pageDomain}/images/etc/mobileChart.png'>`)
              return true
            }
          })
        } else {
          loadPage('#target', `${pageDomain}/pages/${params.folder}/${params.file}.html`)
          return true
        }
      },
      '/etc/404': function(params) {
        loadPage('#target', `../pages/etc/404.html`)
      }
    })

    // Start router
    router.resolve();

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
            $(targetDiv).load(pageRoute, (response, status, xhr) => {
              if (response.slice(0, 13).toLowerCase() !== '<!-- page -->') {
                // router.navigate(`${pageDomain}/pages/etc/404.html`)
                router.navigate(`/etc/404`)
              }
              if (pageRoute === `${pageDomain}/pages/home/home.html`) {
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
        // set minimum target div height for desktop browser windows with a window height lower than 510px
        if (height < 510 && $(window).width() >= 768) {
          $(targetDiv).height(510)
        } else {
          $(targetDiv).height(height)
        }
        resolve()
      })
    }

    function sequentiallyToggle(current, next){
      // numImages variable declaration located in images folder
      let currentImageIndex = undefined
      let nextImageIndex = undefined
      let previousPic = undefined
      let currentPic = undefined
      let nextPic = undefined
      if (current > 1) {
        previousPic = '.image-' + (current - 1)
        currentPic = '.image-' + current
        nextPic = '.image-' + next
        $(previousPic).toggleClass('onTop')
        $(previousPic).toggleClass('hidden')
      } if (current === 1) {
        previousPic = '.image-' + numImages
        currentPic = '.image-' + current
        nextPic = '.image-' + next
        $(previousPic).toggleClass('onTop')
        $(previousPic).toggleClass('hidden')
      } else {
        currentPic = '.image-' + current
        nextPic = '.image-' + next
      }
      $(currentPic).toggleClass('onTop')
      $(currentPic).toggleClass('hidden')
      imgTimer = window.setTimeout(function() {
        if (next < numImages) {
          currentImageIndex = next
          nextImageIndex = next + 1
        } else {
          currentImageIndex = numImages
          nextImageIndex = 1
        }
        sequentiallyToggle(currentImageIndex, nextImageIndex)
      }, 16000)
    }
  })();


})
