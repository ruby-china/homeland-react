import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="container">
          Copyright &copy; React Rails Exmaple.
        </div>
      </div>
    )
  }
}