const numberButtons = document.querySelectorAll(".number");
const displayBox = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".compute");
const pointButton = document.querySelector(".point");

let numbers = [];
let operator;
let display = "";
let state = "input";
let result;
let overflow = false;

numberButtons.forEach((element) => {
  element.addEventListener("click", () => {
    if (state == "input") {
      displayBox.textContent += element.textContent;
    } else if (state == "answer") {
      clearDisplay();
      displayBox.textContent += element.textContent;
      state = "input";
    }
  });
});

pointButton.addEventListener("click", (element) => {
  if (!displayBox.textContent.includes(".")) {
    console.log(element.target.textContent);
    displayBox.textContent += element.target.textContent;
  }
});

operatorButtons.forEach((element) => {
  element.addEventListener("click", () => {
    operator = element.textContent;
    numbers.push(parseFloat(displayBox.textContent));
    clearDisplay();
    if (numbers.length > 1) {
      overflow = true;
      operate(numbers[0], numbers[1], operator);
    }
  });
});

clearButton.addEventListener("click", () => {
  clearMem();
});

equalsButton.addEventListener("click", () => {
  numbers.push(parseFloat(displayBox.textContent));
  overflow = false;
  operate(numbers[0], numbers[1], operator);
});

function clearDisplay() {
  displayBox.textContent = "";
}

function clearMem() {
  clearDisplay();
  numbers.pop();
  numbers.pop();
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "÷":
      result = divide(num1, num2);
      break;
  }
  displayBox.textContent = result;
  if (displayBox.textContent.length > 10) {
    displayBox.textContent = Math.round(result * 10 ** 9) / 10 ** 9;
  }
  state = "answer";
  if (overflow == true) {
    numbers.pop();
    numbers.pop();
    numbers.push(result);
  } else {
    numbers.pop();
    numbers.pop();
  }

  console.log(numbers);
}
