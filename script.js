const numberButtons = document.querySelectorAll(".number");
const displayBox = document.querySelector(".display");
const clearButton = document.querySelector(".clear");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".compute");
const pointButton = document.querySelector(".point");

let numbers = [];
let operator = "";
let display = "";
let state = "input";
let result;
let overflow = false;
let operatorHistory = [];

numberButtons.forEach((element) => {
  element.addEventListener("click", () => {
    if (state == "input") {
      displayBox.textContent += element.textContent;
    } else if (state == "solidState") {
      clearDisplay();
      displayBox.textContent += element.textContent;
      state = "input";
    }
  });
});

pointButton.addEventListener("click", (element) => {
  if (!displayBox.textContent.includes(".")) {
    displayBox.textContent += element.target.textContent;
  }
});

operatorButtons.forEach((element) => {
  element.addEventListener("click", () => {
    operator = element.textContent;
    operatorHistory.push(operator);
    numbers.push(parseFloat(displayBox.textContent));
    clearDisplay();
    console.log(numbers);
    if (numbers.length > 1) {
      overflow = true;
      operate(
        numbers[0],
        numbers[1],
        operatorHistory[operatorHistory.length - 2]
      );
    }
  });
});

operatorButtons.forEach((element) => {
  addmouseHover(element);
});

clearButton.addEventListener("click", () => {
  clearMem();
});

addmouseHover(equalsButton);

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
  numbers.splice(0, numbers.length);
  operator = "";
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

function addmouseHover(element) {
  element.addEventListener("mouseover", () => {
    element.style.filter = "brightness(90%)";
  });
  element.addEventListener("mouseleave", () => {
    element.style.filter = "";
  });
}

function operate(num1, num2, operator) {
  if (operator == "") {
    numbers.splice(0, numbers.length);
    return;
  }
  if (num2 == undefined || num1 == undefined) {
    numbers.splice(0, numbers.length);
    return;
  }
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
  state = "solidState";
  if (overflow == true) {
    numbers.splice(0, numbers.length);
    numbers.push(result);
  } else {
    numbers.splice(0, numbers.length);
  }
  operator = "";
}
