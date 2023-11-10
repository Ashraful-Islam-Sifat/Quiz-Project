const startQuiz = document.querySelector('.myBtn');
const rulesBox = document.querySelector('.rulesBox');
const exitBtn = document.querySelector('.exitBtn');
const continueBtn = document.querySelector('.continueBtn');
const Questions = document.querySelector('.questions');
const nextBtn = document.querySelector('.nextBtn');
const option_list = document.querySelector('.myOptions');
const timeCount = document.querySelector('.timeCount .seconds');
const time_lines = document.querySelector('.time_lines');
const reply_btn = document.querySelector('.reply_btn');


reply_btn.onclick = () => {
    window.location.reload();
}

startQuiz.onclick = () => {
    rulesBox.classList.add('activeInfo');
}

exitBtn.onclick = () =>{
    rulesBox.classList.remove('activeInfo');
}

continueBtn.onclick = () => {
    rulesBox.classList.remove('activeInfo');
    Questions.classList.add('activeQuiz');
    showQuestions(0);
    startTimer(15);
    startTimeLine(0);
}


let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = ()=> {
    
    if (que_count < questions.length -1 ) {
        que_count++;
        showQuestions(que_count);
        clearInterval(counter)
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimeLine(timeValue);
        nextBtn.style.display = 'none'
    }else{
        const resultpage = document.querySelector('.resultpage');
        resultpage.style.display = 'block';
        const total_point = document.querySelector('.total_point');
        total_point.innerHTML = questions.length
    }
}

function showQuestions(index) {
    const que_text = document.querySelector('.Question_text');
   
    option_list.innerHTML = '<div class="options">' + questions[index].options[0] + '</div>' 
                            +'<div class="options">' + questions[index].options[1] + '</div>'
                            +'<div class="options">' + questions[index].options[2] + '</div>' 
                            +'<div class="options">' + questions[index].options[3] + '</div>'       
    que_text.innerHTML = questions[index].numb + " . " + questions[index].question;

    const total_que = document.querySelector('.total_que');

    total_que.innerHTML =  '<p>'+ questions[index].numb + ' of ' + questions.length + ' questions ' + '</p>'


    const option = option_list.querySelectorAll('.options');
    for(let i = 0; i<option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)')
    }

}





function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    let rightIcon = `<img class="rightIcon" src="images/circle-check.png" alt="">`;
    let crossIcon = `<img class="crossIcon" src="images/circle-xmark.png" alt="">`;

    clearInterval(counter);
    clearInterval(counterLine)
    nextBtn.style.display = 'block';



   if(userAns == correctAns){
    userScore +=1;
    const points = document.querySelector('.points');
    points.innerHTML = userScore;
    answer.classList.add('correct');

    console.log('ans is correct');
    answer.insertAdjacentHTML('beforeend', rightIcon);
   }else{
    answer.classList.add('wrong');
    answer.insertAdjacentHTML('beforeend', crossIcon);
    for(let i = 0; i < allOptions; i++){
        if(option_list.children[i].textContent == correctAns){
            option_list.children[i].setAttribute('class', 'options correct');
            option_list.children[i].insertAdjacentHTML('beforeend', rightIcon);
        }
    }
   }

   for(let i = 0; i < allOptions; i++){
   option_list.children[i].classList.add('disabled')
   }
}





function startTimer(time){
    counter = setInterval(timer , 1000);
    function timer(){
        timeCount.textContent = time;
        time--

        if(time <9 ){
          timeCount.textContent = 0 + timeCount.textContent

        }

        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = '00';
            const timesUp = document.querySelector('.timesUp');
            const nextque = document.querySelector('.nextque');
            timesUp.style.display = 'block';
            const option = option_list.querySelectorAll('.options');
            option.style.pointerEvents = 'none'
            nextque.onclick = () =>{
                if (que_count < questions.length -1 ) {
                    que_count++;
                    showQuestions(que_count);
                    clearInterval(counter)
                    startTimer(timeValue);
                    clearInterval(counterLine);
                    startTimeLine(timeValue);
                    nextBtn.style.display = 'none'
                    timesUp.style.display = 'none'
                }
            }
            
        }
    }
}

function startTimeLine(time){
    counterLine = setInterval(timer, 38);
    function timer(){
        time += 1;
        time_lines.style.width = time + 'px';
        if(time > 319){
            clearInterval(counterLine)
        }
    }
}