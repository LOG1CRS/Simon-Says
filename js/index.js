const startButton = document.getElementById('btn-start');
const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');

class Game{
    constructor(){
        this.initialize()
        this.generateSequence()
        this.nextLevel()
    }

    initialize(){
        startButton.style.display = 'none';
        this.level = 1;
        this.buttons = {
            green,
            red,
            yellow,
            blue
        }
    }

    generateSequence(){
        this.sequence = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        this.illuminateSequence()
    }

    numToColor(num){
        switch(num){
            case 0:
               return 'green'
            case 1:
                return 'red'
            case 2:
                return 'yellow'
            case 3:
                return 'blue'
            
        }
    }

    illuminateSequence(){
        for(var i = 0; i<this.level; i++){
            const color = this.numToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
    }

    illuminateColor(color){
        this.buttons[color].classList.add('light')
        setTimeout(() => this.TurnOffColor(color), 500)
    }

    TurnOffColor(color){
        this.buttons[color].classList.remove('light')
    }
}

function startGame(){
    window.game = new Game()
}