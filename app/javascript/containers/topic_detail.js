import React from 'react';
import { Link } from 'react-router';
import { Reply } from 'components'

export class TopicDetail extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.topic);
    this.state = {
      topic: this.props.topic,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    Homeland.fetch("/topics/"+ this.props.params.id +".json").then(res => {
      this.setState({
        topic: res.topic,
      });
    });
  }

  render() {
    const topic = this.state.topic;
    if (!topic) { return this.loading(); }
    return (
      <div className="topic-detail">
        <h1>{topic.title}</h1>
        <div className="topic-content">
          <Reply reply={topic} type="topic" />
        </div>
      </div>
    )
  }

  loading() {
    return (
      <div>Loading</div>
    )
  }
}