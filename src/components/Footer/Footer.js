import React from "react";
import Loader from "../Loader/Loader";
import "./Footer.css";

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            endpoints: {
                "characters": "https://rickandmortyapi.com/api/character",
                "locations": "https://rickandmortyapi.com/api/location",
                "episodes": "https://rickandmortyapi.com/api/episode",
            }
        };
    }

    componentDidMount() {
        Object.entries(this.state.endpoints).map(([what, endpoint]) => {
            fetch(endpoint)
                .then(res => res.json())
                .then((result) => {
                        this.setState({[what]: result.info.count});
                    }, () => {
                        this.setState({[what]: "Failed to load"});
                    }
                )
        })
    }

    render() {
        return (
            <footer>
                <span>characters: {this.state.characters ? this.state.characters : <Loader/>}</span>
                <span>locations: {this.state.locations ? this.state.locations : <Loader/>}</span>
                <span>episodes: {this.state.episodes ? this.state.episodes : <Loader/>}</span>
            </footer>
        );
    }
}

export default Footer;
