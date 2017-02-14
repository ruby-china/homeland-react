import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, UserNameLink, Timeago, LikeButton, IconButton, TopicLink } from 'components'

export class Reply extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMore: false
    };
  }

  toggleMore() {
    this.setState({ showMore: true });
  }

  onReplyClick(reply) {
    return this.props.onReplyClick(reply);
  }

  render() {
    let item = this.props.item;
    let type = this.props.type;
    let replyClassName = `media reply reply-${type}`;
    if (this.props.highlight) {
      replyClassName += ' light';
    }
    if (item.likes_count >= 5 && type === 'reply') {
      replyClassName += ' popular';
    }
    let elId = `${type}-${item.id}`;
    let content = '';

    if (item.action) {
      replyClassName += ' reply-system';
      content = this.renderSystemEvent();
    } else {
      content = this.renderReply();
    }

    return (
      <div id={elId} className={replyClassName}>
        <div className="d-flex align-self-start mr-3">
          <UserAvatarLink user={item.user} />
        </div>
        <div className="media-body">
          {content}
        </div>
      </div>
    )
  }

  renderReply() {
    let item = this.props.item;
    let type = this.props.type;
    const moreButtons = this.renderMoreButtons();

    return (
      <span>
      <div className="mt-0 media-heading">
        <UserNameLink user={item.user} />
        <span className="date float-right">
          <Timeago time={item.created_at} />
        </span>
      </div>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: item.body_html }} />
      <div className="media-footer clearfix">
        <span className="float-right opts">
          <LikeButton item={item} type={type} state={this.props.state} />
          {moreButtons}
          <IconButton icon="reply" onClick={this.onReplyClick.bind(this, item)} />
        </span>
      </div>
      </span>
    )
  }

  renderMoreButtons() {
    const item = this.props.item;

    if (this.state.showMore) {
      return (
        <span>
        {item.abilities.destroy && (
          <IconButton icon="trash" />
        )}
        {item.abilities.update && (
          <IconButton icon="pencil" />
        )}
        </span>
      )
    } else {
      return (<IconButton icon="ellipsis-h" onClick={this.toggleMore.bind(this)} />)
    }
  }

  renderSystemEvent() {
    let content = '';
    const item = this.props.item;
    if (!item.action) { return ''; }


    switch (item.action) {
      case 'close': {
        content = (<span>关闭了讨论</span>);
        break;
      }
      case 'excellent': {
        content = (<span>将本帖设为了精华贴</span>);
        break;
      }
      case 'reopen': {
        content = (<span>重新开启了讨论</span>);
        break;
      }
      case 'unexcellent': {
        content = (<span>取消了精华贴</span>);
        break;
      }
      case 'mention': {
        if (item.mention_topic) {
          content = (
            <span>
              在
              <span className="topic">
                <TopicLink topic={item.mention_topic} />
              </span>
              中提及了此贴
            </span>
          )
        }
        break;
      }
    }

    return (
      <span>
        {content}
        <Timeago time={item.created_at} />
      </span>
    )
  }
}
