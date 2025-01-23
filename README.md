# <img src="https://titanian229.github.io/EcoRoute/assets/icons/nature.png" alt="EcoRouteLogo" width="25"/> EcoRoute
---
## What is EcoRoute
Making green choices when traveling—we're here to help!
EcoRoute is here to help you make environmentally conscious choices when traveling from A to B.

We're making it easy for you to learn more about the environmental impact of your travel choices by helping you understand the CO2 emission of your trip. Simply choose what travel options you want to consider for your route, enter your destination and origin, and we're giving you all the insights you need to make a green choice.

We're even taking the current weather into account to tell you if it's a good time to walk or take the bike. So get ready, hit the search button, and help us protect our planet!

 [Find us online here](https://titanian229.github.io/EcoRoute/ "EcoRoute")

## Motivation
This project was created to help inform individuals about their carbon footprints, and help them make informed decisions regarding their travel choices.  It's difficult to understand the weight of choices in a complex world, and lacking information makes choices difficult.  By informing users about the effects of their day to day journeys we hope to inspire positive habit changes for the good of our ecosystem, while providing a useful interface to find routes.

## Functionality Screenshots

![Mobile responsive, looks good on desktop or mobile devices][mockup]


The web application loads into a page with a simple search field, followed by a description of the project's goal, ethos, and team.

![Enter your search here][main-page]


User responsiveness is provided throughout through the use of modals, for instance if multiple matches to a given location are found.

![Multiple locations found][multiple-location-modal]


After entering your destination, you're brought to a page where you can see that location on a map and enter your origin point, or optionally use your current position.

![Query page before input][query-before]


Once you've entered both your destination and origin, all of the travel methods and vehicle and fuel choices are presented.

![Query page after input][query-after]


After selecting all of the travel methods, "Get Route" brings you to a page showing you your route mapped out, the total distance, and weather information for your destination. The weather widget is responsive, meaning that it will only tell you about the weather's impact on walking or cycling if it would be an option for your route (so if the trip's distance is too long to walk it will not make a statement about walking).

![Results page top][results-top]


At the bottom of the results page, you're shown the carbon footprint information for each choice.  Clicking the cards will change which route is mapped, and selecting the information button at the bottom of each brings you to the next page.

EcoRoute will give you a recommendation on the most environmentally friendly way to get to your destination. In order to make a recommendation, the application takes into account the distance, weather, trip duration, and CO2 emission. It weighs the different options against each other to find out which travel option is the most environmentally friendly one for you—without forgetting about comfort and time efficiency.

![Results page bottom][results-cards]


The details page walks you through exactly what carbon footprint your journey and method of making it will have, so you can make the best possible choice.  You can also click to see turn by turn directions in a simple mobile friendly format, to take with you on your journey.

![Details page top][details-top]


Information is made understandable with helpful metrics and is illustrated by colorful icons.

![Comparison metrics][details-comparison]


And finally, all of the choices you made on the initial page are graphed, so you can understand the relative impact of your trip.

![Comparison graph][details-comparison-graph]


## Technologies and External Dependencies
This web application is built largely using Javscript, CSS, and HTML.

### The Javascript libraries utilized include:
* jQuery ([documentation](https://api.jquery.com/))
* Bootstrap's library for modal functionality ([documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/))
* HERE Technology's Javscript core library and mapping service libraries ([documentation](https://developer.here.com/documentation))
* SimpleParallax ([documentation](https://simpleparallax.com/))
* Chart.js ([documentation](https://www.chartjs.org/docs/latest/))

### External APIs
* The [OpenWeatherMap API](https://openweathermap.org/api/one-call-api) was used to return realtime weather information based on a GPS location
* [HERE Technology](https://developer.here.com/develop/javascript-api) mapping API version 8 was used to geocode location names and addresses into GPS coordinates, as well as return mapping images to be rendered; 
* [HERE Technology](https://developer.here.com/develop/javascript-api) mapping API version 7.2 was used to process and return routes between locations.

### Assets
* Icons from [Flaticon.com](http://flaticons.com)

## Future goals
Future additional features include:
* Adding in social media sharing for results of total savings
* Use cookies to keep a running metric of total saved across journeys
* Offer the option to send directions to mobile phone

## Credits

* Flaticon.com icons made by [Pause08](https://www.flaticon.com/free-icon/airplane_1358770), [Surang](https://www.flaticon.com/authors/surang), [Smashicons](https://www.flaticon.com/authors/smashicons), [Freepik](https://www.flaticon.com/authors/freepik), and [Photo3Idea_Studio](https://www.flaticon.com/free-icon/airplane_2105232).

## Creators
This application has been developed by
- James Lee ([Github](https://github.com/titanian229) & [website](http://jamestlee.ca/))
- Marcel Thiemann ([Github](https://github.com/cestmarcel) & [website](http://marcelthiemann.com/))

[mockup]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/mockup.png "Mockup"
[main-page]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/main-page.jpg "Main Page"
[multiple-location-modal]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/multiple-location-modal.jpg "Multiple Location Modal"
[query-before]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/query-before-input.jpg "Query Page before input"
[query-after]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/query-after-input.jpg "Query Page after input"
[results-top]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/results-top.jpg "results page top"
[results-cards]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/results-cards.jpg "results cards"
[route-options-expanded]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/route-options-expanded.jpg "details page top"
[details-top]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/details-top.jpg "details page bottom"
[details-comparison]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/details-comparison.jpg "details comparison metrics"
[details-comparison-graph]: https://github.com/ecoroute/ecoroute/blob/master/assets/screenshots/details-comparison-graph.jpg "details comparison graph"
