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
      highlightTopicId: null,
      form: {},
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
    setTimeout(() => {
      this.refs.reply_body.focus();
    }, 100)
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
                const highlight = this.state.highlightTopicId == reply.id;
                return <Reply key={`reply-${reply.id}`} item={reply} type="reply" highlight={highlight} state={liked} onReplyClick={this.onReplyClick.bind(this)} />
              })}
            </div>
          </div>
          <div className="col hidden-md-down col-lg-3"></div>
        </div>
        {this.renderReplyPanel()}
      </div>
    )
  }

  closeReplyPanel(e) {
    if (e) { e.preventDefault(); }
    this.setState({ showReplyPanel: false });
  }

  submitReply(e) {
    const data = {
      body: this.refs.reply_body.value,
    };
    const path = `/topics/${this.state.topic.id}/replies`;
    Homeland.request('POST', path, data).then(res => {
      this.state.replies.push(res.reply);
      this.highlightTopic(res.reply.id)
      this.closeReplyPanel();
    })
  }

  highlightTopic(id) {
    clearTimeout(this.highlightTopicTimer);
    this.setState({ highlightTopicId: id });
    this.highlightTopicTimer = setTimeout(() => {
      this.setState({ highlightTopicId: null });
    }, 5000);
  }

  renderReplyPanel() {
    const hide = this.state.showReplyPanel ? '' : 'hide';
    return (
      <div className={`reply-panel ${hide}`}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <textarea name="body" className="form-control"
                  ref='reply_body'
                  rows="5"></textarea>
              </div>
              <div className="form-buttons">
                <button className="btn btn-primary" onClick={this.submitReply.bind(this)}>提交回复</button>
                <button className="btn btn-default" onClick={this.closeReplyPanel.bind(this)}>取消</button>
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