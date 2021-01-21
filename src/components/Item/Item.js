import React from "react";
import "./Item.css";
import { Row, Col } from "react-bootstrap";

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
                if (this.state.routeParam.topic === "characters") {
                    let episodes = []
                    result.episode.map(episode => {
                        let indexedEpisode = episode.lastIndexOf("/");
                        let episodeNumber = episode.substring(indexedEpisode + 1)

                        episodes.push(episodeNumber);

                        if (result.episode.length === episodes.length) {
                            fetch(`https://rickandmortyapi.com/api/episode/${episodes}`)
                                .then(res => res.json())
                                .then((result) => {
                                    result.length > 1 ?
                                        this.setState({ episodes: result }) :
                                        this.setState({ episodes: [result] });
                                }, () => {
                                    this.setState({ episodes: {} })
                                });
                        }
                        return episode;
                    })
                } else if (this.state.routeParam.topic === "locations" || this.state.routeParam.topic === "episodes") {
                    let characters = []

                    let fetchchars = [];
                    if (this.state.routeParam.topic === "locations") {
                        fetchchars = result.residents;
                    } else {
                        fetchchars = result.characters;
                    }

                    fetchchars.map(character => {
                        let latIndex = character.lastIndexOf("/");
                        let charId = character.substring(latIndex + 1)

                        characters.push(charId);

                        if (fetchchars.length === characters.length) {
                            fetch(`https://rickandmortyapi.com/api/character/${characters}`)
                                .then(res => res.json())
                                .then((result) => {
                                    result.length > 1 ?
                                        this.setState({ characters: result }) :
                                        this.setState({ characters: [result] });
                                }, () => {
                                    this.setState({ characters: {} })
                                });
                        }
                        return characters;
                    })
                }
            }, () => {
                this.setState({ data: {} })
            });
    }

    urlSet = (url) => {
        let indexId = url.lastIndexOf("/")
        let id = url.substr(indexId + 1)

        let indexSoort = url.lastIndexOf("/", indexId - 1)
        let soort = url.substr(indexSoort + 1, indexId - indexSoort - 1)

        return "/" + soort + "s/" + id;
    };

    render() {
        return (
            <React.Fragment>
                <div className="flex-col">
                    <a href={"/" + this.state.routeParam.topic} variant="secondary" className="btn btn-secondary mt-5 btn-width">Back</a>
                    <div id="itemCard" className="border rounded m-5 p-5 radios5">
                        <Row>
                            {(this.state.data && this.state.data.hasOwnProperty('image')) ? <Col><img className="rounded" src={this.state.data.image} alt="" /></Col> : ''}
                            <Col>
                                <div className="flex-col">
                                    {
                                        this.state.data ?
                                            <>
                                                {this.state.data.hasOwnProperty('name') ? <h3>Name: {this.state.data.name}</h3> : ''}
                                                {this.state.data.hasOwnProperty('status') ?
                                                    <span>Status: {this.state.data.status}
                                                        <span className={this.state.data.status === "Dead" ? "dead" : this.state.data.status === "alive" ? "alive" : "unknown"} />
                                                    </span>
                                                    : ''}
                                                {this.state.data.hasOwnProperty('species') ? <span>Species: {this.state.data.species}</span> : ''}
                                                {this.state.data.hasOwnProperty('type') ? <span>Type: {this.state.data.type}</span> : ''}
                                                {this.state.data.hasOwnProperty('dimension') ? <span>Dimension: {this.state.data.dimension}</span> : ''}
                                                {this.state.data.hasOwnProperty('gender') ? <span>Gender: {this.state.data.gender}</span> : ''}
                                                {this.state.data.hasOwnProperty('origin') ?
                                                    <span>Origin: {this.state.data.origin.url.length > 0 ?
                                                        <a href={this.urlSet(this.state.data.origin.url)}>{this.state.data.origin.name}</a> :
                                                        this.state.data.origin.name}
                                                    </span>
                                                    : ''}
                                                {this.state.data.hasOwnProperty('episode') ?
                                                    Array.isArray(this.state.data.episode) ?
                                                        <>
                                                            Episodes:
                                                        <div className="episodesBox">
                                                                <div id="customScroll" className="flex-col overflow-auto w-full pr-5" style={{ height: 120 }}>
                                                                    {this.state.episodes && this.state.episodes.map((episode, i) => {
                                                                        return episode.url.length > 0 ? <a key={i} href={this.urlSet(episode.url)}>{episode.name}</a> : <span key={i}>{episode.name}</span>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <span>Episode: {this.state.data.episode}</span>
                                                        </>
                                                    :
                                                    ""}
                                                {(this.state.data.hasOwnProperty('residents') && Array.isArray(this.state.data.residents)) || (this.state.data.hasOwnProperty('characters') && Array.isArray(this.state.data.characters)) ?
                                                    <>
                                                        Characters last seen on this location:
                                                    <div className="episodesBox">
                                                            <div id="customScroll" className="flex-col overflow-auto w-full pr-5" style={{ height: 120 }}>
                                                                {this.state.characters && this.state.characters.map((character, i) => {
                                                                    return character.url.length > 0 ? <a key={i} href={this.urlSet(character.url)}>{character.name}</a> : <span key={i}>{character.name}</span>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </> : ""}
                                            </>
                                            : ""}



                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Item;