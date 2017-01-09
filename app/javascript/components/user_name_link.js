import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

export class UserNameLink extends Component {
  render() {
    const user = this.props.user;

    return (
      <Link to={'/' + user.login} title={user.name} className="user-name">
      {user.login}
      </Link>
    )
  }
}