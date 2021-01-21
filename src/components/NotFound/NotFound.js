import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

// class NotFound extends ReactComponent{

//     function NoMatch() {
//         let location = useLocation();
//     }

//     render() {
//         return(    
//             <div>
//                 <h1>404 - Not Found</h1>
//                 <h3>No match for <code>{location.pathname}</code></h3>
//                 <a href="/">
//                 Go back to homepage
//                 </a>
//             </div>
//         )
//     }
// }

function NotFound() {
    return (
        <div id="main">
            <div class="fof">
                <h1>404 - Not Found!</h1>
                <Link to="/">
                    Go back to homepage
                </Link>
            </div>
        </div>
    );
}

export default NotFound;