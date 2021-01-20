import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { routes } from "./components/Routes/Routes";
import RouteWithSubRoutes from "./components/Routes/RouteWithSubRoutes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import './App.css';
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCard from './components/Card/ItemCard';
import CategoryCard from './components/Card/CategoryCard';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="wrapper">
                    <Navbar />
                    <Container>
                        <Switch>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </Switch>
                    </Container>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;