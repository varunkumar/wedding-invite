var heartsLeft, heartsRight;

$(document).ready(function() {
  heartsLeft = new Hearts('container', 'hearts-container-left', 'left');
  heartsLeft.create(40);

  heartsRight = new Hearts('container', 'hearts-container-right', 'right');
  heartsRight.create(40);

  // Smooth scrolling
  $('a[href^=#]').on("click", function() {
    var t = $(this.hash);
    var t = t.length && t || $('[name=' + this.hash.slice(1) + ']');
    if (t.length) {
      var tOffset = t.offset().top;
      $('html,body').animate({
        scrollTop: tOffset
      }, 'slow');
      
      /*var hash = this.hash;
      setTimeout(function() {
        window.location.hash = hash;
      }, 2000);*/
      return false;
    }
  });

  // send more hearts on hover
  $('.male-robot').hover(function() {
    heartsLeft.moreHearts(40);
    $('.male-robot-head').addClass('tada');
  }, function() {
    $('.male-robot-head').removeClass('tada');
  });

  $('.female-robot').hover(function() {
    heartsRight.moreHearts(40);
    $('.female-robot-head').addClass('tada');
  }, function() {
    $('.female-robot-head').removeClass('tada');
  })
});