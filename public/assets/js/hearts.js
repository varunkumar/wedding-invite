function Hearts(_pageContainer,_heartsContainer,direction) {
  // Modified version of git@github.com:dmolsen/CSS3-Snowflakes.git
  this.heartId = 1;
  this.sizes = new Array('', 'heart-small', 'heart-medium', 'heart-large');
  this.speeds = new Array('', 'heart-speed-slow', 'heart-speed-medium', 'heart-speed-fast');
  this.opacities = new Array('', 'heart-faint', 'heart-light', 'heart-dark');
  this.delays = new Array('', 'heart-delay-1', 'heart-delay-2', 'heart-delay-3', 'heart-delay-4', 'heart-delay-5', 'heart-delay-6');
  this.pageContainer = document.getElementById(_pageContainer);
  this.heartsContainer = document.getElementById(_heartsContainer);
  this.direction = direction;
}

/* simple random number generator */
Hearts.prototype.randomFromTo = function(from,to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

/* finds the keyframe we want to update */
/* from: http://blog.joelambert.co.uk/2011/09/07/accessing-modifying-css3-animations-with-javascript/*/
Hearts.prototype.findKeyframeAnimation = function(a) {
  var ss = document.styleSheets;
    for (var i = ss.length - 1; i >= 0; i--) {
        try {
            var s = ss[i],
                rs = s.cssRules ? s.cssRules : 
                     s.rules ? s.rules : 
                     [];

            for (var j = rs.length - 1; j >= 0; j--) {
                if ((rs[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE || rs[j].type === window.CSSRule.MOZ_KEYFRAMES_RULE || rs[j].type === window.CSSRule.KEYFRAMES_RULE) && rs[j].name == a){
                    return rs[j];
                }
            }
        }
        catch(e) { /* Trying to interrogate a stylesheet from another domain will throw a security error */ }
    }
    return null;
};

Hearts.prototype.updateKeyframeHeight = function() {
  var keyframes;
  if (keyframes = this.findKeyframeAnimation("falling-" + this.direction)) {
    var height = this.pageContainer.offsetHeight;
    var width = this.pageContainer.offsetWidth;
    if ((window.innerHeight) > height) {
      height = window.innerHeight;
    }
    if ((window.innerWidth) > width) {
      width = window.innerWidth;
    }

    /*var framePosition = "0%";
    if (this.direction == "left")
      framePosition = "100%";

    var newRule = "";
    if (keyframes.cssText.match(new RegExp('webkit'))) {
      if (this.direction == "left")
        newRule = "100% { -webkit-transform: translate3d("+width+"px,0px,0) rotate(360deg);}";
      else
        newRule = "0% { -webkit-transform: translate3d("+width+"px,0px,0) rotate(360deg); bottom: 224px;}";
    } else if (keyframes.cssText.match(new RegExp('moz'))) {
      if (this.direction == "left")
        newRule = "100% { -moz-transform: translate3d("+width+"px,0px,0) rotate(360deg);}";
      else
        newRule = "0% { -moz-transform: translate3d("+width+"px,0px,0) rotate(360deg); bottom: 224px;}";
    }
    keyframes.insertRule(newRule);*/

    for(var i = 0; i < keyframes.cssRules.length; i++) {
      var rule = keyframes.cssRules[i];
      if (this.direction == "left") {
        if (rule.keyText == "100%") {
          rule.style.MozTransform = "translate3d("+width+"px,0px,0) rotate(360deg)";
          rule.style.WebkitTransform = "translate3d("+width+"px,0px,0) rotate(360deg)";
          rule.style.transform = "translate3d("+width+"px,0px,0) rotate(360deg)";
          break;
        }
      } else {
        if (rule.keyText == "0%") {
          rule.style.MozTransform = "translate3d("+width+"px,0px,0) rotate(360deg)";
          rule.style.WebkitTransform = "translate3d("+width+"px,0px,0) rotate(360deg)";
          rule.style.transform = "translate3d("+width+"px,0px,0) rotate(360deg)";
          rule.style.bottom = "224px";
          break;
        }
      }
    }
  }
}

Hearts.prototype.create = Hearts.prototype.moreHearts = function(heartsCount) {
  var i = 0;
  this.updateKeyframeHeight();
  var height = this.pageContainer.offsetHeight;
  if ((window.innerHeight) > height) {
    height = window.innerHeight;
  }
  while (i < heartsCount) {
    var heart = document.createElement('div');
    var size = this.sizes[this.randomFromTo(0, this.sizes.length-1)];
    var speed = this.speeds[this.randomFromTo(0, this.speeds.length-1)];
    var opacity = this.opacities[this.randomFromTo(0, this.opacities.length-1)];
    var delay = this.delays[this.randomFromTo(0, this.delays.length-1)];
    heart.innerHTML = "♥";
    heart.setAttribute('id', 'heartId' + this.heartId);
    heart.setAttribute('class', 'heart-' + this.direction + ' ' + size + ' ' + speed + ' ' + opacity + ' ' + delay);
    heart.setAttribute('style','bottom: ' + this.randomFromTo(0, height) + 'px;');
    this.heartsContainer.appendChild(heart);
    i++;
    this.heartId++;
  }
};

Hearts.prototype.lessHearts = function(heartsCount) {
  if (this.heartsContainer.childNodes.length > heartsCount) {
    var heartsRemoveCount = 0;
    while (heartsRemoveCount < heartsCount) {
      this.heartsContainer.removeChild(this.heartsContainer.lastChild);
      heartsRemoveCount++;
    }
  }
}
