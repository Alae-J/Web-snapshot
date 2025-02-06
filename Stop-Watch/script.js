// Ensures the script runs after the page loads
window.onload = function () {

    // Variables to track seconds and milliseconds
    let minutes = 0;
    let seconds = 0;
    let miliSeconds = 0;

    // Interval ID for controlling the timer
    let interval;

    // DOM elements for dynamic updates
    const addMinutes = document.querySelector(".minutes");
    const addSeconds = document.querySelector(".seconds"); // Displays seconds
    const addMiliSeconds = document.querySelector(".milli"); // Displays milliseconds
    const startBtn = document.querySelector(".start"); // Start button
    const stopBtn = document.querySelector(".stop"); // Stop button
    const resetBtn = document.querySelector(".reset"); // Reset button

    // Starts the timer
    startBtn.onclick = function () {
        clearInterval(interval); // Ensures no duplicate intervals
        interval = setInterval(start, 10); // Calls 'start' every 10ms
    }

    // Stops the timer
    stopBtn.onclick = function () {
        clearInterval(interval); // Stops the interval loop
    }

    // Resets the timer
    resetBtn.onclick = function () {
        clearInterval(interval); // Stops the timer
        seconds = 0; // Resets seconds
        miliSeconds = 0; // Resets milliseconds
        addSeconds.innerHTML = "00"; // Updates the seconds display
        addMiliSeconds.innerHTML = "00"; // Updates the milliseconds display
        addMinutes.innerHTML = "00";
    }

    // Core function to handle time calculations
    function start() {
        miliSeconds++; // Increment milliseconds

        // Display two-digit milliseconds (e.g., 01, 02)
        if (miliSeconds < 10) {
            addMiliSeconds.innerHTML = "0" + miliSeconds;
        } else {
            addMiliSeconds.innerHTML = miliSeconds;
        }

        // Convert to seconds after 99 milliseconds
        if (miliSeconds > 99) {
            seconds++; // Increment seconds
            miliSeconds = 0; // Reset milliseconds
            addMiliSeconds.innerHTML = "00"; // Reset milliseconds display

            // Display two-digit seconds (e.g., 01, 02)
            addSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }

        if (seconds > 59) {
            minutes++; // Increment seconds
            seconds = 0;
            miliSeconds = 0; // Reset milliseconds
            addSeconds.innerHTML = "00";
            addMiliSeconds.innerHTML = "00"; // Reset milliseconds display

            // Display two-digit seconds (e.g., 01, 02)
            addMinutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
        }
    }
}
