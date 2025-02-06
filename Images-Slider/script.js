let nextBtn = document.querySelector(".next");
let sliderImgs = document.querySelectorAll(".slider img");
let slider = document.querySelector(".slider");
let prevBtn = document.querySelector(".prev");

let currentIndex = 0;

const showSlider = (index) => {
    currentIndex ++;
    if (currentIndex < 0) {
        currentIndex = sliderImgs.length - 1;
    } else if (currentIndex >= sliderImgs.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", function () {
    showSlider (currentIndex + 1);
});

prevBtn.addEventListener("click", function () {
    showSlider (currentIndex - 1);
})