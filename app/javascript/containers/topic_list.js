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
        opts = { type: 'last_actived', node_id: this.props.node_id };
      }
    }

    Homeland.fetch(path, opts).done(res => {
      this.setState({
        topics: res.topics
      });
    });
  }

  render() {
    let list = this.loading();
    if (this.state.topics.length > 0) {
      list = this.renderTopics();
    }
    return (
      <div className="topics">
        <table className="table">
          <thead className="thead-default">
            <tr className="topic">
              <th className="title">标题</th>
              <th className="author">作者</th>
              <th className="replies">回帖</th>
              <th className="activity">更新</th>
            </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
      </div>
    )
  }

  loading() {
    return (
      <tr className="topic topic-loading">
        <td colSpan="4" className="text-center">
          <div>载入中，请稍后...</div>
        </td>
      </tr>
    )
  }

  renderTopics() {
    return this.state.topics.map(topic => {
      return <Topic key={topic.id} topic={topic} />
    })
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
      <TopicList type="node" node_id={this.props.params.id} />
    )
  }
}