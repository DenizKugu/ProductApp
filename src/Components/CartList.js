import React, { Component } from "react";
import { Badge, Table } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    let toplam = 0;
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td>{cartItem.product.id}</td>
              <td>{cartItem.product.categoryId}</td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.product.unitsInStock}</td>
              <td>{cartItem.quantity}</td>
              <td>${cartItem.product.unitPrice * cartItem.quantity}</td>
              <td style={{ display: "none" }}>
                {(toplam += cartItem.product.unitPrice * cartItem.quantity)}
              </td>

              <td>
                <Badge
                  onClick={() => this.props.removeFromCart(cartItem.product)}
                  color="danger"
                >
                  X
                </Badge>
              </td>
            </tr>
          ))}
          <tr>
            <td>All Total Price</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${toplam}</td>
          </tr>
        </tbody>
      </Table>
    );
  }

  render() {
    return <>{this.renderCart()}</>;
  }
}
