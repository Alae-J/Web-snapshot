const inputs = document.querySelectorAll(".css-controller input");
inputs.forEach((inputs) => inputs.addEventListener("change" /* the event */, update /* the function we want to call */ /*, options: most used is the boolean {once: true} (the event listener can only be triggered one time*/));
function update () {
    const suffixData = this.dataset.sizing || "";
    document.documentElement.style.setProperty(
        `--${this.name}`,
        this.value + suffixData
    );
}