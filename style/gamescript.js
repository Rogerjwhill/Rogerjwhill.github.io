const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
const targetNum = document.querySelector('.targetNum')
const bar  = document.querySelector('.bar')
const bestScore = document.querySelector('.bestScore')


function progress() {
    let date = new Date()
    let sec = date.getSeconds()
    let timeleft = 60 - sec
    let progressBarWidth = 100 * timeleft  / 60;
    bar.style.width = progressBarWidth + "%";
    if (sec < 1) {
      date.setSeconds(date.getSeconds() + 2)
      setDigits(date)
      targetNum.textContent = '1';
    }
};

function setDigits(date) {
  let hours = date.getHours().toString()
  let mins = date.getMinutes().toString()
  // replace any zeros in the time with 1
  if (hours.length === 1 ) {
    hours = "1" + hours;
  }
  if (mins.length === 1 ) {
    mins = "1" + mins;
  }
  hours = hours.replace("0","1");
  mins = mins.replace("0","1");
  // change the buttons to correct numbers
  document.getElementById("a").textContent = hours.charAt(0);
  document.getElementById("b").textContent = hours.charAt(1);
  document.getElementById("c").textContent = mins.charAt(0);
  document.getElementById("d").textContent = mins.charAt(1);
}

function callSetDigits() {
  let date = new Date();
  setDigits(date);
}

function callProgressBar() {
   window.setInterval(progress, 1000);
 }


keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const displayedTargetNum = eval(targetNum.textContent)
    const best = eval(bestScore.textContent)
    const previousKeyType = keys.dataset.previousKeyType


    if (!action) {
      if (displayedNum === '0') {
        display.textContent = keyContent
        key.classList.add('is-depressed')
        key.disabled = true;
        keys.dataset.previousKeyType = 'number'
      } else if (previousKeyType === 'operator'||
                 previousKeyType === 'leftBracket') {
        display.textContent = displayedNum + keyContent
        key.classList.add('is-depressed')
        key.disabled = true;
        keys.dataset.previousKeyType = 'number'
      }
    }

   if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if (previousKeyType === 'number'||
          previousKeyType === 'rightBracket') {
        display.textContent = displayedNum + keyContent
        // Add custom attribute
        keys.dataset.previousKeyType = 'operator'
      }
    }

    if (action === 'leftBracket') {
      if (displayedNum == '0') {
        display.textContent = keyContent
        // set previousKeyType
        keys.dataset.previousKeyType = 'leftBracket'
      }else if (previousKeyType === 'operator') {
        display.textContent = displayedNum + keyContent
        // set previousKeyType
        keys.dataset.previousKeyType = 'leftBracket'
      }
    }

    if (action === 'rightBracket') {
      if (previousKeyType === 'number') {
        display.textContent = displayedNum + keyContent
        keys.dataset.previousKeyType = 'rightBracket'
      }
    }

    if (action === 'clear') {
      display.textContent = '0'
      // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'));
      let divs = document.getElementsByClassName("number");
      for (var i = 0; i < divs.length; i++) {
        divs[i].disabled = false
      }
    }

    if (action === 'calculate') {
      const result = eval(displayedNum);
      if (result === displayedTargetNum) {
       targetNum.textContent = result + 1
       if (result >= best) {
         bestScore.textContent = result
       }
       display.textContent = '0'
       // Remove .is-depressed class from all keys
      Array.from(key.parentNode.children)
       .forEach(k => k.classList.remove('is-depressed'))
       // enable all buttons
       let divs = document.getElementsByClassName("number");
       for (var i = 0; i < divs.length; i++) {
         divs[i].disabled = false
       }
      } else {
       display.textContent = result
      }
    }
 }
})
