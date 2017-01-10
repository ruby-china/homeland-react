import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class IconButton extends Component {
  onClick(e) {
    e.preventDefault();
    return this.props.onClick();
  }

  render() {
    let to = this.props.to || '#';
    let className = this.props.className || '';
    let icon = this.props.icon || '';
    let label = this.props.label || '';

    return (
      <Link to={to} className={`btn btn-icon ${className}`} onClick={this.onClick.bind(this)}>
        <i className={`fa fa-${icon}`}></i> {label}
      </Link>
    )
  }
}