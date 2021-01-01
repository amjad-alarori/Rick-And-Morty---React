import React from "react";
import { Redirect, Link } from "react-router-dom";
import "./Topics.css";

class Topics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            routeParam: props.match.params.topics,
            endpoints: {
                "characters": "https://rickandmortyapi.com/api/character",
                "locations": "https://rickandmortyapi.com/api/location",
                "episodes": "https://rickandmortyapi.com/api/episode",
            }
        };
    }

    componentDidMount() {
        let topics = this.state.routeParam;

        if (topics in this.state.endpoints) {
            let url = this.state.endpoints[topics];

            fetch(url)
                .then(res => res.json())
                .then((result) => {
                    this.setState({ data: result.results });
                }, () => {
                    this.setState({ data: [] })
                });
        } else {
            this.setState({ redirect: true });
        }
    }

    render() {
        return this.state.redirect ? (
            <Redirect to="/" />
        ) : (
                <div className="container">
                    <h3>{this.state.routeParam}:</h3>
                    <ul>
                        {this.state.data ? this.state.data.map((item) => (
                            <li key={item.id}><Link to={`/${this.state.routeParam}/${item.id}`}>{item.name}</Link></li>
                        )) : []}
                    </ul>
                </div>
            );
    }
}

export default Topics;