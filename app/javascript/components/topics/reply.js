import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, UserNameLink, Timeago, LikeButton, IconButton } from 'components'

export class Reply extends Component {
  render() {
    var reply = this.props.reply;

    return (
      <div className="reply media">
        <div className="d-flex align-self-start mr-3">
          <UserAvatarLink user={reply.user} />
        </div>
        <div className="media-body">
          <div className="mt-0 media-heading">
            <UserNameLink user={reply.user} />
            <span className="date float-xs-right">
              <Timeago time={reply.created_at} />
            </span>
            <span className="float-right">
              <LikeButton reply={reply} />
            </span>
          </div>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: reply.body_html }} />
          <div className="media-footer clearfix">
          </div>
        </div>
      </div>
    )
  }
}