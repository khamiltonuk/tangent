document.addEventListener('DOMContentLoaded', function(){


  //add a class called no-js to style page for unobtrusive JavaScript , 
  document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + 'js';

  (function ($) {
    $.fn.readMore = function (options) {
      var readMoreToggle = {
        options: $.extend({
          readMoreLink : $('.read-more'),
          readMoreContainer: $('.read-more-container'),
          hideHeight: 130,
          'duration': 300
        }, options),
        init : function(){
          var initialHeight = this.options.readMoreContainer.height(),
          hiddenHeight = this.options.hideHeight;
          this.options.readMoreContainer.css({
            height: hiddenHeight
          });
          this.options.readMoreLink.on('click', function(e) {
            if ($('.read-more-container').height() > hiddenHeight) {
              readMoreToggle.closeBox();
              e.preventDefault();
            }else{
              readMoreToggle.openBox(initialHeight);
              e.preventDefault();
            }
          });
        },
        closeBox : function(){
          this.options.readMoreContainer.animate({
            height: this.options.hideHeight
          }, this.options.duration);
        },
        openBox : function(initialHeight){
          this.options.readMoreContainer.animate({
            height: initialHeight
          }, this.options.duration);
        }
      };
      return readMoreToggle.init();
    };
  })(jQuery);

  //options can be passed into plugin for customisation
  $('.read-more').readMore({
      hideHeight: 100
  });

  (function ($) {
    $.fn.overlayLightBox = function () {
      var overlayLib = {
        closeOverlay: function (lightbox) {
          lightbox.remove();
        },
        applyOverlay: function ($el) {
          var image = $('<img/>').addClass('lightbox-image').attr('src', $($el).data('image')),
          lightboxContainer = $('<div/>').addClass('lightbox').append(image);
          $('body').append(lightboxContainer);
          elm = $('.lightbox img');
          //this.centerObject(elm);
          this.listenForClickAndPress();
        },
        init : function(){
          this.onLightBoxclick();
        },
        onLightBoxclick : function(){
          $('.lightbox-container').on('click', 'img', function () {
            overlayLib.applyOverlay(this);
          });
        },
        listenForClickAndPress:function(){
          $('.lightbox').on('click', function (e) {
            if (e.target == e.currentTarget){ 
              overlayLib.closeOverlay(this);
              e.preventDefault();
            }
          });
          $('body').on('keyup', function(e) {
            if (e.keyCode == 13 || e.keyCode == 27) {
              overlayLib.closeOverlay($('.lightbox'));
            }
          });
        },
        centerObject: function(r){ //center image incase I dont know it's size
          var w = r.outerWidth(),
            h = r.outerHeight();
            //console.log(h)
          r.css({ 
            'marginLeft': -w/2,
            'marginTop': -h/2 
          });
        }
      };
      return overlayLib.init();
    };
  })(jQuery);

  $('.lightbox-container').overlayLightBox();  
  
});
