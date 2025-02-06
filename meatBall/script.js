const movingContainer = document.getElementById('moving-container');

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event; // Get cursor coordinates
    movingContainer.style.transform = `translate(${clientX}px, ${clientY}px)`;
});
