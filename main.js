const operation = document.querySelector('.operation');
const input = document.querySelector('.input');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const keys = document.querySelector('.keys');
const keystroke = document.querySelectorAll('.number');
const opeKey = document.querySelectorAll('.ope');

let displayValue = '0';
let oneDot = false;
let ope1 = 0;
let ope2 = 0;
let addResult;
let opeContainer = '';
let opeResetContainer = '';
let stop = '';
let reset = '';

clear.addEventListener('click', clc);
del.addEventListener('click', delNum);
keystroke.forEach(div => div.addEventListener('click', pushNumber));
opeKey.forEach(div => div.addEventListener('click', numberOperation));

function numberOperation() {
    if (this.id == '+') {
        if (ope1 == 0) {
            ope1 = displayValue;
            operation.textContent = ope1 + this.id;
        }
        
        opeContainer = '+';
        if ((opeResetContainer == '*') ||
            (opeResetContainer == '-') ||
            (opeResetContainer == '/')) {
                reset = '';
                ope1 = input.textContent;
                ope2 = ope1;
                operation.textContent = ope1 + this.id;
        }
        where = 'plus';
    }
    if (this.id == '*') {
        if (ope1 == 0) {
            ope1 = displayValue;
            operation.textContent = ope1 + this.id;
        }
        
        opeContainer = '*';
        if ((opeResetContainer == '+') ||
            (opeResetContainer == '-') ||
            (opeResetContainer == '/')) {
                reset = '';
                ope1 = input.textContent;
                ope2 = ope1;
                operation.textContent = ope1 + this.id;
        }
        where = 'mul';
    }

    if ((opeContainer == '+') || 
        (opeContainer == '-') ||
        (opeContainer == '*') || 
        (opeContainer == '/') ){
        ope2 = input.textContent;
        console.log(ope2);
    }

    if (this.id == '=') {
        if (reset == 'noreset') {
            ope1=addResult;
            opeContainer = opeResetContainer;
        }
        console.log(ope2);
        if (opeContainer == '+') {
            addResult=add(parseFloat(ope1),parseFloat(ope2))
            operation.textContent = ope1 + opeContainer + ope2;
            input.textContent = addResult;
        }
        if (opeContainer == '*') {
            addResult=multiply(parseFloat(ope1),parseFloat(ope2))
            operation.textContent = ope1 + opeContainer + ope2;
            input.textContent = addResult;
        }

        opeResetContainer= opeContainer;

        opeContainer = 'clean';
        reset = 'noreset';
        where = 'equal';
    }
}



function pushNumber() {
    console.log('yo');
    if (opeContainer != '' && stop != 'stop') {
        delNum();
        oneDot=false;  // oneDot allow one dot per number
        stop = 'stop'; // stop prevent the oneDot boolean to be spammed
    }


    /*  'where' is needed in the case for which we click an operator after a having clicked equal.
        If a number is entered after the operator so : '=' '*' then 'number' we do not want to clean
        We only want to clean went a number is entered after '=' */
    if ((opeContainer == 'clean') && (where= 'equal')) {  
        clc();
        opeContainer = '';
        opeResetContainer='';
        stop = '';
        reset = '';
        ope1 = 0;
        ope2 = 0;
    }

    if (((this.id) == '1' || 
        (this.id) == '2' ||
        (this.id) == '3' ||
        (this.id) == '4' ||
        (this.id) == '5' ||
        (this.id) == '6' ||
        (this.id) == '7' ||
        (this.id) == '8' ||
        (this.id) == '9' ||
        (this.id) == '0' )){
        if (input.textContent == '0') {
            displayValue = '';
        }
        input.textContent = displayValue + this.id;
    } 
    if (this.id == '.' && oneDot == false) {
        input.textContent = displayValue+this.id;
        oneDot = true;
    }
    displayValue = input.textContent;
}

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator,a,b) {
    if (operator == '+') {    
        return add(a,b);
    }
    if (operator == '-') {
        return subtract(a,b);
    }
    if (operator == '*') {
        return multiply(a,b);
    }
    if (operator == '/') {
        return divide(a,b);
    }
}

function clc() {
    displayValue = '';
    input.textContent = 0;
    operation.textContent = '';
    oneDot = false;
}

function delNum() {
    displayValue = 0;
    input.textContent = 0;
    oneDot = false;
}