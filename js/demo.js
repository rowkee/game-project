function init() {
    //* Setting UP the board/grid
    // Create our grid
    const grid = document.querySelector('.grid')
    

    //Grid config
    const width = 20
    const height = 20
    const cellCount = width * height

    let cellsIndex = [] // this is the array where ALL of the cell indexs will be stored for us to access and target in functions because we can't use the data values??????

    // Creating the snake 
    let snake = [167, 168, 169]

    // Create the divs/cells 
    function createBoard () {
        for (let i = 0; i < cellCount; i++) {
            const eachCell = document.createElement('div')
            
            // Adding an index to each div/cell
            eachCell.innerText = i // i.e. each loop, it adds a count of the loop to each cell.
    
            //Add a data index, like the visible index above but functionally usable for the game
            eachCell.dataset.cellId = i
    
            // Now add each of those divs to the grid section using our grid const
            grid.appendChild(eachCell)

            //Add new cell to our cellsIndex arrary 
            cellsIndex.push(eachCell)
        }
    }
    createBoard()
        // * Snake Starting Position
        // Now we put the snake in it's starting position on the board

    function materialiseSnake (snake, cellsIndex) {
        document.querySelectorAll('.grid > div').forEach(a => a.classList.remove('snakeOnBoard')) //clears the classes before moving the snake
        for (let i = 0; i < snake.length; i++){
            cellsIndex[snake[i]].classList.add('snakeOnBoard')
            }
    }
    materialiseSnake(snake, cellsIndex)
    
    // * Snake Movement 
    // These are the events we'll use to move the snake
    document.addEventListener("keydown", snakeMovement)

    let snakeDirection = 1
    
    //these two consts are to be able to find the value of the last element, and move the head of the snake according to the KEY press
    const snakesHeadIndex = snake.length-1 
    let snakesHeadValue = snake[snakesHeadIndex]

    function snakeMovement (event){
        const UP = 38 // if I wasnt to use asdw then add the values as arrays 
        const DOWN = 40
        const LEFT = 37
        const RIGHT = 39

        const KEY = event.keyCode

        if (KEY === UP && snakeDirection !== 20 && snakesHeadValue >= width) {
            snakeDirection = -20
        
        } else if (KEY === DOWN && snakeDirection !== -20 && snakesHeadValue + width <= cellCount-1) {
            snakeDirection= 20
   
        } else if (KEY === LEFT && snakeDirection !== 1 && snakesHeadValue % width !== 0) {
            snakeDirection= -1
        
        } else if (KEY === RIGHT&& snakeDirection !== -1 && snakesHeadValue % width !== width - 1) {
            snakeDirection= 1
     
        } else console.log("Don't go back on yourself")
        keepMoving()
    }    

    // * Continous Movement
    
    function keepMoving () {
        if (cellsIndex[snakesHeadValue+snakeDirection].classList.contains('foodOnBoard')) {
            snake.push(snakesHeadValue+snakeDirection)
            removeFood()
            addFood()
        } else {
            snake.push(snakesHeadValue-snakeDirection)
            snake.shift()
        }   
        materialiseSnake(snake, cellsIndex)
    }   
    
    



    let randomFoodIndex = null // this assigned in the addFood function, but also by removeFood therefore lives outside of each function
 
    // * Adding the Food
    function addFood () {
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        randomFoodIndex = getRndInteger(0,cellCount)
        cellsIndex[randomFoodIndex].classList.add('foodOnBoard')
    }
    addFood()

    // * Removing food
    function removeFood () {
        cellsIndex[randomFoodIndex].classList.remove('foodOnBoard')
    }

    // * End Game
    function gameOver () {
        alert ('GAME OVER')
    }

// ! END OF THE FILE STUPID !
};

window.addEventListener('DOMContentLoaded', init)