const buttonsToScreen = document.querySelectorAll('.number,.operand');
const buttonsOperands = document.querySelectorAll('.operand');
const calcScreen = document.querySelector('.screencontent');
const clearBtn = document.querySelector('.toclear');
const equals = document.querySelector('.equals');
const dot = document.querySelector('.dot');
const delbtn = document.querySelector('.del')

calcScreen.innerHTML = 0
let store = calcScreen.innerHTML;
let operand;
let oldoperand = '';
const regex = /[^\w.]+/g;
let checkdot = 0 ;

window.addEventListener('keydown', function(e) {
    if (e.key == 'Escape') {
        clickOrKeyESC(e)  
    }else if (e.key == '1'|| e.key == '2'||e.key == '3'||e.key == '4'||e.key =='5'||
    e.key == '6'||e.key == '7'||e.key == '8'||e.key == '9'|| e.key == '0') {
        clickOrKeyNum(e) 
    }else if (e.key == '/'|| e.key == '*'||e.key == '-'||e.key == '+') {
        clickOrKeyNum(e)
        clickOrKeyOperand(e)
    }else if (e.key == 'Backspace') {
        clickORkeyDEL(e)
    }else if (e.key == 'Enter') {
        clickORkeyEquals(e)
    }else if (e.key == '.') {
        clickORkeyDot(e)
    }
})

buttonsToScreen.forEach((button) => {
button.addEventListener('click', clickOrKeyNum);   
    })
buttonsOperands.forEach((button) => {
    button.addEventListener('click', clickOrKeyOperand)
}) 
delbtn.addEventListener('click', clickORkeyDEL);
dot.addEventListener('click', clickORkeyDot);
clearBtn.addEventListener('click', clickOrKeyESC);
equals.addEventListener('click', clickORkeyEquals);

function clickOrKeyESC(e) {
    if(e.type == "keydown" && e.key == 'Escape') {
        resetScreen()
    } else if(e.type == "click"){
        resetScreen()
    }
}
function clickOrKeyNum(e) {
    if(e.type == "keydown"){
        toScreen(e.key)
    } else if(e.type == "click"){
        toScreen(e.target.innerText)
    }
}
function clickOrKeyOperand(e) {
    if(e.type == "keydown"){
        operand = e.key;
        oldoperand += operand ;
        if (operand !== oldoperand) {
            let old = oldoperand.split('');
            operand = old[0];
            calcScreen.innerHTML = '';
            calcScreen.innerHTML = operate(operand, store) + e.key;
            oldoperand = old[1];
            operand = e.key; 
        }
    } else if(e.type == "click"){
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
    }
}
function clickORkeyDEL(e) {
    if(e.type == "keydown" || e.type == "click"){
        let string = calcScreen.innerHTML
        if (store[store.length - 1] === '.') {
            checkdot -= 1
        }
        string = string.slice(0,-1);
        return calcScreen.innerHTML = string
    } 
}
function clickORkeyEquals(e) {
    if(e.type == "keydown" || e.type == "click"){
        if (!operand || !store || operand == store) {
            resetScreen();
        }else {
            calcScreen.innerHTML = operate(operand, store);
            oldoperand = '';
            checkdot = 1;
        }
    }
}
function clickORkeyDot(e) {
    if(e.type == "keydown"){
        if (!operand) {
            if (!store) {
                return
            }else if (store.toString().includes(".")) {
                return 
            } else toScreen(e.key); checkdot += 1;
        } else if (operand !== null) {
            if (checkdot > 1) {
                return 
            } else toScreen(e.key); checkdot += 1;
        }
    
    } else if(e.type == "click"){
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
    }
}
function toScreen(btn) {
     if (calcScreen.innerHTML === '0') {
       calcScreen.innerHTML = '';
     }
     if (calcScreen.innerHTML === '.') {
         calcScreen.innerHTML = '0.'
     }
    store = calcScreen.innerHTML += btn; 
    if(calcScreen.innerHTML.length > 18) calcScreen.innerHTML = calcScreen.innerHTML.substring(0,18);
}   
function resetScreen() {
    calcScreen.innerHTML = 0;
    store = calcScreen.innerHTML;
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
    if (splited[0] === "" || splited[1] === "" || 
    splited.length < 2 || splited[1] === '.'|| 
    splited.length > 2) return 0;
    else if (splited[1] === "0") return splited[0];
    else if (operand === '+') return add(splited);
    else if (operand === '-') return subtract(splited);
    else if (operand === '/') return devide(splited);
    else if (operand === '*') return multiply(splited);
}
