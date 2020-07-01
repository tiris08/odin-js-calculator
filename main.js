const buttonsToScreen = document.querySelectorAll('.number,.operand');
const buttonsOperands = document.querySelectorAll('.operand')
const calcScreen = document.querySelector('.screencontent')
const clearBtn = document.querySelector('.toclear')
const equals = document.querySelector('.equals')

let store
let operand
let oldoperand = ''
const regex = /[^\w.]+/g;

buttonsToScreen.forEach((button) => {
button.addEventListener('click', function(e) {
        toScreen(e.target.innerText);
        });   
    })
buttonsOperands.forEach((button) => {
    button.addEventListener('click', function(e) {
        operand = e.target.innerText  
        oldoperand += operand 
        if (operand !== oldoperand) {
            let old = oldoperand.split('')
            operand = old[0]
            calcScreen.innerHTML = ''
            calcScreen.innerHTML = operate(operand, store) + e.target.innerText
            oldoperand = old[1]
            operand = e.target.innerText 
        }
    })
})    
clearBtn.addEventListener('click', function(e) {
    resetScreen();
})
equals.addEventListener('click', function(e) {
    if (!operand || !store || operand == store) {
        resetScreen()
    } else {
    calcScreen.innerHTML = operate(operand, store)
    oldoperand = ''
    }
})
function toScreen(btn) {
    if (calcScreen.innerHTML === '0') {
        calcScreen.innerHTML = '';
    }
    store = calcScreen.innerHTML += btn; 
    if(calcScreen.innerHTML.length > 18) calcScreen.innerHTML = calcScreen.innerHTML.substring(0,18);
} 
    
function resetScreen() {
    calcScreen.innerHTML = '0';
    store = undefined;
    operand = undefined;
    oldoperand = ''
}

function add(splited) {
    let num = (Number(splited[0]) + Number(splited[1]));
    return +num.toFixed(18)
}
function subtract(splited) {
    let num = (Number(splited[0]) - Number(splited[1]));
    return +num.toFixed(18)
}
function multiply(splited) {
    let num = (Number(splited[0]) * Number(splited[1]));
    return +num.toFixed(18)
}
function devide(splited) {
    let num = (Number(splited[0]) / Number(splited[1]));
    return +num.toFixed(18)
}

function operate(operand, store) {
    if (operand === '+') {
        let splited = (store.split(regex));
        return add(splited);
    } else if (operand === '-'){
        let splited = (store.split(regex));
        return subtract(splited);
    } else if (operand === '/'){
        let splited = (store.split(regex));
        return devide(splited);
    } else if (operand === '*'){
        let splited = (store.split(regex));
        return (multiply(splited));
    }
    
}
