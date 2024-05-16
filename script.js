let container = document.querySelector(".container");
let search = document.querySelector(".search-box button");
let weatherBox = document.querySelector(".weather-box");
let weatherDetails = document.querySelector(".weather-details");
let error404 = document.querySelector(".not-found");
let cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;
  console.log(city);
  if (city == "") return;

  fetch(`https://www.prevision-meteo.ch/services/json/${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      let temperature = document.querySelector(".weather-box .temperature");
      let vitesseVent = document.querySelector(".weather-details .info-wind");
      let humidite = document.querySelector(".weather-details .info-humidity");
      let conditionMeteo = document.querySelector(".weather-box .description");
      let image = document.querySelector(".weather-box img");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        cityHide.classList.add("active");
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        temperature.innerHTML = `${data.current_condition.tmp}<span>C°</span>`;
        vitesseVent.innerHTML = `${data.current_condition.wnd_spd}<span>Km/h</span>`;
        humidite.innerHTML = `${data.current_condition.humidity}<span>%</span>`;
        conditionMeteo.innerHTML = data.current_condition.condition;
        image.src = data.current_condition.icon_big;
      }
    });
});
