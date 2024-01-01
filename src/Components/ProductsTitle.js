import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

export default class ProductsTitle extends Component {
  render() {
    return (
      <>
        <h3>
          {this.props.info.title} - {this.props.currentCategory}
        </h3>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity Per Unit</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.productName}</td>
                <td>{item.quantityPerUnit}</td>
                <td>{item.unitPrice}</td>
                <td>{item.unitsInStock}</td>
                <td>
                  <Button
                    onClick={() => this.props.addToCart(item)}
                    outline
                    color="success"
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
