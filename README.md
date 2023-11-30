# Snake Game using JS


## TL;DR
This was the first project after the first two weeks of learning at General Assembly. The project was to 
build a game of our choosing from a list provided to us. 
The game must render in a browser
Be built on a grid
Use JavaScript for DOM manipulation
Use CSS

I chose Snake as it was the game I had played most and thought it would be fun to see what goes into building something I enjoyed. 

The game was designed and built in 5 days.

![ezgif-5-f04629224b](https://github.com/rowkee/game-project/assets/57187565/ad071b2c-1cfb-421a-b192-ea88a6556720)

### Deployment

Access the source code via the 'Clone or download' button, then open the index.html file in your browser of choice to start the game.
My game can be found [HERE](https://rowkee.github.io/game-project/) hosted on Github Pages. 



## Process

### Planning
I used a Miro board [HERE](https://miro.com/app/board/uXjVMkqdF3g=/?share_link_id=634871169238)to plan what I want to do with this game. 

Initially I created some very basic wireframes to mock up how I wanted it to look. I then created a user story map to make sure I could focus on each phase that I planned to build the game by. 

For each increment I would write pseudocode, again with the purpose of helping me focus on what exactly I wanted to achieve with each piece of code I was writing. 

### Coding 

I started with creating the Grid that the snake would go on by creating some defining variables on the grid size.
``` javascript
  // Create our grid
    const grid = document.querySelector('.grid')

    //Grid config
    const width = 20
    const height = 20
    const cellCount = width * height
    
    let cellsIndex = [] // this is the array where ALL of the cell indexs will be stored for us to access and target in functions 
```
and then calling a for-loop to create the actual divs that rendered the grid.

``` javascript
    function createBoard () {
        for (let i = 0; i < cellCount; i++) {
            const eachCell = document.createElement('div')
            
            // // Adding an index to each div/cell
            // eachCell.innerText = i // i.e. each loop, it adds a count of the loop to each cell.
    
            //Add a data index, like the visible index above but functionally usable for the game
            eachCell.dataset.cellId = i
    
            // Now add each of those divs to the grid section using our grid const
            grid.appendChild(eachCell)
  
            //Add new cell to our cellsIndex arrary 
            cellsIndex.push(eachCell)
        }
    }


    createBoard()
```
I could then add my snake as an array to the values on the grid.

``` javascript
  let snake = [167, 168, 169];
```
and call the function to add the snake where I'm applying css for 'snakeonboard'. This function is called repeatedly during movement to render the snake. 

``` javascript
function materialiseSnake() {
    document
      .querySelectorAll(".grid > div")
      .forEach((a) => a.classList.remove("snakeOnBoard")); //clears the classes before moving the snake
    for (let i = 0; i < snake.length; i++) {
      cellsIndex[snake[i]].classList.add("snakeOnBoard");
    }
  }
  materialiseSnake();
```
With my board and snake in place I added eventlisteners to allow the user to control the snake with keystrokes. Push and Shift the values in the array:
``` javascript
snake.push(snakesHeadValue + snakeDirection);
      snake.shift();
```
but this eventually grew to my biggest function that handled checking if there was a gameover scenario (i.e. out of bound, or moving to a grid value where 'snakeonboard' == True) but also the eating of food to increase speed and play sounds. 

``` javascript
function keepMoving() {
    //these two consts are to be able to find the value of the last element, and move the head of the snake according to the KEY press
    const snakesHeadIndex = snake.length - 1;
    let snakesHeadValue = snake[snakesHeadIndex];
    // * Game Over Checker
    if (
      snakesHeadValue + snakeDirection < 0 || // Snake's head is above the top boundary
      snakesHeadValue + snakeDirection >= cellCount || // Snake's head is below the bottom boundary
      (snakesHeadValue % width === 0 && snakeDirection === -1) || // Snake's head is on the left edge
      ((snakesHeadValue + 1) % width === 0 && snakeDirection === 1) || // Snake's head is on the right edge
      cellsIndex[snakesHeadValue + snakeDirection].classList.contains(
        "snakeOnBoard"
      )
    ) {
        gameOverSound.play();
        clearInterval(moving);
        showGameOverModal();
        return;
    }
    // * Food Eater
    if (
      cellsIndex[snakesHeadValue + snakeDirection].classList.contains(
        "foodOnBoard"
      )
    ) {
      score++;
      document.querySelector("h3").innerText = `Score ${score}`;
      snake.push(snakesHeadValue + snakeDirection);
      snakeEatingSound.play();
      removeFood();
      addFood();
      if (intervalSpeed < 30) {
        intervalSpeed = 30;
      } else {
        intervalSpeed = intervalSpeed - reduceIntervalSpeedBy;
      }
      clearInterval(moving);
      moving = setInterval(keepMoving, intervalSpeed);
    } else {
      snake.push(snakesHeadValue + snakeDirection);
      snake.shift();
    }
    materialiseSnake();
  }
```
**Finally** I added styling and a little easter egg feature which I thought/hoped would be funny where when a user is shown the game over modal, and asked if they want to play again, when they click no then they are forever prompted with a 'why not' button:
``` javascript
function yNot() {
    const list = document.querySelector(".buttons");
    while (list.hasChildNodes()) {
      // this clears the existing buttons first
      list.removeChild(list.firstChild);
    }
    addYNotButton(); // then adds the first 'why not' button
    const keepAskingY = document.querySelector(".buttons .yNot");
    keepAskingY.addEventListener("click", addYNotButton); // then adds a listeners that keeps running the function each time the button is clicked
  }

  function addYNotButton() {
    const list = document.querySelector(".buttons");
    const yNot = document.createElement("button");
    yNot.innerText = "Why not?";
    yNot.classList.add("yNot");
    list.appendChild(yNot);
  }
```
## Future Developments
### BUGs
* Ensure food doesn't generate where the snake already is

### Features
I'd love to add:
* Playable on mobile
* Save scores
* Add a leaderboard
* Add some more easter eggs
  
## Summary
### Challenges 
There were many challenges in this first project, but the ones that stood out were:
* Getting started and figuring out how to turn code into a visual grid and snake.
* Adding logic to increase speed.


### Wins
Overall the project was endlessly satisfying to put our weeks of learning into practice and experiment. I particularly enjoyed being able to really apply concepts like arrays from a concept to a rendered snakey. 
