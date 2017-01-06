import React from 'react';
import { Component, Link } from 'react';
import { Header, Footer } from 'containers';

export class App extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <div id="main" className="main-layout">
          <div className="container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}