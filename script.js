const numberButtons = document.querySelectorAll(".number");
const displayBox = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".compute");

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
      clear();
      displayBox.textContent += element.textContent;
      state = "input";
    }
  });
});

operatorButtons.forEach((element) => {
  element.addEventListener("click", () => {
    operator = element.textContent;
    numbers.push(parseInt(displayBox.textContent));
    clear();
    if (numbers.length > 1) {
      overflow = true;
      operate(numbers[0], numbers[1], operator);
    }
  });
});

clearButton.addEventListener("click", () => {
  clear();
});

equalsButton.addEventListener("click", () => {
  if (numbers.length < 2) {
    numbers.push(parseInt(displayBox.textContent));
    operate(numbers[0], numbers[1], operator);
  }
});

function clear() {
  displayBox.textContent = "";
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
    case "add":
      result = add(num1, num2);
      break;
    case "subtract":
      result = subtract(num1, num2);
      break;
    case "multiply":
      result = multiply(num1, num2);
      break;
    case "divide":
      result = divide(num1, num2);
      break;
  }
  displayBox.textContent = result;
  state = "answer";
  console.log(overflow);
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
