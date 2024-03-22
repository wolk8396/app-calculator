const bet_keyboard = document.querySelectorAll('.btn');
const bet_reset = document.querySelector('.reset');
const result = document.querySelector('.results');

const numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];
const mathematicalOperations = ['/', '*', '-', '+', '%', '='];
let firstValue ='';
let secondValue = '';
let signMathematicalOperations ='';
let endOperation = false;

const onReset = () => {
  console.log('res');
  endOperation = false;
  firstValue ='';
  secondValue = '';
  signMathematicalOperations ='';
  result.innerHTML = 0;
};

bet_reset.addEventListener('click', () => onReset());

const onSecondNumber = num => {};

const onOperations = value => {}

const onGteValue = value => {};

const onInit = () => {
  bet_keyboard.forEach(btn => {
    btn.onclick = () => onGteValue(btn.textContent);
  });
};

onInit();
