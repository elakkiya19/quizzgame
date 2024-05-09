const quizData = [
        {
          question: "All keywords in c are in",
          options: ["Lowercase letters", "Uppercase letters", "Camelcase letters", "None"],
          answer: "Lowercase letters"
        },
        {
          question: "Which of the following cannot be a variable name in C?",
          options: ["true", "friend", "volatile", "export"],
          answer: "volatile"
        },
        {
          question: "Functions in C language are always",
          options: ["Internal", "External", "Both", "Both are not valid terms for functions"],
          answer: "External"
        },
        {
          question: "When a C program is started,O.S environment is responsible for opening file and providing pointer for that file?",
          options: ["standard input", "standard output", "standard error", "all of the mentioned"],
          answer: "all of the mentioned"
        },
        {
          question: "In C language,FILE is of which data type?",
          options: ["int", "char*", "struct", "none of above"],
          answer: "struct"
        },        
      ];
  const quizContainer = document.getElementById('quiz-container');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const submitButton = document.getElementById('submit-btn');
  
  let currentQuestion = 0;
  let score = 0;
  
  function loadQuestion() {
    const quiz = quizData[currentQuestion];
    questionElement.innerText = quiz.question;
  
    optionsElement.innerHTML = '';
    for (let i = 0; i < quiz.options.length; i++) {
      const option = document.createElement('button');
      option.className = 'option';
      option.innerText = quiz.options[i];
      option.addEventListener('click', selectOption);
      optionsElement.appendChild(option);
    }
  }
  
  function selectOption(e) {
    const selectedOption = e.target;
    const answer = quizData[currentQuestion].answer;
  
    if (selectedOption.innerText === answer) {
      score++;
      selectedOption.classList.add('correct');
    } else {
      selectedOption.classList.add('incorrect');
    }
  
    const options = optionsElement.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
      options[i].disabled = true;
      if (options[i].innerText === answer) {
        options[i].classList.add('correct');
      }
    }
  
    submitButton.disabled = false;
    submitButton.innerText = 'Next';
    submitButton.removeEventListener('click', selectOption);
    submitButton.addEventListener('click', submitQuiz);
  }
  
  function submitQuiz() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      submitButton.disabled = true;
      submitButton.innerText = 'Submit';
    } else {
      // Display the final score
      quizContainer.innerHTML = `
        <h2>Your Score: ${score}/${quizData.length}</h2>
        <button onclick="location.reload()">Restart Quiz</button>
      `;
    }
  }
  loadQuestion();