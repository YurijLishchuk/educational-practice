import React from "react";
import './HeadingNames.css';

export default function Header() {
    return(
        <div className="Header">
            <p className="info">Country</p>
            <p className="info">Cases</p>
            <p className="info">Deaths</p>
        </div>
    )
}