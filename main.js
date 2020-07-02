const buttonsToScreen = document.querySelectorAll('.number,.operand');
const buttonsOperands = document.querySelectorAll('.operand');
const calcScreen = document.querySelector('.screencontent');
const clearBtn = document.querySelector('.toclear');
const equals = document.querySelector('.equals');
const dot = document.querySelector('.dot');
const delbtn = document.querySelector('.del')

let store;
let operand;
let oldoperand = '';
const regex = /[^\w.]+/g;
let checkdot = 0 ;

buttonsToScreen.forEach((button) => {
button.addEventListener('click', function(e) {
        toScreen(e.target.innerText);
        });   
    })
buttonsOperands.forEach((button) => {
    button.addEventListener('click', function(e) {
        operand = e.target.innerText;
        oldoperand += operand ;
        if (operand !== oldoperand) {
            let old = oldoperand.split('');
            operand = old[0];
            calcScreen.innerHTML = '';
            calcScreen.innerHTML = operate(operand, store) + e.target.innerText;
            oldoperand = old[1];
            operand = e.target.innerText; 
        }
    })
}) 
delbtn.addEventListener('click', function(e) {
    let string = calcScreen.innerHTML
    if (store[store.length - 1] === '.') {
        checkdot -= 1
    }
    string = string.slice(0,-1);
    return calcScreen.innerHTML = string
})
dot.addEventListener('click',function(e) {
    if (!operand) {
        if (!store) {
            return
        }else if (store.toString().includes(".")) {
            return 
        } else toScreen(e.target.innerText); checkdot += 1;
    
} else if (operand !== null) {
    if (checkdot > 1) {
        return 
    } else toScreen(e.target.innerText); checkdot += 1;
}

});
clearBtn.addEventListener('click', function(e) {
    resetScreen();
})
equals.addEventListener('click', function(e) {
    if (!operand || !store || operand == store) {
        resetScreen();
    } else {
    calcScreen.innerHTML = operate(operand, store);
    oldoperand = '';
    checkdot = 1;
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
    oldoperand = '';
    checkdot = 0;

}

function add(splited) {
    let num = (Number(splited[0]) + Number(splited[1]));
    return +num.toFixed(10)
}
function subtract(splited) {
    let num = (Number(splited[0]) - Number(splited[1]));
    return +num.toFixed(10)
}
function multiply(splited) {
    let num = (Number(splited[0]) * Number(splited[1]));
    return +num.toFixed(10)
}
function devide(splited) {
    let num = (Number(splited[0]) / Number(splited[1]));
    return +num.toFixed(10)
}

function operate(operand, store) {
    let splited = (store.split(regex)); 
    if (splited[0] === "" || splited[1] === "" || splited.length < 2) return 0;
    else if (splited[1] === "0") return splited[0];
    else if (operand === '+') return add(splited);
    else if (operand === '-') return subtract(splited);
    else if (operand === '/') return devide(splited);
    else if (operand === '*') return multiply(splited);
}
