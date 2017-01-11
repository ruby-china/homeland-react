import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { Topic } from 'components'

export class TopicList extends Component {
  constructor(props){
    super(props);
    this.state = {
      topics: null,
      t: new Date(),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      topics: [],
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.props = nextProps;
      this.fetchData()
    }
  }

  fetchData() {
    let path = "/topics.json";
    let opts = { type: this.props.type };
    if (this.props.type == 'user') {
      path = `/users/${this.props.login}/topics.json`;
    } else if (this.props.type == 'favorites') {
      path = `/users/${this.props.login}/favorites.json`;
    } else if (this.props.type == 'node') {
      opts = { type: 'last_actived', node_id: this.props.node_id };
    }

    Homeland.fetch(path, opts).then(res => {
      this.setState({
        topics: res.topics
      });
    });
  }

  render() {
    let list = this.loading();
    if (this.state.topics) {
      list = this.renderTopics();
    }
    return (
      <div className="topics" data-t={this.state.t}>
        <table className="table">
          <thead className="thead-default">
            <tr className="topic">
              <th className="title">标题</th>
              <th className="author hidden-xs-down">作者</th>
              <th className="replies hidden-md-down">回帖/赞</th>
              <th className="activity hidden-md-down">更新</th>
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
    if (this.state.topics.length === 0) {
      return (
        <tr className="topic topic-empty">
          <td colSpan="4" className="text-center">
            <div>没有任何话题</div>
          </td>
        </tr>
      )
    }

    return this.state.topics.map(topic => {
      return <Topic key={`topic-item-${topic.id}`} topic={topic} />
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
  constructor(props) {
    super(props)
    this.state = { node_id: this.props.params.id };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.setState({ node_id: nextProps.params.id });
    }
  }

  render() {
    return (
      <TopicList type="node" node_id={this.state.node_id} />
    )
  }
}

export class UserTopicList extends Component {
  render() {
    return (
      <TopicList type="user" login={this.props.params.id} />
    )
  }
}

export class FavoriteTopicList extends Component {
  render() {
    return (
      <TopicList type="favorites" login={this.props.params.id} />
    )
  }
}