const textarea = document.querySelector("textarea");
const counter = document.querySelector(".counter");
function countingCharacters(){
    const textlength = textarea.value.length;
    counter.innerHTML = `${textlength}`;
}