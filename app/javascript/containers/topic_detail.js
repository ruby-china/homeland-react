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
      reply_id: null,
      form: {},
    };
  }

  componentDidMount() {
    // highlight Reply by params
    if (this.props.params.reply_id) {
      this.highlightReply(this.props.params.reply_id);
    }

    this.fetchData();
  }

  componentDidUpdate() {
    // scrollTo state.reply_id
    const replyEl = document.getElementById(`reply-${this.state.reply_id}`);
    if (replyEl) { scrollTo(0, replyEl.offsetTop) }
  }

  fetchData() {
    Homeland.fetch("/topics/"+ this.props.params.id +".json").then(res => {
      this.setState({
        topic: res.topic,
        meta: res.meta,
      });
    });
    Homeland.fetch("/topics/" + this.props.params.id + "/replies.json", { limit: 50 }).then(res => {
      this.setState({
        replies: res.replies,
        user_liked_reply_ids: res.meta.user_liked_reply_ids,
      });
    });
  }

  onReplyClick(reply) {
    let additionBody = `@${reply.user.login}`;
    if (reply.floor) {
      additionBody = additionBody + ` #${reply.floor}楼`;
    }
    this.setState({ showReplyPanel: true });
    setTimeout(() => {
      $(this.refs.reply_body).val(this.refs.reply_body.value + additionBody);
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
          <div className="col-md-9">
            <div className="topic-content">
              <Reply key={`topic-${topic.id}`} item={topic} type="topic" state={this.state.meta.liked} onReplyClick={this.onReplyClick.bind(this, topic)} />
            </div>
            <div className="replies">
              {this.state.replies.map((reply, i) => {
                reply.floor = i + 1;
                const liked = this.state.user_liked_reply_ids.indexOf(reply.id) !== -1;
                const highlight = this.state.reply_id == reply.id;
                return (<Reply item={reply} key={`reply-${reply.id}`}
                               type="reply"
                               highlight={highlight}
                               state={liked}
                               onReplyClick={this.onReplyClick.bind(this, reply)} />)
              })}
            </div>
          </div>
          <div className="hidden-md-down col-md-3"></div>
        </div>
        {this.renderReplyPanel()}
      </div>
    )
  }

  closeReplyPanel(e) {
    if (e) { e.preventDefault(); }
    $(this.refs.reply_body).val('');
    this.setState({ showReplyPanel: false });
  }

  submitReply(e) {
    const data = {
      body: this.refs.reply_body.value,
    };
    const path = `/topics/${this.state.topic.id}/replies`;
    Homeland.request('POST', path, data).then(res => {
      this.state.replies.push(res.reply);
      this.highlightReply(res.reply.id)
      this.closeReplyPanel();
    })
  }

  highlightReply(id) {
    clearTimeout(this.highlightReplyTimer);
    this.setState({ reply_id: id });
    this.highlightReplyTimer = setTimeout(() => {
      this.setState({ reply_id: null });
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
