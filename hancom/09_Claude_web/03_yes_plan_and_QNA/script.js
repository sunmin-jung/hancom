// ===== 화면과 연결 =====
// 결과가 보이는 화면(display) 영역을 가져온다.
const display = document.getElementById("display");

// 지금 화면에 표시할 계산식을 저장하는 변수 (처음엔 비어 있음)
let expression = "";

// ===== 화면을 새로 그려주는 함수 =====
function updateDisplay() {
  // 내용이 없으면 0을 보여주고, 있으면 계산식을 보여준다.
  // 화면에는 * / 대신 보기 좋은 × ÷ 기호로 바꿔서 표시한다.
  const shown = expression === "" ? "0" : expression;
  display.textContent = shown.replace(/\*/g, "×").replace(/\//g, "÷");
}

// ===== 숫자나 연산자를 입력하는 함수 =====
function inputValue(value) {
  expression += value;   // 기존 식 뒤에 이어 붙인다
  updateDisplay();
}

// ===== 전부 지우기 (C) =====
function clearAll() {
  expression = "";
  updateDisplay();
}

// ===== 한 글자 지우기 (←) =====
function backspace() {
  expression = expression.slice(0, -1);  // 마지막 글자 하나 제거
  updateDisplay();
}

// ===== 계산 실행 (=) =====
function calculate() {
  // 입력한 게 없으면 아무것도 하지 않는다.
  if (expression === "") return;

  try {
    // 자바스크립트에게 계산을 시킨다.
    let result = Function('"use strict"; return (' + expression + ')')();

    // 0으로 나누기처럼 계산이 안 되는 경우 처리
    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      display.textContent = "오류 😢";
      expression = "";
      return;
    }

    // 소수점이 너무 길어지지 않게 다듬는다.
    result = Math.round(result * 100000000) / 100000000;

    expression = String(result);  // 결과를 다음 계산에 이어 쓸 수 있게 저장
    updateDisplay();
  } catch (e) {
    // 식이 잘못되었을 때
    display.textContent = "오류 😢";
    expression = "";
  }
}

// ===== 버튼 클릭 처리 (마우스) =====
// 모든 버튼을 찾아서 클릭했을 때 무슨 일을 할지 정해준다.
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const action = button.dataset.action;  // clear / back / equal
    const value = button.dataset.value;     // 숫자나 연산자

    if (action === "clear") {
      clearAll();
    } else if (action === "back") {
      backspace();
    } else if (action === "equal") {
      calculate();
    } else {
      inputValue(value);
    }
  });
});

// ===== 키보드 입력 처리 =====
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    inputValue(key);                 // 숫자키
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    inputValue(key);                 // 연산자키
  } else if (key === ".") {
    inputValue(".");                 // 소수점
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();          // 엔터로 페이지가 새로고침되지 않게
    calculate();                     // 엔터 = 계산
  } else if (key === "Backspace") {
    backspace();                     // 백스페이스 = 한 글자 지우기
  } else if (key === "Escape") {
    clearAll();                      // ESC = 전부 지우기
  }
});

// 처음 화면을 0으로 표시
updateDisplay();
