import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class UserAvatarLink extends Component {
  render() {
    let avatar_url = this.props.user.avatar_url;
    let size = this.props.size || 'lg';
    avatar_url = avatar_url.replace('!large', '!' + size);
    return (
      <Link to={'/' + this.props.user.login} className="user-avatar">
        <img className="avatar media-object" src={avatar_url} />
      </Link>
    )
  }
}