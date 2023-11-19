const questions = [
    {
        question: 'Qual é o nome do hormônio liberado durante o exercício físico que melhora o humor?',
        answers: [
            {text: 'Insulina', correct: false},
            {text: 'Cortisol', correct: false},
            {text: 'Endorfina', correct: true},
            {text: 'Testosterona', correct: false}
        ] 
    },

    {
        question: 'Qual músculo é principalmente trabalhado durante um agachamento?',
        answers: [
            {text: 'Glúteo', correct: false},
            {text: 'Quadríceps', correct: true},
            {text: 'Bíceps', correct: false},
            {text: 'Peitoral', correct: false}
        ] 
    },

    {
        question: 'Qual é o nome do exercício que trabalha os músculos das costas e dos bíceps através de uma puxada vertical em direção ao queixo?',
        answers: [
            {text: 'Puxada alta', correct: true},
            {text: 'Tríceps pulley', correct: false},
            {text: 'Desenvolvimento', correct: false},
            {text: 'Flexão', correct: false}
        ] 
    },

    
    {
        question: 'Qual desses exercícios não é para a perna?',
        answers: [
            {text: 'Afundo', correct: false},
            {text: 'Pulldown', correct: true},
            {text: 'Búlgaro', correct: false},
            {text: 'Agachamento', correct: false}
        ] 
    },

    {
        question: 'Qual músculo tem o apelido de "cebola?"',
        answers: [
            {text: 'Trapézio', correct: false},
            {text: 'Deltoides', correct: false},
            {text: 'Glúteo', correct: false},
            {text: 'Ombro', correct: true}
        ] 
    },

    {
        question: 'Quais músculos são mais trabalhados ao usar uma máquina de remo?',
        answers: [
            {text: 'Costas, ombros e pernas', correct: true},
            {text: 'Deltoides', correct: false},
            {text: 'Abdominais e peitorais', correct: false},
            {text: 'Bíceps e tríceps', correct: false},
        ] 
    },

    {
        question: 'Qual é o principal objetivo do uso de uma máquina elíptica?',
        answers: [
            {text: 'Melhoria da flexibilidade', correct: false},
            {text: 'Fortalecimento dos braços', correct: false},
            {text: 'Exercício cardiovascular', correct: true},
            {text: 'Treinamento de resistência', correct: false}
        ] 
    },

    {
        question: 'Qual é a origem da proteína albumina?',
        answers: [
            {text: 'Carne vermelha', correct: false},
            {text: 'Ovo', correct: true},
            {text: 'Leite', correct: false},
            {text: 'Soja', correct: false}
        ] 
    },

    {
        question: 'Qual composto estimulante é encotrado em pré treinos?',
        answers: [
            {text: 'Creatina', correct: false},
            {text: 'Beta-alanina', correct: false},
            {text: 'Cafeína', correct: true},
            {text: 'Arginina', correct: false}
        ] 
    },

    {
        question: 'O que é periodização?',
        answers: [
            {text: 'Variação constante de exercícios', correct: false},
            {text: 'Treino exclusivo para atletas', correct: false},
            {text: 'Treino concentrado em uma única parte do corpo', correct: false},
            {text: 'Divisão de treino em períodos distintos de intensidades', correct: true},
        ] 
    },


];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function iniciarQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo"
    exibirQuestion();
}

function exibirQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selecionarResposta);
    });
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selecionarResposta(e){
    const selectdBtn = e.target;
    const isCorrect = selectdBtn.dataset.correct === 'true'
    if(isCorrect){
        selectdBtn.classList.add("correto")
        score++;
    }
    else {
        selectdBtn.classList.add("incorreto")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correto")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `
    Pontuação: ${score} / ${questions.length}!`;
    nextButton.innerHTML = `Jogar Novamente`
    nextButton.style.display = 'block'
}

function handlenNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        exibirQuestion();
    }
    else{
        showScore();
    }
};



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handlenNextButton()
    }
    else {
         iniciarQuiz()
    }
});

iniciarQuiz();
