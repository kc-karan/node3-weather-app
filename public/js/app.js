console.log('Client side javascript file is loaded!');
const weatherForm = document.querySelector('form');
const weatherLocation = document.querySelector('input');
const submitBtn = document.querySelector('#button');
const weatherResult = document.querySelector('#weather-result');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let url = '/weather?address=' + encodeURIComponent(weatherLocation.value);
    fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((weatherData) => {
        weatherResult.innerHTML = '';
        weatherResult.innerHTML = `
            <div class="weather-info">
                <h1>${weatherData.forecastData.weather_desc[0]}</h1>
               <h3>A temperature of ${weatherData.forecastData.temperature}&#8451 with a chance of rainfall of about ${weatherData.forecastData.precipitation}%</h3>
               <h4>${weatherData.place_name}</h4>
            </div>
        `;
        console.log(weatherData);
    })
    .catch(err => {
        weatherResult.innerHTML = '<p>Incorrect Input!</p>';
        console.log(err);
    })
})