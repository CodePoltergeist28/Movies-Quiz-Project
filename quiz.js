document.addEventListener('DOMContentLoaded', function () {
    // Grab elements from the DOM
    const startQuizBtn = document.getElementById('startQuizBtn');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const quizForm = document.getElementById('quizForm');
    const quizPage = document.getElementById('quizPage'); // Reference to the quiz page
    const questions = document.querySelectorAll('.question'); // All question elements
    const nextQuestionBtns = document.querySelectorAll('.next-question-btn'); // Next question buttons

    let currentQuestionIndex = 0; // To track the current question
    let timer; // To hold the timer
    let score = 0; // Store the user's score

    // Handle form submission
    startQuizBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission (to stop page refresh)

        // Get values from form
        const userName = document.getElementById('userName').value;
        const favMovie = document.getElementById('favMovie').value;

        if (userName && favMovie) {
            // Hide the form and show the quiz page
            quizForm.style.display = 'none';  // Hide the form
            quizPage.style.display = 'block'; // Show the quiz page

            // Optionally, display user information
            alert(`Welcome ${userName}, your favorite movie is: ${favMovie}`);

            // Start the quiz by showing the first question
            showQuestion(currentQuestionIndex);
        } else {
            alert("Please fill in both fields.");
        }
    });

    // Handle form clearing
    clearFormBtn.addEventListener('click', function () {
        // Reset the form
        quizForm.reset();
    });

    // Show the question by index
    function showQuestion(index) {
        // Hide all questions
        questions.forEach((question, i) => {
            question.style.display = i === index ? 'block' : 'none';
        });

        // Stop the previous timer if it exists
        clearCurrentTimer();

        // Start the timer for this question
        startTimer(index);

        // Hide all "Next" buttons initially
        nextQuestionBtns.forEach(btn => btn.style.display = 'none');

        // Get the current question's "Next" button
        const nextBtn = questions[index].querySelector('.next-question-btn');

        // Set up the answer buttons for this question
        const answerButtons = questions[index].querySelectorAll('input[type="radio"]');
        answerButtons.forEach(button => {
            button.addEventListener('change', function () {
                // Show the "Next" button after an answer is selected
                nextBtn.style.display = 'block';

                // Increment score if answer is correct
                if (button.checked && button.dataset.correct === 'true') {
                    score++;
                }
            });
        });
    }

    // Timer function
    function startTimer(index) {
        const timerElement = questions[index].querySelector('.timer');
        let timeLeft = 15; // 15 seconds per question
        timerElement.textContent = `${timeLeft}s`;

        timer = setInterval(function () {
            timeLeft--;
            timerElement.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                // Move to next question automatically if time runs out
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    showQuestion(currentQuestionIndex);
                }
            }
        }, 1000);
    }

    // Clear the current timer
    function clearCurrentTimer() {
        if (timer) {
            clearInterval(timer);
        }
    }

    // Handle next question button click
    nextQuestionBtns.forEach((button, index) => {
        button.addEventListener('click', function () {
            // Move to the next question or finish the quiz
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                // After the last question, store the score and redirect to leaderboard
                localStorage.setItem('userScore', score); // Save score in localStorage
                localStorage.setItem('userName', document.getElementById('userName').value); // Save user name
                window.location.href = 'leaderboard.html'; // Redirect to leaderboard
            }
        });
    });
});