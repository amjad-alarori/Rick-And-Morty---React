import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "./components/Routes/Routes";
import RouteWithSubRoutes from "./components/Routes/RouteWithSubRoutes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="wrapper">
                    <Navbar />
                    <div className="container">
                        <Switch>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </Switch>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>

    );
}

export default App;