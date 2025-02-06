const generateBtn = document.querySelector("#generateBtn");

generateBtn.addEventListener("click", updateColor);

function generateRandomColor () {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i ++) 
        color += letters [Math.floor(Math.random() * 16)];
    return color;
}

function isDark(color) {
    let total = 0;

    for (let i = 1; i < 7; i++) {
        let currentChar = color[i];

        // Check if the current character is a digit (0-9)
        if (currentChar >= '0' && currentChar <= '9') {
            total += parseInt(currentChar, 16); // Convert to numeric value
        } else {
            // Convert hex letters (A-F) to numbers 10-15
            total += parseInt(currentChar, 16); // 'A' becomes 10, 'B' becomes 11, ...
        }
    }

    // Return true if the total is below the threshold, indicating a dark color
    return total < 48; // Adjust this threshold as needed
}
function updateColor() {
    const colorBox = document.querySelector("#colorBox");
    const colorText = document.querySelector("#colorText");
    const randomColor = generateRandomColor();

    colorBox.style.backgroundColor = randomColor;
    colorText.textContent = randomColor;

    if (isDark(randomColor)) {
        colorText.style.color = "rgb(221, 212, 212)"; // Dark color -> White text
    } else {
        colorText.style.color = "#333444"
    }
}
