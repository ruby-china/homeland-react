import React from 'react';
import { Link } from 'react-router';
import { Reply, NodeLink, PageLoading } from 'components'

export class TopicDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topic: null,
      meta: {},
      replies: [],
      user_liked_reply_ids: [],
      showReplyPanel: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    Homeland.fetch("/topics/"+ this.props.params.id +".json").then(res => {
      this.setState({
        topic: res.topic,
        meta: res.meta,
      });
    });
    Homeland.fetch("/topics/" + this.props.params.id + "/replies.json").then(res => {
      this.setState({
        replies: res.replies,
        user_liked_reply_ids: res.meta.user_liked_reply_ids,
      });
    });
  }

  onReplyClick() {
    this.setState({ showReplyPanel: true });
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
              <Reply key="reply-topic" item={topic} type="topic" state={this.state.meta.liked} onReplyClick={this.onReplyClick.bind(this)} />
            </div>
            <div className="replies">
              {this.state.replies.map(reply => {
                const liked = this.state.user_liked_reply_ids.indexOf(reply.id) !== -1;
                return <Reply key={`reply-${reply.id}`} item={reply} type="reply" state={liked} onReplyClick={this.onReplyClick.bind(this)} />
              })}
            </div>
          </div>
          <div className="col hidden-md-down col-lg-3"></div>
        </div>
        {this.state.showReplyPanel && (
          this.renderReplyPanel()
        )}
      </div>
    )
  }

  closeReplyPanel(e) {
    if (e) { e.preventDefault(); }
    this.setState({ showReplyPanel: false });
  }

  replyBodyOnChange(e) {
    this.setState({ reply_body: e.target.value });
  }

  submitReply(e) {
    const data = {
      body: this.state.reply_body,
    };
    const path = `/topics/${this.state.topic.id}/replies`;
    Homeland.request('POST', path, data).then(res => {
      this.state.replies.push(res.reply);
      this.closeReplyPanel();
    })
  }

  renderReplyPanel() {
    return (
      <div className="reply-panel">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <textarea name="body" className="form-control" onChange={this.replyBodyOnChange.bind(this)} rows="5"></textarea>
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={this.submitReply.bind(this)}>提交回复</button>
                <a href="#" onClick={this.closeReplyPanel.bind(this)}>取消</a>
              </div>
            </div>
            <div className="col hidden-md-down col-lg-3">
            </div>
          </div>
        </div>
      </div>
    )
  }
}