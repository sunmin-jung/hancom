const IMG_A = "https://picsum.photos/96?random=1";
const IMG_B = "https://picsum.photos/96?random=2";
const IMG_C = "https://picsum.photos/96?random=3";
const IMG_D = "https://picsum.photos/96?random=4";

const myImage = document.querySelector("#pic");
myImage.setAttribute("src", IMG_A);

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === IMG_A) {
        myImage.setAttribute("src", IMG_B);
    } else if (mySrc === IMG_B) {
        myImage.setAttribute("src", IMG_C);
    } else if (mySrc === IMG_C) {
        myImage.setAttribute("src", IMG_D);
    } else {
        myImage.setAttribute("src", IMG_A);
    }
};