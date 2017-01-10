import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, UserNameLink, Timeago, LikeButton, IconButton } from 'components'

export class Reply extends Component {
  render() {
    var item = this.props.item;
    var type = this.props.type;

    return (
      <div className="reply reply-{type} media">
        <div className="d-flex align-self-start mr-3">
          <UserAvatarLink user={item.user} />
        </div>
        <div className="media-body">
          <div className="mt-0 media-heading">
            <UserNameLink user={item.user} />
            <span className="date float-xs-right">
              <Timeago time={item.created_at} />
            </span>
            <span className="float-right">
              <LikeButton item={item} type={type} state={this.props.state} />
            </span>
          </div>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: item.body_html }} />
          <div className="media-footer clearfix">
          </div>
        </div>
      </div>
    )
  }
}