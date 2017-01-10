import React from 'react';
import { Component, Link } from 'react';
import { Header, Footer } from 'containers';
import { NodeLink } from 'components';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.fetchNodes();
  }

  fetchNodes() {
    Homeland.fetch("/nodes").then((res) => {
      this.setState({ nodes: res.nodes });
    });
  }

  render() {
    const nodeHTML = '' // this.renderNodes();
    return (
      <div id="app">
        <Header />
        <div id="main" className="main-layout">
          {nodeHTML}
          <div className="container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderNodes() {
    return this.state.nodes.map((node) => {
      return (<NodeLink node={node} key={node.id} />)
    });
  }
}