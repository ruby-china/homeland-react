import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class UserAvatarLink extends Component {
  render() {
    return (
      <Link to={'/' + this.props.user.login} className="user-avatar">
        <img className="avatar media-object" src={this.props.user.avatar_url} />
      </Link>
    )
  }
}