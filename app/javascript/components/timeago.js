import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class Timeago extends Component {
  render() {
    return (
      <abbr className="timeago" title={this.props.time}>{this.props.time}</abbr>
    )
  }
}