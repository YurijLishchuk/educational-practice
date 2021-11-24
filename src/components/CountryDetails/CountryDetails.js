import React from "react";
import ReactCountryFlag from "react-country-flag";
import './CountryDetails.css';

export default function CountryDetails(props) {
    return (
        <div className="details">
            <div className="icon">
                <ReactCountryFlag
                    className="flag"
                    countryCode={props.countryCode}
                    svg
                    style={{
                        width: "3.5em",
                        height: "3.5em"
                    }}
                    title={props.countryCode} />
            </div>
            <div className="cases-details">

                <div className="box Cases">
                    <a href="#">{props.totalCases}</a>
                    <p className="yesterday">Last 24 hours: <strong>{props.newCases}</strong></p>
                </div>

                <div className="deaths">
                    <a href="#">{props.totalDeaths}</a>
                    <p className="yesterday">Last 24 hours: <strong>{props.newDeaths}</strong></p>
                </div>

            </div>
        </div>
    )
}