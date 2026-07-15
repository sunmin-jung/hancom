// ============================================================
//  가산기 (The Adding Machine) — 계산 로직
//  ※ 03_yes_plan_and_QNA/script.js 의 검증된 로직을 재사용하고,
//     "=" 를 누를 때마다 종이 테이프에 한 줄 인쇄하는 기능을 더했습니다.
// ============================================================

// ===== 화면 요소 연결 =====
const display = document.getElementById("display"); // LED 표시창
const tape    = document.getElementById("tape");    // 종이 테이프

// 지금 입력 중인 계산식 (처음엔 비어 있음)
let expression = "";

// 화면에는 * / - 대신 보기 좋은 × ÷ − 기호로 바꿔서 표시한다.
function pretty(text) {
  return text.replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−");
}

// ===== LED 표시창 새로 그리기 =====
function updateDisplay() {
  display.textContent = expression === "" ? "0" : pretty(expression);
}

// ===== 숫자나 연산자를 입력 =====
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
  expression = expression.slice(0, -1);
  updateDisplay();
}

// ===== 종이 테이프에 한 줄 인쇄 =====
// exprText: 계산한 식 / resultText: 결과(또는 오류 메시지) / isError: 오류 여부
function printToTape(exprText, resultText, isError) {
  // 첫 인쇄면 안내 문구를 지운다
  const hint = tape.querySelector(".tape-hint");
  if (hint) hint.remove();

  const entry = document.createElement("div");
  entry.className = "tape-entry new";   // new = 밀려 나오는 애니메이션

  const expr = document.createElement("span");
  expr.className = "t-expr";
  expr.textContent = pretty(exprText);

  const result = document.createElement("span");
  result.className = isError ? "t-error" : "t-result";
  result.textContent = isError ? resultText : "= " + resultText;

  entry.appendChild(expr);
  entry.appendChild(result);
  tape.appendChild(entry);

  // 애니메이션이 끝나면 new 클래스를 떼어 다음 인쇄를 준비한다
  entry.addEventListener("animationend", () => entry.classList.remove("new"));
}

// ===== 계산 실행 (=) =====
function calculate() {
  if (expression === "") return;
  const shown = expression;   // 인쇄용으로 원래 식을 기억해 둔다

  try {
    // 자바스크립트에게 계산을 시킨다.
    let result = Function('"use strict"; return (' + expression + ')')();

    // 0으로 나누기처럼 계산이 안 되는 경우 처리
    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      display.textContent = "오류";
      printToTape(shown, "오류 · 0으로 나눌 수 없어요", true);
      expression = "";
      return;
    }

    // 소수점이 너무 길어지지 않게 다듬는다.
    result = Math.round(result * 100000000) / 100000000;

    printToTape(shown, String(result), false);  // 테이프에 인쇄
    expression = String(result);                 // 결과를 이어서 계산 가능
    updateDisplay();
  } catch (e) {
    // 식이 잘못되었을 때
    display.textContent = "오류";
    printToTape(shown, "오류 · 식을 확인하세요", true);
    expression = "";
  }
}

// ===== 버튼 클릭 처리 (마우스) =====
const keys = document.querySelectorAll(".key");

keys.forEach(function (key) {
  key.addEventListener("click", function () {
    const action = key.dataset.action;  // clear / back / equal
    const value  = key.dataset.value;   // 숫자나 연산자

    if (action === "clear")      clearAll();
    else if (action === "back")  backspace();
    else if (action === "equal") calculate();
    else                         inputValue(value);
  });
});

// ===== 키보드 입력 처리 =====
// 키보드로 눌러도 해당 버튼이 잠깐 눌린 것처럼 보이게 한다
function flash(selector) {
  const btn = document.querySelector(selector);
  if (!btn) return;
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 90);
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    inputValue(key);
    flash('.key[data-value="' + key + '"]');
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    inputValue(key);
    flash('.key[data-value="' + key + '"]');
  } else if (key === ".") {
    inputValue(".");
    flash('.key[data-value="."]');
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();       // 엔터로 페이지가 새로고침되지 않게
    calculate();
    flash('.key[data-action="equal"]');
  } else if (key === "Backspace") {
    backspace();
    flash('.key[data-action="back"]');
  } else if (key === "Escape") {
    clearAll();
    flash('.key[data-action="clear"]');
  }
});

// 처음 화면을 0으로 표시
updateDisplay();
