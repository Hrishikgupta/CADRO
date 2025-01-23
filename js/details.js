validateStorage([
    "distance-car",
    "detail-method-selected",
    "directions-walk",
    "origin",
    "distance-walk",
    "directions-car",
    "shape-walk",
    "traveltime-bike",
    "travel-text-walk",
    "directions-bike",
    "shape-truck",
    "distance-truck",
    "destination",
    "shape-bike",
    "directions-pt",
    "shape-pt",
    "traveltime-truck",
    "traveltime-car",
    "results",
    "shape-car",
    "traveltime-walk",
    "travel-text-bike",
    "travel-text-car",
    "travel-text-pt",
    "traveltime-pt",
    "travel-text-truck",
    "detail-method-rate-chosen",
    "distance-pt",
    "directions-truck",
    "distance-bike",
]);

// Get results array from local storage
var storageResults = JSON.parse(sessionStorage.getItem("results"));
var allModes = [];
var co2Values = [];

// Split up results array into two new arrays to populate the graph
for (i = 0; i < storageResults.length; i++) {
    allModes.push(keyTranslator(storageResults[i].mode));
    co2Values.push(storageResults[i].co2);
}

// Render graph
var ctx = document.getElementById("emissionsGraph").getContext("2d");
var chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: allModes,
        datasets: [
            {
                label: "CO₂ Emissions in grams",
                backgroundColor: "rgb(0, 204, 118)",
                borderColor: "rgb(0, 204, 118)",
                borderWidth: 1,
                data: co2Values,
            },
        ],
    },
    options: {
        animation: {
            duration: 1,
            onProgress: function () {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;

                ctx.font = Chart.helpers.fontString(
                    Chart.defaults.global.defaultFontSize,
                    Chart.defaults.global.defaultFontStyle,
                    Chart.defaults.global.defaultFontFamily
                );
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";

                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    });
                });
            },
        },
        legend: {
            display: true,
        },
        tooltips: {
            enabled: false,
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
    },
});

function rankChoice(chosenMethod) {
    const methodRankings = ["walk", "bike", "pt", "car", "truck"];
    rank = methodRankings.indexOf(chosenMethod) + 1;
    return addNth(rank);
}

function addNth(number) {
    number = String(number);
    if (number[number.length - 1] == "2") {
        return number + "nd";
    } else if (number[number.length - 1] == "3") {
        return number + "rd";
    } else if (["4", "5", "6", "7", "8", "9", "0"].includes(number[number.length - 1])) {
        return number + "th";
    }
}

instantiateMap();

const chosenMethod = loadFromSession("detail-method-selected");
if (!chosenMethod) {
    errorModal("You haven't selected a method to see details for, please return to the previous page");
}
const routeKey = mapKeyTranslator(chosenMethod);

mapRoute(routeKey);

$("#destination-name").text(loadFromSession("destination").address.label.split(",").slice(0, 1).toString());
$("#transport-method").text(keyTranslator(chosenMethod).toLowerCase());
$("#travel-text").text(loadFromSession(`travel-text-${routeKey}`));
$("#method-ranking").text(rankChoice(routeKey));

//This is an array of metrics, I'll sort randomly and choose two to use as comparators,
//displaying them in order of units/time
//input will be in grams, I'll divide by the rate
//https://onetreeplanted.org/blogs/stories/planting-trees-reduce-carbon-footprint -> Tree sequesters at 48 pounds of carbon dioxide per year
//https://www.carbonindependent.org/22.html -> 90 kg CO2 per hour
//https://www.treehugger.com/travel/spacex-launch-puts-out-much-co2-flying-341-people-across-atlantic.html
//http://css.umich.edu/factsheets/carbon-footprint-factsheet ->
//https://www.globalcitizen.org/es/content/5-reasons-cow-farts-matter-and-could-destroy-the-w/ -> 84xx
//https://www.wired.co.uk/article/the-strange-war-against-cow-farts -> 240L is 132.96 g . day
//https://www.bbc.com/news/science-environment-49349566 ->
let comparisonMetrics = [
    {
        description: " days of a ten year old tree's consumption",
        rate: 59.65,
        src: "./assets/icons/tree.png",
    },

    {
        description: " days of methane from cow flatus",
        rate: 132.96,
        src: "./assets/icons/cow.png",
    },
    {
        description: " passenger kilometres travelled on a domestic flight",
        rate: 133,
        src: "./assets/icons/plane.png",
    },
    {
        description: " passenger kilometres travelled on a long haul flight",
        rate: 102,
        src: "./assets/icons/plane2.png",
    },
    {
        description: " passenger kilometres travelled by rail",
        rate: 41,
        src: "./assets/icons/train.png",
    },
    {
        description: " passenger kilometres travelled on the eurostar",
        rate: 6,
        src: "./assets/icons/train2.png",
    },
];

let chosenRate = loadFromSession("detail-method-rate-chosen");
//WE CAN ADD METRICS, I RANDOMLY CHOOSE THREE EACH TIME
if (chosenRate == 0) {
    $("#relative-section").addClass("d-none");
    $("#zero-co2-note").removeClass("d-none");
    $("#comparison-graph-title").removeClass("my-5");
    $("#comparison-graph-title").addClass("mb-5");
} else {
    //choosing three metrics, calculating the data relevant for each
    let i = 0;
    let comparators = [];
    while (i < 3) {
        i++;
        let randItem = Math.floor(Math.random() * comparisonMetrics.length);
        comparators.push(comparisonMetrics[randItem]);
        comparisonMetrics.splice(randItem, 1);
    }

    if (chosenRate != 0) {
        comparators.forEach(function (comparator) {
            comparatorRate = (chosenRate / comparator.rate).toFixed(2);
            $("#co2-metrics ul").append(
                `<li><img class="co2icon mb-3" src="${comparator.src}" /><span class="green pl-3">${comparatorRate}</span>${comparator.description}</li>`
            );
        });
    }
    let co2Amount = parseInt(chosenRate);
    let co2Unit;

    if (co2Amount > 999) {
        co2Amount /= 1000;
        co2Amount = co2Amount.toFixed(2);
        co2Unit = "kg";
    } else {
        co2Amount = co2Amount.toFixed(1);
        co2Unit = "g";
    }
    $("#co2-amount").text(co2Amount);
    $("#co2-unit").text(co2Unit);
}

//TURN BY TURN DIRECTIONS
$("#show-directions").click(function (event) {
    window.location.href = "./directions.html";
});
