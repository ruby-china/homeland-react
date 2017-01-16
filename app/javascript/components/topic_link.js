import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class TopicLink extends Component {
  render() {
    let topic = this.props.topic;
    if (!topic) { return ''; }
    const excellent = topic.excellent === 1;

    return (
      <Link to={'/topics/' + topic.id} className="topic-link" title="{topic.title}">
        <span className="node">{topic.node_name}</span>
        {topic.title}
        {excellent && (
          <i className="fa fa fa-diamond" title="精华帖" />
        )}
      </Link>
    )
  }
}