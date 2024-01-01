import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">24 Nisan Market</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Cart - {this.props.cart.length}
                </DropdownToggle>
                <DropdownMenu end>
                  {this.props.cart.map((cartItem) => (
                    <DropdownItem key={cartItem.product.id}>
                      <Badge
                        onClick={() =>
                          this.props.removeFromCart(cartItem.product)
                        }
                        color="danger"
                      >
                        X
                      </Badge>
                      {"  "}
                      {cartItem.product.productName} -{" "}
                      <Badge color="success">{cartItem.quantity}</Badge>
                    </DropdownItem>
                  ))}
                  <DropdownItem>
                    <Link to="/cart">Go To Cart</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
