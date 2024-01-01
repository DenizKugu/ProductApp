import "./App.css";
import CategoryTitle from "./Components/CategoryTitle";
import ProductsTitle from "./Components/ProductsTitle";
import "bootstrap/dist/css/bootstrap.css";
import { Col, Container, Row } from "reactstrap";

import React, { Component } from "react";
import NavBar from "./Components/Nav";

import CartList from "./Components/CartList";
import NotFound from "./Components/NotFound";

import { Route, Switch } from "react-router-dom/cjs/react-router-dom";

export default class App extends Component {
  state = { categories: [], products: [], currentCategory: "", cart: [] };
  getCategory = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category);
  };

  getProducts = (category) => {
    let url = "http://localhost:3000/products";
    if (category) {
      url += "/?categoryId=" + category.id;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  componentDidMount() {
    this.getCategory();
    this.getProducts();
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    let addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id); //elma armut portakal
    this.setState({ cart: newCart });
  };

  render() {
    let categoryInfo = {
      title: "Category Title",
    };
    let productInfo = {
      title: "Product Title",
    };
    return (
      <>
        <Container>
          <NavBar cart={this.state.cart} removeFromCart={this.removeFromCart} />
          <Row>
            <Col xs={3}>
              <CategoryTitle
                info={categoryInfo}
                categories={this.state.categories}
                changeCategory={this.changeCategory}
                currentCategory={this.state.currentCategory}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductsTitle
                      {...props}
                      info={productInfo}
                      currentCategory={this.state.currentCategory}
                      products={this.state.products}
                      addToCart={this.addToCart}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                />
                <Route component={NotFound} />
              </Switch>
              {/* <ProductsTitle
                info={productInfo}
                currentCategory={this.state.currentCategory}
                products={this.state.products}
                addToCart={this.addToCart}
              /> */}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
