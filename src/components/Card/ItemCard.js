import React, { Component } from 'react';
import './Card.css'
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';


class ItemCard extends Component{

  

    render(){
        return(
            <Card>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.children}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

}

export default ItemCard;