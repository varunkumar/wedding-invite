var heartsLeft, heartsRight;

$(document).ready(function() {
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

  // form submit
  $("#ss-submit").on("click", function(e) {
    //validate form
    var name = $("#txtName").val();
    if (name.trim().length == 0) {
      $("#txtName").attr("title", "Fill in your name before submitting the form").addClass('error');
      return false;
    } else {
      $("#txtName").attr("title", "").removeClass('error');
    }

    var mail = $("#txtMail").val();
    if (mail.trim().length > 0 && !isEmail(mail.trim())) {
      $("#txtMail").attr("title", "Invalid email address").addClass('error');
      return false;
    } else {
      $("#txtMail").attr("title", "").removeClass('error');
    }

    $('#ss-form').submit();
    return false;
  });

  // Responsive JS
  if ($(window).width() > 800) {
    heartsLeft = new Hearts('container', 'hearts-container-left', 'left');
    heartsLeft.create(40);

    heartsRight = new Hearts('container', 'hearts-container-right', 'right');
    heartsRight.create(40);

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
  } else {
    $('.extra').remove();
  }
});

function showErrorMessage(msg) {
  alert(msg);
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}