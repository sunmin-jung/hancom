let n =0;
const btn =document.querySelector("#btn");
const out =document.querySelector("#count");

btn.addEventListener("click", () => {
    n++
    out.textContent = `${n}번 눌렀어요`;
});