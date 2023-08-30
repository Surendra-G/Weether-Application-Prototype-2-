const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const cityName = document.querySelector('.city-name');
const temp= document.querySelector('.temp');
const dateElement = document.querySelector('.date');
const weather_description = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const pressure = document.querySelector('.pressure');
const weatherIcon = document.querySelector('.weather-icon');


const API_KEY = '61a022f39f51f59d4fec11ef3585f829';

// Set the cityInput value to "Carmarthenshire"
cityInput.value = 'Carmarthenshire';

// Submit the form when the page loads
window.addEventListener('load', () => {
  form.dispatchEvent(new Event('submit')); // Dispatch a submit event on the form
});

form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent form submission
    const city = cityInput.value;    // Get the value entered in the cityInput field

    // PROTOTYPE-1
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)  // Fetching the weather from the API
      .then(response => response.json())  //convert the reponse data in to JSON
      .then(data => {
        if (data.cod === 200) {  // if success (i.e 200 = success)
            // updating the HTML with the value
          const { name, main: { temp: temperature,
            humidity: humidityValue,
            pressure: pressureValue,}, 
          weather: [{ description }], 
          wind: { speed },
          dt: timeValue
        } = data;
          const weatherIconCode = data.weather[0].icon;  // Get the weather icon code
          const date = new Date(timeValue * 1000);
          
          
          cityName.textContent = name ;
          temp.textContent = `${temperature}°C`;
          weather_description.textContent = description;
          dateElement.textContent = formatDate(date);
          humidity.textContent = `Humidity: ${humidityValue}%`;
          pressure.textContent = `Pressure: ${pressureValue} Pa`;
          wind.textContent = `Wind Speed: ${speed} m/s`;
          weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIconCode}.png" alt="Weather Icon" >`;
        } else {  // if failed in finding the city, gives City not found as a result
          cityName.textContent = 'City not found';
          resetArea();  //reset the weather information
        }
      })
      .catch(error => {
        console.error(error);
        cityName.textContent = 'Internet connection error, please try again';
        resetArea();
      });
  });

// Function to format the date as "Weekday, Month Day, Year"
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatedDate = date.toLocaleDateString('en-US', options); //return date in english language
    return formatedDate;
}

function resetArea(){
    //clearing all the field 
    temp.textContent = '';
    weather_description.textContent = ''; 
    humidity.textContent = '';
    wind.textContent = ''; 
    weatherIcon.innerHTML = '';
}

