$(document).ready(function() {
  $(window).mousemove(function(e) {
    $(".eye").each(function(i, i2) {
      var mousePosition = {
        'x' : e.clientX,
        'y' : $(window).height() - e.clientY
      };

      var eyePosition = {
        'x' : $(this).data('centerLeft') || $(this).data('centerRight'),
        'y' : $(this).data('centerBottom'),
      }

      if ($(this).data('centerRight'))
        mousePosition.x = $(window).width() - e.clientX;

      var slope = getSlope(eyePosition, mousePosition);
      var toCenterdistance = getDistance(eyePosition, mousePosition);
      var targetDistance = toCenterdistance - ($(this).width() / 2);

      //$("#tmp").html("X: " + mousePosition.x + ", Y: " + mousePosition.y + "<br/>" + toCenterdistance);

      if(toCenterdistance > ($(this).width() / 2)) {
        var x = Math.cos(Math.atan(slope)) * targetDistance;
        if(eyePosition.x >= mousePosition.x) {
          x += mousePosition.x;
        } else if(eyePosition.x < mousePosition.x) {
          x = -x + mousePosition.x;
        }
        var y = Math.sin(Math.atan(slope)) * targetDistance;
        if(eyePosition.x >= mousePosition.x) {
          y = y + mousePosition.y;
        } else if(eyePosition.x < mousePosition.x) {
          y = -y + mousePosition.y;
        }
      } else {
        x = mousePosition.x;
        y = mousePosition.y;
      }
      
      if ($(this).data('centerRight')) {
        $(this).css({
          'right' : x + 'px',
          'bottom' : y + 'px',
        });
      } else {
        $(this).css({
          'left' : x + 'px',
          'bottom' : y + 'px',
        });
      }
    });
  })
});

function getSlope(loc1, loc2) {
  return (loc1.y - loc2.y) / (loc1.x - loc2.x);
}
function getDistance(loc1, loc2) {
  return Math.sqrt(Math.pow((loc1.x - loc2.x), 2) + Math.pow((loc1.y - loc2.y), 2));
}