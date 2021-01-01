import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Topics from "./components/Topics/Topics";
import Topic from "./components/Topic/Topic";
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="wrapper">
                    <Navbar />
                    <Switch>
                        <Route path="/:topics" exact component={Topics} />
                        <Route path={"/:topics/:id"} component={Topic} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>

    );
}

export default App;