function createElement(elemName, elemClass = "") {
    var element = document.createElement(elemName);
    element.setAttribute("class", elemClass);
    return element;
  }

let container = createElement('div', 'container');
let titleRow = createElement('div', 'row');
let titleColumn = createElement('div', 'col-lg-12 col-sm-12')
let heading = createElement('h1', 'heading')
heading.textContent = 'RestCountries Wheather Data'
let row = createElement('div', 'row');


fetch('https://restcountries.eu/rest/v2/all').then(function(response){
    return response.json()
}).then(function(jsonData){
    
    for(let i=0; i<jsonData.length; i++){
        let col = createElement('div', 'col-lg-4 col-sm-12 mt-5');
        col.setAttribute('style', 'width: 200px; height: 400px;')
        let card = createElement('div', 'card card-header card-body')
        let cardTitle = createElement('h6');
        cardTitle.textContent = jsonData[i].name;
        cardTitle.setAttribute('style', 'text-align: center')
        let flagImg = createElement('img');
        flagImg.src = jsonData[i].flag;
        flagImg.alt = 'National Flag'
        let cardBody = createElement('div', 'mt-2');
        let countryInfo = createElement('h6');
        countryInfo.setAttribute('style', 'text-align: center')
        countryInfo.innerHTML = `Capital: ${jsonData[i].capital} <br> Region: ${jsonData[i].region} <br> Country Code: ${jsonData[i].alpha3Code} <br>`;
        let weatherBtn = createElement('button', 'btn btn-primary');
        weatherBtn.textContent = 'Click for Weather';
        weatherBtn.onclick = function(cityWeather){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${jsonData[i].capital}&appid=11dd9bdc06d3bb1b96b73bc9c879ccce`).then(function(response){
                return response.json()
            }).then(function(weather){
                alert(`
                latitude: ${weather.coord.lat} 
                longtitude: ${weather.coord.lon}
                feels_like: ${weather.main.feels_like}
                humidity: ${weather.main.humidity}
                pressure: ${weather.main.pressure}
                temp: ${weather.main.temp}`)

            })
        }

        cardBody.append(countryInfo, weatherBtn)
        card.append(cardTitle, flagImg, cardBody)
        col.append(card);
        row.append(col);
    }
   })
   
   titleColumn.append(heading)
   titleRow.append(titleColumn);
   container.append(titleRow, row);
   document.body.append(container);
   