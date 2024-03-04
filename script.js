const questions = [
    {
        question: "What is the primary difference between a list and a tuple?",
        answers: [
            {text: "Lists are mutable, while tuples are immutable.",correct: true},
            {text: "Tuples are mutable, while lists are immutable.",correct: false},
            {text: "Both lists and tuples are mutable.",correct: false},
            {text: "Both lists and tuples are immutable.",correct: false}
        ]
    },

    {
        question: "Which data structure is used to store key-value pairs?",
        answers: [
            {text: "List",correct: false},
            {text: "Tuple",correct: false},
            {text: "Dictionary",correct: true},
            {text: "Set",correct: false}
        ]
    },

    {
        question: "Python, how do you create an empty list?",
        answers: [
            {text: "my_list = []",correct: true},
            {text: "my_list = {}",correct: false},
            {text: "my_list = ()",correct: false},
            {text: "my_list = set()",correct: false}
        ]
    },

    {
        question: "Which of the following is an example of a mutable data structure?",
        answers: [
            {text: "List",correct: true},
            {text: "Tuple",correct: false},
            {text: "String",correct: false},
            {text: "Integer",correct: false}
        ]
    },

    {
        question: "What is the purpose of a tuple?",
        answers: [
            {text: "To store an ordered collection of elements.",correct: true},
            {text: "To store key-value pairs.",correct: false},
            {text: "To store a single value.",correct: false},
            {text: "To store an unordered collection of elements.",correct: false}
        ]
    },

    {
        question: "Which operation is used to add an element to a list?",
        answers: [
            {text: "append()",correct: true},
            {text: "insert()",correct: false},
            {text: "extend()",correct: false},
            {text: "add()",correct: false}
        ]
    },

    {
        question: "What does the len() function return for a dictionary?",
        answers: [
            {text: "The total number of keys.",correct: true},
            {text: "The total number of values.",correct: false},
            {text: "The total number of key-value pairs.",correct: false},
            {text: "The total number of items.",correct: false}
        ]
    },

    {
        question: "Which data structure is unordered and does not allow duplicate values?",
        answers: [
            {text: "List.",correct: false},
            {text: "Tuple.",correct: false},
            {text: "Set.",correct: true},
            {text: "Dictionary.",correct: false}
        ]
    },

    {
        question: "How do you access the value associated with a key in a dictionary?",
        answers: [
            {text: "my_dict[key]",correct: true},
            {text: "my_dict.value(key)",correct: false},
            {text: "my_dict.get(key)",correct: false},
            {text: "my_dict[key].value",correct: false}
        ]
    },

    {
        question: "Which of the following is an immutable data structure?",
        answers: [
            {text: "List.",correct: false},
            {text: "Tuple.",correct: true},
            {text: "Dictionary.",correct: false},
            {text: "Set.",correct: false}
        ]
    },


];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const mainHeading = document.getElementById("main-heading");
const mainInstructions = document.getElementById("instructions");
const winningGif = document.getElementById("winning-gif");
const motivatingGif = document.getElementById("motivating-gif");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    questionElement.style.textAlign = "left";
    mainInstructions.style.display = "block";
    mainHeading.style.display = "block";
    winningGif.style.display = "none";
    motivatingGif.style.display = "none";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    if(score>=6){
        questionElement.innerHTML =   `You scored ${score} out of ${questions.length}. Congrats, You won!`;    
        winningGif.style.display = "block";
    }
    else{
        questionElement.innerHTML =   `You scored ${score} out of ${questions.length}. Sorry, You could not win!`;    
        motivatingGif.style.display = "block";
    }
    questionElement.style.textAlign = "center";
    mainHeading.style.display = "none";
    mainInstructions.style.display = "none";
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();