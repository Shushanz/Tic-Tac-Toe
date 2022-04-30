// selectors
const form = document.querySelector('#form')
let boxSize = document.querySelector('#size')

// let player = document.querySelector('input[name="players"]:checked')
// let players = document.querySelectorAll('.players')
// players.addEventListener('click', func)
let playerOption = document.querySelector('#player-option')
let playersInfo = document.querySelector('#players-info')
let scoreForm = document.querySelector('.score-form')
let hand = document.querySelector('#hand')

let tableAll
let clicked = ''
let indexesX = []
let indexesO = []
let size
let choosenHand
let player
let arrayOfIndexes = []
let winner
// let firstPlayerName = ''
// let seondPlayerName = 'Bot'

form.addEventListener('submit', submit)

function getPlayerOption() {
    player = document.querySelector('input[name="players"]:checked')
    if (player.value === 'one-player') {
        playersInfo.style.display = 'none'
        hand.style.display = 'block'

    } else if (player.value === 'two-players') {
        playersInfo.style.display = 'flex'
        hand.style.display = 'none'
        let firstPlayerName = document.querySelector('#firstPlayerName')
        console.log('x', firstPlayerName)

    }
}

function submit(event) {
    console.log('event', event)
    event.preventDefault()
    // let player = document.querySelector('input[name="players"]:checked')
    choosenHand = document.querySelector('input[name="hand"]:checked')?.value
    size = boxSize.value
    console.log('c', choosenHand)
    let firstPlayerName = document.querySelector('#firstPlayerName').value
    console.log('firstPlayerName', firstPlayerName)
    let seondPlayerName = document.querySelector('#secondPlayerName').value

    createTable(size)
    showScore(firstPlayerName, seondPlayerName)
}

function createTable(size) {
    const game = document.querySelector('.game')
    const table = document.createElement('table')
    const clearButton = document.querySelector('.game button')
    clearButton.style.display = 'flex'
    table.setAttribute('id', 'table')
    for (let i = 0; i < size; i++) {
        const tr = table.insertRow()
        for (j = 0; j < size; j++) {
            const td = tr.insertCell()
            td.setAttribute('id', `i${i + '' + j}`)
            arrayOfIndexes.push(`i${i + '' + j}`)
            td.style.border = '1px solid black';
            td.style.width = 100 / size + '%'
            td.style.height = 100 / size + '%'
        }
    }
    game.prepend(table)
    if (choosenHand == 'hand-o') {
        let randomIndex = arrayOfIndexes[Math.floor(Math.random() * arrayOfIndexes.length)]
        document.getElementById(randomIndex).innerText = 'x'
        indexesX.push(randomIndex.slice(1))
        arrayOfIndexes.splice(arrayOfIndexes.indexOf(randomIndex), 1)
    }
    tableAll = document.querySelector('table')
    tableAll.addEventListener('click', addHand)

}

function showScore(first, second) {
    console.log('fi', first, second, choosenHand)
    if (first && second) {
        document.querySelector('#first label').innerText = first
        document.querySelector('#second label').innerText = second
    } else if (choosenHand) {
        if (choosenHand == 'hand-x') {
            document.querySelector('#first label').innerText = 'You'
            document.querySelector('#second label').innerText = 'Bot'
        } else {
            document.querySelector('#first label').innerText = 'Bot'
            document.querySelector('#second label').innerText = 'You'
        }

    }
    scoreForm.style.display = 'flex'

}

function clearBoard() {
    arrayOfIndexes = []
    let tableData = document.querySelectorAll('td')
    tableData.forEach((td) => {
        td.innerText = '';
        td.style.backgroundColor = 'white'
        arrayOfIndexes.push(td.id)
    })
    if (choosenHand == 'hand-o') {
        let randomIndex = arrayOfIndexes[Math.floor(Math.random() * arrayOfIndexes.length)]
        document.getElementById(randomIndex).innerText = 'x'
        indexesX.push(randomIndex.slice(1))
        arrayOfIndexes.splice(arrayOfIndexes.indexOf(randomIndex), 1)
    }

    clicked = ''
    indexesO = []
    indexesX = []
    tableAll.addEventListener('click', addHand)
}

function addHand(event) {
    winner = ''
    console.log('player', player)
    if (player.value === 'two-players') {
        if (!event.target.innerText) {
            if (clicked === '' || clicked === 'o') {
                event.target.innerText = 'x'
                clicked = 'x'
                indexesX.push(event.target.id.slice(1))
                checkForWin(indexesX, clicked)
            } else {
                event.target.innerText = 'o'
                clicked = 'o'
                indexesO.push(event.target.id.slice(1))
                checkForWin(indexesO, clicked)
            }
        }
    } else if (player.value === 'one-player') {
        if (!event.target.innerText) {
            if (choosenHand === 'hand-o') {
                event.target.innerText = 'o'
                clicked = 'o'
                arrayOfIndexes.splice(arrayOfIndexes.indexOf(event.target.id), 1)
                indexesO.push(event.target.id.slice(1))
                checkForWin(indexesO, clicked)

                if (!winner) {
                    let randomIndex = arrayOfIndexes[Math.floor(Math.random() * arrayOfIndexes.length)]
                    document.getElementById(randomIndex).innerText = 'x'
                    clicked = 'x'
                    indexesX.push(randomIndex.slice(1))
                    arrayOfIndexes.splice(arrayOfIndexes.indexOf(randomIndex), 1)
                    checkForWin(indexesX, clicked)

                }
            }
            if (choosenHand === 'hand-x') {
                console.log(arrayOfIndexes)
                event.target.innerText = 'x'
                clicked = 'x'
                arrayOfIndexes.splice(arrayOfIndexes.indexOf(event.target.id), 1)
                indexesX.push(event.target.id.slice(1))
                checkForWin(indexesX, clicked)

                if (!winner) {
                    let randomIndex = arrayOfIndexes[Math.floor(Math.random() * arrayOfIndexes.length)]
                    document.getElementById(randomIndex).innerText = 'o'
                    clicked = 'o'
                    indexesO.push(randomIndex.slice(1))
                    arrayOfIndexes.splice(arrayOfIndexes.indexOf(randomIndex), 1)
                    checkForWin(indexesO, clicked)

                }
            }
        }
    }
}

function checkForWin(indexes, hand) {
    for (let j = 0; j < size; j++) {
        let winByRow = [], winByCol = [], winByDiag1 = [], winBydiag2 = []
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i][0] == j) {
                winByRow.push(indexes[i])
                if (winByRow.length == size) {
                    return getWinner(hand, winByRow)
                }
            }
            if (indexes[i][1] == j) {
                winByCol.push(indexes[i])
                if (winByCol.length == size) {
                    return getWinner(hand, winByCol)
                }
            }
            if (indexes[i][0] === indexes[i][1]) {
                winByDiag1.push(indexes[i])
                if (winByDiag1.length == size) {
                    return getWinner(hand, winByDiag1)
                }
            }
            if (Number(indexes[i][0]) + Number(indexes[i][1]) === size - 1) {
                winBydiag2.push(indexes[i])
                if (winBydiag2.length == size) {
                    return getWinner(hand, winBydiag2)
                }
            }
        }
    }
}

function getWinner(w, arr) {
    winner = w
    console.log(`Winner is ${w}`, 'arrrr', arr)
    tableAll.removeEventListener('click', addHand)
    for (let elem of arr) {
        let id = '#i' + elem
        let cell = document.querySelector(id)
        cell.style.backgroundColor = 'green'
    }

    updateScore(w)
}

function updateScore(winner) {
    if (winner === 'x') {
        document.querySelector('#firstPlayer').value++
    }
    if (winner === 'o') {
        document.querySelector('#secondPlayer').value++
    }
}
