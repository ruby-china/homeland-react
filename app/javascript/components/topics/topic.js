import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, Timeago, NodeLink } from 'components'

export class Topic extends Component {
  render() {
    var topic = this.props.topic;

    return (
      <tr className="topic" id={'topic-' + topic.id}>
        <td className="title">
          <Link to={'/topics/' + topic.id}>{topic.title}</Link>
        </td>
        <td className="node">
          <NodeLink node={topic} />
        </td>
        <td className="author">
          <UserAvatarLink user={topic.user} />
        </td>
        <td className="replies">{topic.replies_count}</td>
        <td className="activity">
          <Timeago time={topic.updated_at} />
        </td>
      </tr>
    )
  }
}