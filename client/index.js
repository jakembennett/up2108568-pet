'use strict';

function pageLoaded() {
  console.log('pet is ready');
}

//If a name is already stored in localStorage on page load, it will be displayed in the input
let storedName = window.localStorage.getItem('Pet Name');
document.querySelector('#nameInput').value = storedName;


// Non-gameplay buttons
const startButton = document.querySelector('#start');
startButton.addEventListener('click', startGame);

const replayButton = document.querySelector('#replay');
replayButton.addEventListener('click', playAgain);

const nameButton = document.querySelector('#namePet');
nameButton.addEventListener('click', namePet);

const clearNameButton = document.querySelector('#clearName');
clearNameButton.addEventListener('click', clearName);


function playAgain() {
  location.reload();
}

//Stores name in localstorage
function namePet() {
  const name = document.querySelector('#nameInput').value;
  window.localStorage.setItem('Pet Name', name);
  }


// Clears both nameInput in the window and name in local storage
function clearName(name) {
  window.localStorage.clear(name);
  document.querySelector('#nameInput').value = '';
}

//Main game function
function startGame() {
  
  status = 'Alive';

  //The status is displayed at the top of the page
  window.localStorage.setItem('Status', status)
  document.querySelector('#status').value = status

  //Occurs every second
  function meterTick(){

    //Buttons and functions in order to feed the pet
    const foodButton = document.querySelector('#feedButton');
    foodButton.addEventListener('click', feed);

    function feed() {
      document.querySelector('#food').value += 5;
      window.localStorage.setItem('#food', food);
      document.querySelector('food', food);
    }

    const sleepButton = document.querySelector('#sleepButton');
    sleepButton.addEventListener('click', sleep);

    function sleep() {
      document.querySelector('#sleep').value += 5;
      window.localStorage.setItem('#sleep', sleep);
      document.querySelector('sleep', sleep);
    }

    const washButton = document.querySelector('#washButton');
    washButton.addEventListener('click', wash);

    function wash() {
      document.querySelector('#cleanliness').value += 5;
      window.localStorage.setItem('#cleanliness', cleanliness);
      document.querySelector('cleanliness', cleanliness);
    }

    //Timer for the lifespan of the current pet
    let startTime = Date.now();
    
    let refresh = setInterval(() => {
      
      
      let miliseconds = Date.now() - startTime;
      let elapsed = document.querySelector('#time').value ++;

      let happiness = (document.querySelector('#food').value + document.querySelector('#sleep').value + document.querySelector('#cleanliness').value) /3;
      window.localStorage.setItem('happiness', happiness);
      document.querySelector('#happiness').value = happiness;

      if (happiness == 0){
        status = 'Dead'
        document.querySelector('#status').style.backgroundColor = 'red';
        window.localStorage.setItem('Status', status);
        document.querySelector('#status').value = status;
        alert("Oh no! Your pet has died! It lived for:" + (miliseconds/1000) + "seconds.")
        clearInterval(refresh);
      }  

      //The value of each 3 attributes is reduced by 1-10% per second
      let food = document.querySelector('#food').value;
      window.localStorage.setItem('food', food);
      food = food - Math.floor(Math.random() * 11);
      document.querySelector('#food').value = food;


      let sleep = document.querySelector('#sleep').value;
      window.localStorage.setItem('sleep', sleep);
      sleep = sleep - Math.floor(Math.random() * 11);
      document.querySelector('#sleep').value = sleep;

      const washButton = document.querySelector('#washButton');
      washButton.addEventListener('click', wash);
      let cleanliness = document.querySelector('#cleanliness').value;
      window.localStorage.setItem('cleanliness', cleanliness);
      cleanliness = cleanliness - Math.floor(Math.random() * 11);
      document.querySelector('#cleanliness').value = cleanliness;


      window.localStorage.setItem('happiness', happiness);

      
    }, 1000);  
  }

  if (document.querySelector('#happiness').value > 0){
    meterTick()
  }

}

window.addEventListener('load', pageLoaded)