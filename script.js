// Some variables
var timer;
var sWidth = '100%', sHeight = '100%', border = 0;
var slideshowSet = false;
var video;
var videoSet = false;
var slidePause = false;
var $el;
var $currentEl = $('.slideshow').find('li').eq(0);

// On document ready
$(function() {
    // Set slideshow dimensions + border
    setSlideDimensions(sWidth, sHeight, border);
    
    // Show pause button
    $('.slideshow').hover(
        function(){
            if(slideshowSet) {
                $('.pause').stop().fadeIn(200);
            }
        },
        function() {
            if(slideshowSet) {
                $('.pause').fadeOut(200);
            }
        }
    );
    
    // Pause button
    $('.pause').click(function() {
         if($(this).text() == '| |') {
            // Pause slideshow
            slidePause = true;
            $(this).text('►');
            clearTimeout(timer);
            if($currentEl.find('video').size() == 1){
                video.pause();
            }
        } else {
            // Play slideshow
            $(this).text('| |');
            if($currentEl.find('video').size() == 1){
                video.play();
            } else {
                timer = setTimeout(slide, 2000);
            }
        }
    });
});

// Window ready (all images loaded, but not videos!!)
$(window).ready(function() {
    // Hide loader GIF
    $('.loader').fadeOut(200);
    
    // Show slideshow
    $('.slideshow ul').fadeIn(200);

    // Start slideshow
    $el = $('.slideshow').find('li');
    timer = setTimeout(slide, 2000);
    slideshowSet = true;
});

// Function to slide
function slide() {
    videoSet = false;
    $el = $('.slideshow').find('li');
    $el.eq(1).add($el.eq(0)).animate({'left': '-='+sWidth}, {queue: false, duration: 300, complete: function() {
        $el.eq(0).animate({'left': '100%'}, 0);
        $currentEl = $el.eq(1);
        if($(this).index() == 1){
            $('.slideshow ul').append($el.eq(0));

            // We chek if it's a video
            if($(this).find('video').size() == 1) {
                //If yes we set the variable
                video = $(this).find('video')[0];
                videoSets();
                
                // If video can play
                if (video.canPlayType) {
                     // Play video
                     video.play();
                } else {
                     // Error message
                     alert('No html5');
                }
            } else {
                // If not a video we set timeout to next slide
                timer = setTimeout(slide, 2000);
            }
        }
    }});
 }
 
 // Function to set all video events
 function videoSets(){
     if(!videoSet) {
         videoSet = true;
        // Video ended
        video.addEventListener("ended", function () {
            timer = setTimeout(slide, 2000);
        });
        
        // Video Playing
        video.addEventListener("playing", function () {
            clearTimeout(timer);
            if(slidePause) {
                $('.pause').text('| |');
                video.play();
                slidePause = false;
            }
        });
    }
}

// Function to set slideshow dimensions
function setSlideDimensions(w, h, b) {
    $('.slideshow').css({width: w, 'height': h, 'padding': b});
    $('.slideshow ul li img, .slideshow ul li video').css({width: w, 'height': h});
}