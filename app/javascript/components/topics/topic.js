import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, Timeago, NodeLink, TopicLink } from 'components'

export class Topic extends Component {
  render() {
    var topic = this.props.topic;

    return (
      <tr className="topic" id={'topic-' + topic.id}>
        <td className="title">
          <TopicLink topic={topic} />
        </td>
        <td className="author hidden-xs-down">
          <UserAvatarLink user={topic.user} />
        </td>
        <td className="replies hidden-md-down">
          <span><i className="fa fa-comments"></i> {topic.replies_count}</span>
          {topic.likes_count > 0 && (
            <span className="likes"><i className="fa fa-heart"></i> {topic.likes_count}</span>
          )}
        </td>
        <td className="activity hidden-md-down">
          <Timeago time={topic.updated_at} />
        </td>
      </tr>
    )
  }
}