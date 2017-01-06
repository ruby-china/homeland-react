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
    });
  }

  fetchData() {
    Homeland.fetch("/topics.json", { type: this.state.type }).done(res => {
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