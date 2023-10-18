const quizData = [
  {
    question: "What is the best-selling video game of all time?",
    a: "Call of Duty: Modern Warfare",
    b: "Grand Theft Auto V",
    c: "Minecraft",
    d: "NFS Most Wanted",
    correct: "c",
  },
  {
    question: "What is the name of the popular Battle Royale game developed by Epic Games?",
    a: "PUBG",
    b: "Fortnite",
    c: "Free Fire",
    d: "Call of Duty Battle Royal",
    correct: "b",
  },
  {
    question: "In what year was the first version of the game 'Doom' released?",
    a: "1993",
    b: "1994",
    c: "1995",
    d: "1996",
    correct: "a",
  },
  {
    question: "What is the name of the protagonist in the game 'The Legend of Zelda'?",
    a: "Mario",
    b: "Link",
    c: "Luigi",
    d: "Donky Kong",
    correct: "b",
  },
  {
    question: "What is the highest-grossing mobile game of all time?",
    a: "Clash of Clans",
    b: "Candy Crush Saga",
    c: "Honor of Kings (Arena of Valor)",
    d: "PUBG Mobile",
    correct: "c",
  },
  
  {
    question: "What is the name of the protagonist in the game 'Assassin's Creed'?",
    a: "Ezio Auditore",
    b: "Altair Ibn-La'Ahad",
    c: "Connor Kenway",
    d: "Bayek of Siwa",
    correct: "a",
  },
  
  {
    question: "What is the name of the main character in the game 'Half-Life'?",
    a: "Gordon Freeman",
    b: "Alyx Vance",
    c: "Adrian Shephard",
    d: "Barney Calhoun",
    correct: "a",
  },
  
  {
    question: "What is the name of the fictional city where the Grand Theft Auto series takes place?",
    a: "San Andreas",
    b: "Liberty City",
    c: "Vice City",
    d: "Los Santos",
    correct: "b",
  },
  
  {
    question: "What is the name of the company that developed the game 'Overwatch'?",
    a: "Valve Corporation",
    b: "Blizzard Entertainment",
    c: "Riot Games",
    d: "Electronic Arts",
    correct: "b",
  },
  
  {
    question: "What is the name of the popular sandbox game that allows players to create and explore their own virtual worlds?",
    a: "Terraria",
    b: "Roblox",
    c: "Minecraft",
    d: "Garry's Mod",
    correct: "c",
  }
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
const quizResult = document.getElementById('quizResult');

let currentQuiz = 0;
let score = 0;
let startTime;

const deselectAnswers = () => {
  answerElements.forEach((answer) => {
    answer.checked = false;
    answer.parentElement.classList.remove("correct");
    answer.parentElement.classList.remove("wrong");
  });
};

const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
  });
  return answer;
};



const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  const currentQuestionElement = document.getElementById("current-question");
  currentQuestionElement.innerText = `Question ${currentQuiz + 1} of ${quizData.length}`;
  if (currentQuiz === 0) {
    // start timer on first question
    startTime = new Date();
  }
};

loadQuiz();

submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    const currentQuizData = quizData[currentQuiz];
    const correctAnswer = currentQuizData.correct;
    const selectedAnswer = document.getElementById(answer);
    if (answer === correctAnswer) {
      selectedAnswer.parentElement.classList.add("correct");
      score++;
    } else {
      selectedAnswer.parentElement.classList.add("wrong");
      const correctAnswerElement = document.getElementById(correctAnswer);
      correctAnswerElement.parentElement.classList.add("correct");
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      setTimeout(loadQuiz, 1000);
    } else {
      // end timer on last question
      
      const endTime = new Date();
      const asdf = Math.floor((endTime - startTime) / 1000); // time in seconds
      document.querySelector(".section").innerHTML = `
          <h2>You answered ${score}/${quizData.length} questions correctly in ${asdf} seconds</h2>
          <button style="width : unset" onclick="location.reload()">Play Again</button>
      `;
    }
  } 
});

setInterval(() => {
  if (startTime) {
    const currentTime = new Date();
    const timeTaken = Math.floor((currentTime - startTime) / 1000); // time in seconds
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
  }
}, 1000);