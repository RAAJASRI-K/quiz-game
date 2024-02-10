const questions =[
    {
        question: "What is the national bird of India?",
        answers:[
            {text:"kiwi",correct:"false"},
            {text:"parrot",correct:"false"},
            {text:"peacock",correct:"true"},
            {text:"crow",correct:"false"},
        ]
    },
    {
        question: "Who is the PM of India?",
        answers:[
            {text:"Narendra Modi",correct:"true"},
            {text:"Ragul Gandhi",correct:"false"},
            {text:"Amitsha",correct:"false"},
            {text:"Nirmala Sitaraman",correct:"false"},
        ]
    },
    {
        question: "Which city is called as 'Manchester Of South India?",
        answers:[
            {text:"Madhurai",correct:"false"},
            {text:"Tiruppur",correct:"false"},
            {text:"Avinashi",correct:"false"},
            {text:"Coimbatore",correct:"true"},
        ]
    },
    {
        question: "Which spieces is known as 'Black Gold Of India?",
        answers:[
            {text:"cardamom",correct:"false"},
            {text:"genus piper",correct:"true"},
            {text:"saffron",correct:"false"},
            {text:"red chilli",correct:"false"},
        ]
    }
];
const questionelem = document.getElementById('question')
const answerbtn = document.getElementById('answer-button')
const next = document.getElementById('next-button')

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    next.innerHTML="Next"
    showQuestion();
}

function showQuestion(){
    resetState();//will reset previous qustion and answer
    let currentQuestion = questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1;
    questionelem.innerHTML = QuestionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => { 
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}

function resetState(){
    next.style.display="none";
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedbtn= e.target;
    const isCorrect = selectedbtn.dataset.correct == "true";
    if (isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbtn.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    next.style.display="block";
}
function showScore(){
    resetState();
    questionelem.innerHTML=`You scored ${score} out of ${questions.length}!`;
    next.innerHTML="Play Again"
    next.style.display="block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
        showQuestion();
    else{
        showScore();
    }
}
next.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})


startQuiz()

