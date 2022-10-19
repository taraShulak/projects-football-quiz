const questions = ['Who won the first Premier League title?',
  'This club has won the most Champions League titles?',
  'Who was the best football player of Europe in 1998?',
  'Who was the first Italian manager to win the Premier League?',
  'How many clubs played in the first Premier League?',
  'Which goalkeeper has the record of 138 clean sheets for the same Premier League team?',
  'Which country became the first nation to win the Football World Cup?',
  `Which country calls football "calcio"?`,
  'Who has scored the most number of goals (16) in World Cup history?',
  'Which player won Champions League with three different clubs?'
]
const answers = [
  ['Liverpool FC', 'Manchester United FC' , 'Arsenal FC', 'Blackbern Rovers FC'],
  ['AC Milan', 'FC Real Madrid', 'Barcelona FC', 'Liverpool FC'],
  ['Ronaldo (Brasil)', 'Rivaldo', 'Zinedine Zidane', 'Luis Figo'],
  ['Gianfranco Zola', 'Gianluca Vialli', 'Carlo Anchelotti', 'Roberto Mancini'],
  [ 18, 20, 22, 24],
  ['Peter Cheh', 'David Seamen', 'Edvin Van Der Sar', 'Peter Shmaihel'],
  ['Brasil', 'Germany', 'Argentina', 'Uruguay'],
  ['Spain', 'France', 'Portugal', 'Italy'],
  ['Miroslav Close', 'Lionel Messi', 'Pele', 'Gerd Muller'],
  ['Andrii Shevchenco', 'Clarence Seedorf', 'Zlatan Ibrahimovich', 'Cristiano Ronaldo']
]

const answerVerify = [ 1, 1, 2, 2, 2, 0, 3, 3, 0, 1]

const start = document.querySelector('.start-button')
const mainQuestion = document.querySelector('.main__question')
const mainTimer = document.querySelector('.timer')
const mainAnswer = document.querySelector('.main__answer')
const answerButton = document.querySelector('.main-button')
const progressLine = document.querySelector('.main__progress')
progressLine.style.gridTemplateColumns =  `repeat(${questions.length}, 1fr)`

start.addEventListener('click', createQuestion)
mainAnswer.addEventListener('click', chouseAnswer)
answerButton.addEventListener('click', verify)

let seconds = 15
let interval
let indexQuestion= 0;
let selectAnswer = false;
let selectNumber;
let allredyAnswer = false;
let correctAnswer = 0;
let inProgres = false;

function endQuiz() {
  let massege;
  if(correctAnswer < 5 ) {
    massege = `Football's history is not your strong side`
  } else  if(correctAnswer < 8 ){
    massege = `You know football's history very good`
    } else {
      massege = `You know everything about football !!!!!`
    }
    
  const text = `
    <div class="main__result">
      <div class="result correct-result"> You result ${correctAnswer} from 10 </div>
      <div class="result text-result"> ${massege}</div>
    </div>
    `
    mainQuestion.insertAdjacentHTML('afterbegin', text)
    answerButton.innerHTML = 'Good Luck'
    mainTimer.style.zIndex = '-1'
    mainQuestion.style.backgroundImage = `url(/img/img-end.jpeg)`
    
    correctAnswer = 0
}

function deleteProgress() {
  const progressAllItem = document.querySelectorAll('.progress-item')
  for(const item of progressAllItem) {
    item.remove();
  }
}

function progress(colorItem){
  const textItem = `
    <div class="progress-item ${colorItem}"></div>
  `
  progressLine.insertAdjacentHTML('beforeend', textItem)
}

function verify(event) { 
 
  if (indexQuestion == questions.length && inProgres == true) {   
    clearMain()
    endQuiz()
    allredyAnswer = false
    inProgres = false
  }

  if(allredyAnswer) {
    createQuestion(event, indexQuestion)
  } else 
      if ( indexQuestion < questions.length && seconds > 0){
          if(selectNumber == answerVerify[indexQuestion]) {
            document.querySelector(`.item-${selectNumber}`).classList.add('right__item')
            answerButton.innerHTML = 'You are absolutely right!!!  Next question'
            correctAnswer++;
            allredyAnswer = true
            progress('green')
            clearInterval(interval)
          } else {
            document.querySelector(`.item-${selectNumber}`).classList.add('wrong__item')
            answerButton.innerHTML = 'You are mistaken!!!  Next question'
            allredyAnswer = true
            progress('red')
            clearInterval(interval)
          }
          indexQuestion++;    
  }
  
  if(seconds == 0 && indexQuestion < questions.length) {
    progress('blue')
    clearInterval(interval)
    indexQuestion++
    answerButton.innerHTML = 'Time is out!!!  You must think quiqly!!!'
    allredyAnswer = true
  }
}

function select(selectClass) {
      selectNumber = selectClass.split('-').pop()
      document.querySelector(`.${selectClass}`).classList.add('chouse__item')
      selectAnswer = true;   
}

function chouseAnswer(event) {  
      
  if (event.target.classList.contains('answer__item') &&
      !event.target.classList.contains('chouse__item') &&
      allredyAnswer == false) {
      if(selectAnswer) {
        document.querySelector(`.item-${selectNumber}`).classList.remove('chouse__item')    
      }
      let selectClass = event.target.className.split(' ').pop() 
    select(selectClass)
  }  
}

function clearMain(){
  mainQuestion.firstElementChild.remove()
  mainAnswer.firstElementChild.remove()
}

function createQuestion(event, number) {  
  mainTimer.style.zIndex = '1';
  number = number ? number : 0;  

  if( inProgres == false &&  indexQuestion == questions.length){ 
    deleteProgress()
    mainQuestion.firstElementChild.remove()
    indexQuestion = 0
  } else if(inProgres == false) {
    mainQuestion.firstElementChild.remove()
  }

  if(number > 0) {
    clearMain()    
  } else if( event.target == start && inProgres == true) {   
    clearMain()
    deleteProgress()
    number = 0
    indexQuestion = 0;
  }

  if( number < questions.length) {
    mainQuestion.style.backgroundImage = `url(/img/img-${number}.jpeg)`
    const textQuestion = `
      <p> ${questions[number]}</p>
    `
    mainQuestion.insertAdjacentHTML('afterbegin', textQuestion)
    
    const listAnswer = document.createElement('ul')
    listAnswer.classList.add('answer__list')
    mainAnswer.prepend(listAnswer)
    answers[number].map((item, index) => {
      const textAnswer = `
        <li class="answer__item item-${index}">${item}</li>
    `
    listAnswer.insertAdjacentHTML('beforeend', textAnswer) 
    })
    answerButton.innerHTML = `I'am sure`
    selectAnswer = false
    selectNumber = undefined
    allredyAnswer = false  
    inProgres = true
  }

    seconds = 15
    timer()

}

function timer() {
  clearInterval(interval)
  mainTimer.innerHTML = '10'
  interval = setInterval( startTimer, 1000)
}

function startTimer() {
  seconds--
  if(seconds < 10) {
    mainTimer.innerHTML = `0${seconds}`
  } else {
    mainTimer.innerHTML = `${seconds}`
  }
  if(seconds == 0 && allredyAnswer == false) {
    verify()
  }
}
