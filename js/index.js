const startButton = document.getElementById('btn-start');
const scoreaboard = document.getElementById('scoreboard');
const round = document.getElementById('round');
const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const LAST_LEVEL = 12;

class Game{
    constructor(){
        this.initialize()
        this.generateSequence()
        this.nextLevel()
    }

    initialize(){
        this.toggleBtnStart()
        this.level = 1;
        this.buttons = {
            green,
            red,
            yellow,
            blue
        }

        this.chooseColor = this.chooseColor.bind(this)
        round.innerHTML = this.level;
    }

    toggleBtnStart(){
        if(startButton.style.display == 'none'){
            startButton.style.display = 'block'
            scoreaboard.style.opacity = 0
        }else{
            startButton.style.display = 'none'
            scoreaboard.style.opacity = 1
        }
    }

    generateSequence(){
        this.sequence = new Array(12).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        this.sublevel = 0
        this.illuminateSequence()
        this.addClickEvents()
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

    colorToNum(color){
        switch(color){
            case 'green':
               return 0
            case 'red':
                return 1
            case 'yellow':
                return 2
            case 'blue':
                return 3
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
        setTimeout(() => this.turnOffColor(color), 500)
    }

    turnOffColor(color){
        this.buttons[color].classList.remove('light')
    }

    addClickEvents(){
        this.buttons.green.addEventListener('click', this.chooseColor)
        this.buttons.red.addEventListener('click', this.chooseColor)
        this.buttons.yellow.addEventListener('click', this.chooseColor)
        this.buttons.blue.addEventListener('click', this.chooseColor)
    }

    deleteClickEvents(){
        this.buttons.green.removeEventListener('click', this.chooseColor)
        this.buttons.red.removeEventListener('click', this.chooseColor)
        this.buttons.yellow.removeEventListener('click', this.chooseColor)
        this.buttons.blue.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev){
        const nameColor = ev.target.dataset.color
        const numColor = this.colorToNum(nameColor)
        this.illuminateColor(nameColor)
        if(numColor === this.sequence[this.sublevel]){
            this.sublevel++
            if(this.sublevel === this.level){
                this.level++
                round.innerHTML = this.level;
                this.deleteClickEvents()
                if(this.level === (LAST_LEVEL + 1)){
                    this.winTheGame()
                }else{
                    setTimeout(() => this.nextLevel(), 1500)
                }
            }
        }else{
            this.lostTheGame()
        }
    }

    winTheGame(){
        swal('Simon Says', 'You Won, Congratulations!', 'success')
        .then(() =>{
            this.initialize().bind(this)
        })
    }

    lostTheGame(){
        swal('Simon Says', 'You lost, try again!', 'error')
        .then(() =>{
            this.deleteClickEvents()
            this.initialize()
        })
    }
}

function startGame(){
    window.game = new Game()
}