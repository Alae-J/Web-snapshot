const inputs = document.querySelectorAll(".css-controller input");
inputs.forEach((inputs) => inputs.addEventListener("change" /* the event */, update /* the function we want to call */ /*, options: most used is the boolean {once: true} (the event listener can only be triggered one time*/));
function update () {
    const suffixData = this.dataset.sizing || "";
    document.documentElement.style.setProperty(
        `--${this.name}`,
        this.value + suffixData
    );
}
// .addEventListener();
// .createElement();
// .querySelector();
// Class;
// constructor();
// this.;
// const;
// let;
// classList.add();
// classList.remove();
// .appendChild();
// .push();
// .forEach();
// style.left;
// style.bottom;
// .shift();
// clearInterval();
// setInterval();
// Events;
// keyCodes;
// e.key;
// .innerHTML;
// .removeChild();
// .firstChild;
// while loop;
// for loops;
// if statements;
// Increment operators;
// Bang;
// &&;
// Math.random();
// console.log();