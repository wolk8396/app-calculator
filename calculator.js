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
let disabled = true;
let date = '0';
let str = '';
let isError = false;

const parseExpressionStr = expression => {
  const result = expression
    .replace(/([-+/*])|(\d*\.?\d+(?:e[-+]?\d+)?)/g, '$1$2 ')
    .match(/(-?\d*\.?\d+(?:e[-+]?\d+)?|\S+)/g);
    if (result.length > 0) {
      const firstChar = result[0];
      if (firstChar === '-' && result.length > 1) {
        result[0] += result[1];
        result.splice(1, 1);
      }
    }
  return result;
};

const handleKeyboard = key => {
  if (key === 'Escape') onReset();
  if (key === 'Backspace' && !isError) onDeleteStr();
  if( key === '.' && !isError) addDotToString();
  if(regexOperation.test(key) || regexNum.test(key)) onGetValue(key);
  if (key === 'Enter' && !isError) onGetResults();
  if (key === '%' && !isError) onGtePercent();
}

const ChangeSizeTextResults = length => {
  length >= 10 ?
    result.classList.add('isActive') :
    result.classList.remove('isActive');
}

const onSetError = value => {
  isError = value;
  value ? 
    result.classList.add('isError') :
    result.classList.remove('isError');
}

const onReset = () => {
  finalResults = '';
  result.innerHTML = '0';
  displayResult.innerHTML = '';
  disabled = true;
  date = '0';
  str = '';
  onSetError(false);
};

const onGtePercent = () => {
  if ((!!finalResults || regexNum.test(date)) && !isError) {
    date = String(Number(date) / 100)
    result.innerHTML = `${date}`;
    displayResult.innerHTML = '';
  }
};

const onRemoveDot = value => {
  if (date.endsWith('.') && regexOperation.test(value)) {
    date = date.slice(0, -1);
  };
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
  };

  displayResult.innerHTML = `${date}`;
  result.innerHTML = str;
  isError = false;
  onSetError(false);
};

const addDotToString = () => {
  if(!!finalResults  && !isError) {
    str = '0.';
    date = '0.';
  };

  if((!str.includes('.') || !date.includes('.')) && !isError) {
    date += '.';
    str = str === '' ? str = '0.' : str += '.';
  };

  if (!isError) {
    displayResult.innerHTML = date;
    result.innerHTML = str;
  };
};

const onGetResults = () => {
  if (disabled) calculateResult();
  disabled = false;
};

const calculateResult = () => {
  const res = parseExpressionStr(date)
  const num1 = Number(res[0]);
  const num2 = Number(res[2]);
  let resultValue = '';
  onRemoveDot(res[1]);

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
      onSetError(!num2);
      break;
  };

  if (checkNum.test(date)) finalResults = date;
  result.innerHTML = resultValue;
  date = String(resultValue);

  ChangeSizeTextResults(date.length);

  isError ? 
    displayResult.innerHTML = '' :
    displayResult.innerHTML = `${finalResults} =`;
};

const onGetValue = value => {
  onRemoveDot(value);
  if (regexOperation.test(value)) {
    str = '';
    result.innerHTML = '';
    disabled = true;
  };

  if (regexNum.test(value)) {
    str += value;
    result.innerHTML = str;
    ChangeSizeTextResults(str.length);
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
document.addEventListener('keydown', (event) => handleKeyboard(event.key))

const onInit = () => {
  bet_keyboard.forEach(btn => {
   btn.onclick = () => {
    if (!isError)  onGetValue(btn.textContent);
   } 
  });
};

onInit();
