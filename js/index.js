
let CONFIG;
const currentTemp = document.querySelector('.temp-here');
const currentCity = document.querySelector('.city-here');
const currentWeather = document.querySelector('.weather-here');

navigator.geolocation.getCurrentPosition(function(position){
	const coordLat = position.coords.latitude;
	const coordLon = position.coords.longitude;
	
	fetch('../config.json')
	.then(response => response.json())
	.then(responseJson => {
		CONFIG = responseJson;
		const apiKey = CONFIG.apiKey;
		fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coordLat}&lon=${coordLon}&appid=${apiKey}&units=metric`)
		.then(response => response.json())
		.then(responseJson => {
			currentCity.innerText = responseJson.name;
			currentTemp.innerText = Math.round(responseJson.main.temp) + " °C";
			currentWeather.innerText = responseJson.weather[0].main;
		})
		.catch(error => {
			currentCity.innerText = "NOT A CITY";
			console.error(error);
		});
	});
});
	

const getWeather = () => {
	let CONFIG;
	const chosenTemp = document.querySelector('.temp-chosen');
	const chosenCity = document.querySelector('.city-chosen');
	const chosenWeather = document.querySelector('.weather-chosen');
	let city = document.querySelector('#inputCity').value;

	if(city == "" || city == undefined){
		city = "naaldwijk";
	}

	fetch('../config.json')
		.then(response => response.json())
		.then(responseJson => {
			CONFIG = responseJson;
			const apiKey = CONFIG.apiKey;
			fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
			.then(response => response.json())
			.then(responseJson => {
				chosenCity.innerText = responseJson.name;
				chosenTemp.innerText = Math.round(responseJson.main.temp) + " °C";
				chosenWeather.innerText = responseJson.weather[0].main;
			})
			.catch(error => {
				apiCity.innerText = "NOT A CITY";
				console.error(error);
			});
		});
	}

getWeather();
