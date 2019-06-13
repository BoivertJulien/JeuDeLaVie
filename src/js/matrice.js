class Matrice {
    constructor() {
        this.nbCell = 100;
        this.playing = false;
        this.areas = [];
        for(var i=0; i<this.nbCell; i++) {
            this.areas[i] = [];
            for(var j=0; j<this.nbCell; j++) {
                this.areas[i][j] = 0;
            }
        }
        this.future = [];
        for(var i=0; i<this.nbCell; i++) {
            this.future[i] = [];
            for(var j=0; j<this.nbCell; j++) {
                this.future[i][j] = 0;
            }
        }
        this.size = 1;
        this.xRelCentering = 1;
    }

    draw(ctx) {
        ctx.save();
        for(var i=0; i<this.nbCell; i++) {
            for(var j=0; j<this.nbCell; j++) {
                if (this.areas[i][j] === 1){
                    if (getRandomInt(4) !== 0){
                        ctx.fillStyle = 'rgba(3,3,10,1.0)';
                    }else{
                        ctx.fillStyle = 'rgba(20,20,75,1.0)';
                    } 
                    ctx.fillRect(this.xRelCentering+i*this.size,j*this.size,this.size,this.size);
                } else {
                    if (getRandomInt(5) !== 0){
                        ctx.fillStyle = 'rgba(250,250,210,0.95)'; 
                    }else{
                        ctx.fillStyle = 'rgba(255,255,224,0.95)'; 
                    }
                    ctx.fillRect(this.xRelCentering+i*this.size,j*this.size,this.size,this.size);
                }
            }
        }
        ctx.restore();
    }

    update() {
        if (!this.playing) return;
        for(var i=0; i<this.nbCell; i++) {
            for(var j=0; j<this.nbCell; j++) {
                //decouverte des voisins
                var nbVoisin = 0;
                if (i > 0){ //alors on peut regarder a gauche
                    nbVoisin += this.areas[i-1][j];
                }
                if (i < this.nbCell - 1){ //alors on peut regarder a droite
                    nbVoisin += this.areas[i+1][j];
                }
                if (j > 0){
                    nbVoisin += this.areas[i][j-1];
                }
                if (j < this.nbCell - 1){
                    nbVoisin += this.areas[i][j+1];
                }
                if (i > 0 && j > 0){
                    nbVoisin += this.areas[i-1][j-1];
                }
                if (i > 0 && j < this.nbCell - 1){
                    nbVoisin += this.areas[i-1][j+1];
                }
                if (i < this.nbCell - 1 && j > 0){
                    nbVoisin += this.areas[i+1][j-1];
                }
                if (i < this.nbCell - 1 && j < this.nbCell - 1){
                    nbVoisin += this.areas[i+1][j+1];
                }
                // Selection naturelle
                if (this.areas[i][j] === 1){
                    if (nbVoisin === 2 || nbVoisin === 3){
                        this.future[i][j] = 1;
                    } else {
                        this.future[i][j] = 0;
                    }
                } else {
                    if (nbVoisin === 3){
                        this.future[i][j] = 1;
                    }
                }
            }
        }
        this.areas = [...this.future];
        this.future = [];
        for(var i=0; i<this.nbCell; i++) {
            this.future[i] = [];
            for(var j=0; j<this.nbCell; j++) {
                this.future[i][j] = 0;
            }
        }
    }

    clickAt(pos){
        if(this.playing)return;
        var relX = Math.floor(pos.x/this.size);
        var relY = Math.floor(pos.y/this.size);
        if (this.areas[relX][relY] === 0)this.areas[relX][relY]=1;
        else this.areas[relX][relY] = 0;
    }

    screenResize(){ // canvas.height and canvas.width had changed
        if (canvas.width < canvas.height) this.size = canvas.width / this.nbCell;
        else this.size = canvas.height / this.nbCell;
        this.xRelCentering = (canvas.width - (this.nbCell*this.size))/2;
    }
}


