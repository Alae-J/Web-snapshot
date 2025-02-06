/************************************************************
SCROLL-ACTIVATED NAVBAR SHADOW
************************************************************/
const navbar = document.getElementById('navbar');

// Listen for scroll events
window.addEventListener('scroll', () => {
    // If scrolled down, add 'scrolled' class
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/************************************************************
TOGGLE MOBILE MENU
************************************************************/
const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('show');
});

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navUl.classList.remove('show');
    });
});

/************************************************************
THEME TOGGLE
************************************************************/
const themeToggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Read from localStorage if we want to remember user choice
const currentTheme = localStorage.getItem('theme') || 'light';

// Set the initial theme
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggleButton.addEventListener('click', () => {
    let newTheme = (htmlElement.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update the icon on toggle button
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.textContent = '🌙';
    } else {
        themeIcon.textContent = '☀️';
    }
}

/************************************************************
DYNAMIC YEAR FOR FOOTER
************************************************************/
const currentYear = document.getElementById('current-year');
currentYear.textContent = new Date().getFullYear();

/************************************************************
CONTACT FORM SUBMISSION (CLIENT-SIDE)
************************************************************/
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }
    
    // You could use fetch/XHR to send data to your backend
    alert('Thank you for reaching out! I will get back to you soon.');
    contactForm.reset();
});
