const APIKey = "fckW2xjyLMlIUuEmlf_fXJxUHkJnyG8QmuSJIM0clfM";
const platform = new H.service.Platform({
    apikey: APIKey,
});

const transportNameKeys = [
    "bike",
    "car",
    "pt",
    "truck",
    "walk",
    "micro-car",
    "compact-car",
    "sedan",
    "suv",
];
const transportNameVals = [
    "Bicycle",
    "Car",
    "Public Transit",
    "Truck",
    "Walking",
    "Micro-car",
    "Compact-car",
    "Sedan",
    "SUV",
];

var map;

const startIcon = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"
preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
fill="gray" stroke="">
<path d="M65 215 c-16 -15 -25 -36 -25 -54 0 -31 65 -161 80 -161 15 0 80 130
80 159 0 69 -86 106 -135 56z m69 -21 c9 -3 16 -16 16 -29 0 -25 -21 -38 -45
-29 -18 7 -20 50 -2 57 6 3 13 6 14 6 1 1 8 -2 17 -5z"/>
</g>
</svg>`;

const endIcon = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"
preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
fill="green" stroke="">
<path d="M65 215 c-16 -15 -25 -36 -25 -54 0 -31 65 -161 80 -161 15 0 80 130
80 159 0 69 -86 106 -135 56z m69 -21 c9 -3 16 -16 16 -29 0 -25 -21 -38 -45
-29 -18 7 -20 50 -2 57 6 3 13 6 14 6 1 1 8 -2 17 -5z"/>
</g>
</svg>`;

const simpleDotIcon =
    '<svg width="18" height="18" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="8" cy="8" r="8" ' +
    'fill="#1b468d" stroke="white" stroke-width="1"  />' +
    "</svg>";

//ADD IN WAYPOINTS for each step, with popup dialog with instructions

function keyTranslator(key) {
    //Translates keys to pretty names and backwards pt - Public Transit etc.
    if (transportNameKeys.includes(key)) {
        return transportNameVals[transportNameKeys.indexOf(key)];
    } else if (transportNameVals.includes(key)) {
        return transportNameKeys[transportNameVals.indexOf(key)];
    } else {
        console.log(
            "Key translator failed because the key was not located : ",
            key
        );
    }
}

function mapKeyTranslator(key) {
    //Catches the microcars and translates to cars, otherwise returns the key
    if (["micro-car", "compact-car", "sedan", "suv"].includes(key)) {
        return "car";
    } else {
        return key;
    }
}

function validateStorage(keysList) {
    //This function checks what's present in localStorage.  If there are keys that shouldn't have been created yet it removes them
    let sessionStorageKeys = Object.keys(sessionStorage);
    sessionStorageKeys.forEach(function (sessionStorageKey) {
        if (!keysList.includes(sessionStorageKey)) {
            sessionStorage.removeItem(sessionStorageKey);
        }
    });
    keysList.forEach(function (key) {
        if (!sessionStorageKeys.includes(key)) {
            console.log(
                "There was a key required on this page, that hasn't been generated yet",
                key
            );
            // window.location.href = "./index.html"
        }
    });
}

function instantiateMap() {
    //Creates a map placed in whatever div has the id map-container, positions it at Toronto
    let defaultLayers = platform.createDefaultLayers();
    map = new H.Map(
        document.querySelector("#map-container"),
        defaultLayers.vector.normal.map,
        {
            zoom: 13,
            center: { lat: 43.65107, lng: -79.347015 },
        }
    );
    window.addEventListener("resize", () => map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers); //This should add controls, but doesn't.
    var mapSettings = ui.getControl("mapsettings");
    var zoom = ui.getControl("zoom");
    var scalebar = ui.getControl("scalebar");

    mapSettings.setAlignment("bottom-left");
    zoom.setAlignment("bottom-left");
    scalebar.setAlignment("bottom-left");
    return map;
}

function saveToSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function loadFromSession(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

function addMarker(
    coords,
    svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="red" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="regular" text-anchor="middle" ' +
        'fill="white">HI</text></svg>'
) {
    //Adds a styled marker to the map (default filler for style) at coords = 'lat,lng' or {lat: lng:} in an object
    //DOES NOT center map at location, make sure to do so
    if (typeof coords === "string") {
        coords = coords.split(",");
        coords = { lat: coords[0], lng: coords[1] };
    }
    let icon = new H.map.Icon(svgMarkup);
    let marker = new H.map.Marker(coords, { icon: icon });

    map.addObject(marker);
}

function addLine(map, startPoint, endPoint) {
 
    let linestring = new H.geo.LineString();
    linestring.pushPoint(startPoint)
    linestring.pushPoint(endPoint)

    let polyline = new H.map.Polyline(linestring, { style: { lineWidth: 3 } });
    map.addObject(polyline);
}

async function processSearch(searchString) {
    //Takes a string of a location, ex. 8 Bloor St. W, Toronto
    //Returns all of the objects the string finds, to be chosen from

    function geocodeWrapper(input) {
        return new Promise((resolve, reject) => {
            platform.getSearchService().geocode(input, resolve, reject);
        });
    }

    const geocodedOptions = await geocodeWrapper({ q: searchString });

    return geocodedOptions;
}

function displayOptionsModal(choices, destinationOrOrigin) {
    ///This function takes input options = list of objects located by geocode, whether it is the destination or origin
    //It then populates a list of choices in a modal it displays on the page
    //The modals's buttons have the id of the choice, as referenced in a saved to sessionStorage array of the choices
    saveToSession("locationChoices", choices);
    $("#locationChoiceModal").modal("show");

    let listEl = $("#locationChoiceModal .list-group");
    listEl.html("");
    choices = choices.map((choice, index)  => `<button type="button" class="list-group-item list-group-item-action" data-id="${index}" data-doro="${destinationOrOrigin}" onclick="modalChoiceClicked(event)">${choice.address.label}</button>`)
    listEl.append(choices)
}

async function modalChoiceClicked(event) {
    //This takes the modal's button press, logs the chosen choice, and moves to the next page
    choice = loadFromSession("locationChoices")[event.target.dataset.id];
    $("#locationChoiceModal").modal("hide");
    saveToSession(event.target.dataset.doro, choice);
    if (event.target.dataset.doro === "destination") {
        window.location = "./query.html";
    } else {
        saveToSession("origin", choice);
        $("#origin").text(choice.address.label);
        await getAllRoutes();
        disableMissingRoutes();
        $("#choice-buttons").removeClass("d-none")
        $("#get-directions-button").removeClass("d-none")
    
    }
}

async function getAllRoutes() {
    //Once called this function loads origin and destination from sessionStorage tags origin and destination
    //It then iterates through all travel methods and processes a route through each
    let origin = loadFromSession("origin");
    let destination = loadFromSession("destination");
    if (!(origin && destination)) {
        console.log(
            "INSIDE GET ALL ROUTES => A destination and origin were not selected before route finding attempted"
        );
    }
    let transitTypes = [
        ["car", "car"],
        ["bicycle", "bike"],
        ["truck", "truck"],
        ["pedestrian", "walk"],
        ["publicTransport", "pt"],
    ];

    let routeObjects = [];

    transitTypes.forEach(function (transitType) {
        routeObject = routeObjects.push(
            fetch(
                `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${APIKey}` +
                    `&waypoint0=geo!${origin.position.lat},${origin.position.lng}` +
                    `&waypoint1=geo!${destination.position.lat},${destination.position.lng}&mode=fastest;${transitType[0]}` +
                    ";traffic:disabled&instructionformat=text&routeattributes=shape"
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(
                        "There was an error fetching the requested route",
                        transitType
                    );
                    return transitType[1];
                }
            })
        );
    });

    let transitTypeKey;
    return Promise.all(routeObjects).then((response) => {
        response.forEach(function (routeObject, index) {
            if (
                !["car", "bike", "truck", "walk", "pt"].includes(routeObject) &&
                routeObject
            ) {
                transitTypeKey = transitTypes[index][1];
                saveToSession(`distance-${transitTypeKey}`, routeObject.response.route[0].summary.distance / 1000);
                saveToSession(`traveltime-${transitTypeKey}`, routeObject.response.route[0].summary.travelTime);
                saveToSession(`travel-text-${transitTypeKey}`, routeObject.response.route[0].summary.text);
                saveToSession(`shape-${transitTypeKey}`, routeObject.response.route[0].shape);
                saveToSession(`directions-${transitTypeKey}`, routeObject.response.route[0].leg[0].maneuver);
            } else {
                console.log("Unable to create route object for ", routeObject);
            }
        });
    });
    // return new Promise((resolve, reject) => )
}

function mapRoute(routeKey) {
    //This function takes the chosen route and maps it on the page
    let arrayOfPoints = loadFromSession(`shape-${routeKey}`)
    let linestring = new H.geo.LineString();

    arrayOfPoints.forEach(function (point) {
        // linestring.pushPoint(point);
        point = point.split(",");
        linestring.pushLatLngAlt(point[0], point[1]);
    });
    let polyline = new H.map.Polyline(linestring, {
        style: {
            lineWidth: 3,
            fillColor: "rgba(0, 128, 0, 0.4)",
            strokeColor: "#00CC76",
        },
    }); // TODO change line styling

    addMarker(arrayOfPoints[0], startIcon);
    addMarker(arrayOfPoints[arrayOfPoints.length - 1], endIcon);

    map.addObject(polyline);
    bBox = polyline.getBoundingBox();
    bBox.ha += 0.0028; //These are the variables the API uses to define the bounding box, I'm just making it bigger on the N and S to make it a little prettier.
    bBox.ka -= 0.0005;
    map.getViewModel().setLookAtData({ bounds: bBox });
}

function placePinOnMap(map, locationObject) {
    //Takes a location object in the Here API format, places a pin at that location and
    map.addObject(new H.map.Marker(locationObject.position));
    map.getViewModel().setLookAtData({
        position: locationObject.position,
        zoom: 16,
    });
}