import { Link } from "gatsby"
import React from "react"

const MapImageHeader = () => (
    <div className="landing-wrapper">
        <div  id="map-container" className="landing-map"></div>
        <div className="landing-header">
            <div className="container">
                <h3 className="text-center mb-3 bold">Where do you want to go today?</h3>
                <div className="input-group mb-3 landing-input">
                    <input id="destination-search-field" type="text" className="form-control" placeholder="Where to?" aria-label="Destination" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                        <a id="destination-search-button" type="button" className="btn btn-success" id="search" href="./query.html"><img src="assets\icons\search.png" width="20" height="20"/> Let's go!</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default MapImageHeader