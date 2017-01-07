import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { Topic } from 'components'

export class TopicList extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.type || 'last_actived',
      topics: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      topics: [],
      type: null,
    });
  }

  fetchData() {
    let path = "/topics.json";
    let opts = {};
    if (this.props.type == 'user') {
      path = `/users/${this.props.login}/topics.json`;
    } else {
      opts = { type: this.state.type };
      if (this.state.type == 'node') {
        opts = { type: 'last_actived', node_id: this.props.params.id };
      }
    }

    Homeland.fetch(path, opts).done(res => {
      this.setState({
        topics: res.topics
      });
    });
  }

  render() {
    return (
      <div className="topics">
        <table className="table">
          <thead className="thead-default">
            <tr className="topic">
              <th className="title">Subject</th>
              <th className="node">Channel</th>
              <th className="author">Author</th>
              <th className="replies">Replies</th>
              <th className="activity">Activity</th>
            </tr>
          </thead>
          <tbody>
          {this.state.topics.map(topic => {
            return <Topic key={topic.id} topic={topic} />
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export class PopularTopicList extends Component {
  render() {
    return (
      <TopicList type="popular" />
    )
  }
}

export class NoReplyTopicList extends Component {
  render() {
    return (
      <TopicList type="no_reply" />
    )
  }
}

export class RecentTopicList extends TopicList {
  render() {
    return (
      <TopicList type="recent" />
    )
  }
}

export class NodeTopicList extends Component {
  render() {
    return (
      <TopicList type="node" />
    )
  }
}