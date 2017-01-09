import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { UserAvatarLink, UserNameLink, TopicLink, Timeago, LikeButton, IconButton } from 'components'

export class UserCard extends Component {
  render() {
    var user = this.props.user;

    return (
      <div className="user-card card">
        <div className="card-block text-center">
          <div className="card-text">
            <UserAvatarLink user={user} />
          </div>
          <div className="card-title">
            {user.login}
            {user.name && (
              <span className="name">({user.name})</span>
            )}
          </div>
          <Link className="btn btn-default" to="#">关注</Link>
        </div>
      </div>
    )
  }
}