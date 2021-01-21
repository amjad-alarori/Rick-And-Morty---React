import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div id="main">
    	    <div className="fof">
        		<h1>Error 404 - Page not found!</h1>
                <br/>
                <h5>Go <a href="/">back</a> to homepage</h5>
    	    </div>
        </div>
    );
}

export default NotFound;