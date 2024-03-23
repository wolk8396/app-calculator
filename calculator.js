const bet_keyboard = document.querySelectorAll('.btn');
const bet_reset = document.querySelector('.reset');
const result = document.querySelector('.results');
const displayResult = document.querySelector('.operations');
const numbers = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];
const mathematicalOperations = ['/', '*', '-', '+', '%'];
const calculatorRegex = /^-?\d+(\.\d+)?\s*[-+*/%]\s*\d+(\.\d+)?$/;
const replaceStr = /(-?\d+)\s*([-+*/])\s*/g;
const regex = /-?\d+|[\/\*\-\+%]/g;
const error  = 'деление на ноль невозможно';
let finalResults = false;
let firstValue ='';
let secondValue = '';
let signMathematicalOperations ='';
let endOperation = false;
let date = '0';
let str = '';

const onReset = () => {
  endOperation = false;
  finalResults = false;
  firstValue = '';
  secondValue = '';
  signMathematicalOperations = '';
  result.innerHTML = '0';
  displayResult.innerHTML = '';
  date = '0';
  str = '';
};

bet_reset.addEventListener('click', onReset);

const onRenderOperation = () => {
  const results = `${firstValue} ${signMathematicalOperations} ${secondValue}`;
  displayResult.innerHTML = results;
  return results;
};

const calculateResult = () => {
  const num1 = Number(firstValue);
  const num2 = Number(secondValue);
  let resultValue = '';
  str = '';

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
  date = String(resultValue);
};

const test = value => {
  let matchResult;
  let results;
  date = `${date}${value.trim()}`;
  displayResult.innerHTML = `${date}`
  matchResult = date.match(calculatorRegex);

  if (matchResult !== null) {
    results = matchResult[0].replace(replaceStr, '$1 $2 ').match(regex);
    console.log(results);
    firstValue = results[0].replace(/^0+/, "");
    signMathematicalOperations = results[1];
    secondValue = results[2].replace(/^0+/, "");
    finalResults = true;
  }
};

const onGetValue = value => {
  if (mathematicalOperations.includes(value)) {
    str = '';
    result.innerHTML = '';
  };

  if (numbers.includes(value)) {
    str += value;
    result.innerHTML = str;
  };

  if (mathematicalOperations.includes(value)  && finalResults) {
    calculateResult();
  };

  if ((mathematicalOperations.includes(value) || numbers.includes(value))) {
    test(value);
  };
 
  if (value === '=') {
    finalResults = false;
    displayResult.innerHTML = `${date.replace(/^0+/, "")} =`;
    calculateResult();
  };
};

const onInit = () => {
  bet_keyboard.forEach(btn => {
    btn.onclick = () => onGetValue(btn.textContent)
  });
};

onInit();
