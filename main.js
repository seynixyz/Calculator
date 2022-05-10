const operation = document.querySelector('.operation');
const input = document.querySelector('.input');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const numberKey = document.querySelectorAll('.number');
const opeKey = document.querySelectorAll('.ope');
const equalKey = document.querySelectorAll('.equal');

let where = ''; // Allow to know which input was previously done
let whereInNumber = '';
let result = '';
let displayValue = '';
let oneDot = false;
let dontSpam = false;
let x1 = '0';
let x2 = '0';
let opeContainer = '';
let stop = '';

// Listen to clear and delete
clear.addEventListener('click', clc);
del.addEventListener('click', delNum);

// Listen to which key has been pressed and execute a function accordingly 
numberKey.forEach(div => div.addEventListener('click', numberFunction));
opeKey.forEach(div => div.addEventListener('click', operatorFunction));
equalKey.forEach(div => div.addEventListener('click', resultFunction));



//------------Click a number function-------------

function numberFunction() {
    if (where == 'operator') {
        delNum();
        oneDot=false; // Reset oneDot constraint
        where = 'number';
        whereInNumber = 'operator';
    }

    if (where == 'equal') {  
        clc();
    }

    if (where == 'number' || where == '') {  
        /* Dot case */
        if (this.id == '.' && oneDot == false) {
            input.textContent = displayValue + this.id;
            displayValue = input.textContent;
            oneDot = true;
        }

        /* Number case*/
        if (this.id != '.') {
            input.textContent = displayValue + this.id;
            displayValue = input.textContent;
        }


        // x1 take the value of the concatenate input
        if (whereInNumber != 'operator') {
            x1 = displayValue;
            if (whereInNumber == '') {
                x2 = displayValue;  // copy first value in case : number->ope->equal
                whereInNumber = 'noSpam';
            }
            
            
        }
        
        // operator has been pressed before so x1 doesn't change and x2 become input
        if (whereInNumber == 'operator') {
            x2 = displayValue;
        }
        
        
    }
    where = 'number';
}



//------------Click an operator function-------------

function operatorFunction() {

    if (where == 'number' || where == '') {
        operation.textContent = x1 + this.id;
        opeContainer = this.id;
    }

    if (where == 'equal') {
        x1 = result;
        x2 = result;
        operation.textContent = x1 + this.id;
        opeContainer = this.id;
    }

    if (where == 'operator') {
        x1 = input.textContent;
        x2 = input.textContent;
        operation.textContent = x1 + this.id;
        opeContainer = this.id;
    }

    where = 'operator';
    dontSpam = false;
}



//------------Click an equal function-------------

function resultFunction() {
    // Allow to spam equal
    if (where == 'equal') {
        x1=result;
    }
    if ((operation.textContent != '') && (dontSpam == false)){
        // Display result
        result = operate(opeContainer,parseFloat(x1),parseFloat(x2));
        operation.textContent = x1 + opeContainer + x2;
        input.textContent = result;
    }
    if ((where == 'number' || where == '') && (operation.textContent == '')){
        opeContainer = this.id;
        operation.textContent = x1 + opeContainer;
        input.textContent = x1;
        dontSpam = true;
    }

    // Easter eggs
    if (result == '42') {
        operation.textContent = 'the real answer';
    }

    if (result == '69') {
        operation.textContent = 'sex';
    }

    if (result == '420') {
        operation.textContent = 'is this legal ?';
    }

    where = 'equal';
}



//------------Clear, Delete, Operator functions-------------


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
    where = '';
    input.textContent = 0;
    operation.textContent = '';
    oneDot = false;
    opeContainer = '';
    opeResetContainer='';
    stop = '';
    x1 = '0';
    x2 = '0';
    whereInNumber = '';
    result = '';
}

function delNum() {
    displayValue = '';
    input.textContent = 0;
    oneDot = false;
}