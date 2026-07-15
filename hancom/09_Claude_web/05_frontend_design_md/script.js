// ==========================================================
//  기본 계산기 로직 (덧셈 · 뺄셈 · 곱셈 · 나눗셈)
//  eval() 을 쓰지 않고, 값을 직접 관리하는 상태 머신 방식
// ==========================================================

// --- 화면 요소 ---
const currentEl = document.getElementById("current");       // 큰 숫자
const expressionEl = document.getElementById("expression"); // 작은 수식
const displayEl = document.querySelector(".display");
const keys = document.getElementById("keys");

// --- 계산기 상태 ---
let current = "0";        // 지금 입력 중인 숫자 (문자열)
let previous = null;      // 이전에 저장한 숫자
let operator = null;      // 선택한 연산자: + - * /
let justEvaluated = false; // 방금 '=' 를 눌렀는지
let isError = false;

// 화면에 보이는 연산자 기호로 바꿔주는 표
const OP_SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

// --- 화면 갱신 ---
function updateDisplay() {
  currentEl.textContent = current;
  if (previous !== null && operator) {
    expressionEl.textContent = `${previous} ${OP_SYMBOLS[operator]}`;
  } else {
    expressionEl.innerHTML = "&nbsp;";
  }
  displayEl.classList.toggle("is-error", isError);
}

// --- 전체 초기화 (C) ---
function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  justEvaluated = false;
  isError = false;
  updateDisplay();
}

// --- 숫자 입력 ---
function inputDigit(digit) {
  if (isError) clearAll();

  // '=' 직후 숫자를 누르면 새 계산 시작
  if (justEvaluated) {
    current = digit;
    previous = null;
    operator = null;
    justEvaluated = false;
  } else if (current === "0") {
    current = digit; // 맨 앞의 0 은 덮어쓴다
  } else {
    current += digit;
  }
  updateDisplay();
}

// --- 소수점 입력 ---
function inputDecimal() {
  if (isError) clearAll();
  if (justEvaluated) {
    current = "0";
    previous = null;
    operator = null;
    justEvaluated = false;
  }
  if (!current.includes(".")) {
    current += ".";
  }
  updateDisplay();
}

// --- 실제 계산 ---
function compute(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) return null; // 0 으로 나누기 → 에러
      return a / b;
  }
}

// 긴 소수를 깔끔하게 정리 (부동소수점 오차 줄이기)
function formatResult(value) {
  const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
  return String(rounded);
}

// --- 연산자 입력 (+ - * /) ---
function chooseOperator(op) {
  if (isError) return;

  // 이미 이전 숫자 + 연산자가 있으면 먼저 계산 (연속 계산)
  if (previous !== null && operator && !justEvaluated) {
    const result = compute(previous, current, operator);
    if (result === null) return showError();
    current = formatResult(result);
  }

  previous = current;
  operator = op;
  justEvaluated = false;
  current = "0";
  // 화면에는 이전 숫자 + 연산자를 보여주고, current 는 다시 입력받는다
  currentEl.textContent = previous;
  expressionEl.textContent = `${previous} ${OP_SYMBOLS[op]}`;
}

// --- 등호 (=) ---
function equals() {
  if (isError || previous === null || operator === null) return;

  const result = compute(previous, current, operator);
  if (result === null) return showError();

  expressionEl.textContent = `${previous} ${OP_SYMBOLS[operator]} ${current} =`;
  current = formatResult(result);
  previous = null;
  operator = null;
  justEvaluated = true;
  currentEl.textContent = current;
}

// --- 에러 표시 ---
function showError() {
  current = "Error";
  previous = null;
  operator = null;
  isError = true;
  justEvaluated = false;
  updateDisplay();
}

// --- 버튼 클릭 처리 ---
keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.digit !== undefined) inputDigit(btn.dataset.digit);
  else if (btn.dataset.op !== undefined) chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "decimal") inputDecimal();
  else if (btn.dataset.action === "equals") equals();
  else if (btn.dataset.action === "clear") clearAll();
});

// --- 키보드 입력 처리 ---
document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (k >= "0" && k <= "9") inputDigit(k);
  else if (k === ".") inputDecimal();
  else if (k === "+" || k === "-" || k === "*" || k === "/") chooseOperator(k);
  else if (k === "Enter" || k === "=") { e.preventDefault(); equals(); }
  else if (k === "Escape") clearAll();
  else if (k === "Backspace") backspace();
});

// --- 지우기 (한 글자) — 키보드 Backspace 전용 ---
function backspace() {
  if (isError || justEvaluated) { clearAll(); return; }
  current = current.length > 1 ? current.slice(0, -1) : "0";
  updateDisplay();
}

// 처음 화면 세팅
updateDisplay();
