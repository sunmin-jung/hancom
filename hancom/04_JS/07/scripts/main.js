const multiply = (num1,num2) => num1 * num2;

const a= document.querySelector("#a");
const b= document.querySelector("#b");
const c= document.querySelector("#c")
const out = document.querySelector("#out");

document.querySelector("#calc").addEventListener("click", () =>{
    out.textContent = `${a.value} * ${b.value} * ${c.value}= ${multiply(Number
        (a.value), Number(b.value), Number(c.value))}`;
    });
