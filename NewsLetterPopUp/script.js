function toggleNewsLetter(){
    const newsLetter = document.getElementById("newsLetter");
    newsLetter.classList.toggle("active");
    /*  The "toggleNewsLetter" function is triggered by user interaction (e.g., button click).
        It selects the "newsLetter" element using its ID and toggles the "active" class:
        - If the "active" class is not present, it adds it, making the newsletter pop-up visible.
        - If the "active" class is already present, it removes it, hiding the pop-up.
        This allows for showing and hiding the newsletter in response to user actions. 
    */
}
