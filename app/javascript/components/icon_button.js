import React from "react";
import { Component } from "react";
import { Link } from "react-router";

export class IconButton extends Component {
  onClick(e) {
    e.preventDefault();
    return this.props.onClick();
  }

  render() {
    const { to = "#", className = "", icon = "", label = "" } = this.props;

    return (
      <Link
        to={to}
        className={`btn btn-icon ${className}`}
        onClick={this.onClick.bind(this)}
      >
        <i className={`las la-${icon}`}></i> {label}
      </Link>
    );
  }
}
