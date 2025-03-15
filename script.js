document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const placeImage = document.getElementById("placeImage");

    const WEATHER_API_KEY = "10891d1395ceebb5eff1531ce8f9a943";
    const UNSPLASH_API_KEY = "B40CZ4gPPQSsDGaprrpJ_ShZJ_k1eiGMrUerho6Bdas";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
            fetchPlaceImage(city);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            // throw new Error("City Not Found");
        }
        return await response.json();
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        placeImage.style.display = "none";
    }

    //function for get the real-time images 

    async function fetchPlaceImage(city) {
        const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results.length > 0) {
                placeImage.src = data.results[0].urls.regular;
                placeImage.style.display = "block"; // Show the image if found
            } else {
                console.log("No image found for this place.");
                placeImage.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            placeImage.style.display = "none";
        }
    }
});