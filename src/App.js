import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Items from "./components/Items/Items";
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="wrapper">
                    <Navbar />
                    <Switch>
                        {/* <Route path="/" exact component={Home} /> */}
                        <Route path="/:collection" exact component={Items} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;