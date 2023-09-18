function init() {
    //* Setting up the board/grid
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
    document.addEventListener("keyup", snakeMovement)

    

    function snakeMovement (event){
        const up = 38 // if I wasnt to use asdw then add the values as arrays 
        const down = 40
        const left = 37
        const right = 39

        //these two consts are to be able to find the value of the last element, and move the head of the snake according to the key press
        const lastElementIndex = snake.length-1 
        const lastElementValue = snake[lastElementIndex]

        const key = event.keyCode

        if (key === up) {
            if (document.getAttribute('data-cell-id')) {
            snake.push(lastElementValue-20)
            console.log('s')
            } else {
            snake.push(lastElementValue-20)
            snake.shift() }
        } else if (key === down) {
            snake.push(lastElementValue+20)
            snake.shift()            
        } else if (key === left) {
            snake.push(lastElementValue-1)
            snake.shift()   
        } else if (key === right) {
            snake.push(lastElementValue+1)
            snake.shift()   
        } else console.log('invalid key')
    materialiseSnake(snake, cellsIndex)
    }    

    // * Adding the Food
    function addFood () {
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        let randomFoodIndex = getRndInteger(0,cellCount)
        cellsIndex[randomFoodIndex].classList.add('foodOnBoard')
        return randomFoodIndex
    }
    addFood()

// ! END OF THE FILE STUPID !
};

window.addEventListener('DOMContentLoaded', init)