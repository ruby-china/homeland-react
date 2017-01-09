import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { IconButton } from 'components'

export class LikeButton extends Component {
  render() {
    let reply = this.props.reply || this.props.topic;
    let label = "";
    if (reply.likes_count > 0) {
      label = `${reply.likes_count} 个赞`;
    }

    return (
      <IconButton label={label} icon="heart" className="like-button" />
    )
  }
}