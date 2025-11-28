//Select DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false },
    ],
  },
  {
    question: "What is the smallest prime number?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon dioxide", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Diamond", correct: true },
      { text: "Quartz", correct: false },
    ],
  },
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question: "Which instrument has keys, pedals, and strings?",
    answers: [
      { text: "Guitar", correct: false },
      { text: "Violin", correct: false },
      { text: "Piano", correct: true },
      { text: "Flute", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    answers: [
      { text: "Spanish", correct: false },
      { text: "Portuguese", correct: true },
      { text: "French", correct: false },
      { text: "English", correct: false },
    ],
  },
  {
    question: "What is H2O commonly known as?",
    answers: [
      { text: "Hydrogen", correct: false },
      { text: "Water", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Salt", correct: false },
    ],
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Elephant", correct: false },
      { text: "Leopard", correct: false },
    ],
  },
];

// QUIZ STATE vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //reset vars
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  //reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    //what is dataset? It is a property of button element that allows us to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //optimization check
  if (answersDisabled) return;

  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  /* Array.from() is user to convert the NodeList returned by answersContainer.children into and array,
  this is because the NodeList  is not an array and we need to user the forEach method */
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }
  setTimeout(() => {
    currentQuestionIndex++;
    //check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a Genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep Learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to imporve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
