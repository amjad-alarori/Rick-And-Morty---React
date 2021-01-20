import React, { Component } from 'react';
import './CategoryCard.css'
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';


class CategoryCard extends Component{

  

    render(){
        return(
            <Card>
              
                <Card.Body>
                   
                    <Card.Text>
                        {this.props.children}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

}

export default CategoryCard;