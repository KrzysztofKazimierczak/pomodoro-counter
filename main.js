const divCounter = document.querySelector('.panel');
const spanMin = document.querySelector('.min')
const spanSec = document.querySelector('.sec')
const btnNavi = document.querySelector('.handle');
const workTimeSpan = document.getElementById('workTime');
const breakTimeSpan = document.getElementById('breakTime');
const arrows = document.querySelectorAll('.value i');
const beep = new Audio('sound/beep.mp3');

class Pomodoro {
  constructor() {
    this.active = false;
    this.resting = false;
    this.minutes = workTimeSpan.textContent;
    this.seconds = 0
    this.centisecs = 100
  }

  handleCounter() {
    if (!this.active) {
      this.active = !this.active;
      btnNavi.textContent = "pauza";
      divCounter.style.borderColor = "#3EC169";
      this.startTime = performance.now();
      requestAnimationFrame(this.step.bind(this));
    } else {
      this.active = !this.active;
      btnNavi.textContent = "wznów";
      divCounter.style.borderColor = "#B2DBBF";
    }
  }

  step(nowTime) {
    if (!this.active) {
      return
    };
    this.compute(nowTime);
    this.startTime = nowTime;
    this.show();
    requestAnimationFrame(this.step.bind(this));
  }

  compute(nowTime) {
    if (!this.minutes && !this.seconds) {
      this.notify()
    }
    const centisecond = nowTime - this.startTime;
    this.centisecs -= centisecond / 10;
    if (this.centisecs < 0) {
      this.seconds--;
      this.centisecs = 100;
    }
    if (this.seconds < 0) {
      this.minutes--;
      this.seconds = 59;
    }
  }

  show() {
    this.minutes < 10 ? spanMin.textContent = `0${this.minutes}` : spanMin.textContent = this.minutes;
    this.seconds < 10 ? spanSec.textContent = `0${this.seconds}` : spanSec.textContent = this.seconds;
  }
  notify() {
    beep.play();
    if (!this.resting) {
      alert("Czas na przerwę")
      this.minutes = breakTimeSpan.textContent;
    } else {
      alert("Pora wracać do pracy");
      this.minutes = workTimeSpan.textContent
    }
    this.resting = !this.resting;
  }

  handleSettings(e) {
    const id = e.target.id;
    let workTimeValue = workTimeSpan.textContent;
    let breakTimeValue = breakTimeSpan.textContent;

    if (id === 'workMore' || id === 'workLess') {
      id === 'workMore' ? workTimeValue++ : workTimeValue--;
      workTimeValue = this.changeValue(workTimeValue, breakTimeValue, workTimeSpan);
      if (!this.resting) {
        this.minutes = workTimeValue
      }

    } else if (id === 'breakMore' || id === 'breakLess') {
      id === 'breakMore' ? breakTimeValue++ : breakTimeValue--;
      breakTimeValue = this.changeValue(breakTimeValue, workTimeValue, breakTimeSpan);
      if (this.resting) {
        this.minutes = breakTimeValue
      }
    }
    this.show()
  }

  changeValue(changedValue, secondValue, span) {
    switch (changedValue) {
      case 61:
        changedValue = 60;
        break;
      case 0:
        changedValue = 1;
        break;
    }
    // make always two-digit number
    changedValue < 10 ? span.textContent = `0${changedValue}` : span.textContent = changedValue;


    // stop counter if changing current countdown
    if (!this.resting && this.active && changedValue == workTimeSpan.textContent && changedValue != secondValue) {
      this.stopCounter()
    } else if (this.resting && this.active && changedValue == breakTimeSpan.textContent && changedValue != secondValue) {
      this.stopCounter()
    }
    return changedValue;
  }

  stopCounter() {
    this.handleCounter();
    this.seconds = 0;
  }
}

const pomodoro = new Pomodoro();

divCounter.addEventListener('click', () => pomodoro.handleCounter());

for (arrow of arrows) {
  arrow.addEventListener("click", e => pomodoro.handleSettings(e));
}