import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryTitle extends Component {
  render() {
    return (
      <>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.props.categories.map((item) => (
            <ListGroupItem
              key={item.id}
              onClick={() => {
                this.props.changeCategory(item);
              }}
              style={{ cursor: "pointer" }}
            >
              {item.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>

        <p>{this.props.currentCategory}</p>
      </>
    );
  }
}
