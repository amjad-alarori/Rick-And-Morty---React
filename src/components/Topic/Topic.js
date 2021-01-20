import React from "react";
import { Link, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "../Routes/RouteWithSubRoutes";
import "./Topic.css";

class Topic extends React.Component {
    constructor(props) {
        super(props);

        let pageParam = props.location.search;
        pageParam = pageParam.lastIndexOf("?page=")>=0?pageParam.substr(pageParam.lastIndexOf("?page=")+6):1

        this.state = {
            routes: props.routes,
            routeParam: props.match.params.topic,
            page: pageParam,
            endpoints: {
                "characters": "https://rickandmortyapi.com/api/character",
                "locations": "https://rickandmortyapi.com/api/location",
                "episodes": "https://rickandmortyapi.com/api/episode",
            }
        };
    }

    componentDidMount() {
        let topic = this.state.routeParam;
        let page = this.state.page;
        let url = page === 1?this.state.endpoints[topic]:this.state.endpoints[topic]+'?page='+page;

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                this.setState({ data: result.results });
            }, () => {
                this.setState({ data: [] })
            });
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {this.state.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                    <Route>
                        <h3>{this.state.routeParam}:</h3>
                        <ul>
                            {this.state.data ? this.state.data.map((item) => (
                                <li key={item.id}><Link to={`/${this.state.routeParam}/${item.id}`}>{item.name}</Link></li>
                            )) : []}
                        </ul>
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

export default Topic;