// Selecting HTML elements
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

//Adding Event Listener
form.addEventListener("submit", async e => {

  //Prevent Default Behavior
  e.preventDefault();

  //Selecting city name entered
  const city = {
    name: input.value
  };
  //Post req options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(city)
  };

  //try to ask openweather for data
  try {
    const resp = await fetch('/api', options);
    const data = await resp.json();
    console.log(data);

    if (data.status !== false) {
      createList(data);
      //reset with success
      reset(' ');
    } else {
      //reset with error message
      reset('Please enter a valid city name!');
    }
  } catch (e) {
    console.log(e);
  };
});

function reset(message) {
  msg.textContent = message;
  form.reset();
  input.focus();
}
function createList(data) {
  //destructuring data
  const { main, sys, weather, name } = data;
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
      <img class="city-icon" src="${icon}" alt="${weather[0].description}">
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