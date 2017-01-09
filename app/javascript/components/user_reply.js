import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, UserNameLink, TopicLink, Timeago, LikeButton, IconButton } from 'components'

export class UserReply extends Component {
  render() {
    var reply = this.props.reply;

    return (
      <div className="user-reply">
        <div className="media-body">
          <div className="mt-0 media-heading">
            <Link to={`/topics/${reply.topic_id}`}>{reply.topic_title}</Link>
          </div>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: reply.body_html }} />
          <div className="media-footer clearfix">
          </div>
        </div>
      </div>
    )
  }
}