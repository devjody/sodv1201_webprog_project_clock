/* 

SODV1202 INTRO PROG JUNE 2020 
JODY BOSTON 420974 ==========>

MAIN DIGITAL / ANALOGUE CLOCKS ======================>
- MAIN SOURCES OF WORK INCLUDE, MDN / W3 AND A BOOK I HAVE 
BY JON DUNKETT - JS AND JQ. ALSO I HAVE A JAVASCRIPT.INFO 
PDF WHICH IS AMAZING!

**NOTE - ANALOG CLOCK WAS CODED BY MYSELF, FOLLOWING A 
TUTORIAL BY KYLE OF WEBDEV YOU TUBE, LEFT IT IN FOR DESIGN. 
I ACTUALLY MADE 3 DIFFERENT CSS ACTIVATED CLOCKS FOR FUN, 
THIS WAS MY FAV.

[SOURCE]
TITLE: BUILD A CLOCK WITH JAVASCRIPT 2019
URL: https://www.youtube.com/watch?v=Ki0XXrlKlHY

*/

// TIME FORMAT
let format = 'en-CA';

const timeFormat = document.querySelector('.timeFormat');

// ALARM AND TIME SELECTORS
const setHour = document.querySelector('.setHour');
const setMinute = document.querySelector('.setMinute');
const setAlarm = document.querySelector('.setAlarm');
const cancelAlarm = document.querySelector('.cancelAlarm');
const setFormat = document.querySelector('.setFormat'); 


// DIGITAL SECECTORS
const timeDigital = document.querySelector('.timeDigital');
let setCustomTime = false;

// ANALOGUR HAND SELECTORS
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')


// SET REAL OR SET TIME   ======================== 
const realTime = () => {
  
  setCustomTime = false;
  const timeReal = new Date().toLocaleTimeString(format);
  return timeDigital.textContent = timeReal;
  
};

const setTime = () => {
  
  setCustomTime = true;
  const setDate = new Date();
  const setHourReq = parseInt(document.querySelector('.setHour').value); 
  const setMinuteReq = parseInt(document.querySelector('.setMinute').value); 
  const convertReq = setDate.setHours(setHourReq, setMinuteReq)
  const setTime = new Date(convertReq).toLocaleTimeString(format);
  console.log("setTime -> setTime", setTime)
  return timeDigital.textContent = setTime;

};

// MAIN START CLOCK ====================================================

function startClock() {

  !setCustomTime ? realTime() : setTime();

}

// ANALOG CSS DRIVEN CLOCK =====================================

const analogClock = () => {

  const timeAnalog = new Date();
  const secondsRatio = timeAnalog.getSeconds() / 60;
  const minutesRatio = (secondsRatio + timeAnalog.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + timeAnalog.getHours()) / 12;

  const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--rotation', rotationRatio * 360);
  };

  setRotation(hourHand, hoursRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(secondHand, secondsRatio);

};

// SETTING AN ALARM ======================================== 

document.querySelector('.setAlarm').addEventListener("click", function () {

  const newAlarmHour = document.querySelector('.setHour').value;
  const newAlarmMinute = document.querySelector('.setMinute').value;

  // CONCAT INPUTS TO SET NEW ALARM VALUE
  const newAlarm = newAlarmHour + ':' + newAlarmMinute;

  // TEMPLATE LITERAL TO OUTPUT PAGE
  document.querySelector('.alarmSet').innerHTML =
    `<span class="alarmP">Alarm set for... <span class="alarmSpan">${newAlarm} !</span></span>`;

});

document.querySelector('.clearAlarm').addEventListener("click", function () {
  document.querySelector('.alarmSet').innerHTML = 'No Alarm Set';

});


// TO CREATE TIME OPTIONS =================================

const createMinuteOption = (setMinute) => {
  
  let min = 59;
  for (let i = 0; i <= min; i++) {
    setMinute.options[setMinute.options.length] = new Option(i < 10 ? '0' + i : i);

  }

};

const createHourOption = (setHour) => {
  
  let hour = 23;
  for (let j = 0; j <= hour; j++) {
    setHour.options[setHour.options.length] = new Option(j < 10 ? '0' + j : j);
    
  }
  
};

createMinuteOption(setMinute);
createHourOption(setHour);

// STOPWATCH CODE ========================================

const minuteOutputElement = document.querySelector('#minuteOutput');
const secondOutputElement = document.querySelector('#secondOutput');
const millisOutputElement = document.querySelector('#millisOutput');
let minuteInterval;
let secondInterval;
let millisInterval;
let minCounter = 0;
let secCounter = 0;
let msCounter = 0;
let activeStopwatch = false;

const startStopwatch = () => {

  if (!activeStopwatch) {

    // BOOL FOR BUTTON STATUS
    activeStopwatch = true;
    // MAIN INTERVAL FUNCTION
    minuteInterval = setInterval(() => {
      // INCREASING COUNT
      minCounter += 1;
      // OUTPUT TO SPAN AND USING TERNARY TO CHECK FOR PADDING
      minuteOutputElement.textContent = minCounter < 10 ? `0${minCounter}` : minCounter;
    }, 60000);

    secondInterval = setInterval(() => {
      secCounter += 1;
      secCounter > 59 ? secCounter = 0 : secCounter;
      secondOutputElement.textContent = secCounter < 10 ? `0${secCounter}` : secCounter;
    }, 1000);

    millisInterval = setInterval(() => {
      msCounter += 1;
      msCounter > 99 ? msCounter = 0 : msCounter;
      millisOutputElement.textContent = msCounter < 10 ? `0${msCounter}` : msCounter;
    }, 10);

  }
  return

};
// STOP BUTTON ACTION
document.querySelector('.button-stop').addEventListener('click', () => {

  activeStopwatch = false;

  clearInterval(minuteInterval);
  clearInterval(secondInterval);
  clearInterval(millisInterval);

});
// RESET BUTTON ACTION
document.querySelector('.button-reset').addEventListener('click', () => {

  activeStopwatch = false;

  clearInterval(minuteInterval);
  clearInterval(secondInterval);
  clearInterval(millisInterval);

  minCounter = 0;
  secCounter = 0;
  msCounter = 0;

  minuteOutputElement.textContent = '00';
  secondOutputElement.textContent = '00';
  millisOutputElement.textContent = '00';

});

// EVENT LISTENER AND CALLING FUNCTIONS

document.querySelector('.button-start').addEventListener('click', (event) => {
  event.preventDefault();
  startStopwatch();
});

document.querySelector('.timeFormat').addEventListener('click', swapFormat = () => {

  if (format == 'en-CA' ? format = 'en-GB' : format = 'en-CA');
  return;

});

document.querySelector('.clearTime').addEventListener('click', () => {

  setCustomTime = false;
  return;

});

document.querySelector('.setTime').addEventListener('click', setTime);
setInterval(startClock, 1000);
setInterval(analogClock, 1000);