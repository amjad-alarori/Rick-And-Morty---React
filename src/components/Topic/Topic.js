import React from "react";
import {Link, Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import RouteWithSubRoutes from "../Routes/RouteWithSubRoutes";
import "./Topic.css";
import ItemCard from "../Card/ItemCard";

class Topic extends React.Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.fetchWithGet = this.fetchWithGet.bind(this);

        let pageParam = props.location.search;
        pageParam = pageParam.lastIndexOf("?page=")>=0?pageParam.substr(pageParam.lastIndexOf("?page=")+6):1

        this.state = {
            routes: props.routes,
            routeParam: props.match.params.topic,
            page: pageParam,
            endpoints: {
                characters: {
                    url: "https://rickandmortyapi.com/api/character",
                    filters: {
                        name: "name",
                        status: ["alive", "dead", "unkown"],
                        species: "species",
                        type: "type",
                        gender: ["female", "male", "genderless", "unkown"],
                    }
                },
                locations: {
                    url: "https://rickandmortyapi.com/api/location",
                    filters: {
                        name: "name",
                        type: "type",
                        dimension: "dimension"
                    }
                },
                episodes: {
                    url: "https://rickandmortyapi.com/api/episode",
                    filters: {
                        name: "name",
                        episode: "episode",
                    }
                },
            },
            filter: {},
            query: {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let topic = this.state.routeParam;
        let page = this.state.page;
        let url = this.state.endpoints[topic].url;
        let filter = this.state.endpoints[topic].filters;

        // Create new URLSearchParams from query array (can be empty)
        let query_string = new URLSearchParams(this.state.query).toString();
        if (query_string !== "") {
            // If not empty append query to url
            url += "?" + query_string
            console.log(url);
        }else{
            url += page === 1?"":'?page='+page;
        }

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                this.setState({data: result.results});

                if(!result.error) {
                    // Loop over filters in specific "topic"
                    Object.entries(filter).map(([key, value]) => {
                        // Fetch original filter
                        let currentFilter = this.state.filter

                        // If value is array, Values are pre defined so no need to search for data
                        if (Array.isArray(value)) {
                            currentFilter[key] = value
                        } else {
                            // Else search for data in response, Create new array for future values. e.g ["Rick", "Morty"]
                            let new_value = []
                            Object.entries(result.results).map(([key, v]) => {
                                // If not empty and not already included push to new_value array
                                if (v[value] !== "" && !new_value.includes(v[value])) {
                                    new_value.push(v[value])
                                }
                            })
                            currentFilter[key] = new_value
                        }
                        this.setState({filter: currentFilter})
                    })
                }
            }, () => {
                this.setState({data: []})
            });
    }

    // Onchange function for select
    fetchWithGet(e) {
        let or_query = this.state.query
        // If value is not empty (did not select all), apply query
        if (e.target.value !== "") {
            or_query[e.target.name] = e.target.value
        } else {
            // Else remove filter from query array
            delete or_query[e.target.name]
        }
        this.setState({
            query: or_query
        })
        this.fetchData()
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
                        {/*Loop over each filter*/}
                        <input type="text" onChange={this.fetchWithGet} name="name"/>
                        {Object.keys(this.state.filter).map((item) => (
                            // If filter is not empty array create select
                            this.state.filter[item].length > 0 ?
                                <select name={item} onChange={this.fetchWithGet}>
                                    <option value="">All {item}s</option>
                                    {/*Loop over each item and create option*/}
                                    {Object.entries(this.state.filter[item]).map(([key, v]) => (
                                        <option selected={this.state.query[item] === v}>{v}</option>
                                    ))}
                                </select> : null
                        ))}
                        <div className="flex-row">
                            {this.state.data ? this.state.data.map((item) => (
                                <Link key={item.id} to={`/${this.state.routeParam}/${item.id}`}>
                                    <ItemCard title={item.name}>
                                        {item.gender ? <React.Fragment>{item.gender} <br /></React.Fragment> : ""}
                                        {item.status ? <span>{item.status} <br /></span> : ""}
                                        {item.type ? <div>{item.type} <br /></div> : ""}
                                        {item.dimension ? <>{item.dimension} <br /></> : ""}
                                    </ItemCard>
                                </Link>
                            )) : []}
                        </div>
                        <div className="flex-row">
                            {this.state.info ?
                                <>
                                    <a href={this.state.info.prev}>vorige</a>
                                    <span>hier komt de page nummer</span>
                                    <a href={this.state.info.next}>Next</a>
                                </>
                                : ''}
                        </div>
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

export default Topic;