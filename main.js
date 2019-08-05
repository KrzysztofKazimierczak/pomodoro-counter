// // DO ZROBIENIA
// this traci ważność przy requestAnimationFrame;
// metorda = ()=>{} nie działa na ie i fire


const divCounter = document.querySelector('.panel');
const spanMin = document.querySelector('.min')
const spanSec = document.querySelector('.sec')
const btnNavi = document.querySelector('.handle');
const workTime = document.getElementById('workTime');
const breakTime = document.getElementById('breakTime');
const arrows = document.querySelectorAll('.value i');
const beep = new Audio('sound/beep.mp3');


class Pomodoro {
  constructor() {
    this.active = false;
    this.resting = false;
    this.times = [workTime.textContent, 0, 100] // min,sec,cs
  }

  handleCounter() {
    if (!this.active) {
      this.active = !this.active;
      btnNavi.textContent = "pauza";
      divCounter.style.borderColor = "green";
      this.startTime = performance.now();
      requestAnimationFrame(this.step.bind(this));
    } else {
      this.active = !this.active;
      btnNavi.textContent = "wznów";
      divCounter.style.borderColor = "orange";
    }
  }

  step(nowTime) {
    if (!this.active) return;
    this.compute(nowTime);
    this.startTime = nowTime;
    this.show();
    requestAnimationFrame(this.step.bind(this));
  }

  compute(nowTime) {
    if (!this.times[0] && !this.times[1]) this.notify();
    const centisecond = nowTime - this.startTime;
    this.times[2] -= centisecond / 10;
    if (this.times[2] < 0) {
      this.times[1]--;
      this.times[2] = 100;
    }
    if (this.times[1] < 0) {
      this.times[0]--;
      this.times[1] = 59;
    }
  }

  show() {
    this.times[0] < 10 ? spanMin.textContent = `0${this.times[0]}` : spanMin.textContent = this.times[0];
    this.times[1] < 10 ? spanSec.textContent = `0${this.times[1]}` : spanSec.textContent = this.times[1];
  }
  notify() {
    beep.play();
    if (!this.resting) {
      alert("Czas na przerwę")
      this.times[0] = breakTime.textContent;
    } else {
      alert("Pora wracać do pracy");
      this.times[0] = workTime.textContent
    }
    this.resting = !this.resting;
  }

  changeValue(e) {
    const id = e.target.id;
    let changeWork = workTime.textContent;
    let changeBreak = breakTime.textContent;
    const stopCounter = () => {
      this.handleCounter();
      this.times[1] = 0
    }
    if (id === 'workMore' || id === 'workLess') {
      id === 'workMore' ? changeWork++ : changeWork--;
      changeWork > 60 ? changeWork = 60 : null;
      changeWork < 1 ? changeWork = 1 : null;
      !this.resting ? this.times[0] = changeWork : null;
      changeWork < 10 ? changeWork = `0${changeWork}` : null
      workTime.textContent = changeWork;
      !this.resting && this.active ? stopCounter() : null;
    } else if (id === 'breakMore' || id === 'breakLess') {
      id === 'breakMore' ? changeBreak++ : changeBreak--;
      changeBreak > 60 ? changeBreak = 60 : null;
      changeBreak < 1 ? changeBreak = 1 : null;
      this.resting ? this.times[0] = changeBreak : null;
      changeBreak < 10 ? changeBreak = `0${changeBreak}` : null
      breakTime.textContent = changeBreak;
      this.resting && this.active ? stopCounter() : null;
    }
    this.show()
  }
}

const pomodoro = new Pomodoro();

divCounter.addEventListener('click', () => pomodoro.handleCounter());

for (arrow of arrows) {
  arrow.addEventListener("click", e => pomodoro.changeValue(e));
}