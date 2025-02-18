document.addEventListener('DOMContentLoaded', function () {
    // Grab the leaderboard table body and user score from localStorage
    const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
    const userScore = localStorage.getItem('userScore');
    const userName = localStorage.getItem('userName'); // You can also store the username if needed

    // Retrieve the existing leaderboard data from localStorage
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];

    if (userScore) {
        // Add the current user's score to the leaderboard data
        leaderboardData.push({ name: userName || 'Anonymous', score: userScore });

        // Sort the leaderboard data by score in descending order
        leaderboardData.sort((a, b) => b.score - a.score);

        // Save the updated leaderboard data back to localStorage
        localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));

        // Optionally, you can clear the stored score after it's been added to the leaderboard
        localStorage.removeItem('userScore');
        localStorage.removeItem('userName'); // Optionally clear the name as well
    }

    // Populate the leaderboard table with the sorted data
    leaderboardData.forEach(item => {
        const newRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        nameCell.textContent = item.name;
        scoreCell.textContent = item.score;

        newRow.appendChild(nameCell);
        newRow.appendChild(scoreCell);

        leaderboardTableBody.appendChild(newRow);
    });
});
