import React from "react";
import "./Items.css";

class Items extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        console.log(this.props.match.params.collection)

        return (
            <span>test</span>
        );
    }
}

export default Items;