function formatDate(timestamp) {
  //will calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  //Implement HTML in JS, to not have a repeating code in HTML
  forecastHTML =
    forecastHTML +
    ` 
            <div class="col-2">
              <div class="weather-forecast-date">sUNDSY</div>
              <img
                src="http://openweathermap.org/img/wn/01n@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18 °C</span>
                <span class="weather-forecast-temperature-min">12 °C</span>
              </div>
            </div>
          
       
       `;
  forecastHTML =
    forecastHTML +
    ` 
            <div class="col-2">
              <div class="weather-forecast-date">sUNDSY</div>
              <img
                src="http://openweathermap.org/img/wn/01n@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18 °C</span>
                <span class="weather-forecast-temperature-min">12 °C</span>
              </div>
            </div>
          
       
       `;
  forecastHTML = forecastElement + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon"); //search for the icon URL link

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000); //To get the time and to convert it in milliseconds thats why it is *1000
  //This setAttribute will change the icon with the one in the URL link.You can remove the image you had in src now
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description); //we do this for the image to look better near description and temperature
}

function search(city) {
  let apiKey = "b1c7074725f017b97210de1d82e98750";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value); //to search for the city I want when I type the city name in the app
}

function displayFahrenheitTemperature(event) {
  event.preventDefault;
  //remove active class from celsius link and add it to fahrenheit when i click on it-  this is what i mean
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault;
  // now same here remove active from fahrenheit and add it to celsius when i click on celsius
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null; //global variable outside the functions, can be accesed from inside a function

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
displayForecast();
