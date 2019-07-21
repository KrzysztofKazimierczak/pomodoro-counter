const divCounter = document.querySelector('.panel')
const counter = document.querySelector('.counter');
const btnNavi = document.querySelector('.handle')
const workTime = document.getElementById('workTime');
const breakTime = document.getElementById('breakTime');
const arrows = document.querySelectorAll('.value i')
const beep = new Audio('sound/beep.mp3');


let active = false;
let resting = false;
let minutes = workTime.textContent;
let seconds = 0;
let interval = false;



const handleCounter = () => {

  if (!active) {
    active = !active;
    btnNavi.textContent = "pauza";
    interval = setInterval(start, 1000)
    divCounter.style.borderColor = "green";
  } else {
    active = !active;
    btnNavi.textContent = "wznów";
    clearInterval(interval);
    divCounter.style.borderColor = "orange";
  }

}

const start = () => {
  if (!minutes && !seconds) {
    beep.play();
    !resting ? alert("Czas na przerwę") : alert("Pora wracać do pracy");
    !resting ? minutes = parseInt(breakTime.textContent) : minutes = parseInt(workTime.textContent);
    resting = !resting;
  }
  seconds == 0 ? minutes-- : minutes;
  seconds == 0 ? seconds = 59 : seconds--;
  let time = `${minutes}.${seconds}`;
  minutes.toString().length === 1 ? counter.textContent = `0${time}` : counter.textContent = time;
}

const changeValue = (e) => {
  let id = e.target.id;
  let changeWork = workTime.textContent;
  let changeBreak = breakTime.textContent;


  if (id === 'workMore' || id === 'workLess') {
    id === 'workMore' ? changeWork++ : changeWork--;
    changeWork > 60 ? changeWork = 60 : null;
    changeWork < 1 ? changeWork = 1 : null;
    changeWork < 10 ? changeWork = `0${changeWork}` : null
    workTime.textContent = changeWork;
  } else if (id === 'breakMore' || id === 'breakLess') {
    id === 'breakMore' ? changeBreak++ : changeBreak--;
    changeBreak > 60 ? changeBreak = 60 : null;
    changeBreak < 1 ? changeBreak = 1 : null
    changeBreak < 10 ? changeBreak = `0${changeBreak}` : null
    breakTime.textContent = changeBreak;
  }
  seconds.toString().length !== 2 ? seconds = `0${seconds}` : null;

  !resting ? counter.textContent = `${changeWork}.${seconds}` : counter.textContent = `${changeBreak}.${seconds}`;
  !resting ? minutes = changeWork : minutes = changeBreak;

  active ? handleCounter() : null;

}

counter.textContent = parseInt(minutes).toFixed(2);

divCounter.addEventListener('click', handleCounter);

for (arrow of arrows) {
  arrow.addEventListener("click", changeValue);
}