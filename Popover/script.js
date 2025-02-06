const myBtn = document.querySelector("#first-button");
const button = document.querySelector("#button");
const container = document.querySelector(".container");

myBtn.addEventListener("click", () => {
    container.classList.add("active");
    myBtn.classList.add("inactive-button");
})
button.addEventListener("click", () => {
    container.classList.remove("active");
    myBtn.classList.remove("inactive-button");
})