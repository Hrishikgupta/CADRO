// Required variables
var weather;

// Getting lat and long from sessionStorage
var storage = JSON.parse(sessionStorage.getItem("destination"));
var weatherLat = storage.position.lat;
var weatherLong = storage.position.lng;

// Fetching the weather
async function fetchWeather(){
    weather = await fetch( `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherLat}&lon=${weatherLong}&exclude=hourly&appid=df7ce556761f98dad07fc817248b0429` ).then( (weather)=>weather.json() )
    renderWeather();
}

// Determining if walking and/or biking are options
function determineOptions(){
    var walkIndex = chosenTransportMethods.findIndex(method => method.mode == "walk");
    var bikeIndex = chosenTransportMethods.findIndex(method => method.mode == "bike");
    var walkStatus = false;
    var bikeStatus = false;
    if(walkIndex >= 0){
        if(distances[walkIndex] <= 2){
            walkStatus = true;
        } 
    }
    if(bikeIndex >= 0){
        if(distances[bikeIndex] <= 15){
            bikeStatus = true;
        }
    }
    return {walk: walkStatus, bike: bikeStatus}
}

// Creating options for picking the weather advice from
function createMethodString(prefix, optionText, options) {
    const methodStrings = [];
    if (options.walk) methodStrings.push(optionText.walk);
    if (options.bike) methodStrings.push(optionText.bike);

    if (methodStrings.length) {
        return `${prefix} ${methodStrings.join(' or ')}!`;
    }

    return '';
}

// Compare car and truck with PT
function checkPTvsCar(cartime){
    var ptTime = loadFromSession(`traveltime-pt`);
    if(cartime >= 7200 && ptTime/cartime < 1.5){
        return true;
    } else if(cartime < 7200 && ptTime/cartime < 2){
        return true;
    } else {
        return false;
    }
}

// Show recommendation
function showRecommendation(walkOrBike, currentCondition){
    var rankedOptions = ["walk", "bike", "pt", "micro-car", "compact-car", "sedan", "suv", "truck"];
    var recommendedIndex = rankedOptions.findIndex(method => {
        var methodIndex = chosenTransportMethods.findIndex(m => {
            return m.mode == method;
        });
        if(methodIndex >= 0){
            if(method == "walk" || method == "bike"){
                if(walkOrBike[method] == true && (currentCondition >= 800 || currentCondition >= 300 && currentCondition < 400)){
                    return true;
                } else {
                    return false;
                }
            } else if(method == "pt" && loadFromSession(`traveltime-car`)){
                return checkPTvsCar(loadFromSession(`traveltime-car`));
            } else if(method == "pt" && loadFromSession(`traveltime-truck`)){
                return checkPTvsCar(loadFromSession(`traveltime-truck`));
            } else {
                return true;
            }
        } else {
            return false;
        }
    });
    if(recommendedIndex >= 0){
        document.querySelector(`[data-method=${mapKeyTranslator(rankedOptions[recommendedIndex])}]`).classList.add("recommended");
    }
}

// Render weather
function renderWeather(){
    // Determine conditions
    var options = determineOptions();
    var currentConditionId = weather.current.weather[0].id;
    var currentDescription = weather.current.weather[0].description;
    if(currentConditionId >= 800){
        document.getElementById("condition").textContent = `It looks dry along your route. ${createMethodString('You might want to consider', { walk: 'walking', bike: 'taking the bike'}, options)}`
    } else if(currentConditionId >= 700 && currentConditionId < 800){
        document.getElementById("condition").textContent = `Looks like we have some ${currentDescription} on your route. ${createMethodString('It might not be the best idea', { walk: 'to walk', bike: 'to take the bike'}, options)}`
    } else if(currentConditionId >= 600 && currentConditionId < 700){
        document.getElementById("condition").textContent = `It's cold and there's ${currentDescription} on your route. ${createMethodString('Take care when', { walk: 'walking', bike: 'taking the bike'}, options)}`
    } else if(currentConditionId >= 300 && currentConditionId < 600){
        document.getElementById("condition").textContent = `It's wet and there's ${currentDescription} on your route. ${createMethodString('Take care when', { walk: 'walking', bike: 'taking the bike'}, options)}`
    } else if(currentConditionId >= 200 && currentConditionId < 300){
        document.getElementById("condition").textContent = `Oh no, there's a ${currentDescription}. ${createMethodString('It might be very unsafe', { walk: 'to walk', bike: 'to take the bike'}, options)}`
    } 
    document.getElementById("temperature").textContent = `It's ${(weather.current.temp-273.15).toFixed(1)} °C.`;
    document.getElementById("weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png"  alt="Icon today's weather"/>`
    showRecommendation(options, currentConditionId);
}

fetchWeather();