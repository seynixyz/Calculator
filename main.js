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
let stop = '';

clear.addEventListener('click', clc);
del.addEventListener('click', delNum);


keystroke.forEach(div => div.addEventListener('click', pushNumber));
opeKey.forEach(div => div.addEventListener('click', numberOperation));

function numberOperation() {
    if (this.id == '+') {
        if (ope1 == 0) {
            ope1 = displayValue;
            
        }
        
        operation.textContent = ope1 + this.id;
        opeContainer = '+';
    }


    if (opeContainer != '') {
        ope2 = displayValue;
        console.log('ope2=', ope2);
    }

    if (this.id == '=') {
        if (opeContainer == '+') {
            addResult=add(parseFloat(ope1),parseFloat(ope2))
            console.log(ope2);
            operation.textContent = operation.textContent + ope2;
            input.textContent = addResult;
        }
        opeContainer = 'clean';
        ope1 = 0;
        ope2 = 0;
    }
    console.log(opeContainer);
}



function pushNumber() {

    if (opeContainer != '' && stop != 'stop') {
        delNum();
        oneDot=false;
        stop = 'stop';
    }
    if (opeContainer == 'clean') {
        clc();
        opeContainer = '';
        stop = '';
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