const bet_keyboard = document.querySelectorAll('.btn');
const bet_reset = document.querySelector('.reset');
const result = document.querySelector('.results');
const displayResult = document.querySelector('.operations');
const numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];
const mathematicalOperations = ['/', '*', '-', '+', '%'];
const error  = 'деление на ноль невозможно';
let firstValue ='';
let secondValue = '';
let signMathematicalOperations ='';
let endOperation = false;

const onReset = () => {
  endOperation = false;
  firstValue = '';
  secondValue = '';
  signMathematicalOperations = '';
  result.innerHTML = '0';
  displayResult.innerHTML = '';
};

bet_reset.addEventListener('click', onReset);

const onSecondNumber = num => {
  if (endOperation) {
    secondValue = '';
    endOperation = false;
  };
  secondValue += num;
  result.innerHTML = secondValue;
};

const onOperations = value => {
  endOperation = false;
  signMathematicalOperations = value;
  if (firstValue === '') {
    firstValue = secondValue;
    secondValue = '';
  }
};

const onRenderOperation = () => {
  const results = `${firstValue} ${signMathematicalOperations} ${secondValue}`;
  displayResult.innerHTML = results;
  return results;
};

const calculateResult = () => {
  const num1 = Number(firstValue);
  const num2 = Number(secondValue);
  let resultValue = '';
  endOperation = true;

  switch (signMathematicalOperations) {
    case '+':
      resultValue = (num1 + num2);
      break;
    case '-':
      resultValue = (num1 - num2);
      break;
    case '*':
      resultValue = (num1 * num2);
      break;
    case '/':
      resultValue = !num2 ?  error :  (num1 / num2);
      break;
    case '%':
      resultValue = (num1 % num2);
      break;
  };
  secondValue = '';
  firstValue = resultValue;
  result.innerHTML = resultValue;
  console.log(firstValue, secondValue, 'v');
};


const onGetValue = value => {
  if (mathematicalOperations.includes(value)) onOperations(value);
  if (numbers.includes(value)) onSecondNumber(value);

  onRenderOperation();
  if (mathematicalOperations.includes(value)) {
    console.log(value);
    // calculateResult();
  }
  if (value === '=') {
    displayResult.innerHTML = `${onRenderOperation()} =`;
    calculateResult();
  }
};

const onInit = () => {
  bet_keyboard.forEach(btn => {
    btn.onclick = () => onGetValue(btn.textContent)
  });
};

onInit();
