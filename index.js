document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quizForm');
    const startButton = document.getElementById('startQuizBtn');
    const clearButton = document.getElementById('clearFormBtn');
    const nameInput = document.getElementById('userName');
    const movieInput = document.getElementById('favMovie');

    // When the user clicks on 'Start Quiz'
    startButton.addEventListener('click', function (event) {
        event.preventDefault();
        
        const name = nameInput.value;
        const favoriteMovie = movieInput.value;

        // Check if both fields are filled
        if (name && favoriteMovie) {
            // Redirect to the quiz page, passing the name and favorite movie as URL parameters
            window.location.href = `quiz.html?name=${encodeURIComponent(name)}&movie=${encodeURIComponent(favoriteMovie)}`;
        } else {
            alert('Please fill in all fields before starting the quiz.');
        }
    });

    // When the user clicks on 'Clear'
    clearButton.addEventListener('click', function (event) {
        event.preventDefault();
        nameInput.value = '';
        movieInput.value = '';
    });
});