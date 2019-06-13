defineGameListeners = function(){
    window.addEventListener('resize', resizeCanvas, false);
     // Mouse event listeners
    canvas.addEventListener('mousedown', function (event) {
      mousePos = getMousePos(event);
      matrix.clickAt(mousePos);
    }, false);

    document.addEventListener('keyup', function(event){
      if (event.keyCode === 32) matrix.playing = !matrix.playing;
    });
}

function getMousePos(evt) {
  // necessary to take into account CSS boudaries
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left - matrix.xRelCentering,
    y: evt.clientY - rect.top
  };
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight/100*95;
  matrix.screenResize();
}