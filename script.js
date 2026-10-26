const questions = [
  {
    question: "You receive an unexpected message saying your bank account will be closed unless you click a link immediately. What should you do?",
    options: [
      "Click the link quickly to prevent the closure",
      "Reply with your account details to verify yourself",
      "Avoid the link and contact the bank through an official channel",
      "Forward the message to friends to ask if it looks real"
    ],
    answer: 2,
    explanation: "Urgency is a common phishing tactic. Avoid the link and contact the organisation using a trusted phone number or website."
  },
  {
    question: "Which password habit is safest?",
    options: [
      "Use the same memorable password for every account",
      "Use long, unique passwords for different accounts",
      "Use your birthday so it is easy to remember",
      "Change one character in the same password each time"
    ],
    answer: 1,
    explanation: "Unique passwords reduce the risk that one exposed password can unlock several accounts. A password manager can help."
  },
  {
    question: "What does multi-factor authentication (MFA) add to an account?",
    options: [
      "A second verification step in addition to a password",
      "A way to remove the need for software updates",
      "A guarantee that phishing messages cannot arrive",
      "A public profile that helps people find your account"
    ],
    answer: 0,
    explanation: "MFA asks for an additional verification factor, making account access harder for someone who only knows your password."
  },
  {
    question: "A stranger sends you an unexpected attachment. What is the safest response?",
    options: [
      "Open it if the message includes your first name",
      "Download it on your phone instead of your computer",
      "Open it after forwarding it to another person",
      "Do not open it until you have verified the sender and the file"
    ],
    answer: 3,
    explanation: "Unexpected attachments may contain harmful files. Verify the message independently and avoid opening suspicious files."
  },
  {
    question: "Why should you install operating-system and software updates?",
    options: [
      "They make every website completely safe",
      "They can fix known security weaknesses and bugs",
      "They automatically make all passwords unique",
      "They stop all unwanted messages"
    ],
    answer: 1,
    explanation: "Updates often fix known vulnerabilities. They are an important part of security, although they cannot remove every risk."
  }
];

const questionCounter = document.getElementById("questionCounter");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const quizForm = document.getElementById("quizForm");
const quizFeedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const quizResult = document.getElementById("quizResult");
let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;
  const q = questions[currentQuestion];
  questionCounter.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  progressText.textContent = `${Math.round((currentQuestion / questions.length) * 100)}% complete`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = q.question;
  answerOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  nextButton.disabled = true;
  nextButton.textContent = "Check answer";

  q.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = String(index);
    input.addEventListener("change", () => {
      if (!answered) nextButton.disabled = false;
    });
    const span = document.createElement("span");
    span.textContent = option;
    label.append(input, span);
    answerOptions.appendChild(label);
  });
  quizForm.hidden = false;
  quizResult.hidden = true;
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = quizForm.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  if (!answered) {
    answered = true;
    const q = questions[currentQuestion];
    const isCorrect = Number(selected.value) === q.answer;
    if (isCorrect) score += 1;
    quizFeedback.textContent = `${isCorrect ? "Correct! " : "Not quite. "}${q.explanation}`;
    quizFeedback.className = `quiz-feedback ${isCorrect ? "good" : "bad"}`;
    answerOptions.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    nextButton.textContent = currentQuestion === questions.length - 1 ? "View results" : "Next question";
    nextButton.disabled = false;
    progressText.textContent = `${Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete`;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizForm.hidden = true;
  quizResult.hidden = false;
  const percentage = Math.round((score / questions.length) * 100);
  let message = "Keep practising. Review the advice above and try again.";
  if (percentage >= 80) message = "Great work! You recognise several important online safety practices.";
  else if (percentage >= 60) message = "Good start. Review the explanations to strengthen your awareness.";
  quizResult.innerHTML = "";
  const scoreEl = document.createElement("div");
  scoreEl.className = "result-score";
  scoreEl.textContent = `${score}/${questions.length}`;
  const heading = document.createElement("h3");
  heading.textContent = "Quiz complete";
  const paragraph = document.createElement("p");
  paragraph.textContent = `${percentage}% — ${message}`;
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "button button-primary";
  retry.textContent = "Try again";
  retry.addEventListener("click", resetQuiz);
  quizResult.append(scoreEl, heading, paragraph, retry);
  questionCounter.textContent = "RESULTS";
  progressText.textContent = "100% complete";
  progressFill.style.width = "100%";
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  renderQuestion();
}

restartButton.addEventListener("click", resetQuiz);

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

renderQuestion();
