import React from "react";
import "./Item.css";

class Item extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            routeParam: props.match.params,
            endpoints: {
                "characters": "https://rickandmortyapi.com/api/character",
                "locations": "https://rickandmortyapi.com/api/location",
                "episodes": "https://rickandmortyapi.com/api/episode",
            }
        };
    }

    componentDidMount() {
        let topic = this.state.routeParam.topic;
        let itemId = this.state.routeParam.id;

        let url = this.state.endpoints[topic] + "/" + itemId;

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                this.setState({ data: result });
            }, () => {
                this.setState({ data: {} })
            });
    }

    render() {
        return (
            <React.Fragment>
                <h3>{this.state.routeParam.topic}:</h3>
                {(this.state.data && this.state.data.hasOwnProperty('name')) ? <span>Name: {this.state.data.name}<br /></span> : ''}
                {(this.state.data && this.state.data.hasOwnProperty('gender')) ? (<span>gender:{this.state.data.gender}<br /></span>) : ''}
                {(this.state.data && this.state.data.hasOwnProperty('image')) ? <img src={this.state.data.image} alt="" /> : ''}
            </React.Fragment>
        );
    }
}

export default Item;