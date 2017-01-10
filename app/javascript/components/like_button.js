import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { IconButton } from 'components'

export class LikeButton extends Component {
  render() {
    let reply = this.props.reply || this.props.topic;
    let state = this.props.state === null ? false : this.props.state;
    let label = "";
    if (reply.likes_count > 0) {
      label = `${reply.likes_count} 个赞`;
    }
    let className = 'like-button';
    if (state) {
      className = className + ' active';
    }

    return (
      <IconButton label={label} icon="heart" className={className} />
    )
  }
}