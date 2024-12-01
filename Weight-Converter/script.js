const form = document.querySelector("form");
form.addEventListener("submit", function(e){
    e.preventDefault(); // to avoid refreshing the page when we click on the enter button.
    const input = document.querySelector("input");
    const convertedWeight = document.querySelector("span");
    let kgToPound;
    if ((isNaN(input.value)) || input.value <= 0){
        convertedWeight.classList.add("error");
        convertedWeight.innerHTML = "<p>Please enter a valid number!</p>"
        setTimeout(()=>{
            convertedWeight.innerHTML = "";
            convertedWeight.classList.remove("error");
        }, 2500);
        input.value = "";
    }
    else {
        kgToPound = Number(input.value) * 2.20462;
        convertedWeight.classList.add("successful");
        convertedWeight.innerHTML = `${kgToPound.toFixed(3)}`;
        setTimeout(()=>{
            convertedWeight.innerHTML = "";
            convertedWeight.classList.remove("successful");
        }, 10000);
    }
})