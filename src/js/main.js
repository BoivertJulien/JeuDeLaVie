window.onload = init;

let canvas, context, matrix;
var fps = 4;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
/*
    FONCTION D'INITIALISATION
*/

function init() {
    canvas = document.querySelector("#myCanvas");
    context = canvas.getContext("2d");
    matrix = new Matrice();

    defineGameListeners();
    resizeCanvas();

    requestAnimationFrame(animation);
}

/*
    FONCTION ANIMATION
*/

function animation() {
    now = Date.now();
    delta = now - then;     
    if (delta > interval) {
        then = now - (delta % interval);
        //clearCanvas();
        matrix.draw(context);
        matrix.update();
    }
    requestAnimationFrame(animation);
}


/*
    FONCTION NETTOIE ECRAN
*/

function clearCanvas() {
    context.save();
    
    context.fillStyle = 'rgba(r,g,b,a)';
    context.fillRect(0,0,canvas.width,canvas.height);

    context.restore();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
