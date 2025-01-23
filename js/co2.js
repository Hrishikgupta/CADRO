// Create input variables
var distance; // Has to be in km, will be taken from HERE output

var options = [
    { 
        // CO2 emission in g/km, data by: https://www.carbonfootprint.com/ 
        id: "car",
        mode: ["micro-car", "compact-car", "sedan", "suv"],
        gas: ["gasoline", "diesel", "electric"],
        coEmissionGasoline: [ 125.0692, 147.144, 156.4524, 230.2278 ],
        coEmissionDiesel: [ 115.6062, 138.82, 141.0578, 170.4394 ],
        coEmissionElectric: 7.7, // Considering the current mix of energy production in Ontario: https://www.cer-rec.gc.ca/nrg/ntgrtd/mrkt/snpsht/2018/09-01-1hwrnrgprjctsfnncd-eng.html
    }, 
    {
        // Generalized CO2 emission for trucks: https://www.transportenvironment.org/sites/te/files/publications/2015%2009%20TE%20Briefing%20Truck%20CO2%20Too%20big%20to%20ignore_FINAL.pdf
        id: "truck",
        mode: "truck",        
        coEmission: 924
    },
    { 
        // CO2 emission in g/km, TTC as an example: http://www.ttc.ca/PDF/About_the_TTC/Sustainability_Reports/2013_Sustainability_Report.PDF
        id: "pt",
        mode:"publicTransport",
        coEmission: 64
    }, 
    {
        id: "bike",
        mode: "bike",
        coEmission: 208.6
    }, 
    {
        id: "walk",
        mode: "pedestrian",
        coEmission: 87.5
    }
]

// Add class "selected-fuel" to the selected fuel type
const fuelSelection = document.querySelector("#fuel-selector");
fuelSelection.addEventListener("click", function(e){
    var otherButtons = fuelSelection.childNodes;
    otherButtons[1].classList.remove("selected-fuel");
    otherButtons[3].classList.remove("selected-fuel");
    otherButtons[5].classList.remove("selected-fuel");
    e.target.classList.add("selected-fuel");
})

// Mirror user input
    // Add inline onclick events to the buttons (each button has an id), click will fire addType() function
    // If button is clicked, an object will be added to userInput array
    var userInput = [];
    var inputObject = {};
    // Check if transport mode is already in array, if so, replace previous value
    // Also: If transport button gets clicked a second time, remove transport mode from user choices
    function validateAndPush(){
        if(inputObject.id == "micro-car" || inputObject.id == "compact-car" || inputObject.id == "sedan" || inputObject.id == "suv"){
            var deleteVehicle = userInput.findIndex(object => object.id == "micro-car" || object.id == "compact-car" || object.id == "sedan" || object.id == "suv");
            if(deleteVehicle >= 0){
                document.getElementById(`${userInput[deleteVehicle].id}`).classList.remove("active");
                userInput.splice(deleteVehicle, 1);
                document.getElementById("car").style = "background-color: #4a4a4a; border-color: #4a4a4a;";
            } 
            if(!shouldRemove){
                userInput.push(inputObject);
                document.getElementById("car").style = "background-color: #00CC76; border-color: #00CC76;";
            }
        } else {
            var check = userInput.findIndex(object => inputObject.id === object.id);
            if(check >= 0){
                userInput.splice(check, 1);
                document.getElementById(`${inputObject.id}`).style = "background-color: #4a4a4a; border-color: #4a4a4a;";
            } 
            if(!shouldRemove) {
                userInput.push(inputObject);
                document.getElementById(`${inputObject.id}`).style = "background-color: #00CC76; border-color: #00CC76;";
            }
        }
    }
    // Halt calculation until vehicle choice has been made if user makes fuel choice first 
        // We don't want to addType if user makes fuel choice first, waits for vehicle input
    function checkVehicleChoice(e){
        var vehicleCheck = userInput.findIndex(object => object.id == "micro-car" || object.id == "compact-car" || object.id == "sedan" || object.id == "suv");
        if(vehicleCheck >= 0){
            addType(userInput[vehicleCheck].id, e.target.id);
        }
    }
    // Make vehicle select buttons react to user input
    var shouldRemove;
    function triggerCalculation(e){
        shouldRemove = e.target.classList.contains("active");
        e.target.classList.toggle("active");
        var mode = e.target.id;
        addType(mode);
    }
    // Add transport option to the array
    
    function addType(mode, fuelChoice){
        var carEmission;
        switch(mode){
            case "truck":
                distance = sessionStorage.getItem("distance-truck");
                inputObject = {id: mode, em: options[1].coEmission, distance: distance};
                validateAndPush();
                break;
            case "walk":
                distance = sessionStorage.getItem("distance-walk");
                time = sessionStorage.getItem("traveltime-walk")
                inputObject = {id: mode, em: options[4].coEmission, distance: distance};
                validateAndPush();
                break;
            case "bike":
                distance = sessionStorage.getItem("distance-bike");
                time = sessionStorage.getItem("traveltime-bike")
                inputObject = {id: mode, em: options[3].coEmission, distance: distance};
                validateAndPush();
                break;
            case "pt":
                distance = sessionStorage.getItem("distance-pt");
                inputObject = {id: mode, em: options[2].coEmission, distance: distance};
                validateAndPush();
                break;
            // For the car, we first log the type of vehicle to then choose from the array of CO2 emissions based on an index
            default:
                var index;
                switch(mode){
                    case "micro-car":
                        index = 0;
                        break;
                    case "compact-car":
                        index = 1;
                        break;
                    case "sedan":
                        index = 2;
                        break;
                    case "suv":
                        index = 3;
                        break;
                }
                // We default to gasoline if the user does not make a fuel choice
                var fuelType = fuelChoice;
                function getCarEmission(){
                    if($("button").hasClass("selected-fuel") == true || fuelType){ // fuelType is defined when fuel type is being passed in as result of checkVehicleChoice function
                        if(!fuelType){ // if fuelType is not yet defined, we have to explicitly pass it in 
                            fuelType = document.getElementsByClassName("selected-fuel")[0].id;
                        }
                        switch(fuelType){ // if button is not clicked in the current step, grab it from previous choice
                            case "gasoline":
                                return options[0].coEmissionGasoline[index];
                            case "diesel":
                                return options[0].coEmissionDiesel[index];
                            case "electric":
                                return options[0].coEmissionElectric;
                        }
                    } else {
                        fuelType = "gasoline";
                        return options[0].coEmissionGasoline[index];
                    }
                }
                carEmission = getCarEmission();
                distance = loadFromSession("distance-car");
                inputObject = {id: mode, em: carEmission, distance: distance};
                validateAndPush();
        }
        resultsList = [];
        userInput.forEach(calculateEmission);
    }

// Calculate CO2 emissions
var resultsList = [];
var coResult;
function calculateEmission(choice){
    var id = choice.id;
    if (id === "walk" || id === "bike"){
        coResult = Math.round(choice.em * (loadFromSession(`traveltime-${choice.id}`) / 3600))    
    } else {
        coResult = Math.round(choice.em * choice.distance);
    }
    var pushResult = {mode: id, co2: coResult};
    resultsList.push(pushResult);
}