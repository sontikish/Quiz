let container_main = document.querySelector('.main')
let container_start = document.querySelector('.start')
let start_button = document.querySelector('.start-btn')

let question_field = document.querySelector('.question');
let answers_btn = document.querySelectorAll('.answer');
let container_h3 = document.querySelector('.container_h3')

function randit(min, max){
    return Math.round(Math.random()*(max-min)+min)
}

let signs = ['+', '-', '*', '/']
function getRandomSign(){
    return signs[randit(0, 3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

my_array = [1, 2, 3, 4, 5] // Початковий масив
shuffle(my_array)  // Перемішуємо масив

class Question {
    constructor() {
        let a = randit(1, 100)
        let b = randit(1, 100)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`;
        if(sign == '+'){this.correct = a+b}
        else if(sign == '-'){this.correct = a-b}
        else if(sign == '*'){this.correct = a*b}
        else if(sign == '/'){this.correct = a/b}

            this.answers = [
                randit(this.correct - 15, this.correct - 5),
                randit(this.correct - 10, this.correct - 1),
                this.correct,
                randit(this.correct + 1, this.correct + 10),
                randit(this.correct + 10, this.correct + 15),
            ];
            shuffle(this.answers)

    }

    display() {
        question_field.innerHTML = this.question;

        for (let i = 0; i < this.answers.length; i += 1) {
            answers_btn[i].innerHTML = this.answers[i];
        }
    }
}

//Приклад

let total
let correct_answers_given
let current_question




start_button.addEventListener('click', function() {
  container_main.style.display = 'flex'
  container_start.style.display = 'none'
  current_question = new Question()
  current_question.display()
 total = 0;
correct_answers_given = 0;

setTimeout(function(){
  container_start.style.display = 'flex'
  container_main.style.display = 'none'
  container_h3.innerHTML = `Ви дали ${correct_answers_given} правильних відповідей із ${total}. Точність - ${Math.round(correct_answers_given*100/total)}%`
},10000)

})




for (let i = 0; i < answers_btn.length; i += 1) {
  answers_btn[i].addEventListener("click", function () {
    if (answers_btn[i].innerHTML == current_question.correct) {
      correct_answers_given +=1
      answers_btn[i].style.background = '#00FF00'
  
      anime({
        targets: answers_btn[i],
        background: '#F2F2F2',
        duration: 500,
        delay: 100,
        easing: 'linear'
      })
    } else {
      answers_btn[i].style.background = '#FF0000'
      anime({
        targets: answers_btn[i],
        background: '#F2F2F2',
        duration: 500,
        delay: 100,
        easing: 'linear'
      })
    }


    total += 1;
    current_question = new Question()
    current_question.display();
  });
}

