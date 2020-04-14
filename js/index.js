const startButton = document.getElementById('btn-start');
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');

class Game{
    constructor(){
        this.initialize()
    }

    initialize(){
        startButton.style.display = 'none';
    }
}

function startGame(){
    var game = new Game()
}