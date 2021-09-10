function sequentiallyToggle(current, next) {
    const numImages = 3;
    
    let currentImageIndex = undefined;
    let nextImageIndex = undefined;
    let previousPic = undefined;
    let currentPic = undefined;
    let nextPic = undefined;
  
    if (current > 1) {
      previousPic = ".image-" + (current - 1);
      currentPic = ".image-" + current;
      nextPic = ".image-" + next;
      $(previousPic).toggleClass("onTop");
      $(previousPic).toggleClass("hidden");
    }
    
    if (current === 1) {
      previousPic = ".image-" + numImages;
      currentPic = ".image-" + current;
      nextPic = ".image-" + next;
      $(previousPic).toggleClass("onTop");
      $(previousPic).toggleClass("hidden");
    } else {
      currentPic = ".image-" + current;
      nextPic = ".image-" + next;
    }
  
    $(currentPic).toggleClass("onTop");
    $(currentPic).toggleClass("moveSlideshow_class_1");
    $(currentPic).toggleClass("moveSlideshow_class_2");
    $(currentPic).toggleClass("hidden");
  
    imgTimer = window.setTimeout(function () {
      if (next < numImages) {
        currentImageIndex = next;
        nextImageIndex = next + 1;
      } else {
        currentImageIndex = numImages;
        nextImageIndex = 1;
      }
      sequentiallyToggle(currentImageIndex, nextImageIndex);
    }, 16000);
  }