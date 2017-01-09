import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <div className="container">
          <p>This is a React App Exmaple powered by Rails + Webpacker.</p>
          <p>
          <a href="https://github.com/huacnlee/react-rails-example">OpenSource Code</a>
          </p>
        </div>
      </div>
    )
  }
}