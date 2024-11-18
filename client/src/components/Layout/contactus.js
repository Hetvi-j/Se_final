import React from "react";
import { NavLink } from "react-router-dom";
import '../../pages/contactus.css';

const ContactUsMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Contact Us</h4>
          <NavLink
            to="/contact/order-related"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/contact/shopping"
            className="list-group-item list-group-item-action"
          >
            Shopping
          </NavLink>
          <NavLink
            to="/contact/fashion-flux-account"
            className="list-group-item list-group-item-action"
          >
            Fashion Flux Account
          </NavLink>
          <NavLink
            to="/contact/payments"
            className="list-group-item list-group-item-action"
          >
            Payments
          </NavLink>
          <NavLink
            to="/contact/sell-on-fashion-flux"
            className="list-group-item list-group-item-action"
          >
            Sell on Fashion Flux
          </NavLink>
          <NavLink
            to="/contact/others"
            className="list-group-item list-group-item-action"
          >
            Others
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ContactUsMenu;
