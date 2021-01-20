import React from "react";
import "./Item.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";

class Item extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            routeParam: props.match.params,
            endpoints: {
                "character": "https://rickandmortyapi.com/api/character",
                "location": "https://rickandmortyapi.com/api/location",
                "episode": "https://rickandmortyapi.com/api/episode",
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

    urlSet = (url) => {
        return url.substr(31);
    };

    episodeName = (url) => {
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                // console.log(result);
                this.setState({ episodes:[result.name] });
            }, () => {
                return "";
            });
    }

    render() {
        return (
            <React.Fragment>
                <div id="itemCard" className="border rounded m-5 p-5 w-full">
                    <Row>
                        {(this.state.data && this.state.data.hasOwnProperty('image')) ? <Col><img className="rounded" src={this.state.data.image} alt="" /></Col> : ''}
                        <Col>
                            {(this.state.data && this.state.data.hasOwnProperty('name')) ?
                                <h3>Name: {this.state.data.name}<br /></h3> : ''}
                            {(this.state.data && this.state.data.hasOwnProperty('status')) ?
                                (<span>status: {this.state.data.status}
                                    <span className={this.state.data.status === "Dead" ? "dead" : "alive"}></span> <br />
                                </span>) : ''}
                            {(this.state.data && this.state.data.hasOwnProperty('species')) ?
                                (<span>species: {this.state.data.species}<br /></span>) : ''}
                            {(this.state.data && this.state.data.hasOwnProperty('type')) ?
                                (<span>gender: {this.state.data.type}<br /></span>) : ''}
                            {(this.state.data && this.state.data.hasOwnProperty('gender')) ?
                                (<span>gender: {this.state.data.gender}<br /></span>) : ''}
                            {(this.state.data && this.state.data.hasOwnProperty('origin')) ?
                                (<span>origin: <a href={this.urlSet(this.state.data.origin.url)}>
                                    {this.state.data.origin.name}</a><br />
                                </span>) : ''}
                            {(this.state.data && this.state.data.hasOwnProperty('episode') && Array.isArray(this.state.data.episode)) ?
                                <React.Fragment>
                                    episodes:<br />
                                    <div className="overflow-auto w-full pr-5" style={{ height: 120 }}>
                                        {this.state.data.episode.map((episode, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    {/* <a href={this.urlSet(episode)}>{this.episodeName(episode)}</a><br /> */}
                                                    <a href={this.urlSet(episode)}>{episode}</a><br />
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </React.Fragment> : ""}
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default Item;