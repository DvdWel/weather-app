
const getWeather = () => {
	let CONFIG;
	const apiTemp = document.querySelector('.temp');
	const apiCity = document.querySelector('.city');
	const apiWeather = document.querySelector('.weather');
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
				apiCity.innerText = responseJson.name;
				apiTemp.innerText = Math.round(responseJson.main.temp) + " °C";
				apiWeather.innerText = responseJson.weather[0].main;
			})
			.catch(error => {
				apiCity.innerText = "NOT A CITY";
				console.error(error);
			});
		});
	}

getWeather();