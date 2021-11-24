import React, {Component} from 'react';
import './Global.css';
import axios from 'axios';
import NumberFormat from 'react-number-format';

// імпорт компонентів
import WorldStats from '../../components/WorldStats/WorldStats';

export default class Global extends Component {

    state = {
        result: {
            "TotalConfirmed": 0,
            "TotalDeaths": 0,
            "Recovered&Sick": 0
        }
    }

    async componentDidMount() {
        var globalData = await axios.get("https://api.covid19api.com/summary");

        let corona = globalData.data.Global

        this.setState({
            result: {
                "TotalConfirmed": corona.TotalConfirmed,
                "TotalDeaths": corona.TotalDeaths,
                "Recovered&Sick": corona.TotalConfirmed - corona.TotalDeaths
            }
        })
    }

    render() {
        var Stats = Object.keys(this.state.result).map((key, index) => {
            return <WorldStats
                        key={index}
                        about={key}
                        total={<NumberFormat
                                    value={this.state.result[key]}
                                    thousandSeparator={true}
                                    displayType="text"/>} />
        })

        return(
            <div className="Global">
                <h1 className="heading">COVID-19 Tracker</h1>
                <p className="description">Stats about COVID-19</p>
                <div className="world-stats">

                   {Stats}

                </div>
            </div>
        )
    }
}