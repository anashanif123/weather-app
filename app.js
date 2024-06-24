document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'c153479685c47f1b34a83591f3b1acbe';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const citySelect = document.getElementById('city-select');
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const iconElement = document.getElementById('icon'); // added icon element

    // Function to fetch weather data
    function fetchWeather(latitude, longitude) {
        // const units = 'etric';
        // const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        const units = 'metric';
        const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        fetch(url)
           .then(response => response.json())
           .then(data => {
                console.log(data);
                const cityName = data.name;
                const temperature = data.main.temp;
                const weather = data.weather[0];
                const description = weather.description;
                const icon = weather.icon;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                // Update HTML elements with weather information
                cityNameElement.textContent = cityName;
                temperatureElement.textContent = `${temperature}`
                descriptionElement.innerHTML = `${description} <img style="margin-bottom: -18px; height:50px;" src="http://openweathermap.org/img/w/${icon}.png" alt="${description}"  >`;
                humidityElement.textContent = humidity;
                windSpeedElement.textContent = windSpeed;
                iconElement.src = `http://openweathermap.org/img/w/${icon}.png`; // update icon element
            })
           .catch(error => {
                console.log('Error fetching weather data:', error);
            });
    }

    // Event listener for button click to get weather
    citySelect.addEventListener('change', function() {
        const selectedCity = citySelect.value;
        const [latitude, longitude] = selectedCity.split(',');

        fetchWeather(latitude, longitude);
    });

    // Fetch weather for the default selected city on page load
    const defaultCity = '24.8607,67.0011'; // Karachi by default
    const [defaultLatitude, defaultLongitude] = defaultCity.split(',');
    fetchWeather(defaultLatitude, defaultLongitude);
});
