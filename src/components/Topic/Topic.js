import React from "react";
import { Redirect } from "react-router-dom";
import "./Topic.css";

class Topic extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            routeParam: props.match.params,
            endpoints: {
                "characters": "https://rickandmortyapi.com/api/character",
                "locations": "https://rickandmortyapi.com/api/location",
                "episodes": "https://rickandmortyapi.com/api/episode",
            }
        };
    }

    componentDidMount() {
        let topics = this.state.routeParam.topics;
        let topicId = this.state.routeParam.id;

        if (topics in this.state.endpoints) {
            let url = this.state.endpoints[topics] + "/" + topicId;

            fetch(url)
                .then(res => res.json())
                .then((result) => {
                    this.setState({ data: result });
                }, () => {
                    this.setState({ data: {} })
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
                    <h3>{this.state.routeParam.topics}:</h3>
                    {(this.state.data && this.state.data.hasOwnProperty('name')) ? <span>Name: {this.state.data.name}<br /></span> : ''}
                    {(this.state.data && this.state.data.hasOwnProperty('gender')) ? (<span>gender:{this.state.data.gender}<br /></span>) : ''}
                    {(this.state.data && this.state.data.hasOwnProperty('image')) ? <img src={this.state.data.image} alt=""/> : ''}
                </div>
            );
    }
}

export default Topic