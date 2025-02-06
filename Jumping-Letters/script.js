const letters = document.querySelectorAll(".letters span");
letters.forEach((letter) => {
    letter.addEventListener("click", () => {
        letter.classList.add("active");
        setTimeout(() => {
            letter.classList.remove("active");
        }, 2000);
    })
})