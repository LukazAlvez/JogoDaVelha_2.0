const cellElement = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningText = document.querySelector("[data-winning-text]");
const winningDisplay = document.querySelector("[data-winning-message]");
const btnRestart = document.querySelector("[data-restart]")

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const startGame = () => {

    board.classList.remove('x')
    board.classList.remove('circle')

    for(const cell of cellElement){
        cell.classList.remove('x')
        cell.classList.remove('circle')
        cell.addEventListener("click", handleClick, {once: true});
    };

    isCircleTurn = false;

    board.classList.add("x")

    winningDisplay.classList.remove("show-winning-messege");
    
}

const endGame = (isDraw) => {
    if (isDraw){
        winningText.innerText = "Empate!"
    }else{
        winningText.innerText = isCircleTurn ? "X Venceu!" : "Circulo venceu!"
    }

    winningDisplay.classList.add("show-winning-messege")
}

const checkForWin = (player) =>{
    return winningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellElement[index].classList.contains(player)
        })
    })
}

const checkForDraw = () => {
    return [...cellElement].every(cell =>{
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}


const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn){
        board.classList.add("circle");
    }else{
        board.classList.add("x")
    }

}

const handleClick = (e) =>{
    //colocar a marca//
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd)

    //mudar o turno//
    swapTurns()

    //verificar vitoria e verificar empate//
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw()
    if(isWin){
        endGame(false)
    }else if(isDraw){
        endGame(true)
    }

};


startGame()

btnRestart.addEventListener("click", startGame);

