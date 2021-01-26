let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".output");
const opOne = document.querySelector(".running-total");
const operand = document.querySelector(".previous-operator");
const opTwo = document.querySelector(".int-buffer");

// Service worker 

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}


// Actual coding
document.querySelector(".input-area").addEventListener("click", function (event) {
    if (event.target.tagName === 'BUTTON') {
        handleClick(event.target.innerText); 
    }
})

function rerender() {
    screen.innerText = buffer;
    if (runningTotal === 0) {
        opOne.innerText = null;
    }
    else {
        opOne.innerText = runningTotal;
    }
    operand.innerText = previousOperator;
    opTwo.innerText = buffer;
}

function handleClick(value) {
    if (isNaN(parseInt(value)))
        handleSymbol(value);
    else
        handleNumber(value);
    rerender();
}

function handleNumber(value) {
    if (buffer === '0')
        buffer = value;
    else
        buffer += value;
}

function handleSymbol(value) {
    switch (value) {
        case 'AC':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        
        case 'DEL':
            if (buffer.length === 1)
                buffer = "0";
            else
                buffer = buffer.substring(0, buffer.length - 1);
            break;
        
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
        
    }
    previousOperator = value;

    buffer = "0";
}


function flushOperation(intBuffer) {
    if (previousOperator === '%') {
        runningTotal = Math.floor(runningTotal % intBuffer);
    }else if (previousOperator === '÷') {
        runningTotal = Math.floor(runningTotal/intBuffer);
    }else if (previousOperator === '×') {
        runningTotal = runningTotal * intBuffer;
    }else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '+') {
        runningTotal = runningTotal + intBuffer;
    }
}