import React from 'react';
import { Link } from 'react-router';
import { Reply, NodeLink, PageLoading } from 'components'

export class TopicDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topic: null,
      replies: [],
      user_liked_reply_ids: [],
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
    Homeland.fetch("/topics/" + this.props.params.id + "/replies.json").then(res => {
      this.setState({
        replies: res.replies,
        user_liked_reply_ids: res.meta.user_liked_reply_ids,
      });
    });
  }

  render() {
    const topic = this.state.topic;
    if (!topic) { return <PageLoading text="载入中..." />; }

    return (

      <div className="topic-detail">
        <h1><NodeLink node={topic} /> {topic.title}</h1>
        <div className="row">
          <div className="col">
            <div className="topic-content">
              <Reply key="reply-topic" reply={topic} type="topic" />
            </div>
            <div className="replies">
              {this.state.replies.map(reply => {
                return <Reply key={`reply-${reply.id}`} reply={reply} type="reply" />
              })}
            </div>
          </div>
          <div className="col hidden-md-down col-lg-3"></div>
        </div>
      </div>
    )
  }
}