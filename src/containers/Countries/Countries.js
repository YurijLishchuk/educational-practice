import React, { Component } from "react";
import axios from "axios";
import ArraySort from "array-sort";
import NumberFormat from "react-number-format";

import './Countries.css';
import HeadingNames from '../../components/HeadingNames/HeadingNames';
import CountryDetails from "../../components/CountryDetails/CountryDetails";

export default class CountriesDetails extends Component {

    state = {
        countryDetails : [],        
        searchedCountries : [],
    }

    async componentDidMount() {
        var data = await axios.get("https://api.covid19api.com/summary")

        var countryDetails = data.data.Countries
        countryDetails = ArraySort(countryDetails, 'TotalConfirmed', {reverse: true})
        
        this.setState({countryDetails : countryDetails, status:true, selectedData: countryDetails})
        console.log("Check first sort: ",this.state.sortByReverse)

    }

    ChangeSortValue = e => {
        const value = e.target.value
        let sortByReverse = true ;

        if(value === "Highest") {
            sortByReverse = true
        } else {
            sortByReverse= false
        }

        let countryDetails = ArraySort(this.state.countryDetails, 'TotalConfirmed', {reverse: sortByReverse})
        
        this.setState({countryDetails : countryDetails, status:true})
    }

    searchCountry = e => {
        
        const value = e.target.value
        
        const countryDetails = this.state.countryDetails

        var FindSpecificCountry = [];

        if(value) {

            countryDetails.map(function(cur, index) {
                const finder = cur.Country.toLowerCase().search(value.toLowerCase())
                if(finder !== -1) {
                    FindSpecificCountry.push(countryDetails[index]);
                }

               
            })

            FindSpecificCountry = ArraySort(FindSpecificCountry, 'TotalConfirmed', {reverse: true})

            this.setState({searchedCountries: FindSpecificCountry})
            


        } else {
            this.setState({countryDetails: countryDetails})
        }

        if(value.length === 0) {
            this.setState({selectedData: this.state.countryDetails})
        } else {
            this.setState({selectedData: this.state.searchedCountries})
        }
        
    }

    render() {
        const ChangeNumbertoFormats = function(val) {
            return <NumberFormat value={val} thousandSeparator={true} displayType="text"/>
        }

        var countriesList = this.state.countryDetails.length > 0 ? 
        this.state.selectedData.map(function(cur,index){

            return <CountryDetails 
                        key={index}
                        countryCode={cur.CountryCode}

                        totalCases={ChangeNumbertoFormats(cur.TotalConfirmed)}
                        newCases={ChangeNumbertoFormats(cur.NewConfirmed)}

                        totalDeaths={ChangeNumbertoFormats(cur.TotalDeaths)}
                        newDeaths={ChangeNumbertoFormats(cur.NewDeaths)}
                        />
        })
        : null;

        return (
            <div className="countries-stats">
                <h2 className="stats-heading">Stats</h2>
                <div className="filtering">
                    <input type="text" placeholder="Enter country's name:" onChange={this.searchCountry}/>
                    <select className="sort-by" onChange={this.ChangeSortValue}>
                        <option>Highest</option>
                        <option>Lowest</option>
                    </select>
                </div>
                <HeadingNames />
                {countriesList}
            </div>
        )
    }
}