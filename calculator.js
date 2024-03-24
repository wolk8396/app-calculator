const bet_keyboard = document.querySelectorAll('.btn');
const bet_reset = document.querySelector('.reset');
const btn_delete = document.querySelector('.delete');
const btn_results = document.querySelector('.btn-results');
const btn_dot = document.querySelector('.dot');
const btn_percent = document.querySelector('.percent');
const result = document.querySelector('.results');
const displayResult = document.querySelector('.operations');

const error  = 'деление на ноль невозможно';
const regexNum = /^\d+$/;
const regexOperation = /[/*\-+]/;
const checkNum = /\d+[+\-*/]\d+/;
const regexAfterNum = /\d*?[+\-*\/]$/;
const regexReplaceSymbol = /[/*\-+]+$/;

let finalResults = '';
let date = '0';
let str = '';

const parseExpressionStr = expression => {
  let currentExpression = '';
  const parsedExpression = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (regexOperation.test(char) && currentExpression === '') {
      currentExpression += char;
    } else if (regexOperation.test(char)) {
      parsedExpression.push(currentExpression.trim());
      parsedExpression.push(char);
      currentExpression = '';
    } else {
      currentExpression += char;
    }
  }

  parsedExpression.push(currentExpression.trim());
  return parsedExpression;
};

const onReset = () => {
  finalResults = '';
  result.innerHTML = '0';
  displayResult.innerHTML = '';
  date = '0';
  str = '';
};

const onGtePercent = () => {
  if (!!finalResults || regexNum.test(date)) {
    date = String(Number(date) / 100)
    result.innerHTML = `${date}`;
    displayResult.innerHTML = '';
  }
};

const onSetSrt = value => {
  let newSymbol;
  if (date === '0' && !regexOperation.test(value)) date = '';
  date += value.trim();

  if (regexOperation.test(date)) {
    newSymbol = regexAfterNum.test(value) ? value : '';
    date = date.replace(regexReplaceSymbol, '');
    date  = date + newSymbol;
  };
  displayResult.innerHTML = date;
};

const onDeleteStr = () => {
  date = date.slice(0, -1);
  str = str.slice(0, -1);
  if (!str) {
    str = '';
    date = '0';
    finalResults = '';
  }
  displayResult.innerHTML = `${date}`;
  result.innerHTML = '0';
};

const addDotToString = () => {
  if (!str.includes('.') || !date.includes('.')) {
    str += '.';
    date += '.'
  };
  displayResult.innerHTML = date;
  result.innerHTML = str;
};

const onGetResults = () => {
  console.log(date);
  if (!regexNum.test(date)) calculateResult();
};

const calculateResult = () => {
  const res = parseExpressionStr(date)
  const num1 = Number(res[0]);
  const num2 = Number(res[2]);
  let resultValue = '';
  str = '';
  switch (res[1]) {
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
  };

  if (checkNum.test(date)) finalResults = date;
  result.innerHTML = resultValue;
  date = String(resultValue);
  displayResult.innerHTML = `${finalResults}=${date.replace(/^0+/, "")}`;
};

const onGetValue = value => {
  if (regexOperation.test(value)) {
    str = '';
    result.innerHTML = '';
  };

  if (regexNum.test(value)) {
    str += value;
    result.innerHTML = str;
  };

  if (checkNum.test(date) && regexOperation.test(value)) {
    calculateResult();
  };

  if (regexOperation.test(value) || regexNum.test(value)) {
    onSetSrt(value);
  };
};

btn_delete.addEventListener('click', onDeleteStr);
bet_reset.addEventListener('click', onReset);
btn_results.addEventListener('click', onGetResults);
btn_dot.addEventListener('click', addDotToString);
btn_percent.addEventListener('click', onGtePercent);

document.addEventListener('keydown', function(event) {
  const key =  event.key;
  switch (true) {
    case key === 'Escape' :
      onReset();
      break;
    case key === 'Backspace' :
      onDeleteStr();
      break;
    case key === '.' :
      addDotToString();
      break;
    case  regexOperation.test(key) || regexNum.test(key) :
      onGetValue(key)
      break;
    case key === 'Enter':
      onGetResults();
      break;
  }
});

const onInit = () => {
  bet_keyboard.forEach(btn => {
    btn.onclick = () => onGetValue(btn.textContent);
  });
};

onInit();
