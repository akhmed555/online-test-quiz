const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyperlink and Text Markup Language"],
    correctAnswer: "a"
  },
  {
    question: "Which of the following is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript"],
    correctAnswer: "b"
  },
  {
    question: "What does CSS stand for?",
    options: ["Counter Strike: Source", "Corrective Style Sheet", "Cascading Style Sheet"],
    correctAnswer: "c"
  },
  {
    question: "What is the purpose of JavaScript?",
    options: ["To add styling to web pages", "To perform actions on the page", "To create markup language"],
    correctAnswer: "b"
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["Java", "Python", "HTML"],
    correctAnswer: "c"
  },
  {
    question: "What is the purpose of the 'let' keyword in JavaScript?",
    options: ["To declare a variable with block scope", "To declare a constant", "To declare a global variable"],
    correctAnswer: "a"
  },
  {
    question: "Which of the following is a valid way to comment in JavaScript?",
    options: ["// This is a comment", "/* This is a comment */", "# This is a comment"],
    correctAnswer: "a"
  },
  {
    question: "What is the result of the expression 2 + '2' in JavaScript?",
    options: ["4", "22", "Error"],
    correctAnswer: "b"
  },
  {
    question: "What is an array in JavaScript?",
    options: ["A data type", "A way to store multiple values in a single variable", "A loop"],
    correctAnswer: "b"
  },
  {
    question: "How do you declare a function in JavaScript?",
    options: ["function = myFunction()", "function myFunction()", "declare function myFunction()"],
    correctAnswer: "b"
  },
  {
    question: "Which method is used to add a new element to the end of an array?",
    options: ["push()", "pop()", "concat()"],
    correctAnswer: "a"
  },
  {
    question: "What does API stand for?",
    options: ["Advanced Programming Interface", "Application Programming Interface", "Automated Processing Interface"],
    correctAnswer: "b"
  },
  {
    question: "How can you check the type of a variable in JavaScript?",
    options: ["typeOf variable", "typeof(variable)", "checkType(variable)"],
    correctAnswer: "b"
  },
  {
    question: "What is the purpose of the '=== 'operator in JavaScript?",
    options: ["Assign a value", "Compare both value and type", "Concatenate strings"],
    correctAnswer: "b"
  },
  {
    question: "Which event is triggered when a user clicks on an HTML element?",
    options: ["onchange", "onsubmit", "onclick"],
    correctAnswer: "c"
  },
  {
    question: "What is the purpose of the 'localStorage' object in JavaScript?",
    options: ["To store cookies", "To store data persistently on the client-side", "To store server-side data"],
    correctAnswer: "b"
  },
  {
    question: "What does AJAX stand for?",
    options: ["Asynchronous JavaScript and XML", "Advanced JavaScript and XHTML", "Asynchronous JSON and XML"],
    correctAnswer: "a"
  },
  {
    question: "How do you add a comment in CSS?",
    options: ["// This is a comment", "/* This is a comment */", "# This is a comment"],
    correctAnswer: "b"
  },
  {
    question: "Which selector is used to select all elements with the class 'example' in CSS?",
    options: [".example", "#example", "example"],
    correctAnswer: "a"
  },
  {
    question: "What is the purpose of the 'box-sizing' property in CSS?",
    options: ["To set the box shadow", "To include or exclude padding and border in the element's total width and height", "To set the box model"],
    correctAnswer: "b"
  }
];

let score = 0;
let quizConfirmed = false; 

function showQuestions() {
    const questionsContainer = document.getElementById("questionsContainer");

    questions.forEach((q, index) => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${index + 1}. ${q.question}</h5>
                ${q.options.map(option =>
                    `<div class="form-check">
                        <input class="form-check-input" type="radio" name="q${index + 1}" value="${option}" ${quizConfirmed ? 'disabled' : ''}>
                        <label class="form-check-label">${option}</label>
                    </div>`
                ).join("")}
            </div>
        `;

        questionsContainer.appendChild(card);
    });
}

function submitQuiz() {
    if (quizConfirmed) {
        alert("You have already confirmed the answers.");
        return;
    }

    score = 0;
    const resultsDiv = document.getElementById("results");

    // Checking if all questions have been answered
    const allAnswered = questions.every((q, index) => {
        return document.querySelector(`input[name="q${index + 1}"]:checked`);
    });

    if (!allAnswered) {
        alert("Please answer all questions before confirming your answers.");
        return;
    }

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index + 1}"]:checked`);
        if (selectedOption) {
            const userAnswer = selectedOption.value;
            if (userAnswer === q.correctAnswer) {
                score++;
            }
        }
    });

    // Displaying results
    resultsDiv.innerHTML = `<h3>Your result: ${score} из ${questions.length}</h3>`;

    // Blocking radio buttons after confirming responses
    quizConfirmed = true;
    disableRadioButtons();
}

// Checking if all questions have been answered to activate the button
function checkAllAnswered() {
    const submitBtn = document.getElementById("submitBtn");
    const allAnswered = questions.every((q, index) => {
        return document.querySelector(`input[name="q${index + 1}"]:checked`);
    });

    submitBtn.disabled = !allAnswered || quizConfirmed;
}

// Locking radio buttons
function disableRadioButtons() {
    questions.forEach((q, index) => {
        const radioButtons = document.querySelectorAll(`input[name="q${index + 1}"]`);
        radioButtons.forEach(button => {
            button.disabled = true;
        });
    });
}

// Adding an event handler to change the state of a button when a question is answered
document.addEventListener("change", checkAllAnswered);

// Trigger on page load
window.onload = showQuestions;
