// Selecting HTML elements
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

// API Key
const apiKey = 'f84009647ce2a9db9dcff46b58632a4b';

//Using fetch POST method
const data1 = {
  abc: 'Hello',
  xyz: 'Bye'
};
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data1)
};
fetch('/api', options);

//Adding Event Listener
form.addEventListener("submit", async e => {
    
  //Prevent Default Behavior
  e.preventDefault();

  //try to ask openweather for data
  try {
      //select city entered
      const inputVal = input.value;
      //API call
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${apiKey}`;
      
      //wait for response and convert into JSON format
      const resp = await fetch(url);
      const data = await resp.json();
      //create list element with response data
      createList(data);
      //reset with success
      reset(' ');
  } catch {
      //reset with error message
      reset('Please enter a valid city name!');
  };
});

function reset(message){
  msg.textContent = message;
  form.reset();
  input.focus();
}
function createList(data){
  //destructuring data
  const {main, sys, weather, name} = data;
  //setting icon
  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  //adding HTML
  const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
  <figure>
      <img class="city-icon" src="${icon}" alt="${
      weather[0].description}">
      <figcaption>${weather[0].description}</figcaption>
  </figure>`;
  //create list
  const li = document.createElement("li");
  //set class name
  li.classList.add("city");
  //adding to list
  li.innerHTML = markup;
  list.appendChild(li);
}