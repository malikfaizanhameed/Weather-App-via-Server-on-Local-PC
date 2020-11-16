/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "f84009647ce2a9db9dcff46b58632a4b";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  const resp = await fetch(url);
  const data = await resp.json();
  // debugger;

  const { main, name, sys, weather } = data;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon
    }@2x.png`;


  const li = document.createElement("li");
  li.classList.add("city");
  const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
  li.innerHTML = markup;
  list.appendChild(li);

  // msg.textContent = "Please search for a valid city 😩";

  msg.textContent = "";
  form.reset();
  input.focus();
});