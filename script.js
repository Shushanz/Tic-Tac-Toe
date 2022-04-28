// selectors
const form = document.querySelector('#form')
let boxSize = document.querySelector('#size')

let tableAll

let clicked = ''
let indexesX = []
let indexesO = []
let size

form.addEventListener('submit', submit)

function submit(event) {
    event.preventDefault()
    let player = document.querySelector('input[name="players"]:checked')
    let hand = document.querySelector('input[name="hand"]:checked')
    size = boxSize.value
    createTable(size)
}

function createTable(size) {
    const game = document.querySelector('.game')
    const table = document.createElement('table')
    table.setAttribute('id', 'table')
    for (let i = 0; i < size; i++) {
        const tr = table.insertRow()
        for (j = 0; j < size; j++) {
            const td = tr.insertCell()
            td.setAttribute('id', `i${i + '' + j}`)
            td.style.border = '1px solid black';
            td.style.width = 100 / size + '%'
            td.style.height = 100 / size + '%'
        }
    }
    game.appendChild(table)
    tableAll = document.querySelector('table')
    tableAll.addEventListener('click', addHand)

}

function addHand(event) {
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
}

function checkForWin(indexes, hand) {
    for (let j = 0; j < size; j++) {
        let winByRow = [], winByCol = [], winByDiag1 = [], winBydiag2 = []
        for (let i = 0; i < indexes.length; i++) {
            if (indexes[i][0] == j) {
                winByRow.push(indexes[i])
                if (winByRow.length == size) {
                    return winner(hand, winByRow)
                }
            }
            if (indexes[i][1] == j) {
                winByCol.push(indexes[i])
                if (winByCol.length == size) {
                    return winner(hand, winByCol)
                }
            }
            if (indexes[i][0] === indexes[i][1]) {
                winByDiag1.push(indexes[i])
                if (winByDiag1.length == size) {
                    return winner(hand, winByDiag1)
                }
            }
            if (Number(indexes[i][0]) + Number(indexes[i][1]) === size - 1) {
                winBydiag2.push(indexes[i])
                if (winBydiag2.length == size) {
                    return winner(hand, winBydiag2)
                }
            }
        }
    }
}

function winner(w, arr) {
    console.log(`Winner is ${w}`)
    console.log('arrrr', arr)

    tableAll.removeEventListener('click', addHand)
    for (let elem of arr) {
        // console.log('e', elem)
        let id = '#i' + elem
        let cell = document.querySelector(id)
        // console.log('c', cell)
        cell.style.backgroundColor = 'green'
    }

}
