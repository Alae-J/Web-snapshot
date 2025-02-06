// Select all accordion elements
const accordions = document.querySelectorAll(".accordion");

// Loop through each accordion
accordions.forEach((accordion) => {
    // Add click event listener to the accordion
    accordion.addEventListener("click", () => {
        // Toggle the 'active' class
        accordion.classList.toggle("active");
    });
});
