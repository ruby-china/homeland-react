import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { Topic } from 'components'
import ContentLoader from 'react-content-loader'

export class TopicList extends Component {
  constructor(props) {
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
              <th className="author hidden-xs-down"></th>
              <th className="title">标题</th>
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
        <td colSpan="5" className="text-center" style={{ padding: "0" }}>
          <ContentLoader
            speed={1}
            width={1100}
            height={640}
            viewBox="0 0 1100 640"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="80" y="63" rx="2" ry="2" width="571" height="26" />
            <circle cx="26" cy="77" r="14" />
            <rect x="875" y="63" rx="0" ry="0" width="71" height="26" />
            <rect x="1006" y="63" rx="0" ry="0" width="90" height="26" />
            <rect x="80" y="111" rx="2" ry="2" width="488" height="26" />
            <circle cx="26" cy="124" r="14" />
            <rect x="875" y="110" rx="0" ry="0" width="86" height="26" />
            <rect x="1006" y="110" rx="0" ry="0" width="75" height="26" />
            <rect x="0" y="98" rx="0" ry="0" width="1100" height="1" />
            <rect x="80" y="160" rx="2" ry="2" width="665" height="26" />
            <circle cx="26" cy="174" r="14" />
            <rect x="875" y="160" rx="0" ry="0" width="77" height="26" />
            <rect x="1006" y="160" rx="0" ry="0" width="77" height="26" />
            <rect x="0" y="148" rx="0" ry="0" width="1100" height="1" />
            <rect x="80" y="210" rx="2" ry="2" width="357" height="26" />
            <circle cx="25" cy="224" r="14" />
            <rect x="875" y="210" rx="0" ry="0" width="61" height="26" />
            <rect x="1006" y="210" rx="0" ry="0" width="65" height="26" />
            <rect x="0" y="198" rx="0" ry="0" width="1100" height="1" />
            <rect x="80" y="10" rx="2" ry="2" width="420" height="26" />
            <circle cx="25" cy="24" r="14" />
            <rect x="875" y="10" rx="0" ry="0" width="61" height="26" />
            <rect x="1006" y="10" rx="0" ry="0" width="65" height="26" />
            <rect x="1" y="-2" rx="0" ry="0" width="1128" height="1" />
            <rect x="80" y="261" rx="2" ry="2" width="589" height="26" />
            <circle cx="26" cy="275" r="14" />
            <rect x="875" y="262" rx="0" ry="0" width="77" height="26" />
            <rect x="1006" y="261" rx="0" ry="0" width="46" height="26" />
            <rect x="0" y="249" rx="0" ry="0" width="1100" height="1" />
            <rect x="0" y="49" rx="0" ry="0" width="1100" height="2" />
            <rect x="81" y="306" rx="2" ry="2" width="459" height="26" />
            <circle cx="27" cy="320" r="14" />
            <rect x="876" y="306" rx="0" ry="0" width="56" height="26" />
            <rect x="1007" y="306" rx="0" ry="0" width="93" height="26" />
            <rect x="1" y="294" rx="0" ry="0" width="1100" height="1" />
            <rect x="81" y="356" rx="2" ry="2" width="525" height="26" />
            <circle cx="26" cy="370" r="14" />
            <rect x="876" y="356" rx="0" ry="0" width="61" height="26" />
            <rect x="1007" y="356" rx="0" ry="0" width="74" height="26" />
            <rect x="1" y="344" rx="0" ry="0" width="1100" height="1" />
            <rect x="81" y="405" rx="2" ry="2" width="514" height="26" />
            <circle cx="27" cy="419" r="14" />
            <rect x="876" y="406" rx="0" ry="0" width="77" height="26" />
            <rect x="1007" y="405" rx="0" ry="0" width="77" height="26" />
            <rect x="1" y="393" rx="0" ry="0" width="1100" height="1" />
          </ContentLoader>
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
