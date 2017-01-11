import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, UserNameLink, Timeago, LikeButton, IconButton } from 'components'

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
    let lightClass = this.props.highlight ? 'light' : '';
    let popularClass = item.likes_count >= 5 && type === 'reply' ? 'popular' : '';
    let elId = `${type}-${item.id}`;
    const moreButtons = this.renderMoreButtons();

    return (
      <div id={elId} className={`reply reply-${type} ${lightClass} ${popularClass} media`}>
        <div className="d-flex align-self-start mr-3">
          <UserAvatarLink user={item.user} />
        </div>
        <div className="media-body">
          <div className="mt-0 media-heading">
            <UserNameLink user={item.user} />
            <span className="date float-right">
              <Timeago time={item.created_at} />
            </span>
          </div>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: item.body_html }} />
          <div className="media-footer clearfix">
            <LikeButton item={item} type={type} state={this.props.state} />

            <span className="float-right opts">
              {moreButtons}
              <IconButton icon="reply" onClick={this.onReplyClick.bind(this, item)} />
            </span>
          </div>
        </div>
      </div>
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
}