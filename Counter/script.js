(function () {
    const buttons = document.querySelectorAll(".btn-counter");
    let count = 0;
    const counter = document.querySelector(".counter-machine");
    const counterContainer = document.querySelector(".counter");

    buttons.forEach(function(button){
        button.addEventListener("click", function(){
            if (button.classList.contains("decrease-btn")) count --; 
            else if (button.classList.contains("increase-btn")) count ++;
            counter.textContent = count;
            if (count > 0) {
                counterContainer.classList.remove("negative");
                counterContainer.classList.add("positive");
                /*
                    When the counter value is greater than zero, the default counter 
                    class remains intact on the container, and the JavaScript dynamically
                    adds the positive class to it. The positive class does not replace 
                    the counter class; it simply adds additional styling (in this case, 
                    the green border) on top of the default counter styles.
                */
            }
            else if (count < 0) {
                counterContainer.classList.remove("positive");
                counterContainer.classList.add("negative");
            }
            else {
                counterContainer.classList.remove("positive", "negative");
            }
        });
    });
})();