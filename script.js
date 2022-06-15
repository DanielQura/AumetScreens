const slideshowImages = document.querySelectorAll(".slideshow img");

const nextImageDelay = 8500;
let currentImageCounter = 0; 

slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  slideshowImages[currentImageCounter].style.opacity = 0;

  currentImageCounter = (currentImageCounter+1) % slideshowImages.length;

  slideshowImages[currentImageCounter].style.opacity = 1;
  
}