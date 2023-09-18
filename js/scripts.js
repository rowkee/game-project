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
        // * Snake Starting Position
        // Now we put the snake in it's starting position on the board

    function materialiseSnake (snake, cellsIndex) {
        for (let i = 0; i < snake.length; i++){
            cellsIndex[snake[i]].classList.add('snakeOn')
            }
        }
        materialiseSnake(snake, cellsIndex)
        console.log(materialiseSnake)
        // const startingPosition = snake.map()
        // let currentSnakePosition = startingPosition
        // cellsIndex[startingPosition].classList.add('snakeOn')
    }    
    createBoard()
    



}



window.addEventListener('DOMContentLoaded', init)