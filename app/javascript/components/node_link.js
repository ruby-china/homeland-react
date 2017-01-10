import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class NodeLink extends Component {
  render() {
    let node = this.props.node;
    if (node.node_name) {
      node = { id: node.node_id, name: node.node_name };
    }

    return (
      <Link to={`/topics/node${node.id}`} title={node.name} className="node-name">
      {node.name}
      </Link>
    )
  }
}