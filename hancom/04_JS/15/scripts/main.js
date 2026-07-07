class Dog {
    constructor(name) {
        this.name = name;
    }
    bark() {
        return `${this.name}: 멍멍!`;
    }
}

const out = document.querySelector("#out");

const poppy = new Dog("퍼피");
const choco = new Dog("초코");

document.querySelector("#bark").addEventListener("click", () => {
    out.textContent = `${poppy.bark()} ${choco.bark()}`;
});