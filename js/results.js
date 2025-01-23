function detailsButton(event) {
    saveToSession("detail-method-selected", event.target.dataset.method);
    saveToSession("detail-method-rate-chosen", event.target.dataset.rate);
    window.location.href = "./details.html";
}

function processTime(timeGiven){
    let hours = Math.floor(timeGiven / 3600)
    timeGiven = timeGiven - (hours * 3600)
    let minutes = Math.floor(timeGiven/60)
    if (hours < 9){
        hours = "0" + hours
    }    
    if (minutes < 10){
        minutes = "0" + minutes
    }
    return `${hours}:${minutes}`
}

function cardClick(event){
    if (! event.target.matches("button")){
        //recursing to parent card
        let currentElement = event.target;
        let i = 0;
        while ((! currentElement.classList.contains('card')) && i < 15){
            currentElement = currentElement.parentElement
            i++
        }
        mapElements = map.getObjects()
        mapElements.forEach(function(object){map.removeObject(object)})
        mapRoute(currentElement.dataset.method)
    }
}



//-----------------------------------------
// validateStorage([
//     "distance-car",
//     "directions-walk",
//     "origin",
//     "distance-walk",
//     "directions-car",
//     "shape-walk",
//     "traveltime-bike",
//     "travel-text-walk",
//     "directions-bike",
//     "shape-truck",
//     "distance-truck",
//     "destination",
//     "shape-bike",
//     "directions-pt",
//     "shape-pt",
//     "traveltime-truck",
//     "traveltime-car",
//     "results",
//     "shape-car",
//     "traveltime-walk",
//     "travel-text-bike",
//     "travel-text-car",
//     "travel-text-pt",
//     "traveltime-pt",
//     "travel-text-truck",
//     "distance-pt",
//     "directions-truck",
//     "distance-bike",
// ]);

map = instantiateMap();

let destination = loadFromSession("destination");
$("#destination-feedback").text(
    destination.address.label.split(",").slice(0, 2).toString()
);

const chosenTransportMethods = loadFromSession("results");
const rowEl = $("#results-row");

let distances = [];

mapRoute(mapKeyTranslator(chosenTransportMethods[0].mode));

chosenTransportMethods.forEach(function (transportMethod, index) {
    transportMethodId = transportMethod.mode;

    transportMethodId = mapKeyTranslator(transportMethodId)

    distances.push(loadFromSession(`distance-${transportMethodId}`));

    let co2Amount = transportMethod.co2;
    let co2Unit;
    if (co2Amount > 999){
        co2Amount /= 1000
        co2Amount = co2Amount.toFixed(2)
        co2Unit = "kg"
    } else {
        co2Amount = co2Amount.toFixed(1)
        co2Unit = "g"
    } 


    let cardElText = `<div data-method="${transportMethodId}" class="card results-card mx-3 my-3">
            <div class="card-body">
              <h5 class="card-title text-center bold">${keyTranslator(transportMethodId)}</h5>
              <div class="card-text">
                <div class="row bold-row">
                  <div class="col-5 text-right">
                    <p class="large-number">${co2Amount}</p>
                  </div>
                  <div class="col-1 px-0 mx-0">
                    <p class="green fancy-bullet">&#8226;</p>
                  </div>
                  <div class="col-5 text-left">
                    <p class="info-text green">${co2Unit} CO<sub>2</sub></p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5 text-right">
                    <p class="large-number">${processTime(loadFromSession(`traveltime-${transportMethodId}`))}</p>
                  </div>
                  <div class="col-1 px-0 mx-0">
                    <p class="green fancy-bullet">&#8226;</p>
                  </div>
                  <div class="col-5 text-left">
                    <p class="info-text green">hr</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-5 text-right">
                    <p class="large-number">${loadFromSession(
                        `distance-${transportMethodId}`
                    ).toFixed(1)}</p>
                  </div>
                  <div class="col-1 px-0 mx-0">
                    <p class="green fancy-bullet">&#8226;</p>
                  </div>
                  <div class="col-5 text-left">
                    <p class="info-text green">km</p>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-success" data-method="${transportMethod.mode}" data-rate="${transportMethod.co2}" onclick="detailsButton(event)">Get Details</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

    rowEl.append(cardElText);
});
let distancesAreEqual = false;
let lastDistance;
if (distances.length > 1) {
    //CHECKING IF ALL DISTANCES ARE EQUAL
    distances.forEach(function(distance){
        if (lastDistance){
            if (Math.abs(lastDistance - distance) < 0.2){
                distancesAreEqual = true
            }
        }
        lastDistance = distance
    })

    if (! distancesAreEqual){
        distances.sort((a, b) => b - a);
        $("#distance-range").text(
            "between " +
                distances[distances.length - 1].toFixed(1) +
                " to " +
                distances[0].toFixed(1)
        );
    } else {
        $("#distance-range").text(distances[0].toFixed(1));
    }
} else {
    $("#distance-range").text(distances[0].toFixed(1));
}

$(".results-card").on('click', cardClick)