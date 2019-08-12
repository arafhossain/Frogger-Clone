// Enemies our player must avoid
let wins = 0;
let attempts = 1;
var Enemy = function(x, y, speed) {
    //Unique parameters for enemy entities
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    if(this.x > 505){
        this.x = -110;
    } else {
        this.x += this.speed;
    }
    this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkCollision = function(){
    //Ranges account for length and width of bugs
    if((player.y - this.y < 5 && this.y - player.y < 30) && 
    (this.x - player.x < 50 && player.x - this.x < 55)){
        player.reset();
        //Acknowledges player collision
        document.getElementById('status').innerText = 'Oh no, you got hit!';
        document.getElementById('status').classList.add('hit');
        //Resets status
        setTimeout(function(){
            document.getElementById('status').classList.remove('hit');
            document.getElementById('status').innerText = 'Get to the river!';
        }, 3000)
    }
}


let Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    //Starting Player position
    this.x = 200;
    this.y = 400;
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
    attempts++;
    document.getElementById('Attempts').innerText = attempts;
    //Calculates percentage of wins over attempts
    document.getElementById('winRate').innerText = 'Success rate: ' + wins/(attempts - 1)*100 + '%';
}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(key) {
    if(key === 'left'){
        if(this.x - 50 >= 0){
            this.x -= 50;
        }
    } else if (key === 'right'){
        if(this.x + 50 <= 400){
            this.x += 50;
        }
    } else if (key === 'up'){
        if(this.y <= 50){
            this.win();
        } else if(this.y - 50 >= 0){
            this.y -= 50;
        }
    } else if (key === 'down'){
        if(this.y + 50 <= 400){
            this.y += 50;
        }
    }
}

Player.prototype.win = function(){
        wins++;
        this.reset();
        document.getElementById('Wins').innerText = wins;
        //Acknowledges player win
        document.getElementById('status').innerText = 'Nice job, you made it!';
        document.getElementById('status').classList.add('win');
        //Resets to original status
        setTimeout(function(){
            document.getElementById('status').classList.remove('win');
            document.getElementById('status').innerText = 'Get to the river!';
        }, 3000)
}

// Instantiate Enemies
let firstEnemy = new Enemy(0,50,3);
let secondEnemy = new Enemy(100,220,2);
let thirdEnemy = new Enemy(100, 120, 4)
let fourthEnemy = new Enemy(200,220,3)
let fifthEnemy = new Enemy(250,50,4);
// Place all enemy objects in an array called allEnemies
let allEnemies = [firstEnemy, secondEnemy, thirdEnemy, fourthEnemy, fifthEnemy];
// Create new player
let player = new Player;