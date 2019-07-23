// var a = new Date().getTime()
// window.addEventListener('click', () => {
//   b = new Date().getTime();
//   res = b - a;
//   c = 60;
//   d = (res + c) / 1000;
//   console.log(Math.floor(d));
// })

const divCounter = document.querySelector('.panel');
const counter = document.querySelector('.counter');
const btnNavi = document.querySelector('.handle');
const workTime = document.getElementById('workTime');
const breakTime = document.getElementById('breakTime');
const arrows = document.querySelectorAll('.value i');
const beep = new Audio('sound/beep.mp3');

class Pomodoro {
  constructor() {
    this.active = false;
    this.resting = false;
    this.minutes = workTime.textContent;
    this.seconds = 0;
    this.interval = false;
  }
  handleCounter = () => {
    console.log('aa');
    if (!this.active) {
      this.active = !this.active;
      btnNavi.textContent = "pauza";
      this.interval = setInterval(this.start, 1000);
      divCounter.style.borderColor = "green";
    } else {
      this.active = !this.active;
      btnNavi.textContent = "wznów";
      clearInterval(this.interval);
      divCounter.style.borderColor = "orange";
    }
  }

  start = () => {
    if (!this.minutes && !this.seconds) {
      beep.play();
      !this.resting ? alert("Czas na przerwę") : alert("Pora wracać do pracy");
      !this.resting ? this.minutes = parseInt(breakTime.textContent) : minutes = parseInt(workTime.textContent);
      this.resting = !this.resting;
    }
    this.seconds == 0 ? this.minutes-- : this.minutes;
    this.seconds == 0 ? this.seconds = 59 : this.seconds--;
    this.time = `${this.minutes}.${this.seconds}`;
    this.minutes.toString().length === 1 ? counter.textContent = `0${this.time}` : counter.textContent = this.time;
  }

  changeValue = (e) => {
    let id = e.target.id;
    let changeWork = workTime.textContent;
    let changeBreak = breakTime.textContent;
    this.seconds.toString().length !== 2 ? this.seconds = `0${this.seconds}` : null;

    if (id === 'workMore' || id === 'workLess') {
      id === 'workMore' ? changeWork++ : changeWork--;
      changeWork > 60 ? changeWork = 60 : null;
      changeWork < 1 ? changeWork = 1 : null;
      changeWork < 10 ? changeWork = `0${changeWork}` : null
      workTime.textContent = changeWork;
      !this.resting ? counter.textContent = `${changeWork}.${this.seconds}` : null;
      !this.resting ? this.minutes = changeWork : null;
    } else if (id === 'breakMore' || id === 'breakLess') {
      id === 'breakMore' ? changeBreak++ : changeBreak--;
      changeBreak > 60 ? changeBreak = 60 : null;
      changeBreak < 1 ? changeBreak = 1 : null;
      changeBreak < 10 ? changeBreak = `0${changeBreak}` : null
      breakTime.textContent = changeBreak;
      this.resting ? counter.textContent = `${changeBreak}.${this.seconds}` : null;
      this.resting ? this.minutes = changeBreak : null;
    }
    this.active ? this.handleCounter() : null;
  }
}

const pomodoro = new Pomodoro();

counter.textContent = parseInt(pomodoro.minutes).toFixed(2);

divCounter.addEventListener('click', pomodoro.handleCounter);

for (arrow of arrows) {
  arrow.addEventListener("click", pomodoro.changeValue);
}