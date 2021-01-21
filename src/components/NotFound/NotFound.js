import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <div id="main">
    	    <div class="fof">
        		<h1>Error 404 - Page not found!</h1>
                <br/>
                <Link to="/">
                <h5>Go back to homepage</h5>
                </Link>
    	    </div>
        </div>
    );
}

export default NotFound;