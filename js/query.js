async function submitSearch() {
    //clear field and grab text
    let searchText = $("#origin-search-field").val();
    if (searchText === "") return;
    document.getElementById("loading-spinner").style.display = "block";
    $("#origin-search-field").val("");
    const locations = await processSearch(searchText);

    let choices = locations.items;

    if (choices.length === 0) {
        ///No matches found, present to user
        errorModal("There were no matches found, please try again.");
        console.log("No matches found");
        return;
    } else if (choices.length === 1) {
        choice = choices[0];
    } else {
        //HARDCODING CHOICE FOR NOW
        //We could either present a modal or choose based on location
        displayOptionsModal(choices, "origin");
        return;
    }
    saveToSession("origin", choice);
    $("#origin").text(choice.address.label.split(",").slice(0, 2).toString());
    await getAllRoutes();
    disableMissingRoutes();
    $("#choice-buttons").removeClass("d-none");
    $("#get-directions-button").removeClass("d-none");
    document.getElementById("loading-spinner").style.display = "none";


    //TODO Add second marker to screen, zoom screen in some fashion to see both
    //I might be able to define a bounding box based on the highest and lowest lng and lat coords of each and do that to define the min bounding box of the map
}

function getDirectionsButton() {

    //a check they've input both locations
    if (!(sessionStorage.origin && sessionStorage.destination)) {
        errorModal("Please enter your origin to proceed");
        return;
    }

    // Check if at least one transport option has been selected
    // Save resultsList to sessionStorage
    if (resultsList.length > 0) {
        sessionStorage.setItem("results", JSON.stringify(resultsList));
        window.location.href = "./results.html";
    } else {
        errorModal(
            "Please choose at least one mode of transportation to proceed."
        );
    }
}

async function getLocation() {
    if (navigator.geolocation) {
        document.getElementById("loading-spinner").style.display = "block";
        navigator.geolocation.getCurrentPosition(async function (position) {
            //TODO put in the call to the generalized function for setting the place name
            position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            $("#origin").text(`${position.lat}, ${position.lng}`); //TODO Reverse geocode and get location name, fill that here
            saveToSession("origin", { position: position });
            await getAllRoutes();
            disableMissingRoutes();
            $("#choice-buttons").removeClass("d-none");
            $("#get-directions-button").removeClass("d-none");
            document.getElementById("loading-spinner").style.display = "none";
        });
    } else {
        console.log("Geolocation unsupported by this browser");
        //TODO RETURN MESSAGE IN MODAL TO USER THAT THIS BUTTON DOESN'T FUNCTION
    }
}

function disableMissingRoutes() {
    //Checks what routes weren't possible to map.  It disables the relevant vehicle buttons and adds a message to the user
    //Also rechecks and reenables buttons in case they change their destination and stay on the same page
    const routeMethods = ["car", "bike", "truck", "walk", "pt"];
    var anyMissing = [];
    routeMethods.forEach(function (method) {
        isMissing = !Boolean(loadFromSession(`distance-${method}`));

        //Enabling the button in case they've changed their destination and before it was disabled
        if (["walk", "bike", "pt"].includes(method)) {
            if (isMissing) {
                anyMissing.push(keyTranslator(method).toLowerCase());
                $(`#${method}`).prop("disabled", true);
            } else {
                $(`#${method}`).removeAttr("disabled");
            }
        } else if (method === "car") {
            if (isMissing) {
                anyMissing.push(keyTranslator(method).toLowerCase());
                $(`#car`).prop("disabled", true);
                $(`#gasoline`).prop("disabled", true);
                $(`#diesel`).prop("disabled", true);
                $(`#electric`).prop("disabled", true);
            } else {
                $(`#car`).removeAttr("disabled");
                $(`#gasoline`).removeAttr("disabled");
                $(`#diesel`).removeAttr("disabled");
                $(`#electric`).removeAttr("disabled");
            }
        } else if (method === "truck") {
            if (isMissing) {
                anyMissing.push(keyTranslator(method).toLowerCase());
                $(`#truck`).prop("disabled", true);
            } else {
                $(`#truck`).removeAttr("disabled");
            }
        }
        if (anyMissing.length != 0) {
            $("#missing-routes-display").removeClass("d-none");
            $("#missing-routes-display span").text(anyMissing.join(", "));
        } else if (!$("#missing-routes-display").hasClass("d-none")) {
            $("#missing-routes-display").addClass("d-none");
        }
    });
}

//------------------------------------
validateStorage(["destination"]);
map = instantiateMap();

//Getting the destination from sessionStorage
const destination = loadFromSession("destination");
addMarker(destination.position, endIcon);
map.setCenter(destination.position);
map.setZoom(17);

//populating the text field with the destination
$("#destination").text(
    destination.address.label.split(",").slice(0, 2).toString()
);

//Event listeners for the buttons on the page
$("#search-submit-button").click(function (event) {
    event.preventDefault();
    submitSearch();
});

$("#origin-search-field").on("keypress", function (event) {
    if (event.which === 13) {
        event.preventDefault();
        submitSearch();
    }
});

$("#get-directions-button").click(function (event) {
    //all routes are generated then the next page is moved to
    getDirectionsButton();
});

$("#geolocation-search").click(function (event) {
    //gets the current location of the user
    getLocation();
});
