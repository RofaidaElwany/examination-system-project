let questions = [];
let currentIndex = 0;
let userAnswers = {};
let markedQuestions = new Set();
let timerInterval;
let isTimerPaused = false;
let remainingSeconds = 0;
let startTime;

// DOM Elements
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const timeoutSound = document.getElementById("timeoutSound");

// API URL with seed to fetch same questions every time



const API_URL = "https://opentdb.com/api.php?amount=10&type=multiple";

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function loadQuestion(index) {
  const q = questions[index];
  if (!q) return;
  console.log(`Question ${index + 1}:`, q.question);
  // You can update DOM here to show q.question and q.options
}

async function fetchQuestions() {
  const cached = localStorage.getItem("cachedQuestions");
  if (cached) {
    try {
      questions = JSON.parse(cached);
      console.log("Loaded cached questions:", questions.length);
      questions = shuffle(questions);
      loadQuestion(0);
      return;
    } catch (e) {
      console.error("Corrupted cache. Refetching...", e);
      localStorage.removeItem("cachedQuestions");
    }
  }

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      console.error("No questions returned from API");
      return;
    }

    const fetchedQuestions = data.results.map((q, i) => ({
      id: i,
      question: decodeURIComponent(q.question),
      correct: decodeURIComponent(q.correct_answer),
      options: shuffle([
        ...q.incorrect_answers.map(decodeURIComponent),
        decodeURIComponent(q.correct_answer),
      ]),
    }));

    localStorage.setItem("cachedQuestions", JSON.stringify(fetchedQuestions));
    questions = shuffle([...fetchedQuestions]);
    loadQuestion(0);
  } catch (err) {
    console.error("Failed to fetch questions:", err);
  }
}

window.onload = fetchQuestions;





// Load question at index
function loadQuestion(index) {
  currentIndex = index;
  const q = questions[index];

  document.getElementById("question-number").textContent = `Question ${index + 1} of ${questions.length}`;
  document.getElementById("question-text").textContent = q.question;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.options.forEach((opt) => {
    const isChecked = userAnswers[q.id] === opt;
    const label = document.createElement("label");
    label.className = "choice-option";
    label.innerHTML = `
      <input type="radio" name="q${q.id}" value="${opt}" ${isChecked ? "checked" : ""}>
      ${opt}
    `;
    choicesDiv.appendChild(label);
  });

  document.getElementById("prevBtn").style.display = index === 0 ? "none" : "block";
  document.getElementById("nextBtn").style.display = index === questions.length - 1 ? "none" : "block";
}

// Save current answer
function saveAnswer() {
  const selected = document.querySelector(`input[name="q${questions[currentIndex].id}"]:checked`);
  if (selected) {
    userAnswers[questions[currentIndex].id] = selected.value;
  }
}

// Mark current question
function markCurrentQuestion() {
  markedQuestions.add(currentIndex);
  updateMarkedSidebar();
}

// Unmark a question by its index
function unmarkQuestion(index) {
  markedQuestions.delete(index);
  updateMarkedSidebar();
}

// Update marked questions sidebar
function updateMarkedSidebar() {
  const markedList = document.getElementById("markedList");
  markedList.innerHTML = "";

  markedQuestions.forEach((index) => {
    const li = document.createElement("li");
    li.className = "marked-item";

    const span = document.createElement("span");
    span.textContent = `Question ${index + 1}`;
    span.addEventListener("click", () => {
      saveAnswer();
      loadQuestion(index);
    });

    const delIcon = document.createElement("span");
    delIcon.innerHTML = "🗑️";
    delIcon.className = "delete-icon";
    delIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      unmarkQuestion(index);
    });

    li.appendChild(span);
    li.appendChild(delIcon);
    markedList.appendChild(li);
  });
}

// Show results
function showResults() {
  clearInterval(timerInterval);
  document.body.classList.remove("time-warning", "time-critical");
  timeoutSound.pause();
  timeoutSound.currentTime = 0;

  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("markBtn").style.display = "none";

  saveAnswer();
  let score = 0;
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  const timeTaken = calculateTimeTaken();

  questions.forEach((q, i) => {
    const userAns = userAnswers[q.id];
    const isCorrect = userAns === q.correct;
    if (isCorrect) score++;

    const qBlock = document.createElement("div");
    qBlock.className = "question-result";

    const title = document.createElement("div");
    title.className = "question-result-title";
    title.textContent = `Q${i + 1}: ${q.question}`;
    qBlock.appendChild(title);

    q.options.forEach((opt) => {
      const optDiv = document.createElement("div");

      if (opt === q.correct) {
        optDiv.className = "correct-answer";
        optDiv.innerHTML = `✓ ${opt} (Correct Answer)`;
      } else if (opt === userAns) {
        optDiv.className = "wrong-answer";
        optDiv.innerHTML = `✗ ${opt} (Your Answer)`;
      } else {
        optDiv.className = "normal-answer";
        optDiv.innerHTML = opt;
      }

      qBlock.appendChild(optDiv);
    });

    quizDiv.appendChild(qBlock);
  });

  let resultMessage = "";
  let resultIcon = "";

  if (score >= 8) {
    resultMessage = `Excellent! Score: ${score}/${questions.length}`;
    resultIcon = "success";
  } else if (score >= 6) {
    resultMessage = `Good! Score: ${score}/${questions.length}`;
    resultIcon = "success";
  } else if (score >= 5) {
    resultMessage = `Acceptable - Score: ${score}/${questions.length}`;
    resultIcon = "warning";
  } else {
    resultMessage = `Sorry, you failed - Score: ${score}/${questions.length}`;
    resultIcon = "error";
  }

  resultMessage += `\nTime taken: ${timeTaken}`;

  Swal.fire({
    icon: resultIcon,
    title: "Quiz Results",
    text: resultMessage,
    confirmButtonText: "OK",
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
}

function calculateTimeTaken() {
  const now = new Date();
  const timeDiff = now - startTime;
  const minutes = Math.floor(timeDiff / 60000);
  const seconds = ((timeDiff % 60000) / 1000).toFixed(0);
  return `${minutes}m ${seconds}s`;
}

function startTimer(minutes = 10) {
  startTime = new Date();
  remainingSeconds = minutes * 60;
  const totalSeconds = minutes * 60;

  function updateTimer() {
    const m = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const s = String(remainingSeconds % 60).padStart(2, "0");
    timerElement.textContent = `Time left: ${m}:${s}`;

    const progressPercentage = (remainingSeconds / totalSeconds) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (progressPercentage < 20) {
      progressBar.style.backgroundColor = "#ef4444";
      document.body.classList.add("time-critical");
    } else if (progressPercentage < 50) {
      progressBar.style.backgroundColor = "#f59e0b";
      document.body.classList.add("time-warning");
    }

    if (remainingSeconds <= 30 && remainingSeconds > 0) {
      timeoutSound.play().catch(e => console.log("Warning sound failed", e));
    }

    if (--remainingSeconds < 0) {
      clearInterval(timerInterval);
      timeoutSound.play().catch(e => console.log("Timeout sound failed", e));
      showResults();
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Event listeners
document.getElementById("nextBtn").addEventListener("click", () => {
  saveAnswer();
  if (currentIndex < questions.length - 1) loadQuestion(currentIndex + 1);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  saveAnswer();
  if (currentIndex > 0) loadQuestion(currentIndex - 1);
});

document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  showResults();
});

document.getElementById("markBtn").addEventListener("click", markCurrentQuestion);

// Initialize quiz
fetchQuestions();
startTimer(1); 
