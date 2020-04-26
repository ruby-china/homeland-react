import React from 'react';
import { Link } from 'react-router';
import { Reply, NodeLink } from 'components'
import ContentLoader from 'react-content-loader'

export class TopicDetail extends React.Component {
  constructor(props) {
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
    Homeland.fetch("/topics/" + this.props.params.id + ".json").then(res => {
      this.setState({
        topic: res.topic,
        meta: res.meta,
      });
    });
    Homeland.fetch("/topics/" + this.props.params.id + "/replies.json", { limit: 100 }).then(res => {
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
    if (!topic) {
      return <ContentLoader
        speed={1}
        width={1100}
        height={640}
        viewBox="0 0 1100 640"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="14" y="0" rx="0" ry="0" width="92" height="26" />
        <rect x="48" y="17" rx="0" ry="0" width="3" height="1" />
        <rect x="124" y="0" rx="0" ry="0" width="526" height="26" />
        <circle cx="40" cy="87" r="24" />
        <rect x="76" y="65" rx="0" ry="0" width="85" height="16" />
        <rect x="76" y="91" rx="0" ry="0" width="729" height="16" />
        <rect x="76" y="117" rx="0" ry="0" width="614" height="17" />
        <rect x="76" y="144" rx="0" ry="0" width="553" height="18" />
        <rect x="76" y="172" rx="0" ry="0" width="651" height="17" />
        <circle cx="41" cy="240" r="24" />
        <rect x="77" y="218" rx="0" ry="0" width="144" height="16" />
        <rect x="77" y="244" rx="0" ry="0" width="569" height="16" />
        <rect x="77" y="270" rx="0" ry="0" width="503" height="17" />
        <rect x="77" y="297" rx="0" ry="0" width="553" height="18" />
        <circle cx="40" cy="361" r="24" />
        <rect x="76" y="339" rx="0" ry="0" width="70" height="16" />
        <rect x="76" y="365" rx="0" ry="0" width="649" height="16" />
        <rect x="76" y="391" rx="0" ry="0" width="704" height="17" />
        <rect x="76" y="418" rx="0" ry="0" width="365" height="18" />
      </ContentLoader>;
    }

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
