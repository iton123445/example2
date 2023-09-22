const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest ocean in the world?",
    answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "What is the square root of 16?",
    answers: ["2", "4", "6", "8"],
    correctAnswer: "4",
  },
  {
    question: "What is the chemical formula for water?",
    answers: ["H2O", "CO2", "N2O", "O2"],
    correctAnswer: "H2O",
  },
  {
    question: "What is the largest planet in the solar system?",
    answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Jupiter",
  },
  {
    question: "What is the smallest country in the world?",
    answers: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
    correctAnswer: "Vatican City",
  },
];


let currentQuestionIndex = 0;
let userScore = 0;

function displayQuestion() {
  const question = questions[currentQuestionIndex];

  // Display the question to the user.
  document.getElementById("question").innerHTML = question.question;

  // Display the multiple-choice options to the user.
  const answerOptions = document.getElementById("answer-options");
  answerOptions.innerHTML = "";
  for (const answer of question.answers) {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", checkAnswer);
    answerOptions.appendChild(answerButton);
  }
}


function checkAnswer() {
  const userAnswer = this.textContent;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (userAnswer === correctAnswer) {
    // The user's answer is correct.
    alert("Correct!");
    userScore++;
    // Update and display the score.
    document.getElementById("current-score").textContent = userScore;
  } else {
    // The user's answer is incorrect.
    alert("Incorrect. The correct answer is " + correctAnswer);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    // The user has completed the quiz.

    alert("You have completed the quiz! Your score is " + userScore);
      document.getElementById("quiz").style.display = "none";

    // Show the retry button
    document.getElementById("retry-button").style.display = "block";
  } else {
    // Display the next question to the user.
    displayQuestion();
  }
}

// Display the first question to the user.
function retryGame() {
  // Reset the current question index and user score
  currentQuestionIndex = 0;
  userScore = 0;
addToHighScores("Player", userScore);

  // Hide the "Retry" button
  document.getElementById("retry-button").style.display = "none";

  // Reset the score display
  document.getElementById("current-score").textContent = userScore;

  // Display the quiz container
  document.getElementById("quiz").style.display = "block";

  // Display the first question to the user
  displayQuestion();
}


function startGame() {
  // Hide the "Start Game" button
  document.getElementById("start-button").style.display = "none";

  // Display the quiz container
  document.getElementById("quiz").style.display = "block";

  // Initialize the user's score
  userScore = 0;
  document.getElementById("current-score").textContent = userScore;

  // Display the first question to the user
  displayQuestion();
}

function addToHighScores(playerName, playerScore) {
  const highScores = loadHighScores();
  highScores.push({ name: playerName, score: playerScore });

  // Update local storage with the updated high scores
  localStorage.setItem("highScores", JSON.stringify(highScores));

  displayHighScores(); // Update the displayed high scores
}

function loadHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  return highScores;
}

function displayHighScores() {
  const highScores = loadHighScores();
  const topScoresList = document.getElementById("top-scores-list");

  topScoresList.innerHTML = "";

  highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.name}: ${score.score}`;
      topScoresList.appendChild(listItem);
    });
}

displayHighScores();