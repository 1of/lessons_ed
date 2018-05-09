const URL = 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json';
var countrySelect = document.getElementById('country');
var citySelect = document.getElementById('city');
var option = document.getElementsByTagName('option');


function httpGet(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}



httpGet(URL)
  .then(
    response => {
var string = JSON.parse (`${response}`);
var i = 1;
for (key in string) {
	var addOption = document.createElement('option'); //создание нового узла документа
	countrySelect.appendChild(addOption); //добавляем наш узел в виде последнего дочернено узла
	option[i].innerHTML = key;    // записываем в option значения (страны)
	option[i].setAttribute('value', key);    //добавляем атрибут
	i++;
}
},
    error => {console.log(`Rejected: ${error}`)}
  );



function addCity() {
	var country = arguments[0];
	httpGet(URL)
	.then(
    response => {
var string = JSON.parse (`${response}`);
var arr = string[country];
var citySelect = document.getElementById('city');
var cityOption = citySelect.getElementsByTagName('option');
for (var i = 0; i < cityOption.length; i++) {
citySelect.removeChild(cityOption[i]); //очищяем наш select от значений
}
for (var i = 0; i < arr.length; i++) {
	var option2 = document.createElement('option'); //создание нового узла документа
	citySelect.appendChild(option2); //добавляем наш узел в виде последнего дочернено узла
	cityOption[i].innerHTML = arr[i];    // записываем в option значения (страны)
	cityOption[i].setAttribute('value', arr[i]);    //добавляем атрибут
}
},
    error => {console.log(`Rejected: ${error}`)}
  );

}




function showWeather() {
	var city = arguments[0];
	console.log(city);

	var cityURL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%20and%20u%3D'c'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`; // ${city} - подставляем наш город со списка
	var cityURL2 = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`; // ${city} - подставляем наш город со списка
	httpGet(cityURL2)
	.then(
    response => {
var string = JSON.parse (`${response}`);
var arr = string[city];
var location = string.query.results.channel.location;
var temp = string.query.results.channel.item.condition;
var img = string.query.results.channel.item.description;
var imgstr = img.substr(9,50);   

	console.log(imgstr, img);
	var forecast = document.getElementById('forecast');
	var addp = document.createElement('p');
	var t = document.createTextNode(`${location.country}, ${location.region} - ${location.city} 
${temp.date} 
${temp.temp} C; ; ${temp.text}`); 
		var addpInner = document.getElementsByTagName('p');
	forecast.appendChild(addp);
	addp.innerHTML = `<h3>${location.country}, ${location.region} - ${location.city}</h3> 
<span> ${temp.date}<span>
<h2> ${imgstr}${temp.text} - ${temp.temp} &deg C  </h2>
	`;
},
    error => {console.log(`Rejected: ${error}`)}
  );

}
