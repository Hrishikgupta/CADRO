import React from "react"
import Marcel from "../images/marcel.jpg"
import James from "../images/james.jpg"
import Forest from "../images/forest.jpg"
import Ocean from "../images/ocean.jpg"
import Github from "../images/github.jpg"
import Here from "../images/here.jpg"
import OpenWeatherMap from "../images/openweathermap.jpg"

const About = () => (
    <main>
        {/* Summary text */}
        <section className="container mt-5 mb-5">
            <div className="divider"></div>
            <h2 id="about" className="mb-3">Making green choices when traveling—we're here to help!</h2>
            <p>
                EcoRoute is here to help you make <span className="green-text bold">environmentally conscious choices</span> when traveling 
                from A to B. 
                <br/><br/>
                We're making it easy for you to learn more about the environmental impact of your travel choices by helping you 
                <span className="green-text bold">understand the CO<sub>2</sub> emission</span> of your trip. Simply choose what travel options 
                you want to consider for your route, enter your destination and origin, and we're giving you all the insights you need to 
                make a green choice.
                <br/><br/>
                We're even taking the current weather into account to tell you if it's a good time to walk or take the bike. 
                <span className="green-text bold">So get ready, hit the search button, and help us protect our planet!</span>
            </p>
            <div className="divider"></div>
        </section>
        {/* Forest image stage */}
        <div className="image-stage">
            <img className="parallax" src={Forest} alt="image" />
        </div>
        {/* Data sources text */}
        <section className="container mt-5 mb-5">
            <div className="divider"></div>
            <h2 className="mb-3">Technical background</h2>
            <p>
                This web application is using mapping and routing data from <a href="https://www.here.com/" target="_blank">HERE Technologies</a> 
                to provide the routing for your trip and populate a visual map. 
                <br/><br/>
                We're also tapping into <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap's API</a> to provide weather data 
                for your trip. You can learn more about the APIs used on this website and find the Github page of this project by clicking the links below.
            </p>
            <div className="row mt-5">
                <div className="col-sm-4 mb-2">
                    <a href="https://www.here.com/" target="_blank"><img className="click-logo" src={Here} alt="HERE"/></a>
                </div>
                <div className="col-sm-4 mb-2">
                    <a href="https://openweathermap.org/" target="_blank"><img className="click-logo" src={OpenWeatherMap} alt="OpenWeatherMap"/></a>
                </div>
                <div className="col-sm-4 mb-2">
                    <a href="https://github.com/titanian229/SmallButMighty1" target="_blank"><img className="click-logo" src={Github} alt="Github"/></a>
                </div>
            </div>
            <div className="divider"></div>
        </section>
        {/* Ocean image stage */}
        <div className="image-stage">
            <img className="parallax" src={Ocean} alt="image" />
        </div>
        {/* About us section */}
        <section className="container mt-5 mb-5">
            <div className="divider"></div>
            <h2 className="display-8 mb-3">The Faces behind EcoRoute</h2>
            <div className="row">
                <div className="col-sm-4 mb-2">
                    <div className="card" style={{width: "100%"}}>
                        <img src={Marcel} className="card-img-top" alt="Marcel" />
                        <div className="card-body">
                          <h5 className="card-title">Marcel Thiemann</h5>
                          <p className="card-text">Marcel is a mobility specialist and developer based in Toronto.</p>
                          <a href="https://github.com/cestmarcel" className="btn btn-primary btn-green">View Github profile</a>
                          <a href="http://marcelthiemann.com" className="btn btn-primary btn-green mt-2">Visit website</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-2">
                    <div className="card" style={{width: "100%"}}>
                        <img src={James} className="card-img-top" alt="James" />
                        <div className="card-body">
                          <h5 className="card-title">James Lee</h5>
                          <p className="card-text">James is a avid automator and developer.  He's the one on the left.</p>
                          <a href="https://github.com/titanian229" className="btn btn-primary btn-green">View Github profile</a>
                          <a href="http://jamestlee.ca/" className="btn btn-primary btn-green mt-2">Visit website</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </section>
    </main>
)

export default About